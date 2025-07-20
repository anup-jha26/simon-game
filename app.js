let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;

const btns = ["red", "yellow", "green", "blue"];
const h2 = document.querySelector("#start-message");
const highScoreDisplay = document.querySelector("#high-score-display");
const body = document.querySelector("body");

// Initialize high score from local storage
window.onload = () => {
    if (localStorage.getItem('simonSaysHighScore')) {
        highScore = parseInt(localStorage.getItem('simonSaysHighScore'));
        highScoreDisplay.innerText = highScore;
    }
};

const startButton = document.querySelector("#start-btn");

startButton.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        h2.innerText = "Game Started!";
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random button selection
    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("Game Sequence: ", gameSeq);
    gameFlash(randBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        gameOver();
    }
}

function btnPress() {
    if (started) {
        const btn = this;
        userFlash(btn);

        const userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        console.log("User Sequence: ", userSeq);

        checkAnswer(userSeq.length - 1);
    }
}

const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function gameOver() {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br>Click the Start Game button to Restart.`;
    body.classList.add("gameover");

    if (level > highScore) {
        highScore = level;
        localStorage.setItem('simonSaysHighScore', highScore); //uses local storage to store high score
        highScoreDisplay.innerText = highScore;
        h2.innerHTML += `<br>New High Score!`;
    }

    setTimeout(() => {
        body.classList.remove("gameover");
    }, 150);
    resetGame();
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
