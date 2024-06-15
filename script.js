console.log("Welcome to Tic Tac Toe");

// Load audio files
let music = new Audio("Slower-Tempo-2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3");
let turna = new Audio("mixkit-censorship-beep-1082.wav");
let gameover = new Audio("mixkit-retro-arcade-lose-2027.wav");
let tieSound = new Audio("mixkit-game-show-buzz-incorrect-948.wav"); // Add a sound for tie

let turn = "X";
let gmov = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    win.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            boxtext[e[0]].innerText !== "") {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won \n";
            music.pause();
            gameover.play();
            gmov = true;
            document.querySelector('.imgbox img').style.width = "200px";
            drawWinningLine(e);
        }
    });
}

// Function to check for a tie
const checkTie = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let isTie = true;
    Array.from(boxtext).forEach(element => {
        if (element.innerText === "") {
            isTie = false;
        }
    });
    if (isTie && !gmov) {
        document.querySelector('.info').innerText = "It's a Tie!";
        music.pause();
        tieSound.play();
        gmov = true;
    }
}



let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gmov) {
            boxtext.innerText = turn;
            turn = changeTurn();
            turna.play();
            music.play();
            checkWin();
            if (!gmov) {
                checkTie(); 
                if (!gmov) {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn+"\n";
                }
            }
        }
    });
});

// Reset game logic
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gmov = false;
    document.querySelector('.info').innerText = "Turn for " + turn+"\n";
    document.querySelector('.imgbox img').style.width = "0px";
    music.play();
    document.querySelectorAll('.winning-line').forEach(line => line.remove()); // Remove existing winning lines
});
