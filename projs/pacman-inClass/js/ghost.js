'use strict'

const GHOSTS = [
    '<img class="ghost" src="img/red.jpg" />',
    '<img class="ghost" src="img/brown.jpg" />',
    '<img class="ghost" src="img/pink.jpg" />'
];
const BLUE_GHOST = '<img class="blue-ghost" src="img/blue.jpg" />';

var gGhostImgs = [];
var gGhosts = []
var gIntervalGhosts;

function createGhosts() {
    gGhosts = [];
    createGhost()
    createGhost()
    createGhost()
    gIntervalGhosts = setInterval(moveGhosts, 100000)
}

function createGhost() {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost); // update model
    gBoard[ghost.location.i][ghost.location.j] = getRandGhost(); // update dom
}

function getRandGhost() {
    var randIdx = getRandomIntInt(0, 3);
    var randGHOST = GHOSTS[randIdx]
    gGhostImgs.push(randGHOST);
    return randGHOST;
}

function changeGhosts() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            for (var idx = 0; idx < gGhostImgs.length; idx++) {
                if (currCell === gGhostImgs[idx]) {
                    var ghostLocation = { i, j };
                    gBoard[i][j] = BLUE_GHOST;
                    gGhostImgs[idx] = BLUE_GHOST;
                    renderCell(ghostLocation, BLUE_GHOST);
                }

            }
        }
    }
}

function moveGhosts() {
    if (!gGame.isOn) return;
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var ghostImg = gGhostImgs[i]
        moveGhost(ghost, ghostImg)
    }
}

function moveGhost(ghost, img) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOSTS[0] || nextCell === GHOSTS[1] ||
        nextCell === GHOSTS[2] || nextCell === BLUE_GHOST) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return;
        gameOver();
        return;
    }
    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = img;
    // dom
    renderCell(ghost.location, getGhostHTML(img))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${ghost}</span>`
}