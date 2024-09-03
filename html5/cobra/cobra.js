const canvas = document.getElementById('telaJogo');
const ctx = canvas.getContext('2d');

const box = 20;
let cobra = [];
cobra[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let direction;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cobra.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(cobra[i].x, cobra[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(cobra[i].x, cobra[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if (direction === 'LEFT') cobraX -= box;
    if (direction === 'UP') cobraY -= box;
    if (direction === 'RIGHT') cobraX += box;
    if (direction === 'DOWN') cobraY += box;

    if (cobraX === food.x && cobraY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        cobra.pop();
    }

    let newHead = {
        x: cobraX,
        y: cobraY
    };

    if (cobraX < 0 || cobraX >= canvas.width || cobraY < 0 || cobraY >= canvas.height || collision(newHead, cobra)) {
        clearInterval(game);
        alert('Game Over! Sua pontuação foi: ' + score);
    }

    cobra.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 100);
