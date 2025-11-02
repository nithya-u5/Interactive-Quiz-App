const startBtn = document.getElementById('startBtn');
const topicsSection = document.getElementById('topics');
const homeSection = document.getElementById('home');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');
const questionText = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const coinsDisplay = document.getElementById('coins');
const restartBtn = document.getElementById('restartBtn');
const totalCoinsDisplay = document.getElementById('totalCoins');
const finalTotalCoins = document.getElementById('finalTotalCoins');
const homeLink = document.getElementById('homeLink');

let currentTopic = '';
let currentQuestionIndex = 0;
let score = 0;
let totalCoins = parseInt(localStorage.getItem('coins')) || 0;
totalCoinsDisplay.textContent = totalCoins;

const quizzes = {
  science: [
    { q: "What planet is known as the Red Planet?", a: "Mars", o: ["Venus", "Earth", "Mars", "Jupiter"] },
    { q: "What gas do plants absorb from the atmosphere?", a: "Carbon Dioxide", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"] },
    { q: "How many bones are in the adult human body?", a: "206", o: ["210", "201", "206", "190"] }
  ],
  history: [
    { q: "Who was the first President of the USA?", a: "George Washington", o: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"] },
    { q: "In which year did World War II end?", a: "1945", o: ["1939", "1945", "1918", "1955"] },
    { q: "Which civilization built the pyramids?", a: "Egyptian", o: ["Greek", "Roman", "Mayan", "Egyptian"] }
  ],
  sports: [
    { q: "How many players are on a football team?", a: "11", o: ["9", "10", "11", "12"] },
    { q: "What sport uses a shuttlecock?", a: "Badminton", o: ["Tennis", "Squash", "Badminton", "Cricket"] },
    { q: "Which country hosted the 2016 Summer Olympics?", a: "Brazil", o: ["China", "UK", "Brazil", "Japan"] }
  ],
  movies: [
    { q: "Who directed 'Inception'?", a: "Christopher Nolan", o: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"] },
    { q: "Which movie features a clown named Pennywise?", a: "IT", o: ["Joker", "IT", "Saw", "Scream"] },
    { q: "What is the highest-grossing film of all time (2024)?", a: "Avatar", o: ["Titanic", "Avengers: Endgame", "Avatar", "Frozen 2"] }
  ],
  technology: [
    { q: "HTML stands for?", a: "HyperText Markup Language", o: ["Hyper Transfer Machine Language", "HighText Machine Learning", "HyperText Markup Language", "Home Tool Markup Language"] },
    { q: "What does CPU stand for?", a: "Central Processing Unit", o: ["Control Power Unit", "Central Processing Unit", "Central Program Utility", "Compute Power Unit"] },
    { q: "Which company developed the iPhone?", a: "Apple", o: ["Samsung", "Apple", "Google", "Microsoft"] }
  ],
  geography: [
    { q: "What is the capital of Japan?", a: "Tokyo", o: ["Kyoto", "Seoul", "Tokyo", "Beijing"] },
    { q: "Which continent is the Sahara Desert located in?", a: "Africa", o: ["Asia", "Australia", "Africa", "South America"] },
    { q: "Mount Everest lies on the border of which two countries?", a: "Nepal and China", o: ["India and Nepal", "China and Tibet", "Nepal and China", "Bhutan and China"] }
  ],
  gk: [
    { q: "Which is the smallest ocean in the world?", a: "Arctic Ocean", o: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"] },
    { q: "Who invented the light bulb?", a: "Thomas Edison", o: ["Alexander Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"] },
    { q: "What is the national flower of India?", a: "Lotus", o: ["Rose", "Jasmine", "Lily", "Lotus"] }
  ]
};

startBtn.onclick = () => {
  homeSection.classList.add('hidden');
  topicsSection.classList.remove('hidden');
};

homeLink.onclick = (e) => {
  e.preventDefault();
  showHome();
};

function showHome() {
  topicsSection.classList.add('hidden');
  quizSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  homeSection.classList.remove('hidden');
}

document.querySelectorAll('.topic').forEach(btn => {
  btn.onclick = () => {
    currentTopic = btn.dataset.topic;
    currentQuestionIndex = 0;
    score = 0;
    topicsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuestion();
  };
});

function loadQuestion() {
  const q = quizzes[currentTopic][currentQuestionIndex];
  questionText.textContent = q.q;
  optionsDiv.innerHTML = '';
  nextBtn.classList.add('hidden');

  q.o.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(btn, q.a);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(button, correct) {
  const allBtns = optionsDiv.querySelectorAll('button');
  allBtns.forEach(b => b.disabled = true);

  if (button.textContent === correct) {
    button.classList.add('correct');
    score += 10;
  } else {
    button.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.textContent === correct) b.classList.add('correct');
    });
  }

  nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizzes[currentTopic].length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  coinsDisplay.textContent = score;
  totalCoins += score;
  localStorage.setItem('coins', totalCoins);
  totalCoinsDisplay.textContent = totalCoins;
  finalTotalCoins.textContent = totalCoins;
}

restartBtn.onclick = () => {
  resultSection.classList.add('hidden');
  topicsSection.classList.remove('hidden');
};
