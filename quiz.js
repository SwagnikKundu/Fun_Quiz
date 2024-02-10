let score = 0;
let questionNo = 0;
let quesJSON = null;

// Fetched Elements
const questionEl = document.querySelector('#question');
const optionsEl = document.querySelector('#options');
const scoreEl = document.querySelector('#score');

// Fetching JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    quesJSON = data; // Saving JSON as object

    showQuestion(); // Proceeding with the rest of the script

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

    // Next Question
    function nextQuestion() {
      questionNo++;
      optionsEl.textContent = '';
      if (questionNo >= quesJSON.length) {
        questionEl.textContent = 'Quiz Completed!!';
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
  })
  .catch(error => console.error('Error fetching JSON:', error));
