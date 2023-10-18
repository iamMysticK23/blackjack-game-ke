// global variables
let cards = []
let acesCount = 0 // to account for case where an Ace can be 1 or 11
let sum = 0
let hasBlackjack = false
let stillInGame = false

//setting a static name and chips/cash
let player = {
    name: "KENAI" ,
    chips: 200
}

let messageEl = document.querySelector("#message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.querySelector("#cards-el")

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips


// startGame() function
function startGame(){
    stillInGame = true
    acesCount = 0
    cards = [getRandomCard(), getRandomCard()]
    sum = cards[0] + cards[1]

    document.getElementById("new-card").disabled = false

    updateUI()
    gameMessage()
}

// getRandomCard() function
function getRandomCard(){
    let randomCard = Math.floor( Math.random() * 13 )  + 1

    if (randomCard > 10) {
        return 10 // accounts for Jacks, Queens and Kings
    } else if (randomCard === 1) {
        acesCount++
        return 11 // accounts for Aces
    } else {
        return randomCard
    }
}

//function to display messages
function gameMessage() {
        if (sum <= 20) {
            message = "Do you want to draw another card? 🤔"
            messageEl.style.background = "rgb(249, 249, 149)"
            messageEl.style.color = "#2f2f2f"
            stillInGame = true
            hasBlackjack = false

        } else if (sum === 21) {
            message = "Blackjack! You win! 🎰"
            hasBlackjack = true
            stillInGame = false
            messageEl.style.background = "rgb(133, 219, 29)"
            messageEl.style.color = "#2f2f2f"
       
        } else {
            message = "Too bad. You lost! 😭"
            stillInGame = false
            hasBlackjack = false
            messageEl.style.background = "rgb(230, 89, 57)"
            messageEl.style.color = "#2f2f2f"
        
         
        }
        messageEl.textContent = message
    }

// draw a new card
function newCard(){
    // check to see if the player is still in the game and does not have blackjack
    if (!stillInGame || hasBlackjack) {
        return
    }

    let card = getRandomCard()
    sum += card
    cards.push(card)

    if (card === 11) {
        messageEl.textContent = "You have an Ace! ♠️"
        messageEl.style.background = "#4d4d4d"
        messageEl.style.color = "white"
    }

    accountForAces()
    updateUI()
    gameMessage()

    if (!stillInGame || hasBlackjack) {
        document.getElementById("new-card").disabled = true
    }

}

// function to account for special case with Aces
function accountForAces() {
    while (sum > 21 && acesCount > 0){
        sum -= 10
        acesCount--
    }
}

// function to update user interface
function updateUI() {
    cardsEl.textContent = "CARDS: " + cards.join(" | ")
    sumEl.textContent = "SUM: " + sum
}


