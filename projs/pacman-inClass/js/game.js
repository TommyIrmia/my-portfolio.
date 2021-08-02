'use strict'
const WALL = '#'
const FOOD = 'º'
const EMPTY = ' ';
const POWERFOOD = '🥦';
const CHERRY = '🍒';

var gCherryInter;
var gFoodCount = 0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}


function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gCherryInter = setInterval(renderCherry, 15000)
    gGame.isOn = true
}

function renderCherry() {
    var emptyCells = getEmptyCells(gBoard);
    if (!emptyCells.length) return;
    var randIdx = getRandomIntInt(0, emptyCells.length);
    var randLocation = emptyCells[randIdx];
    gBoard[randLocation.i][randLocation.j] = CHERRY;
    renderCell(randLocation, CHERRY);
    gFoodCount += 10;
}

function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) {
                var location = { i, j };
                emptyCells.push(location);
            }
        }
    }
    return emptyCells;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if ((i === 1 && j === 1) || (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = POWERFOOD;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    openModal();
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInter);
}

function openModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    elModal.innerHTML = (gWin) ? '<button onclick="startAgain()">Play Again!</button>Victor!' :
        '<button onclick="startAgain()">Play Again!</button>LOSER!';
}

function startAgain() {
    init()
    updateScore(gGame.score = 0);
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}