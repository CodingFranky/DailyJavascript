import quizData from './quizData.js';

document.querySelector('.start').addEventListener('click', startQuiz)



function startQuiz() {
  const total_question = quizData.length
  let current_question = 1;
  let submit = false;
  let answered = false;
  let correctAnswer = -1;
  let response = -1;


  document.querySelector('.start').classList.add('hidden')
  document.querySelector('.response').innerHTML = `<button class="btn prev">Previous</button><button class="btn next">Next</button><button class="btn submit">Submit</button>`


  document.querySelector('.question').addEventListener('click', selectOption)

  document.querySelector('.submit').addEventListener('click', submitAnswer)

  document.querySelector('.prev').addEventListener('click', () => {
    if (current_question !== 1) {
      current_question = current_question - 1
      GoToQuestion(current_question)

    }
  })
  document.querySelector('.next').addEventListener('click', () => {
    if (current_question !== total_question) {
      current_question = current_question + 1
      GoToQuestion(current_question)

    }
    else displayScore()
  })

  function selectOption(e) {

    if (answered) {
      document.querySelector('.selected').classList.remove("selected")
      answered = false
    }
    if (e.target.className === 'option') {
      e.target.classList.add("selected");
      answered = true;
    }
  }
  function submitAnswer() {
    submit = true;

    if (answered) {
      correctAnswer = quizData[current_question - 1].correctAnswer

      response = parseInt(document.querySelector('.selected').getAttribute('id'))

      quizData[current_question - 1].response = response
      document.querySelector('.question').removeEventListener('click', selectOption)
      if (correctAnswer === response) {
        quizData[current_question - 1].score = 1
      }
      else {

        quizData[current_question - 1].score = 0

      }
    }
    else {
      if (!response)
        alert("Please select an option")
      else
        alert("Already Answer submitted !")
    }

    document.getElementById(`${response}`)?.classList.add("answered")

    document.getElementById(`${correctAnswer}`)?.classList.add("correct")
  }
  function GoToQuestion(current_question) {
    answered = false;
    displayEachQuestion(quizData[current_question - 1])
    console.log(response, correctAnswer, current_question - 1)
    if (quizData[current_question - 1].response !== undefined) {
      document.getElementById(`${quizData[current_question - 1].response}`)?.classList.add("answered")
      document.getElementById(`${quizData[current_question - 1].correctAnswer}`)?.classList.add("correct")

    }

    if (quizData[current_question - 1].score === undefined) {

      document.querySelector('.question').addEventListener('click', selectOption)
      answered = false;
      submit = false;
    }
    else {
      document.querySelector('.question').removeEventListener('click', selectOption)
    }

  }

  displayEachQuestion(quizData[current_question - 1]);
}

function displayEachQuestion(item) {
  const string = `<div class="title">${item.question}</div>
      <div class="option" id="0">A. ${item.answers[0]}</div>
      <div class="option" id="1">B. ${item.answers[1]}</div>
      <div class="option" id="2">C. ${item.answers[2]}</div>
      <div class="option" id="3">D. ${item.answers[3]}</div>`
  document.querySelector('.question').innerHTML = string
}
function displayScore() {
  document.querySelector('.response').innerHTML = ''

  let score = quizData.reduce((acc, curr) => acc + (curr.score === undefined ? 0 : curr.score), 0)
  document.querySelector('.question').innerHTML = `Your Score is ${score} <br/>
  <button class="btn start">Click to Start Quiz</button>`
  // document.querySelector('.start').classList.add('hidden')
  document.querySelector('.start').classList.remove('hidden')
  document.querySelector('.start').addEventListener('click', () => window.location.reload())
}



