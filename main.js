const cards = document.querySelectorAll('.memoryCard');
window.addEventListener("load", shuffle);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let secondTurn = false;
// console.log("onload");
// console.log(secondTurn);

function flipCard() {
    if (lockBoard) return;
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        secondTurn = false;
        // console.log("disableCards");
        // console.log("secondTurn = " + secondTurn);
    }
    else {
        unflipCards();
        checkTurn();
        // console.log("unflipCards");
        // console.log("secondTurn = " + secondTurn);
    }   
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1500);
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
    secondTurn = false;
    // console.log("shuffle");
}

function checkTurn() {
    if (secondTurn) {
        setTimeout(shuffle,2000);
        secondTurn = false;
    }

    if (!secondTurn) {
        secondTurn = true;
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));