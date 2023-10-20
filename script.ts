const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

const memoryGame = document.querySelector('.memory-game') as HTMLDivElement;

let flippedCards: HTMLDivElement[] = [];
let canFlip = true;
let matches = 0;

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function restartGame() {
    shuffledCards = [...cards];
    shuffleArray(shuffledCards);

    const existingCards = document.querySelectorAll('.card');
    existingCards.forEach(card => card.remove());

    matches = 0;
    flippedCards = [];
    canFlip = true;

    for (const cardValue of shuffledCards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.addEventListener('click', () => flipCard(card));
        memoryGame.appendChild(card);
    }
}

let shuffledCards: string[] = [];
restartGame();

function flipCard(card: HTMLDivElement) {
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
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches += 2;
    } else {
        setTimeout(() => {
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
