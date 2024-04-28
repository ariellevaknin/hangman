let line = document.getElementById('line');
let container = document.getElementById('container');
let hangman = document.getElementById('hangman');
let loading = document.getElementById('loading');
let hint = document.getElementById('hint');
let keys = document.getElementsByClassName('key')
let hintDef = document.getElementById('definition');
let defContainer = document.getElementById('definition-container');
let hintButton = document.getElementById('hint-button');
let playWin = document.getElementById('play-win');
let playLose = document.getElementById('play-lose');
let playHome = document.getElementById('play-home');
let playRules = document.getElementById('play-rules');
let homeWin = document.getElementById('home-win');
let homeLose = document.getElementById('home-lose');
let homeRules = document.getElementById('home-rules');
let rulesWin = document.getElementById('rules-win');
let rulesLose = document.getElementById('rules-lose');
let rulesHome = document.getElementById('rules-home');
let wordRevealWin = document.getElementById('word-reveal-win');
let wordRevealLose = document.getElementById('word-reveal-lose');
let homeContainer = document.getElementById('home-container');
let winContainer = document.getElementById('win-container');
let loseContainer = document.getElementById('lose-container');
let winLoseContainer = document.getElementById('win-lose-container');
let rulesContainer = document.getElementById('rules-container');
let body = document.body;

let word;
let definition;
let guesses = 0;
let str = '';

const keyboard = "QWERTYUIOPASDFGHJKLZXCVBNM";

for (let i = 0; i < keyboard.length; i++) {
    const key = keyboard[i];
    const element = document.getElementById(key);
    
    element.addEventListener("click", function() {
        element.style.backgroundColor = 'purple';
        check(key);
    });
}

const randomWord = async function getRandomWordWithLength() {
    const apiKey = '419e69b2c3mshe18bfe3df7b0042p131cebjsn95581295c9a3';
    const url = `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=4&lettersMax=8`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    });
    const data = await response.json();

    if (data.frequency >= 4 && data.results[0].synonyms !== undefined) {
       word = data.word;
       definition = data.results[0].definition;
       return data.word
    } else {
       return getRandomWordWithLength();
    }
}

function startGame(word) {
    guesses = 0;
    str = '';
    container.style.display = 'flex';
    hangman.style.backgroundImage = '';
    hangman.style.display = 'flex';
    body.style.display = 'flex';
    loading.style.display = 'none';
    hint.style.display = 'flex';
    hintDef.style.display = 'none';
    defContainer.style.display = 'none';

    for (let i = 0; i < keys.length; i++) {
        keys[i].style.backgroundColor = '#f39cf2';
    }
    
    letters(word);
}

function letters(word) {
    for (let i = 0; i < word.length; i++) {
        let letter = document.createElement('div');
        letter.classList.add('letter');
        letter.textContent = '_'
        line.appendChild(letter);
    }
}

function check(l) {
    line.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() === l.toUpperCase() || str.includes(word[i].toUpperCase())) {
            let letter = document.createElement('div');
            letter.classList.add('letter');
            letter.classList.add('letter-animation');
            letter.textContent = word[i].toUpperCase();
            line.appendChild(letter);

            if (!str.includes(l.toUpperCase()) && word[i].toUpperCase() === l.toUpperCase()) {
               str += l.toUpperCase();
            }

            winCheck(word.length);
        } else {
            let letter = document.createElement('div');
            letter.classList.add('letter');
            letter.textContent = '_'
            line.appendChild(letter);
        }
    }
   
    if (!str.includes(l)) {
        guesses++; 
        hangmanGuy();
    }
}

function hangmanGuy() {
    switch (guesses) {
        case 1: 
        hangman.style.backgroundImage = 'url(hangman-1.jpg)'
        break;
        case 2: 
        hangman.style.backgroundImage = 'url(hangman-2.jpg)'
        break;
        case 3: 
        hangman.style.backgroundImage = 'url(hangman-3.jpg)'
        break;
        case 4: 
        hangman.style.backgroundImage = 'url(hangman-4.jpg)'
        break;
        case 5: 
        hangman.style.backgroundImage = 'url(hangman-5.jpg)'
        break;
        case 6: 
        hangman.style.backgroundImage = 'url(hangman-6.jpg)'
        break;
        case 7: 
        hangman.style.backgroundImage = 'url(hangman-7.jpg)'
        break;
        case 8: 
        hangman.style.backgroundImage = 'url(hangman-8.jpg)'
        break;
        case 9: 
        hangman.style.backgroundImage = 'url(hangman-9.jpg)'
        break;
        case 10: 
        hangman.style.backgroundImage = 'url(hangman-10.jpg)'
        break;
        case 11: 
        lose();
        break;
    }
}

function winCheck(n) {
    let num = 0;
    for (let i = 0; i < word.length; i++) {
        if (str.includes(word[i].toUpperCase())) {
            num++
        }
    }

    if (n === num) {
        win();
    }
}

hint.addEventListener('click', function() {
  hint.style.display = 'none';
  hintDef.style.display = 'flex';
  defContainer.style.display = 'flex';
  hintDef.textContent = 'Definition: ' + definition;
})

hintButton.addEventListener('click', function() {
    hint.style.display = 'flex';
    hintDef.style.display = 'none';
    defContainer.style.display = 'none';
})

function win() {
    line.innerHTML = '';
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'flex';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'none';
    wordRevealWin.textContent = 'The word was: ' + word.toUpperCase();
}

function lose() {
    line.innerHTML = '';
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'flex';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'none';
    wordRevealLose.textContent = 'The word was: ' + word.toUpperCase();
}

playWin.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'none';
    rulesContainer.style.display = 'none';
    loading.style.display = 'flex';

   randomWord()
    .then((word) => {
        startGame(word);
    })
    .catch((error) => {
        randomWord().then((word) => {
            startGame(word);
        })
    }) 
})

playLose.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'none';
    rulesContainer.style.display = 'none';
    loading.style.display = 'flex';

   randomWord()
    .then((word) => {
        startGame(word);
    })
    .catch((error) => {
        randomWord().then((word) => {
            startGame(word);
        })
    }) 
})

playHome.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'none';
    rulesContainer.style.display = 'none';
    loading.style.display = 'flex';

   randomWord()
    .then((word) => {
        startGame(word);
    })
    .catch((error) => {
        randomWord().then((word) => {
            startGame(word);
        })
    }) 
})

playRules.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'none';
    rulesContainer.style.display = 'none';
    loading.style.display = 'flex';

   randomWord()
    .then((word) => {
        startGame(word);
    })
    .catch((error) => {
        randomWord().then((word) => {
            startGame(word);
        })
    }) 
})

homeWin.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'flex';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'none';
})

homeLose.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'flex';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'none';
})

homeRules.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'flex';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'none';
})

rulesWin.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'flex';
})

rulesLose.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'flex';
})

rulesHome.addEventListener('click', function() {
    container.style.display = 'none';
    hangman.style.display = 'none';
    homeContainer.style.display = 'none';
    winContainer.style.display = 'none';
    loseContainer.style.display = 'none';
    winLoseContainer.style.display = 'flex';
    rulesContainer.style.display = 'flex';
})