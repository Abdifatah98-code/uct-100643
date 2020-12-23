const start_btn =document.querySelector(".startbtn button");
const info_box=document.querySelector(".info-box");
const Exit_btn=info_box.querySelector(".buttons .quit");
const Continue_btn=info_box.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz-box");
const Next_btn=quiz_box.querySelector(".next-btn");
const Solution_btn=quiz_box.querySelector(".sol");
const bottom_quiz_Counter=quiz_box.querySelector(".total_que");
const option_list =document.querySelector(".option_lis");
const timeCount =document.querySelector(".timer .time_sec")
const time_line =quiz_box.querySelector("header .time_line")
const result_box =document.querySelector(".result_box");
const retart_quiz =result_box.querySelector(".button .retart");
const Quit_quiz=result_box.querySelector(".button .Quit");

retart_quiz.onclick=()=>{
quiz_box.classList.add("activeQuiz");//Show The Quiz
result_box.classList.remove("activeResult");//show The Result
let Que_Count =0;
let numb =1;
// let CounterTime;
let timeValue=16;
let CounterLine;
let widthValue =0
let UserScore =0;
clearInterval(CounterTime)
StartTimerLine(CounterLine)
clearInterval(widthValue)
StartTimer(timeValue)
ShowQuiz(Que_Count)
QuizCounter(numb)
Next_btn.style.display ="none";

}

Quit_quiz.onclick=()=>{
    window.location.reload();
}

//if Start Quiz Button Clicked
start_btn.onclick=()=>{
    info_box.classList.add("activeInfo")
}

//if Exit Button Clicked
Exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
}

//if Continue Button Clicked
Continue_btn.onclick=()=>{
      info_box.classList.remove("activeInfo");//Hide The Quiz
      quiz_box.classList.add("activeQuiz");//Show The Quiz
      ShowQuiz(0)
      QuizCounter(1)
      StartTimer(15)
      StartTimerLine(0)
    
}  
let Que_Count =0;
let numb =1;
let CounterTime;
let timeValue=16;
let CounterLine;
let widthValue =0
let UserScore =0;

// If Next Button Click Add +1
Next_btn.onclick=()=>
{
    if (Que_Count < Quiz.length - 1) {
    Que_Count++;
    numb++;
    clearInterval(CounterTime)
    StartTimerLine(CounterLine)
   
    clearInterval(widthValue)
    StartTimer(timeValue)
    ShowQuiz(Que_Count)
    QuizCounter(numb)
    Next_btn.style.display ="none";
    }
    else
    {
        // alert("Questions Completed!");
        showResult();
    }
    
}
function ShowQuiz(index)
{
    //Title Question
    const que_text =document.querySelector(".quite_text");
    let que_tag = `<span>${Quiz[index].num}.${Quiz[index].Question}</span>`
    que_text.innerHTML=que_tag;

    // Options List
    
    let opt_tag= `<div class="option"><input type="radio" name="check">${Quiz[index].option[0]}</div>`
                + `<div class="option"><input type="radio" name="check">${Quiz[index].option[1]}</div>`
                + `<div class="option"><input type="radio" name="check">${Quiz[index].option[2]}</div>`;

                
                //    `<div class="option">${Quiz[index].option[0]}<span></span> </div>`
    option_list.innerHTML =opt_tag;
    //Options
    let option =option_list.querySelectorAll(".option");
    for (let i = 0; i <option.length; i++) 
    {
        option[i].setAttribute("onclick","Selected(this)");
        // console.log(option[i])
        // option[i].addEventListener('onclick','optionSelected()')
    }
    
}

function Selected(jawaab) {
    clearInterval(CounterLine)
    clearInterval(CounterTime)
    let Alloptions =option_list.children.length;
   


    let user =jawaab.textContent;
    let CorrectAns =Quiz[Que_Count].answer;
    // console.log("From Array"+CorrectAns)
    // console.log(user)
    if (user == CorrectAns) {
        UserScore+=1;
        console.log(UserScore)
        jawaab.classList.add("correct")
        Solution_btn.style.display="block";
        Solution_btn.innerHTML ="Correct Answer";
        
        
    }
    else{
        jawaab.classList.add("Incorrect")
        Solution_btn.style.display="block";
        Solution_btn.innerHTML ="Incorrect Answer";     
    }
    //When User Selected Disable others
    for (let i = 0; i < Alloptions; i++) {
        option_list.children[i].classList.add("disabled")
        
    }
    Next_btn.style.display ="block";
   
    
}
/*
function optionSelected(answer)
{
    let AnsUser =answer.textcontent;
    // let answer;
    clearInterval(CounterLine)
    clearInterval(CounterTime)
    let Alloptions =option_list.children.length;
    UserScore+=1;

    
    // let CorrectAns= Quiz[Que_Count].answer; 
    // console.log(CorrectAns)
    console.log(AnsUser)
    // if(AnsUser == CorrectAns){
    //   answer.classList.add("correct")
    //   console.log("Correct");
    // }
    // else{
    //   answer.classList.add("Incorrect")
    //   console.log("Incorrect");
    // }
    //When User Selected Disable others
    for (let i = 0; i < Alloptions; i++) {
        option_list.children[i].classList.add("disabled")
        
    }
    Next_btn.style.display ="block";

}*/
function showResult()
{
    info_box.classList.remove("activeInfo");//Hide The Quiz
    quiz_box.classList.remove("activeQuiz");//Show The Quiz
    result_box.classList.add("activeResult");//show The Result
    // quiz_box.classList.add("activeQuiz");//Show The Quiz
    const scoreTxt =result_box.querySelector(".score_text")
    if (UserScore >=7) {
        let ScoreTag =`<span>And Cograts! You got only <p>${UserScore}</p>out of<p>${Quiz.length}</p></span>`
        scoreTxt.innerHTML=ScoreTag;
    }
    else if (UserScore >4 && UserScore <=6) {
        let ScoreTag =`<span>And nice You got only <p>${UserScore}</p>out of<p>${Quiz.length}</p></span>`
        scoreTxt.innerHTML=ScoreTag;
    }
    else {
        let ScoreTag =`<span>And Sorry You got only <p>${UserScore}</p>out of<p>${Quiz.length}</p></span>`
        scoreTxt.innerHTML=ScoreTag;
    }
}

//bottom_quiz_Counter

QuizCounter=(number)=>
{
    let totalQuizCount_tag = `<span><p> ${number} </p>Of <p> ${Quiz.length}  </p>Question</span>`
    bottom_quiz_Counter.innerHTML =totalQuizCount_tag;
}
function StartTimer(time) {
    CounterTime =setInterval(timerCount,1000);
    function timerCount() {
        time--;
        timeCount.textContent=time;
        if (time <=9) {
            timeCount.textContent="0"+time;
            
        }
        if (time <=0) {
            timeCount.textContent="00";
            
        }
        if (time==-2) {
            Next_btn.onclick()
            
        }
        
        
    }
    
}
function StartTimerLine(time) {
    CounterLine =setInterval(timerCountLine,29);
    function timerCountLine() {
        time+=1;
        time_line.style.width= time + "px";
        
        if (time >=520) {
           clearInterval(CounterLine);
            
        }
        if (time >=450) {
            time_line.style.background= "red";
        }
        if (time ==520) {
           
            Next_btn.onclick()
        }
        
        
    }
    
}
