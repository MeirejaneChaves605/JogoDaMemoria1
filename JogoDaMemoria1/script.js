const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

var gameBoard = document.getElementById('gameBoard')
var loading = document.getElementById('loading')
var contador = 0

async function selecionaTipo() {
    var tipoSelecionado = document.getElementById('tipoSelecionado').value
    await carregarJogo(tempoCarregamento(500))
    verificaSelecionado(tipoSelecionado)
}

async function carregarJogo(promise) {
    apareceGifCarregamento()
    try {
        await promise
    } catch (error) {
        console.log(error)
    } finally {
        someGifCarregamento()
    }
}

function apareceGifCarregamento() {
    if(contador <= 0) {
        loading.style.display = 'flex'
        gameBoard.style.display = 'none'
    } else {
        contador++
    }
}

function someGifCarregamento() {
    if(contador <= 1) {
        loading.style.display = 'none'
        gameBoard.style.display = 'flex'
    }
}

function tempoCarregamento(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo))
}

function startGame() {
    initializeCards(game.createCardsFromTechs(game.techs))
}

function initializeCards(cards) {
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = 'img/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = '&lt / &gt'
    }
    element.appendChild(cardElementFace)
}

function flipCard() {
    if (game.setCard(this.id)) {

        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')
                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }
}

function restart() {
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none'
}

function verificaSelecionado(tipoSelecionado) {

    switch (tipoSelecionado) {
        case 'tecnologias':
            game.techs = ['/tecnologias/bootstrap',
                '/tecnologias/css',
                '/tecnologias/electron',
                '/tecnologias/firebase',
                '/tecnologias/html',
                '/tecnologias/javascript',
                '/tecnologias/jquery',
                '/tecnologias/mongo',
                '/tecnologias/node',
                '/tecnologias/react']

            startGame()
            break

        case 'animais':
            game.techs = ['/animais/leao',
                '/animais/cobra',
                '/animais/onca',
                '/animais/baleia',
                '/animais/cachorro',
                '/animais/gato',
                '/animais/galinha',
                '/animais/elefante',
                '/animais/girafa',
                '/animais/urso']

            startGame()
            break

        case 'flores':
            game.techs = ['/flores/vermelha',
                '/flores/margarida',
                '/flores/cravo',
                '/flores/lotus',
                '/flores/azul',
                '/flores/rosa',
                '/flores/ipes',
                '/flores/branco',
                '/flores/girassol',
                '/flores/colorida']

            startGame()
            break

        case 'famosos':
            game.techs = ['/famosos/caua-reymond',
                '/famosos/paola-bracho',
                '/famosos/mc-kevinho',
                '/famosos/steve-carell',
                '/famosos/will-smith',
                '/famosos/xuxa',
                '/famosos/ivete-sangalo',
                '/famosos/claudia-leitte',
                '/famosos/kim-seon-ho',
                '/famosos/shin-min-a']

            startGame()
            break
    }

}