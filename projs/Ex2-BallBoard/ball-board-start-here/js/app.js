var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/gum.jpg" />';

var gSound = new Audio('sounds/munch.mp3');
var gBoard;
var gGamerPos;
var gBallInter;
var gGluePos;
var gGlueInter;
var gCollectedCount;
var gBallCount;
var gMove = true;

function initGame() {
    gCollectedCount = 0;
    gBallCount = 0
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    gBallInter = setInterval(renderBall, 5000);
    gGlueInter = setInterval(renderGlue, 5000);
}

function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }

            // place floors at passages
            if ((i === 0 && j === 5) || (i === 4 && j === 0) ||
                (i === 9 && j === 5) || (i === 4 && j === 11)) cell.type = FLOOR;
            // Add created cell to The game board
            board[i][j] = cell;
        }
    }

    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;
    gBallCount = 2;

    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            cellClass += (currCell.type === WALL) ? ' wall' : ' floor';
            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i} , ${j})" >\n`;

            switch (currCell.gameElement) {
                case GAMER:
                    strHTML += GAMER_IMG;
                    break;
                case BALL:
                    strHTML += BALL_IMG;
                    break;
                case GLUE:
                    strHTML += GLUE_IMG;
                    break;
            }
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

var randNum2;
var randNum1;

function renderGlue() {
    randNum2 = getRandomIntInclusive(1, 8);
    randNum1 = getRandomIntInclusive(1, 10);
    gGluePos = gBoard[randNum2][randNum1];
    if (isFirstMove()) {
        if (!gGluePos.gameElement) {
            gGluePos.gameElement = GLUE;
            var gluePos = document.querySelector(`.cell-${randNum2}-${randNum1}`);
            gluePos.innerHTML = GLUE_IMG;
            gluePos.style.backgroundColor = 'pink';
        }
    }
    setTimeout(cleanGlue, 3000);
}

function cleanGlue() {
    gGluePos = gBoard[randNum2][randNum1];
    var gluePos = document.querySelector(`.cell-${randNum2}-${randNum1}`);
    gluePos.style.backgroundColor = 'gray';
    if (gGluePos.gameElement === GLUE) {
        gGluePos.gameElement = null;
        gluePos.innerHTML = '';
    }
}

function renderBall() {
    var randNum1 = getRandomIntInclusive(1, 10);
    var randNum2 = getRandomIntInclusive(1, 8);
    var pos = gBoard[randNum2][randNum1];
    if (isFirstMove()) {
        if (!pos.gameElement) {
            gBallCount++
            pos.gameElement = BALL;
            var ballPos = document.querySelector(`.cell-${randNum2}-${randNum1}`);
            ballPos.innerHTML = BALL_IMG;
        }
    }
}

function isFirstMove() {
    if (gGamerPos.i !== 2 || gGamerPos.j !== 9) return true;
}

function toggleMove() {
    gMove = !gMove;

}

// Move the player to a specific location
function moveTo(i, j) {
    // if at passages
    if (gMove) {
        if (i === -1) i = 9;
        if (i === 10) i = 0;
        if (j === 12) j = 0;
        if (j === -1) j = 11;
        var targetCell = gBoard[i][j];
        // console.log(targetCell);
        if (targetCell.type === WALL) return;

        // Calculate distance to make sure we are moving to a neighbor cell
        var iAbsDiff = Math.abs(i - gGamerPos.i);
        var jAbsDiff = Math.abs(j - gGamerPos.j);

        // If the clicked Cell is one of the four allowed
        if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0 ||
                iAbsDiff === 9 || jAbsDiff === 11)) {
            if (targetCell.gameElement === GLUE) {
                toggleMove(targetCell);
                setTimeout(toggleMove, 3000);
            }
            if (targetCell.gameElement === BALL) {
                gSound.play();
                gCollectedCount++;
                gBallCount--;
                updateScore();
                if (gBallCount === 0) winGame();
            }


            // MOVING from current position
            // Model:
            gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
            // Dom:
            renderCell(gGamerPos, '');
            // MOVING to selected position
            // Model:
            gGamerPos.i = i;
            gGamerPos.j = j;
            gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
            // DOM:
            renderCell(gGamerPos, GAMER_IMG);

        } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
    }
}

function winGame() {
    clearInterval(gBallInter);
    clearInterval(gGlueInter);
    toggleMove()
    var elScore = document.querySelector('.score');
    changeHiddenEl(elScore, 'block', `YOU DID IT!!! GRATS!`);
    var elBtn = document.querySelector('button');
    changeHiddenEl(elBtn, 'block', `Restart?`);
}

function restartGame() {
    initGame();
    toggleMove();
    var elScore = document.querySelector('.score');
    changeHiddenEl(elScore, 'none');
    var elBtn = document.querySelector('button');
    changeHiddenEl(elBtn, 'none');
}

function updateScore() {
    var elScore = document.querySelector('.score');
    changeHiddenEl(elScore, 'block', `Balls collected : ${gCollectedCount}`);
}

function changeHiddenEl(el, displayValue, str = '') {
    el.style.display = displayValue;
    el.innerText = str;
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;
    }

}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}