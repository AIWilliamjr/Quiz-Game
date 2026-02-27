// constant variable named answers assigned to an array of objects in which contain elements with keys/properties named questions, answers & incorrect answers with their own values.
const questionData = [ 
    { // object containing keys/properties 
        'question': 'What is the most populous group of Animals?',
        'answer': 'insects',
        'incorrectAnswers': ['fish', 'birds', 'mammals']
    },
    {
        'question': 'What animal did dogs decend from?',
        'answer': 'Wolf',
        'incorrectAnswers': ['Hyena','Fox', 'horse']
    },
    {
        'question': 'What insect has the most amount of legs?',
        'answer': 'millipedes',
        'incorrectAnswers': ['spider', 'silver-fish', 'centipedes']
    },
    {
        'question': 'How do cats react to fear?',
        'answer': 'hide', 
        'incorrectAnswers': ['run', 'close-eyes','growl']
    },
    {
        'question': 'What is the fastest land animal alive?',
        'answer': 'Cheetah',
        'incorrectAnswers': ['Tiger', 'Coyote', 'Peregrine Falcon']
    },
    {
        'question': 'Which animal is the most dangerous animal in the ocean to humans?',
        'answer': 'Box Jellyfish',
        'incorrectAnswers': ['Sword Fish', 'Great White Shark', 'Octopus']
    },
    {
        'question': 'Which is the most intelligent animal in the ocean?',
        'answer': 'Bottlenose Dolphin',
        'incorrectAnswers': ['Octopus', 'Whale', 'Dolphin']
    },
    {
        'question': 'A bird of what type communicate with loud, hoarse croaking sound?',
        'answer': 'Raven',
        'incorrectAnswers': ['Eagle', 'Pigeon', 'Toucan']
    },
    {
        'question': 'Who is the King of the Jungle?',
        'answer': 'Lion',
        'incorrectAnswers': ['Tiger', 'Gorilla', 'Alligator']
    },
    {
        'question': 'Koala has a relation to this animal?',
        'answer': 'Kangaroo',
        'incorrectAnswers': ['Squirrel', 'Owl', 'bat']
    },
]
//const shuffledQuestionData = [];
var questionIndex = 0;
let userScore = 0; 

// questionContainer variable assigned to html id: question-container from animalQuiz html file
var questionContainer = document.getElementById('question-container'); 

// Creating and 
const displayQuestion = () => { 
    var section = document.createElement('section'); 
    const question = document.getElementById('question'); 
    var currentQuestion = questionData[questionIndex]; 
    // adding question to html in javascript using textContent method assigned to current question variable appended to the question key/property within answers array
    question.textContent = currentQuestion.question;
    var unorderedList = document.getElementById('answers'); 
    unorderedList.replaceChildren(); 
    // adding incorrect answers to html via javascript appending currentQuestion variable to incorrectAnswers property/key within answers array using forEach() array method
    currentQuestion.incorrectAnswers.forEach(a => {
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
    })
    // adding correct answer to html via javascript
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
    // we need to add checkbox event listeners again
    addCheckBoxEventListener();
}
questionData.sort((a, b) => 0.5 - Math.random());
console.log(questionData);

// displayResults variable assigned to arrow function
const displayResults = () => { 
    document.getElementById('answer-form').style.display = 'none'; 
    document.getElementById('results').style.display = 'block'; 
    const results = document.getElementById('user-score'); 
    results.textContent = userScore; 
}

const validateSubmission = () => {
    console.log('inside validate submission');
     const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        // incrementing the userScore variable value by 1 if the user's submitted answer is the right answer
        checkedBoxes.forEach(inputItem => {
            var submittedAnswer = inputItem.value; 
            var correctAnswer = questionData[questionIndex].answer; 
            if (correctAnswer === submittedAnswer) { 
                console.log('Correct!');
                userScore++;
                }  else {
                console.log('Incorrect!');
                }
            })
        console.log(userScore);
        questionIndex++;

        var totalQuestions = questionData.length; 
        // if questionIndex is more than or equals to totalQuestions invoke displayResults() else invoke displayQuestion
        if (questionIndex >= totalQuestions) {
            return displayResults();
        } else {
            return displayQuestion();
        }
}

    const addCheckBoxEventListener = () => {
        const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
    // preventing the user from selecting more than 1 checkbox
        allCheckBoxes.forEach(e => {
            e.addEventListener('change', (event) => {
                console.log('checkbox checked');
            const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
            if (checkedBoxes.length > 1) {
                console.log('too many checkboxes');
                    checkedBoxes.forEach(i => {
                        i.checked = false;
                    })
                }
                event.target.checked = true; 
            })
        })
    }

    addEventListener("DOMContentLoaded", (event) => { 
        displayQuestion();
        userScore = 0; 
        const form = document.querySelector('#answer-form'); 
        
        form.addEventListener('submit', (event) => { 
            event.preventDefault(); 
            validateSubmission();               
        })   
    })

    
