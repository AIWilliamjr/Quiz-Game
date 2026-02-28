addEventListener('DOMContentLoaded', (event) => {
  // The questions need to be in random order every time the quiz loads the questions consecutively.
  // To do this I used array method sort on the questionData array to sort it in random order. The sort method will compare 0.5 as a value lower than Math.random.
  questionData.sort((a, b) => 0.5 - Math.random());
  console.log(questionData);
  displayQuestion();
  userScore = 0;
  const form = document.querySelector('#answer-form');
  // form event listenet in which listens out for when the next button has been submitted
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateSubmission();
  });
});

// constant variable named answers assigned to an array of objects in which contain elements with keys/properties named questions, answers & incorrect answers with their own values.
const questionData = [
  {
    // object containing keys/properties
    question: 'What is the most populous group of Animals?',
    answer: 'insects',
    incorrectAnswers: ['fish', 'birds', 'mammals'],
  },
  {
    question: 'What animal did dogs decend from?',
    answer: 'Wolf',
    incorrectAnswers: ['Hyena', 'Fox', 'horse'],
  },
  {
    question: 'What insect has the most amount of legs?',
    answer: 'millipedes',
    incorrectAnswers: ['spider', 'silver-fish', 'centipedes'],
  },
  {
    question: 'How do cats react to fear?',
    answer: 'hide',
    incorrectAnswers: ['run', 'close-eyes', 'growl'],
  },
  {
    question: 'What is the fastest land animal alive?',
    answer: 'Cheetah',
    incorrectAnswers: ['Tiger', 'Coyote', 'Peregrine Falcon'],
  },
  {
    question:
      'Which animal is the most dangerous animal in the ocean to humans?',
    answer: 'Box Jellyfish',
    incorrectAnswers: ['Sword Fish', 'Great White Shark', 'Octopus'],
  },
  {
    question: 'Which is the most intelligent animal in the ocean?',
    answer: 'Bottlenose Dolphin',
    incorrectAnswers: ['Octopus', 'Whale', 'Dolphin'],
  },
  {
    question:
      'A bird of what type communicate with loud, hoarse croaking sound?',
    answer: 'Raven',
    incorrectAnswers: ['Eagle', 'Pigeon', 'Toucan'],
  },
  {
    question: 'Who is the King of the Jungle?',
    answer: 'Lion',
    incorrectAnswers: ['Tiger', 'Gorilla', 'Alligator'],
  },
  {
    question: 'Koala has a relation to this animal?',
    answer: 'Kangaroo',
    incorrectAnswers: ['Squirrel', 'Owl', 'bat'],
  },
];

let questionIndex = 0;
let userScore = 0;
// The user's score need to increment by 1 if the user submitted the right answer or not if the user submit the wrong answer.
// Therefor I created the validate submission function which loops through each checkbox value to check if the user's submission matches the correct answer.
// When the user submit the selected answer the question is changed to the next. The results are then displayed if the index is equals to or have exceeded the total amount of questions
const validateSubmission = () => {
  console.log('inside validate submission');
  const checkedBoxes = document.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  // incrementing the userScore variable value by 1 if the user's submitted answer is the right answer
  checkedBoxes.forEach((inputItem) => {
    var submittedAnswer = inputItem.value;
    var correctAnswer = questionData[questionIndex].answer;
    if (correctAnswer === submittedAnswer) {
      console.log('Correct!');
      userScore++;
    } else {
      console.log('Incorrect!');
    }
  });
  console.log(userScore);
  questionIndex++;

  var totalQuestions = questionData.length;
  // if questionIndex is more than or equals to totalQuestions invoke displayResults() else invoke displayQuestion in the DOM
  if (questionIndex >= totalQuestions) {
    return displayResults();
  } else {
    return displayQuestion();
  }
};

// This function displays the result if the question index has reached or gone over max capacity.
const displayResults = () => {
  document.getElementById('answer-form').style.display = 'none'; // set the form element to be displayed
  document.getElementById('results').style.display = 'block'; // set the div element to not be displayed
  const results = document.getElementById('user-score');
  results.textContent = userScore;
};

// I want to prevent the user from selecting multiple checkboxes at once. Although I could have used radio buttons I decide to do it with checkboxes.
// To do this I created a function which listens out for a change everytime 1 check box has been selected. This function is then invoked inside of the displayQuestion() function
const addCheckBoxEventListener = () => {
  const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
  // preventing the user from selecting more than 1 checkbox
  allCheckBoxes.forEach((e) => {
    e.addEventListener('change', (event) => {
      const checkedBoxes = document.querySelectorAll(
        'input[type="checkbox"]:checked',
      );
      if (checkedBoxes.length > 1) {
        checkedBoxes.forEach((i) => {
          i.checked = false;
        });
      }
      event.target.checked = true;
    });
  });
};

// questionContainer variable assigned to html id: question-container from animalQuiz html file
var questionContainer = document.getElementById('question-container');

// The displayQuestion() function displays the content of the quiz.
// To make this function work, I retrieved html elements created by their id from the animalQuiz file. Then created new html elements for the content using javascript.
const displayQuestion = () => {
  var section = document.createElement('section');
  const question = document.getElementById('question');
  var currentQuestion = questionData[questionIndex];
  question.textContent = currentQuestion.question;
  var unorderedList = document.getElementById('answers');
  unorderedList.replaceChildren();
  // Using forEach array method to loop through the array's index to add key incorrect answers to the DOM via javascript and appending the children elements to their parents.
  // Finally I appened questionContainer to the children elements built using javascript.
  currentQuestion.incorrectAnswers.forEach((a) => {
    var listItem = document.createElement('li');
    var label = document.createElement('label');
    label.textContent = a;
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', a);
    input.setAttribute('name', 'checkbox-value');
    listItem.appendChild(label);
    listItem.appendChild(input);
    unorderedList.appendChild(listItem);
  });

  var correctAnswer = currentQuestion.answer;
  var listItem = document.createElement('li');
  var label = document.createElement('label');
  label.textContent = correctAnswer;
  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('value', correctAnswer);
  listItem.appendChild(label);
  listItem.appendChild(input);
  unorderedList.appendChild(listItem);

  section.appendChild(question);
  section.appendChild(unorderedList);
  questionContainer.appendChild(section);
  // To add checkbox event listeners again
  addCheckBoxEventListener();
};
