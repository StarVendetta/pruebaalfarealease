//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let levels = document.querySelector("#levels");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


/* This is a variable declaration. The index variable is used to keep track of the current question.
The timer variable is used to keep track of the time. The interval variable is used to keep track of
the interval. */
let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
/* This is a variable declaration. The UserAns variable is used to keep track of the user's answer. */
let UserAns = undefined;

//what happen when 'Start' Button Will Click
/* This is an event listener that listens for a click event on the start element. When the click
event is fired, the event listener sets the display property of the start element to none and the
display property of the guide element to block. */
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
/* This is an event listener that listens for a click event on the exit element. When the click
event is fired, the event listener sets the display property of the start element to block and the
display property of the guide element to none. */
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 200) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 0;
}



loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

 /* This is a variable declaration. The index variable is used to keep track of the current question.
 The timer variable is used to keep track of the time. The interval variable is used to keep track
 of
 the interval. */
    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    /* This is a variable declaration. The index variable is used to keep track of the current
    question.
    The timer variable is used to keep track of the time. The interval variable is used to keep
    track of
    the interval. */
    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});


function getLevel(){


    let level;
    if (correct >=0 && correct <= 6) {
        level = "A1-1";
      }
      if (correct >= 4 && correct <= 6) {
        level = "A1-2"
      }
      if (correct >= 7 && correct <= 9) {
        level = "A2-1"
      }
      if (correct >= 10 && correct <= 12) {
        level = "A2-2"
      }
      if (correct >= 13 && correct <= 15) {
        level = "B1-1"
      }
      if (correct >= 16 && correct <= 18) {
        level = "B1-2"
      }
      if (correct >= 19 && correct <= 21) {
        level = "B1-3"
      }
      if (correct >= 22 && correct <= 24) {
        level = "B1-4"
      }
      if (correct >= 25 && correct <= 27) {
        level = "B2-1"
      }
      if (correct >= 28 && correct <= 30) {
        level = "B2-2"
      }
      if (correct >= 31 && correct <= 33) {
        level = "B2-3"
      }
      if (correct >= 34 && correct <= 36) {
        level = "B2-4"
      }
      if (correct >= 37 && correct <= 42) {
        level = "C1-1"
      }
    
      console.log(level);





     /* Setting the innerHTML of the levels element to the string "Your Level: " concatenated with the
     value of the level variable. */
      levels.innerHTML =  `Your Level:  ${level}`;


}

/* This is a forEach loop that loops through the choice_que array. The forEach loop takes three
parameters: choices, choiceNo, and level. The choices parameter is the current element in the array.

The choiceNo parameter is the index of the current element in the array. The level parameter is the
array itself. The forEach loop adds an event listener to each element in the choice_que array. The
event listener listens for a click event. When the click event is fired, the event listener adds the

active class to the current element. The event listener then checks if the choiceNo parameter is
equal to the answer property of the current element in the MCQS array. If it is, then the correct
variable is incremented by 1. If it is not, then the correct variable is incremented by 0. The event

listener then checks if the strike variable is equal to 3. If it is, then the Swal.fire function is
called. The Swal.fire function is a function that displays a popup. The popup has an error icon, a
title */
let strike = 0;
choice_que.forEach((choices, choiceNo,level) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
            
        } else if(choiceNo != MCQS[index].answer){
            correct += 0;
            strike ++;
            console.log(strike);
        }

        if(strike ==  3){
            Swal.fire(
            
              {
              icon: 'error',
              title: 'Test terminado ',
              text: 'No puedes seguir avanzando',
              confirmButtonColor: '#000'
      
            })
     
  
          /* This is a conditional statement that checks if the index is not equal to the length of the
          MCQS array minus 1. If it is not, then the index is incremented by 1 and the active class is
          removed from the choice_que array. */
            clearInterval(interval);
            quiz.style.display = "none";
            points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
            getLevel();
            result.style.display = "block";   
            
        }
        //stop Counter
        //clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
   /* This is a conditional statement that checks if the index is not equal to the length of the MCQS
   array minus 1. If it is not, then the index is incremented by 1 and the active class is removed
   from the choice_que array. */
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        getLevel();
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

/**
 * When the user clicks the button, the JavaScript function will be called, which will then redirect
 * the user to the same page, but with the two variables appended to the URL.
 */
function send_data_to_php(Level) {
  var jsVar1 = document.getElementById("levels").value;

/* Appending a query string to the current URL. */
  window.location.href = window.location.href + "?w1=" + jsVar1;

 /* Sending the value of the levels variable to the parametros.php file. */
  fetch('parametros.php',{
    method: 'POST',
    body: levels.value,
  })
  .then(response => response.json())
  .then(data => console.log(data))
}


//prueba de envio de datos

function envio(){
var jsVar1 = "Hello";
var jsVar2 = "World";
window.location.href = window.location.href + "?w1=" + jsVar1 + "&w2=" + jsVar2;
}





//prueba de envio de datos



function asincrono(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 300) {
          document.getElementById("demo").innerHTML = this.responseText;
      }
  };
  xmlhttp.open("GET", "parametros.php", true);
  xmlhttp.send("GET", "parametros.php",true);

}


//what happen when 'Quit' Button Will Click
/* Adding an event listener to the quit button. When the quit button is clicked, it will fire an
alert and then call the send_data_to_php function. */
quit.addEventListener("click", () => {
  
  /*
    start.style.display = "block";
    result.style.display = "none"; */
    //alert("enviado");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'your level has been recorded!',
        showConfirmButton: false,
        confirmButtonColor: '#000'
      })

      //send_data_to_php();
     //asincrono();
      
});

//Start Again When 'Start Again' Button Will Clicked
/*startAgain.addEventListener("click", (e) => {
    e.preventDefault();
    start.style.display = "none";
    result.style.display = "none";
    index = 0;
    correct = 0;
    loadData();
    total_correct.style.display = "block";
    total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
});*/



/**
 * The function is called asincrono() and it creates a new XMLHttpRequest object, assigns a function to
 * the object's onreadystatechange property, and sends the request off to a file on the server.
 * 
 * The function assigned to the onreadystatechange property is called every time the readyState
 * changes. The readyState property holds the status of the XMLHttpRequest.
 * 
 * Change the readyState property
 * 
 * The onreadystatechange property defines a function to be executed when the readyState changes.
 * 
 * The readyState property holds the status of the XMLHttpRequest.
 * 
 * Change the readyState property
 * 
 * The onreadystatechange property defines a function to be executed when the readyState changes.
 * 
 * The readyState property holds the status of the XMLHttpRequest.
 * 
 * Change the readyState property
 * 
 * The onreadystatechange property
 */





/*
 function parametro(captura){
  var miVariable = "Hola Mundo"; 
  if(captura=='No'){
      window.location="esta_pagina.php?variable=miVariable";
  }    
} 


 <?php
 $captura='';
 if(!isset($_GET['variable'])){
     $captura='No';
 }
 ?>
 <body onload="parametro(<?php echo $captura; ?>) ">
 

                   

 <?php
     $datos = $_GET['variable'];
     echo $datos;
 ?>
 </body>

 */


