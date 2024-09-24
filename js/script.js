document.addEventListener("DOMContentLoaded", function () {
  const operators = ["+", "-", "*", "/"];
  const easyOperators = ["+", "-"];
  let svar = 0;

  // Generér let opgave
  function generateEasyProblem() {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let operator =
      easyOperators[Math.floor(Math.random() * easyOperators.length)];
    let problem = `${num1} ${operator} ${num2}`;
    svar = evaluateExpression(problem);
    return problem;
  }

  // Generér mellem opgave
  function generateMediumProblem() {
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);
    let operator =
      easyOperators[Math.floor(Math.random() * easyOperators.length)];
    let problem = `${num1} ${operator} ${num2}`;
    svar = evaluateExpression(problem);
    return problem;
  }

  // Generér kompliceret opgave
  function generateComplicatedProblem() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let problem = `${num1} ${operator} ${num2}`;
    svar = evaluateExpression(problem);
    return problem;
  }

  // Generér svær opgave
  function generateHardProblem() {
    let num1 = Math.floor(Math.random() * 1000);
    let num2 = Math.floor(Math.random() * 1000);
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let problem = `${num1} ${operator} ${num2}`;
    svar = evaluateExpression(problem);
    return problem;
  }

  // Funktion til at indsætte én parentes om multiplikationer eller divisioner
  function insertParenteser(problem, operators) {
    const mulOrDivOperators = operators.filter(
      (op) => op === "*" || op === "/"
    );

    // Tjek at alle numre og operatører er gyldige, undgå tomme felter
    if (
      !problem.includes(undefined) &&
      !problem.includes("") &&
      !operators.includes("")
    ) {
      // Hvis der er mindst 1 gang eller division, sæt én korrekt placeret parentes
      if (mulOrDivOperators.length > 0) {
        const randomChoice =
          mulOrDivOperators[
            Math.floor(Math.random() * mulOrDivOperators.length)
          ];

        // Sæt korrekt placerede parenteser rundt om én operation
        if (operators[0] === randomChoice) {
          problem = `(${problem[0]} ${operators[0]} ${problem[1]}) ${operators[1]} ${problem[2]}`;
        } else if (operators[1] === randomChoice && operators.length > 1) {
          problem = `${problem[0]} ${operators[0]} (${problem[1]} ${operators[1]} ${problem[2]})`;
        } else if (operators[2] === randomChoice && operators.length > 2) {
          problem = `${problem[0]} ${operators[0]} ${problem[1]} ${operators[1]} (${problem[2]} ${operators[2]} ${problem[3]})`;
        }
      } else {
        // Byg udtrykket uden parenteser, hvis der ikke er nogen gange eller divisioner
        problem = problem
          .map((num, index) => `${num} ${operators[index] || ""}`)
          .join(" ")
          .trim();
      }
    } else {
      // Hvis et problem er tomt eller mangler, returner en fejl
      console.error("Invalid problem or operator detected.");
      return "Error: Invalid Problem";
    }

    return problem;
  }

  // Generér meget svær opgave
  function generateVeryHardProblem() {
    let num1 = Math.floor(Math.random() * 3000);
    let num2 = Math.floor(Math.random() * 3000);
    let num3 = Math.floor(Math.random() * 3000);
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let operator2 = operators[Math.floor(Math.random() * operators.length)];

    // Lav et array med numre og operatorer
    let problem = [num1, num2, num3];
    let ops = [operator, operator2];

    // Brug funktionen til at indsætte parenteser og bygg en streng til evaluering
    let problemWithParenteser = insertParenteser(problem, ops);

    svar = evaluateExpression(problemWithParenteser);
    return problemWithParenteser;
  }

  // Generér umuligt opgave
  function generateImpossibleProblem() {
    let num1 = Math.floor(Math.random() * 10000);
    let num2 = Math.floor(Math.random() * 10000);
    let num3 = Math.floor(Math.random() * 10000);
    let num4 = Math.floor(Math.random() * 10000);
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let operator2 = operators[Math.floor(Math.random() * operators.length)];
    let operator3 = operators[Math.floor(Math.random() * operators.length)];

    // Lav et array med numre og operatorer
    let problem = [num1, num2, num3, num4];
    let ops = [operator, operator2, operator3];

    // Brug funktionen til at indsætte parenteser og bygg en streng til evaluering
    let problemWithParenteser = insertParenteser(problem, ops);

    svar = evaluateExpression(problemWithParenteser);
    return problemWithParenteser;
  }

  // Evaluer udtrykket korrekt med parenteser
  function evaluateExpression(expression) {
    try {
      return Function(`'use strict'; return (${expression})`)();
    } catch (error) {
      console.error("Error in evaluation:", error);
      return "Error";
    }
  }

  // Vis regnestykke
  function visProblem() {
    let problem = "";
    let problemType = document.getElementById("problemType").value;

    switch (problemType) {
      case "easy":
        problem = generateEasyProblem();
        break;
      case "medium":
        problem = generateMediumProblem();
        break;
      case "complicated":
        problem = generateComplicatedProblem();
        break;
      case "very-hard":
        problem = generateVeryHardProblem();
        break;
      case "extreme":
        problem = generateImpossibleProblem();
        break;
      case "hard":
        problem = generateHardProblem();
        break;
      case "impossible":
        problem = generateImpossibleProblem();
        break;
    }

    document.getElementById("problem").textContent = problem;
  }

  // Evaluer brugerens svar
  function checkAnswer() {
    const brugerSvar = parseFloat(document.getElementById("userAnswer").value);
    const feedback = document.getElementById("feedback");
    const userAnswerInput = document.getElementById("userAnswer"); // Input feltet

    if (isNaN(brugerSvar)) {
      feedback.innerHTML = "Please enter a valid number.";
      feedback.style.color = "red";
      return;
    }

    // Rund både det korrekte svar og brugerens svar til 2 decimaler
    const roundedBrugerSvar = brugerSvar.toFixed(2);
    const roundedSvar = parseFloat(svar).toFixed(2);

    // Tjek om brugeren er meget tæt på (+/- 1 tolerance)
    const tolerance = 1;
    const difference = Math.abs(brugerSvar - svar);

    if (roundedBrugerSvar === roundedSvar) {
      feedback.innerHTML = "Correct answer!";
      feedback.style.color = "#02d302";

      // Ryd inputfeltet, når svaret er tjekket
      userAnswerInput.value = "";

      visProblem(); // Generer nyt problem

      // Generer et nyt problem efter 10 sekunder og fjern feedback
      setTimeout(() => {
        feedback.innerHTML = ""; // Fjern feedback
      }, 10000); // 10 sekunder
    } else if (difference <= tolerance) {
      // Hvis svaret er tæt på det rigtige inden for tolerance
      feedback.textContent =
        "You're very close! Have you checked if the decimals are correct, or needed at all?";
      feedback.style.color = "orange"; // Brug en anden farve for "tæt på"-beskeden
    } else {
      // Hvis svaret er langt fra det rigtige, brug de normale feedbacks
      if (roundedSvar > roundedBrugerSvar) {
        feedback.textContent = `Unfortunately, your answer is incorrect. The answer is higher than ${roundedBrugerSvar}.`;
      } else {
        feedback.textContent = `Unfortunately, your answer is incorrect. The answer is lower than ${roundedBrugerSvar}.`;
      }
      feedback.style.color = "red";
    }

    // Ryd inputfeltet, selvom svaret er forkert eller tæt på
    userAnswerInput.value = "";
  }

  // Lyt efter ENTER-tasten for at tjekke svaret
  document
    .getElementById("userAnswer")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Forhindr standard "form submit"-adfærd
        checkAnswer(); // Tjek svaret, når ENTER trykkes
      }
    });

  // Kald visProblem() ved siden indlæsning og sværhedsgrad ændring
  visProblem();

  document.getElementById("problemType").addEventListener("change", visProblem);

  // Lyt til knappen for at tjekke svaret
  document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

  // Lyt til knappen for at generere et nyt problem
  document.getElementById("newProblem").addEventListener("click", visProblem);
});
