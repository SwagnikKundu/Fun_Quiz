let score = 0;
let questionNo = 0;
let quesJSON = null;
let seconds =30;
let timer;

// Fetched Elements
const questionEl = document.querySelector('#question');
const optionsEl = document.querySelector('#options');
const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');
const startEl = document.querySelector('#start-button');
const startGameEl = document.querySelector('#start-game');


// Fetching JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    quesJSON = data; // Saving JSON as object

    timerEl.textContent = `Time left: ${seconds}`;
    
    // Show Question
    function showQuestion() {
      const { correctAnswer, question, options } = quesJSON[questionNo];

      questionEl.textContent = question;
      let suffledOptions = suffleOptions(options);
      suffledOptions.forEach(opt => {
        const btnEl = document.createElement('button');
        btnEl.textContent = opt;
        optionsEl.appendChild(btnEl);

        btnEl.addEventListener("click", () => {
          if (opt === correctAnswer) {
            score++;
          } else {
            score = score - 0.25;
          }
          scoreEl.textContent = `Score : ${score}`;
          nextQuestion();
        });
      });
    }

    //Suffle questions
    function shuffleQuestions() {
      for (let i = quesJSON.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [quesJSON[i], quesJSON[j]] = [quesJSON[j], quesJSON[i]];
      }
    }


    // Next Question
    function nextQuestion() {
      questionNo++;
      optionsEl.textContent = '';
      if (questionNo >= quesJSON.length) {
        endGame();
      } else {
        showQuestion();
      }
    }

    // Shuffle Options
    function suffleOptions(options) {
      for (let i = options.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * i + 1)
        console.log(j);
        [options[i], options[j]] = [options[j], options[i]];
      }

      return options;
    }


    startEl.addEventListener('click', () => {
      score = 0; // Reset score
      questionNo = 0; // Reset question number
      seconds = 30; // Reset timer
      scoreEl.textContent = `Score : ${score}`; // Update score display
      timerEl.textContent = `Time left: ${seconds}`; // Update timer display
      showQuestion();
      startTimer();
      startEl.setAttribute('style', 'display:none');
  });
      
    


    function startTimer(){
      timer= setInterval(() => {
        seconds--;
        timerEl.textContent = `Time left: ${seconds}`;
        if(seconds<=0){
          endGame();
        }

      },1000);
    }

    function endGame(){
      clearInterval(timer);
      questionEl.textContent = 'Quiz Completed!!';
      optionsEl.textContent = '';
      startEl.setAttribute('style','display:block,text-align: center');
      startEl.textContent='Restart';
    }
  })
  .catch(error => console.error('Error fetching JSON:', error));
