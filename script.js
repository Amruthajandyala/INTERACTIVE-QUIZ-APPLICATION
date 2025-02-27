const startbtn=document.querySelector('.start-btn');
const popupInfo=document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const main=document.querySelector('main');
const continuebtn=document.querySelector('.continue-btn');
const quizsection=document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainbtn = document.querySelector('.tryAgain-btn');
const backbtn = document.querySelector('.back-btn');

startbtn.onclick=() =>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitbtn.onclick=() =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continuebtn.onclick = () =>{
    quizsection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active')

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainbtn.onclick = () =>{
    quizbox.classList.add('active');
    // quizbox.classList.remove('active');
    nextbtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    QuestionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(QuestionNumb);

    headerScore();
}

backbtn.onclick = () =>{
    quizsection.classList.remove('active');
    // quizbox.classList.remove('active');
    nextbtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    QuestionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(QuestionNumb);

    headerScore();
}

let questionCount=0;
let QuestionNumb=1;
let userScore=0;

const nextbtn = document.querySelector('.next-btn');
nextbtn.onclick =() =>{
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        QuestionNumb++;
        questionCounter(QuestionNumb);

        nextbtn.classList.remove('active');
    }
    else{
        console.log('Question Completed');
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');


function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}.${questions[index].question}`;

    let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)')
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer=questions[questionCount].answer;
    let alloptions = optionList.children.length;
    if(userAnswer == correctAnswer){
        // console.log('answer is correct');
        answer.classList.add('correct');
        userScore += 1;
        headerScore()
    }
    else{
        answer.classList.add('incorrect');

        for(let i=0;i< alloptions;i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','correct option');
            }
        }

    }

    for(let i=0; i < alloptions ; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length} questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score')
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizbox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text')
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore / questions.length)*100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;
        // console.log(progressStartValue);
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#0ef ${ progressStartValue * 3.6}deg, rgb(44, 54, 54) 0deg)`;

        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);
}