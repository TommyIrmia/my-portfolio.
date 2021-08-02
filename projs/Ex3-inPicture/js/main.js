var gQuests = createQuests();
var gCurrQuestIdx = 0;

function initGame() {
    renderQuest(gCurrQuestIdx);
}

function startGame(elBtn) {
    elBtn.style.display = 'none';
    if (gCurrQuestIdx === gQuests.length) gCurrQuestIdx = 0;
    if (gCurrQuestIdx === 0) nextQuest();
}

function gameWon() {
    var elImg = document.querySelector('div img');
    elImg.src = 'imgs/5.jpg';

    var elAnswers = document.querySelectorAll('.answer');
    elAnswers[0].innerText = 'You';
    elAnswers[1].innerText = 'Won!';

    var elBtn = document.querySelector('h6 button');
    elBtn.style.display = 'block';
    elBtn.innerText = 'Replay?'
}

function nextQuest() {
    gCurrQuestIdx++;
    if (gCurrQuestIdx > 4) gameWon();
    else renderQuest(gCurrQuestIdx);
}

function checkAnswer(ansIdx, optIdx) {
    if (+ansIdx === optIdx) nextQuest();

}

function clickedAnswer(elAnswer) {
    var elAnswerIdx = elAnswer.dataset.answer;
    var currQuestOpt = gQuests[gCurrQuestIdx].correctOptIndex;
    checkAnswer(elAnswerIdx, currQuestOpt + 1);
};

function renderQuest(currQuest) {
    var elGameBoard = document.querySelector('.game-board');
    renderImg(currQuest, elGameBoard);

    var strHTML = '';
    var questOpts = gQuests[currQuest].opts;

    for (var i = 0; i < questOpts.length; i++) {
        if (currQuest === 0) continue;
        var currAnswer = questOpts[i];
        strHTML += `<div class="answer" data-answer="${i + 1}" onclick="clickedAnswer(this)">${currAnswer}</div>`;
    }
    elGameBoard.innerHTML += strHTML;
}

function renderImg(currQuest, elGameBoard) {
    strHTML = '';
    strHTML += `<div> <img src="imgs/${currQuest}.jpg"/></div>`;
    elGameBoard.innerHTML = strHTML;
}

function createQuests() {
    return [
        { id: 0, opts: ['want to play?', 'press START!'] },
        { id: 1, opts: ['A ducklin with an AFRO.', 'A dog wearing glasses.'], correctOptIndex: 0 },
        { id: 2, opts: ['A giraffe eating icecream.', 'A cat wearing sunglasses.'], correctOptIndex: 1 },
        { id: 3, opts: ['A frog catching a fly.', 'A penguin doing a DAB.'], correctOptIndex: 1 },
        { id: 4, opts: ['A dog wearing glasses.', 'A bird flying backwards.'], correctOptIndex: 0 }
    ];
}