const cards = document.querySelectorAll('.memoryCard');
window.addEventListener("load", shuffle);
document.getElementById("startGame").addEventListener('click', removeIntro);

let werewolvesDiv = document.getElementById("werewolvesCount");
let villagersDiv = document.getElementById("villagersCount");
let lossScreen = document.getElementById("gameover");
let winScreen = document.getElementById("victory")
let intro = document.getElementById("Intro");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let secondTurn = false;
let WerewolfCount = 0;
let VillagerCount = 0;

cards.forEach(card => card.addEventListener('click', flipCard));

function removeIntro() {
    intro.style.display = "none";
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
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
    }
    else {
        unflipCards();
        checkTurn();
    }
    checkGameOver();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    secondTurn = false;
    countWerewolves();
    countVillagers();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
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
        setTimeout(shuffle, 1300);
        secondTurn = false;
    }
    if (!secondTurn) {
        secondTurn = true;
    }
}

function countWerewolves() {
    if (firstCard.dataset.name === "Werewolf") {
        WerewolfCount += 1;
        werewolvesDiv.innerHTML = WerewolfCount;
    }
}

function countVillagers() {
    if (firstCard.dataset.name === "Villager") {
        VillagerCount += 1;
        villagersDiv.innerHTML = VillagerCount;
    }
}

function checkGameOver() {
    if (VillagerCount === 5) {
        lossScreen.style.display = 'flex';
        cards.forEach(card => card.classList.toggle('flip'));
    }
    if (WerewolfCount === 3) {
        winScreen.style.display = 'flex';
        cards.forEach(card => card.classList.toggle('flip'));
    }
}