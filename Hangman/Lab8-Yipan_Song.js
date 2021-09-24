"use strict";

function getAnswer() {
    var animalWords = ["dog", "monkey", "lion", "giraffe", "panda", "chimpanzee", "deer", "kangaroo", "dolphin"];
    var occupationWords = ["doctor", "teacher", "programmer", "painter", "officer", "driver", "actor"];
    var foodWords = ["dumpling", "pasta", "noodles", "sushi", "pizza", "hamburger", "sandwich", "chocolate"];
    var words_val = document.getElementById("words").value; // To get the value of the category that the players chose
    if (words_val == "1") {
        word = animalWords[Math.floor(Math.random() * animalWords.length)]; // To choose a word in the array randomly
    }
    else if (words_val == "2") {
        word = occupationWords[Math.floor(Math.random() * occupationWords.length)];
    }
    else {
        word = foodWords[Math.floor(Math.random() * foodWords.length)];
    }
    wordArray = word.split(""); // To change the string(a word) to an array(the element is letter)
    guessWords = [];
    for (var i = 0; i < wordArray.length; i++) {
        guessWords.push("_"); // To get the placeholders according to the number of letters in the word
    }
    document.getElementById("guess").innerHTML = guessWords.join(" ");
}
function gameReset() {
    wrongLetter = []; // To clear the wrong words entered by the player in last game
    document.getElementById("wrong").innerHTML = wrongLetter.join(" "); // To clear the wrong words entered by the player in last game
    lives = 6; // To turn the number of player's chances(lives) back into the original number: 6
    getAnswer(); // Re-call the getAnswer function: to update the answer word and the placeholders
    document.getElementById("picture").src = "Hangman1.png"; // To change the picture to the original one
    document.getElementById("live").innerHTML = "You have 6 chances!"; // To tell players that they have 6 chances
    document.getElementById("keyboard").innerHTML = null; // To delete the sentences about the results that players achieved in last game
    getKeyboard(); // Re-call the getKeyboard function
}
function getKeyboard() {
    var keyboardArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var n = 0; n < keyboardArray.length; n++) {
        var newElement = document.createElement("button"); // To create the tag "button"
        $(newElement).text(keyboardArray[n]); // To add every letter in the keyboardArray into the tag "button"
        $(newElement).on("click", clickWord); // When players click the keyboard, it can call the clickWord funcion
        $(newElement).appendTo($("#keyboard")); // To add the letters and new tags "button" into the tag which has the id "keyboard"
    }
} // Players input the letter through clicking the letters on the keyboard which only have letters on the screen, so there is no worry about the non-letter input.
function clickWord() {
    var letter = $(this).text(); // This variable get the letter that players clicked
    if (word.indexOf(letter) >= 0) {
        for (var x = 0; x < wordArray.length; x++) {
            if (wordArray[x] === letter) {
                guessWords[x] = letter;
                document.getElementById("guess").innerHTML = guessWords.join(" "); // To update the placeholders, the right letters that players clicked will replace the corresponding placeholders
            }
        }
    }
    else {
        lives--; // When the player are wrong one time, the lives(chances) will lose one time
        $(this).css('background-color', 'grey'); // When players click a wrong letter on the keyboard, the corresponding key will become grey
        $(this).off('click'); // Players can not click the same wrong letter as before, when they click, the chances they have will not lose and the letter will not be input in the "wrong letter" space again
        wrongLetter.push(letter); // To get the wrong letters that the players clicked
        document.getElementById("wrong").innerHTML = wrongLetter.join(","); // To change the wrongLetter array to a string and add it into the tag "wrong"
        var n = 6 - lives; // The variable is the order of the corresponding picture in the pictureArray
        var picture = pictureArray[n];
        document.getElementById("picture").src = picture; // To update the picture when players are wrong
        if (lives == 0) {
            document.getElementById("keyboard").innerHTML = "Game Over!<br />The answer is:<br />" + word;
        } // When there is no life, players will achieve the sentences about the result and the answer, and there is no keyboard for them to click, they can click the play again button to play again
    }
    if(lives > 1) {
        document.getElementById("live").innerHTML = "You have " + lives +" chances!";
    } // To tell the players how many chances that they have
    else {
        document.getElementById("live").innerHTML = "You have " + lives +" chance!";
    } // If the chance is one or zero, the word "chances" should be "chances"
    if(document.getElementById("guess").innerHTML.indexOf("_") == -1 && lives > 0) {
        document.getElementById("keyboard").innerHTML = "Congratulations!<br />You Win！";
    } // When players win, they can get this sentence
}
var wrongLetter = [];
var lives = 6; // The variable is about players' chances
var word = null;
var wordArray = [];
var guessWords = [];
var pictureArray = ["Hangman1.png", "Hangman2.png", "Hangman3.png", "Hangman4.png", "Hangman5.png", "Hangman6.png", "Hangman7.png"] // This array is about the pictures in the game
