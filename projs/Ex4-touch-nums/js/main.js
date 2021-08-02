'use strict'

var gDiffLevel = 3;
var gNums;
var gCount = 1;
var timeInter;


function init() {
    gNums = resetNums(gDiffLevel);
    renderBoard(gDiffLevel);
}

function cellClicked(elCell) {
    var currClick = elCell.dataset.num;
    if (gCount === +currClick) {
        gCount++;
        elCell.style.backgroundColor = 'black';
        elCell.style.color = 'yellow';
        if (gCount === 2) setTimer();
    }
    if (gCount > gDiffLevel ** 2) isWon();
}

function clickedDiff(elBtn) {
    setDiff(elBtn);
    var elWin = document.querySelector('.win');
    elWin.style.display = 'none';
}

function setDiff(lvl) {
    clearInterval(timeInter);
    updateClock('00:00:00');
    gCount = 1;
    gDiffLevel = +lvl.dataset.row;
    gNums = resetNums(gDiffLevel);
    renderBoard(gDiffLevel);
}

function isWon() {
    clearInterval(timeInter);
    var elWin = document.querySelector('.win');
    elWin.style.display = 'block';
}

function resetNums(num) {
    var nums = [];
    for (var i = 1; i <= num ** 2; i++) {
        nums.push(i);
    }
    shuffle(nums);
    return nums;
}

// function resetNums(numOfRows) {
//     gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
//     if (numOfRows === 3) gNums = gNums.slice(0, 9);
//     if (numOfRows === 4) gNums = gNums.slice(0, 16);
//     if (numOfRows === 5) gNums = gNums.slice(0, 25);
//     shuffle(gNums);
// }

function setTimer() {
    var time1 = Date.now();
    timeInter = setInterval(function() {
        var time2 = Date.now(time1);
        var msTimeDiff = time2 - time1;
        var timeDiffStr = new Date(msTimeDiff).toISOString().slice(14, -2);
        updateClock(timeDiffStr);
    }, 100);
}
// updates the 
function updateClock(timeDiffStr) {
    var elClock = document.querySelector('.clock');
    elClock.innerText = timeDiffStr;
}
// creates a board based on the numOfRows you put in.
function renderBoard(numOfRows) {
    var strHTML = '';
    for (var i = 0; i < numOfRows; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < numOfRows; j++) {
            var num = gNums.shift();
            strHTML += `<td data-num="${num}" onclick="cellClicked(this)"> ${num}</td>`;
        }
        strHTML += '</tr>'
    }
    var elGameBoard = document.querySelector('.game-board');
    elGameBoard.innerHTML = strHTML;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomIntInclusive(0, items.length - 1);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}