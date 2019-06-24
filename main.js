const cards = document.querySelectorAll('.memoryCard');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    }
    else {
        hasFlippedCard = false;
        secondCard = this;

        console.log(firstCard.dataset.name);
        console.log(secondCard.dataset.name);
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

