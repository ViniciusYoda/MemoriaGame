var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var memoryGame = document.querySelector('.memory-game');
var flippedCards = [];
var canFlip = true;
var matches = 0;
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function restartGame() {
    shuffledCards = __spreadArray([], cards, true);
    shuffleArray(shuffledCards);
    var existingCards = document.querySelectorAll('.card');
    existingCards.forEach(function (card) { return card.remove(); });
    matches = 0;
    flippedCards = [];
    canFlip = true;
    var _loop_1 = function (cardValue) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.addEventListener('click', function () { return flipCard(card); });
        memoryGame.appendChild(card);
    };
    for (var _i = 0, shuffledCards_1 = shuffledCards; _i < shuffledCards_1.length; _i++) {
        var cardValue = shuffledCards_1[_i];
        _loop_1(cardValue);
    }
}
var shuffledCards = [];
restartGame();
function flipCard(card) {
    if (!canFlip || card.classList.contains('matched') || flippedCards.length >= 2 || card.classList.contains('flipped')) {
        return;
    }
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkForMatch, 1000);
    }
}
function checkForMatch() {
    var firstCard = flippedCards[0], secondCard = flippedCards[1];
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches += 2;
    }
    else {
        setTimeout(function () {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }, 300);
    }
    flippedCards = [];
    canFlip = true;
    if (matches === shuffledCards.length) {
        alert('Parabéns! Você venceu o jogo da memória.');
        restartGame();
    }
}
