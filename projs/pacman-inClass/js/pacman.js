'use strict'
var PACMAN = '<img class="pacman" src="img/pacman.png" />';

var gWin = false;
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        checkIfWin();
    } else if (nextCell === POWERFOOD) {
        updateScore(1);
        changeGhosts();
        gPacman.isSuper = true;
        setTimeout(reviveGhosts, 5000)
    } else if (nextCell === CHERRY) {
        updateScore(10);
    } else if (nextCell === GHOSTS[0] || nextCell === GHOSTS[1] || nextCell === GHOSTS[2]) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    // works only on BLUEGHOSTS. and removes them from the array.
    eatGhost(nextLocation);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);
}

function eatGhost(nextLocation) {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        if (nextLocation.i === gGhosts[idx].location.i &&
            nextLocation.j === gGhosts[idx].location.j) {
            if (gGhosts[idx].gameElement === FOOD) updateScore(1);
            gGhosts.splice(idx, 1);
            gGhostImgs.shift(idx, 1);
        }
    }
}

function reviveGhosts() {
    gPacman.isSuper = false;
    var numOfGhosts = gGhosts.length;
    var diff = 3 - numOfGhosts;
    console.log('diff', diff);

    for (var i = 0; i < numOfGhosts; i++) {
        var currGhostLoc = gGhosts[i].location;
        var randGhost = GHOSTS[getRandomIntInt(0, 3)];
        gGhostImgs[i] = randGhost;
        gBoard[currGhostLoc.i][currGhostLoc.j] = randGhost;
        renderCell(currGhostLoc, randGhost)
    }

    for (var i = 0; i < diff; i++) {
        createGhost();
        var newGhost = gGhosts[numOfGhosts - 1];
        renderCell(newGhost.location, gGhostImgs[getRandomIntInt(0, 3)]);
    }

    var blueGhosts = document.querySelectorAll('.blue-ghost');
    console.log(blueGhosts);
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PACMAN = '<img class="pacman-up" src="img/pacman.png" />';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PACMAN = '<img class="pacman-down" src="img/pacman.png" />';
            break;
        case 'ArrowLeft':
            PACMAN = '<img class="pacman-left" src="img/pacman.png" />';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            PACMAN = '<img class="pacman-right" src="img/pacman.png" />';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function checkIfWin() {
    if (gFoodCount !== gGame.score + 1) return;
    gWin = true;
    openModal();
    gGame.isOn = false;
}