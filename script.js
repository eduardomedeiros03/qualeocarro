// Banco de dados de países e bandeiras
const countries = [
    { name: "Brasil", flag: "brasil.png" },
    { name: "Estados Unidos", flag: "eua.png" },
    { name: "Canadá", flag: "canada.png" },
    { name: "Japão", flag: "japao.png" },
    // Adicione mais países aqui
];

let score = 0;
let currentCountry = null;

// Elementos DOM
const flagDisplay = document.getElementById('flag-display');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

// Iniciar o jogo
function initGame() {
    score = 0;
    scoreDisplay.textContent = score;
    nextQuestion();
}

// Próxima pergunta
function nextQuestion() {
    // Escolher um país aleatório
    currentCountry = countries[Math.floor(Math.random() * countries.length)];
    
    // Mostrar a bandeira
    flagDisplay.innerHTML = `<img src="assets/flags/${currentCountry.flag}" alt="Bandeira">`;
    
    // Gerar opções de resposta
    const options = generateOptions(currentCountry);
    renderOptions(options);
}

// Gerar opções de resposta
function generateOptions(correctCountry) {
    const options = [correctCountry.name];
    
    // Adicionar 3 opções erradas
    while (options.length < 4) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)].name;
        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }
    
    // Embaralhar as opções
    return options.sort(() => Math.random() - 0.5);
}

// Renderizar opções na tela
function renderOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Verificar resposta
function checkAnswer(selectedOption) {
    if (selectedOption === currentCountry.name) {
        score++;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = "Correto!";
        messageDisplay.style.color = "green";
    } else {
        messageDisplay.textContent = `Errado! A resposta correta era ${currentCountry.name}`;
        messageDisplay.style.color = "red";
    }
    
    // Próxima pergunta após um breve delay
    setTimeout(nextQuestion, 1500);
}

// Iniciar o jogo quando a página carregar
window.onload = initGame;
