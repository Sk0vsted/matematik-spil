document.addEventListener('DOMContentLoaded', function () {
  const operators = ['+', '-', '*', '/'];
  const easyOperators = ['+', '-'];
  let correctAnswer = 0;
  let currentOperator = '';

  // Start spil knap
  let start = document.querySelector('.start-btn');
  let game = document.querySelector('.game');

  start.addEventListener('click', function () {
    start.style.display = 'none';
    game.style.display = 'flex';
  });

  // Generer opgave baseret på sværhedsgrad
  function generateProblem() {
    const problemType = document.getElementById('problemType').value; // Hent sværhedsgraden
    let numRange = problemType === 'easy' ? 10 : 100; // Sæt talområdet via ternary
    let ops = problemType === 'easy' ? easyOperators : operators; // Vælg operatorer
    let num1 = Math.floor(Math.random() * numRange);
    let num2 = Math.floor(Math.random() * numRange);
    let operator = ops[Math.floor(Math.random() * ops.length)];
    let problem = `${num1} ${operator} ${num2}`;
    currentOperator = operator; // Gem den aktuelle operator
    correctAnswer = evaluateExpression(problem); // Beregn det korrekte svar
    return problem;
  }

  // Funktion til at evaluere et matematisk udtryk
  function evaluateExpression(expression) {
    return Function(`return ${expression}`)(); // Beregn og returner resultatet
  }

  // Vis regnestykke
  function visProblem() {
    const problem = generateProblem(); // Generer et nyt problem
    document.getElementById('problem').textContent = problem; // Vis problemet i DOM'en
  }

  // Tjek brugerens svar
  function checkAnswer() {
    let userAnswer = parseFloat(document.getElementById('userAnswer').value);
    const feedback = document.getElementById('feedback');
    let scoreElement = document.getElementById('score');
    let score = parseInt(scoreElement.textContent);

    if (isNaN(userAnswer)) {
      feedback.textContent = 'Indtast venligst et gyldigt tal.';
      feedback.style.color = 'red';
      return;
    }

    // Håndter division med afrunding til 2 decimaler
    if (currentOperator === '/') {
      userAnswer = parseFloat(userAnswer.toFixed(2));
      correctAnswer = parseFloat(correctAnswer.toFixed(2));
    }

    let difference = Math.abs(userAnswer - correctAnswer); // Beregn forskellen

    // Giv feedback baseret på hvor tæt brugerens svar er på det korrekte svar
    if (difference <= 0.01) {
      feedback.textContent = `Fantastisk! Du ramte præcist det rigtige svar, som var ${correctAnswer}!`;
      feedback.style.color = 'green';
      score += 1; // Øg scoren med 1
      visProblem(); // Generer et nyt regnestykke
    } else if (difference <= 2) {
      feedback.textContent = `Meget tæt på! Du gættede ${userAnswer}, som er næsten korrekt. Prøv igen.`;
      feedback.style.color = 'orange';
    } else if (difference <= 5) {
      feedback.textContent = `Du er ikke langt væk. Du gættede ${userAnswer}, som kun er en smule fra. Det rigtige svar er tættere på, end du tror!`;
      feedback.style.color = 'orange';
    } else if (difference <= 10) {
      feedback.textContent = `Hmm... Du gættede ${userAnswer}, som er et stykke væk. Overvej at regne det igennem igen.`;
      feedback.style.color = 'red';
      score -= 1; // Reducer scoren med 1
    } else {
      feedback.textContent = `Dit svar er desværre langt fra det rigtige. Du skal regne det igennem igen, eller generere en ny, hvis du synes det er for svært.`;
      feedback.style.color = 'red';
      score -= 1; // Reducer scoren med 1
    }

    scoreElement.textContent = score; // Opdater scoren i DOM'en
    document.getElementById('userAnswer').value = ''; // Ryd inputfeltet
  }

  // Event listeners
  document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
  document.getElementById('newProblem').addEventListener('click', visProblem);
  document.getElementById('problemType').addEventListener('change', visProblem);

  visProblem(); // Generer første regnestykke ved sideindlæsning
});
