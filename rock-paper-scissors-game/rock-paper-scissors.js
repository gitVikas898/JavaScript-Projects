let result = ' ';  // stores result 
// creating a Score feature using an Object that saves the score

        let score = JSON.parse(localStorage.getItem('Score'))|| {
                wins : 0,
                losses : 0,
                ties : 0,
            };
            // Giving score a default value using guard operator
        
//Code for Score display using DOM
         updateScoreElement();



//function for Auto - Play and  to stop auto-play

        let isAutoPlaying = false;

        let intervalID;


            // const autoPlay= ()=>{

            // };

        function autoPlay(){
            if(!isAutoPlaying){
              intervalID  = setInterval(function(){
                    const playerMove = pickCpuMove();
                    playGame(playerMove)
                },1000);
                isAutoPlaying = true;
            }
            else{

                clearInterval(intervalID);
                isAutoPlaying = false;
            }

            let textElement = document.querySelector('.js-autoplay');

            if(textElement.innerHTML === 'AutoPlay'){
                textElement.innerHTML = 'Stop';
            }

            else if(textElement.innerHTML ==='Stop'){
                textElement.innerHTML ='AutoPlay';
            }
        }

document.querySelector('.js-autoplay-button').addEventListener('click',()=>{
    autoPlay();
    
});

//adding event listner instead of onclick

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',()=>{
    playGame('Scissors');
});

// adding Keyboard Play option using eventListners

document.body.addEventListener('keydown',(event)=>{
    if(event.key ==='r'){
        playGame('Rock');
    }

    else if(event.key === 'p'){
        playGame('Paper');
    }

    else if(event.key === 's'){
        playGame('Scissors');
    }

    else if(event.key === 'a'){
        autoPlay();
    }

    else if(event.key ==='x'){
        resetScore(score);
        localStorage.removeItem('Score');
    }
});


//Main function of Game
        function playGame(playerMove){

            const cpuMove = pickCpuMove(); //generates a random computer move

         

//Logic if Player picks Rock
            if(playerMove === 'Rock'){

            if(cpuMove === 'Rock')
            {
                result ='Tie';
            }
            else if(cpuMove === 'Paper'){
                result = 'CPU Win'
            }
            else if (cpuMove === 'Scissors') {
                result = 'USER Win'
            }
// Logic if player picks Paper

        }else if(playerMove === 'Paper'){

            if(cpuMove === 'Rock'){
                result ='USER Win';
            }
            else if(cpuMove === 'Paper'){
                result = 'Tie'
            }
            else if (cpuMove === 'Scissors') {
                result = 'CPU Win'
            }
//Logic if player picks Scissors

        }else if(playerMove === 'Scissors'){

            if(cpuMove === 'Rock'){
                result ='CPU Win';
            }
            else if(cpuMove === 'Paper'){
                result = 'USER Win';
            }
            else if (cpuMove === 'Scissors') {
                result = 'Tie';
            }
        }
//Shows the Result in an alert popup

        if(result === 'USER Win'){
            score.wins+=1;
        }else if(result === 'CPU Win'){
            score.losses+=1;
        }
        else if(result === 'Tie'){
            score.ties+=1;
        }

//Storing the Score in localStorage

        localStorage.setItem('Score',JSON.stringify(score));

//Updating the Score on the DOM

        updateScoreElement();
        // document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Loss : ${score.losses} , Tie's : ${score.ties}`;

        //Function Call to Display result on page
        displayResult();

        document.querySelector('.js-moves').innerHTML = `Your move : 
    <img class="move-icon" src="img/${playerMove}-emoji.png" alt="">
    CPU move : 
    <img class="move-icon" src="img/${cpuMove}-emoji.png" alt="">`;

//POPUP OF SCORE

//         alert(`You Choose : ${playerMove} , CPU chose : ${cpuMove} , Result : ${result}
// Wins : ${score.wins}, Loss : ${score.losses} , Tie's : ${score.ties}`);
//         console.log(score);
    
    }

//Function to generate a random cpu move 

        function pickCpuMove(){
            let  cpuMove =' ';

            const randomNumber = Math.random();

//Computer move logic

            if(randomNumber>=0 && randomNumber<1/3 ){
                cpuMove = 'Rock';
            }
            else if (randomNumber>=1/3 && randomNumber <2/3){
                cpuMove = 'Paper';
            }
            else if(randomNumber>=2/3 && randomNumber<1){
                cpuMove ='Scissors';
            }
                
            return cpuMove;
        }

// Reset Score function 
        function resetScore(){
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            updateScoreElement();
            document.querySelector('.js-moves').innerHTML = '';
            document.querySelector('.js-result').innerHTML = '';
       
        }

        // document.querySelector('.js-reset-button').addEventListener('click',()=>{

        //     //Original

        //     resetScore(score);
        //     localStorage.removeItem('Score');

        // });

        document.querySelector('.js-reset-button').addEventListener('click',()=>{

            //Reset Confrimation DOM
           
            showResetConfirmation();

        });

        function showResetConfirmation(){
            document.querySelector('.js-reset-confirm').innerHTML =`
            Reset Confirmation ? <button class="js-reset-confirm-yes yes-button">
                 Yes
            </button>
            <button class="js-reset-confirm-no  no-button">
                No
            </button>
            `;

            document.querySelector('.js-reset-confirm-yes').addEventListener('click',()=>{
                resetScore();
                localStorage.removeItem('Score');
                hideResetConfirm();
            });

            document.querySelector('.js-reset-confirm-no').addEventListener('click',()=>{
                hideResetConfirm();
            })
        }

        function hideResetConfirm(){
            document.querySelector('.js-reset-confirm').innerHTML ='';
        }



        

//function that updates score on the page 

        function updateScoreElement(){
            document.querySelector('.js-score').innerHTML = `Score , wins : ${score.wins}, loss : ${score.losses} , tie's : ${score.ties}`;
        }


// function for displaying result on Page

        function displayResult(){
            document.querySelector('.js-result').innerHTML = `Result : ${result}`;
        }