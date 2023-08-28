const icon_width = 79,
        icon_height = 79,
        num_icons = 9,
        time_per_icon = 100,
        indexes = [0, 0, 0],
        iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "watermelon"];

const roll = (reel, offset = 0) => {
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]),
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);

    return new Promise((resolve, reject) => {
        reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

        setTimeout(() => {
            reel.style.transition = `none`;
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta%num_icons)
        }, 8 + delta * time_per_icon)
    })
};

const spinButton = document.getElementById('spinButton');
const counterDisplay = document.getElementById('counterDisplay');
let counter = 100;
let reelsRolling = false;

spinButton.addEventListener('click', () => {
    if (!reelsRolling && counter > 0) {
        reelsRolling = true;
        spinButton.disabled = true;

        rollAll()
            .then(() => {
                reelsRolling = false;
                spinButton.disabled = false;

                counter -= 10;
                counterDisplay.textContent = counter;

                if (counter <= 0 ) {
                    spinButton.disabled = true;
                }
            })
    }
});

function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel');
    return Promise.all ([...reelsList].map((reel, i) => roll(reel, i)))
        .then((deltas) => {
            deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
            indexes.map((index) => {console.log(iconMap[index])});
            // check win conditions
            if(indexes[0] == indexes[1] || (indexes[0] == indexes[1] && indexes[0]== indexes[2])) {
                console.log('WIN WIN WIN')
                counter += 20;
                counterDisplay.textContent = counter;
            }
        });
};
