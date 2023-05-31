const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'chatgpt',
    'css',
    'html',
    'javascript',
    'nodejs',
    'php',
    'python',
    'reactnative',
    'sql',
    'visualstudio',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondtCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled_card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML} seu tempo foi de ${timer.innerHTML} segundos!`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondtCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled_card');
        secondtCard.firstChild.classList.add('disabled_card');

        firstCard = '';
        secondtCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal_card');
            secondtCard.classList.remove('reveal_card');

            firstCard = '';
            secondtCard = '';

        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal_card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal_card');
        firstCard = target.parentNode;

    } else if (secondtCard === '') {

        target.parentNode.classList.add('reveal_card');
        secondtCard = target.parentNode;

        checkCards();

    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage = `url('../imagens/${character}.jpeg')`;
    
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
  
    return card;
  }

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);
    })

}

const startTimer = () => {

    this.loop =  setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  
  }

onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame(); 
}