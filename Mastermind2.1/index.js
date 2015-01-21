var colorSelection; //the current selected color 
var clickCount = 0; //number of selectiions made
var playerCode = []; //holds player's code
var computerGuess = []; //holds computer's guesses

//Makes the selectable colors respond to the user's actions   

$(document).ready(function() {

    $("div.codeOption").mouseenter(function() {

        $(this).animate({
            opacity: "0.1"
        }, "slow");
    });

    $("div.codeOption").mouseleave(function() {

        $(this).animate({
            opacity: "1"
        }, "fast");
    });

    //Have the player choose a 4 color code amongst the 6 possible choices on screen and store that information

    $("div.codeOption").click(function() {

        if (clickCount < 4) {

            colorSelection = $(this).attr("id");
            playerCode[clickCount] = colorSelection;
            clickCount++

        }

        //Once the player chooses a code show them the code they have selected

        if (playerCode.length === 4) {

            //Hide everything but the [hackCode], main menu button and the instructions for what to do next         

            $("div.codeOption, #inGameInstructions").css("display", "none");

            $("#hackCode").css("display", "block");

            $("#playersFinalCode").append("<p id='furtherInstructions'>This is the code you have selected. Press the [HackCode] button to continue, or use the button at the top right corner to go back to the main menu to start over from the beginning.</p>");

            //Depending on the color the player has selected, display a corresponding colored squared          

            for (i = 0; i < playerCode.length; i++) {

            //May want to make this a function one day
              
                if (playerCode[i] === "red") {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div");

                } else if (playerCode[i] === "green") {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div");

                } else if (playerCode[i] === "orange") {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div");

                } else if (playerCode[i] === "yellow") {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div");

                } else if (playerCode[i] === "blue") {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div>");

                } else {
                    $("#playersFinalCode").append("<div class= 'playerCodeChoice'><div class='" + playerCode[i] + "'></div></div>");
                  
                }

            }

        }

    });

    //A function for shuffling the elements in an array (Fisher-Yates shuffle)
  
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //When the player is ready for the computer to guess its code 

    function HackCode() {
        $("#hackCode").click(function() {

            //Hide everything except the main menu button

            $("#hackCode").css("display", "none");
            $(".playerCodeChoice, #furtherInstructions").css("display", "none");

            //Computer logic for guessing

            var computerTurn = 10;

            //Create the array storing each of the selectable colors and shuffle the order of the elements inside of it
          
            var colorOptions = ["red", "green", "orange", "yellow", "blue", "purple"];
            shuffleArray(colorOptions);

            while (computerTurn > 0)

            {
              
                //Go through the 6 different color options, making sure the computer uses each one at least once when it guesses

                for (i = 0; i < colorOptions.length;) {

                    for (c = 0; c < playerCode.length; c++) {

                        //As we are looking at the player's code, if the computer's guess matches the player's selection, remember that

                        if (computerGuess[c] === playerCode[c]) {
                            computerGuess[c] = playerCode[c];
                          
                        //Or else the computer's guess will be set to whatever color was choosen randomly from the 6 possible colors
                          
                        } else {
                            computerGuess[c] = colorOptions[i];
                        }
                    }
                  
                    //Once the computer has choosen a color out of the possible 6, move on to the next color (no colors will be repeated) 

                    i++;

                    //When the computer has figured out the player's code, end the game

                    if (computerGuess[0] === playerCode[0] && computerGuess[1] === playerCode[1] && computerGuess[2] === playerCode[2] && computerGuess[3] === playerCode[3]) {

                        computerTurn = 0;
                        i = 6;
                        $("#guessList").append("<li class='list'>"
                            "<div class='result'>" + computerGuess + "  <--- This is your code</div>"
                            "</li>");

                        $(".outcome").append("<p id='outcomeLose'>The computer was able to crack your code. Better luck next time. Click on the button below to play again.</p>");
                        $(".list").css("opacity", "0.3");
                    }
                    //If the computer hasn't figured out the player's code, have the computer keep guessing for up to 10 turns
                  
                    else {

                        //Display each guess that the computer makes

                        $("#guessList").append("<li class='list'>" + computerGuess + "</li>");

                        computerTurn--;

                        //If the computer hasn't figured out the player's code within 10 turns, announce to the player that they have won

                        if (computerTurn === 10) {

                            $(".outcome").append("<p id= 'outcomeWin'>Congratulations, the computer was unable to crack your code. Click on the button below to play again.</p>");
                        }

                    }
                }

                //Hide the main menu and display an option for the player to play again regardless of whether the computer is successful at cracking the code or not

                $("#toMainMenu").css("display", "none");
                $("#playAgain").css("display": "block");
              
            } 
        });

    }

    HackCode();

    //Clears whatever is on the screen and displays all the elements on the main menu when the player clicks on the main menu button

    function hideToMainMenu() {
        $("#toMainMenu").click(function() {
            $(".codeOption, #toMainMenu, #inGameInstructions,#helpMenuInstructions, #hackCode,.playerCodeChoice, #furtherInstructions, .list").css("display", "none");

            $("#mainTitle, #playGame, #helpMenu").css("display", "block");

            //Resets the game so the player can start fresh           

            playerCode.length = 0;
            computerGuess.length = 0;
            clickCount = 0;
          
        });
    }
  
    hideToMainMenu();

    //Clears whatever is on the screen and displays the actual beginning elements of the game when the player clicks on the play button to go there

    function playGame() {
        $("#playGame").click(function() {

            $("#mainTitle, #playGame, #helpMenu, #helpMenuInstructions").css("display", "none");

            $("#toMainMenu").css({
                "margin-top": "-5px",
                "float": "right"
            });
            $(".codeOption, #toMainMenu, #inGameInstructions").css("display", "block");

        });
    }

    playGame();

    //Clears whatever is on the screen and displays the help menu elements when the player clicks on the help menu button to go there

    function toHelpMenu() {
        $("#helpMenu").click(function() {
            $("#mainTitle,#helpMenu, #inGameInstructions").css("display", "none");

            $("#toMainMenu").css({
                "margin-top": "5px",
                "float": "none"
            });
          
            $("#helpMenuInstructions, #toMainMenu").css("display", "block");
          
        });

    }

    toHelpMenu();

    //Clears whatever is on the screen and displays the beginning elements of the actual game

    function playAgain() {
        $("#playAgain").click(function() {

            $(".list, #playAgain,.result,#outcomeWin, #outcomeLose").css("display", "none");

            $("#toMainMenu").css({
                "margin-top": "-5px",
                "float": "right"
            });
          
            $(".codeOption, #toMainMenu, #inGameInstructions").css("display", "block");

            //Resets the game so the player can start fresh

            playerCode.length = 0;
            computerGuess.length = 0;
            clickCount = 0;
            colorOptions = [1, 2, 3, 4, 5, 6];
          
        });
      
    }
  
    playAgain();
  
});