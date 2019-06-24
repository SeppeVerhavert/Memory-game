const cards = document.querySelectorAll('.memoryCard');

function flipCard() {
    this.classList.toggle('flip')
}

cards.forEach(card => card.addEventListener('click', flipCard));

