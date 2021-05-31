var myQuestions = [
    {
        question: "Which one of these is the correct way to comment out code in Javascript?",
        a: "//",
        b: "&lt;!-- --&gt;",
        c: "/* */",
        d: "#",
        correctAnswer: "a"
    },
    {
        question: "Who invented Javascript?",

        a: "Jodie Foster",
        b: "Brendan Eich",
        c: "Guido van Rossum",
        d: "Tim Berners-Lee",
        correctAnswer: "b"
    },
    {
        question: "What html element do you put the Javascript into?",

        a: "&lt;javascript&gt;",
        b: "&lt;code&gt;",
        c: "&lt;script&gt;",
        d: "&lt;js&gt;",
        correctAnswer: "c"
    },
    {
        question: "Where is the correct place to insert Javascript?",
        a: "&lt;head&gt;",
        b: "&lt;body&gt;",
        c: "&lt;footer&gt;",
        d: "Any of the above",
        correctAnswer: "b"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        a: "=",
        b: "*",
        c: "+",
        d: "-",
        correctAnswer: "a"
    }
]

var startQuiz = document.querySelector("#start-quiz");//start quiz button
var startScreen = document.querySelector(".start-screen");//start screen
var quiz = document.querySelector(".quiz");//quiz body
var endScreen = document.querySelector(".end-screen");
var highScore = document.querySelector(".high-score");
var header = document.querySelector(".header");
var time = document.querySelector(".time");
var scoreScreen = document.querySelector(".score-screen");
var users = [];
var count = 0;
var points = 0;
var idCounter = 0;
var timeLeft = 80;

var createQuestion = function () {
    startScreen.style.display = "none";

    if (count === myQuestions.length) {
        end();
        return false;
    }

    var question = myQuestions[count].question;
    var ansA = myQuestions[count].a;
    var ansB = myQuestions[count].b;
    var ansC = myQuestions[count].c;
    var ansD = myQuestions[count].d;

    quiz.innerHTML = "<h1 class= 'text-secondary'> " + question + " </h1>";

    quiz.innerHTML += "<button id='answerButton' class='btn btn-primary btn-lg' type='radio' value='a' onclick='checkAnswer(this.value)'>" + ansA + "</button><br>";
    quiz.innerHTML += "<button id='answerButton' class='btn btn-primary btn-lg' type='radio' value='b' onclick='checkAnswer(this.value)'>" + ansB + "</button><br>";
    quiz.innerHTML += "<button id='answerButton' class='btn btn-primary btn-lg' type='radio' value='c' onclick='checkAnswer(this.value)'>" + ansC + "</button><br>";
    quiz.innerHTML += "<button id='answerButton' class='btn btn-primary btn-lg' type='radio' value='d' onclick='checkAnswer(this.value)'>" + ansD + "</button><br>";
};

var checkAnswer = function (clicked_value) {
    console.log(clicked_value);
    if (clicked_value === myQuestions[count].correctAnswer) {
        alert("correct!");
        points += 5;
    }
    else {
        alert("Wrong!");
        points -= 3;
        timeLeft -= 10;
    }
    count++;
    createQuestion();
};

var end = function () {
    quiz.style.display = "none";
    endScreen.style.display = "inline-block";

    document.querySelector(".high-score-info").innerHTML += "Congrats! You got " + points + " points!";

    document.querySelector("#save-name").addEventListener("click", function () {
        var UserInstance = {
            name: document.getElementById("userName").value,
            points: points,
            id: idCounter
        };
        users.push(UserInstance);
        saveUser();
        idCounter++;
        highScoreScreen();
    });
}

var highScoreScreen = function () {
    quiz.style.display = "none";
    endScreen.style.display = "none";
    startScreen.style.display = "none";
    header.style.display = "none";
    scoreScreen.style.display = "inline-block";

    var scoreList = document.querySelector(".score-list");

    for (var i = 0; i < users.length; i++) {
        var listItem = document.createElement("li");
        listItem.className = "quizListItem bg-secondary text-warning";
        listItem.innerHTML = users[i].name + "-" + users[i].points;
        scoreList.appendChild(listItem);

    }

}

var countdown = function () {
    var timeInterval = setInterval(function () {
        if (timeLeft === -1) {
            clearInterval(timeInterval);
            end();
        }
        else if (count === myQuestions.length) {
            clearInterval(timeInterval);
        }
        else {
            time.textContent = "Time: " + timeLeft;
            time.className = "text-dark";
            timeLeft--;
        }
    }, 1000);
}

var loadUser = function () {
    var savedItems = localStorage.getItem("users");
    if (!savedItems) {
        return false;
    }
    savedItems = JSON.parse(savedItems);
    if (savedItems[savedItems.length - 1].id > 0) {
        idCounter = savedItems[savedItems.length - 1].id + 1;
    }

    users = savedItems;
    console.log(savedItems);
}

var saveUser = function () {
    localStorage.setItem("users", JSON.stringify(users));

}

var deleteAll = function () {
    localStorage.removeItem("users");
}

document.querySelector("#delete-all").addEventListener("click", deleteAll);

highScore.addEventListener("click", highScoreScreen);
startQuiz.addEventListener("click", () => {
    createQuestion();
    countdown();
});
loadUser();



