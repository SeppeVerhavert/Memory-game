const cards = document.querySelectorAll('.memoryCard');
window.addEventListener("load", shuffle);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let secondTurn = false;
let WerewolfCount = 0;
let VillagerCount = 0;

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
        countWerewolves();
        countVillagers();
    }
    else {
        unflipCards();
        checkTurn();
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
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
    secondTurn = false;
}

function checkTurn() {
    if (secondTurn) {
        setTimeout(shuffle, 2000);
        secondTurn = false;
    }
    if (!secondTurn) {
        secondTurn = true;
    }
}

function countWerewolves() {
    if (firstCard.dataset.name === "Werewolf") {
        WerewolfCount += 1;
        document.getElementById('werewolvesCount').innerHTML = WerewolfCount;
    }
}

function countVillagers() {
    if (firstCard.dataset.name === "Villager") {
        VillagerCount += 1;
        document.getElementById('villagersCount').innerHTML = VillagerCount;
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));