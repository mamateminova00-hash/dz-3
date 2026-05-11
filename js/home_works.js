const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'NOT OK';
        gmailResult.style.color = 'red';
    }
};

const childBlock = document.querySelector('.child_block');

let posX = 0;
let posY = 0;

const offsetWidth = 448;

const moveBlock = () => {
    if (posX < offsetWidth && posY === 0) {
        posX++;
        childBlock.style.left = `${posX}px`;
        setTimeout(moveBlock, 1);
    } else if (posX >= offsetWidth && posY < offsetWidth) {
        posY++;
        childBlock.style.top = `${posY}px`;
        setTimeout(moveBlock, 1);
    } else if (posX > 0 && posY >= offsetWidth) {
        posX--;
        childBlock.style.left = `${posX}px`;
        setTimeout(moveBlock, 1);
    } else if (posX === 0 && posY > 0) {
        posY--;
        childBlock.style.top = `${posY}px`;
        setTimeout(moveBlock, 1);
    }
};

moveBlock();

// 3. STOPWATCH
const secondsHtml = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let timer = 0;
let interval = null;

startBtn.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            timer++;
            secondsHtml.innerHTML = timer;
        }, 1000);
    }
};

stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
};

resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    timer = 0;
    secondsHtml.innerHTML = timer;
};