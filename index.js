import { bjjData } from '/data.js'

const moveRadios = document.getElementById('move-radios')
const getMoveBtn = document.getElementById('get-move-btn')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

moveRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getMoveBtn.addEventListener('click', renderMove)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderMove(){
    const move = getSingleMoveObject()
    // console.log(move)
    // console.log(move.name)
    // console.log(move.image)
    // console.log(move.alt)
    memeModalInner.innerHTML =  `
        <h1 class="move-name"> ${move.name} <h1>
        <iframe class="move-video" width=400" height="315" 
            src="https://www.youtube.com/embed/${move.video_url}" 
            title="YouTube video player" 
            frameborder="0" allow="accelerometer; 
            autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    
        `

    memeModal.style.display = 'flex'
    }

    function getSingleMoveObject(){
        const movesArray = getSelectedMove()
        
        if(movesArray.length === 1){
            return movesArray [0]
        }
        else{
            const randomNumber = Math.floor(Math.random() * movesArray .length)
            return movesArray [randomNumber]
        }
    }
    

function getSelectedMove(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedMove = document.querySelector('input[type="radio"]:checked').value
        // console.log(selectedMove)
        const matchingMovesArray = bjjData.filter(function(move){
            if (move.name === selectedMove) {
                return move
            }
        })

        return matchingMovesArray
        
        }
        
    }

function getMovesArray(moves){
    const movesArray = []    
    for (let move of moves){
        movesArray.push(move)
        }
    // console.log(moves)
    return movesArray
}

function renderMovesRadios(data){
        
    let radioItems = ``
    const moves = getMovesArray(data)
    // console.log(moves)
    for (let move of moves){
        radioItems += `
        <div class="radio">
        
            <img class="move-thumbnails" src="./images/${move.image}">
            <label for="${move.name}">${move.name}</label>
            <input
            type="radio"
            id="${move.name}"
            value="${move.name}"
            name="moves"
            >
           
        </div>`
    }
    moveRadios.innerHTML = radioItems
}

renderMovesRadios(bjjData)
