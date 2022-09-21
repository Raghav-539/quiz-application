// quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// displaying the questions
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();  //question incrementation 

    }
};

// guess answer
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =    `Question ${currentQuestionNumber} `;
};

// show scores
function showScores() {
    let quizEndHTML =
    `<h1>Quiz Completed</h1>
    <h2 class='score'> You scored : ${quiz.score} of ${quiz.questions.length}</h2>
    <h2 class='score'> Your Percentage : ${(quiz.score / 100 )* 1000} % </h2>
    <h2 class='score'> Status : ${quiz.score >= 4 ? 'Pass' : 'Fail' }</h2>
    <h2 class='score'> Correct Answers : ${quiz.score}</h2>
    <h2 class='score'> Wrong Answers : ${quiz.questions.length-quiz.score}</h2>
    <h2 class='score'> Questions Skipped : ${((quiz.score)+(quiz.questions.length-quiz.score)-(quiz.questions.length))}</h2>
    <h2 class='score'> User Name : <span id='username'> </span></h2>
    <h2 class='score'> Father Name: <span id='fname'> </span></h2>
    <h2 class='score'> Registered Email : <span id='regemail'> </span></h2>
    <h2 class='score'> Location : <span id='ulocation'> </span></h2>
    <h2 class='score'> Contact : <span id='contact'> </span></h2>
    <div class="quiz-repeat">
        <a href="./page1.html"> Retry Quiz </a>
        <a href="./page4.html"> Give Feedback </a>
    </div> `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;

    //  printing session storage values 
    document.getElementById("username").innerHTML=sessionStorage.getItem("uname");
    document.getElementById("fname").innerHTML=sessionStorage.getItem("fatherName");
    document.getElementById("regemail").innerHTML=sessionStorage.getItem("email");
    document.getElementById("ulocation").innerHTML=sessionStorage.getItem("location");
    document.getElementById("contact").innerHTML=sessionStorage.getItem("number");

};



// create questions here
let questions = [
    new Question("Inside which HTML element do we put the JavaScript?", ["&lt;script&gt;", "&lt;javascript&gt;", "&lt;js&gt;", "&lt;scripting&gt;"], "&lt;script&gt;"),
    new Question("Where is the correct place to insert a JavaScript?", ["The &lt;head&gt; section", "The &lt;body&gt; section", "Both the &lt;head&gt; section and the &lt;body&gt; section are correct", "None of these"], "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"),
    new Question("What is the correct way to write a JavaScript array?", ["var colors = (1:&quot;red&quot;, 2:&quot;green&quot;, 3:&quot;blue&quot;)", "var colors = 1 = (&quot;red&quot;), 2 = (&quot;green&quot;), 3 = (&quot;blue&quot;)", "var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]", "var colors = &quot;red&quot;, &quot;green&quot;, &quot;blue&quot;"], "var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]"),
    new Question("How do you round the number 7.25, to the nearest integer?", ["rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)"], "Math.round(7.25)"),
    new Question("How do you write &quot;Hello World&quot; in an alert box?", ["alertBox(&quot;Hello World&quot;);", "msgBox(&quot;Hello World&quot;);", "msg(&quot;Hello World&quot;);", "alert(&quot;Hello World&quot;);"], "alert(&quot;Hello World&quot;);"),
    new Question("Which event occurs when the user clicks on an HTML element?", ["onchange", "onmouseclick", "onclick", "onmouseover"], "onclick"),
    new Question("How to write an IF statement in JavaScript?", ["if i = 5 then", "if i == 5 then", " if i = 5", "if (i == 5)"], "if (i == 5)"),
    new Question("Which of the following is a disadvantage of using JavaScript?", ["Client-side JavaScript does not allow the reading or writing of files.", "JavaScript can not be used for Networking applications because there is no such support available.", "JavaScript doesn't have any multithreading or multiprocess capabilities.", "All of the above."], "All of the above."),
    new Question("Which operator is used to assign a value to a variable?", ["*", "-", "=", "+"], "="),
    new Question("How to write an IF statement for executing some code if &quot;i&quot; is NOT equal to 5?", ["if (i <> 5)", "if i <> 5", "if (i != 5)", "if i =! 5 then"], "if (i != 5)"),

];

// intializing quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz

let time = 30;

let quizTimeInSeconds = time * 1 * 1;
let quizTime = quizTimeInSeconds / 1;

// let quizTimeInMinutes = time * 60 * 60;
// let quizTime = quizTimeInMinutes / 60;

// let quizTimeInHours = time * 3600 * 3600;
// let quizTime = quizTimeInHours / 3600;

let counting = document.getElementById("ten-countdown");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME LEFT: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();

// saving form data

function saveInfo()
{
    let uname,fatherName,email,location,number;
    uname = document.getElementById("floatingInputName").value;
    fatherName = document.getElementById("floatingInputFatherName").value; 
    email = document.getElementById("floatingInputEmail").value; 
    location = document.getElementById("floatingInputLocation").value; 
    number = document.getElementById("floatingInputContact").value; 

    sessionStorage.setItem("uname", uname);
    sessionStorage.setItem("fatherName", fatherName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("location", location);
    sessionStorage.setItem("number", number);
}

function submitfeedback()
{
    alert("You response has been saved you can now close the protal.");
}