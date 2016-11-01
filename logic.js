/**
 * Created by sophia on 10/31/16.
 */
var
    players = {
        computer: '',
        human: ''
    },
    modal,
    winner,
    isUserTurn = false;

var possiblePerm = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function compMove(square) {
    if (!square) square = getCompMove();
    $('#s' + square).text(players.computer);
    switchTurn();
}

//player selects if they want to be X or O
function selectPlayer() {
    $('#xPlayer').on("click", function() {
        players.human = 'X';
        players.computer = 'O';
        modal.style.display = "none";
        setMessage("Player " + players.computer + " gets to start.");
        compMove(5);
    });
    $('#oPlayer').on("click", function() {
        players.human = 'O';
        players.computer = 'X';
        modal.style.display = "none";
        setMessage("Player " + players.computer + " gets to start.");
        compMove(5);
    });
}

//clears the values in the squares
function clearBox() {
    $('.square').text('');
}

//clears every box and no winner at first
function startGame() {
    clearBox();
    winner = null;
    isUserTurn = false;
}

//displays message
function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}

function getCurrentPlayer() {
    return isUserTurn ? players.human : players.computer;
}


function getBox(number) {
    return document.getElementById("s" + number).innerText;
}

//see if three squares are the same move (X or O)
function checkRow(a, b, c, move) {
    //start off as false since no winner yet
    var result = false;
    if (getBox(a) === move && getBox(b) === move && getBox(c) === move) {
        result = true;
    }
    return result;
}

//checks every possible way a player can win
function checkForWinner(move) {
    var result = false;
    if (checkRow(1, 2, 3, move) ||
        checkRow(4, 5, 6, move) ||
        checkRow(7, 8, 9, move) ||
        checkRow(1, 4, 7, move) ||
        checkRow(2, 5, 8, move) ||
        checkRow(3, 6, 9, move) ||
        checkRow(1, 5, 9, move) ||
        checkRow(3, 5, 7, move)
    ) {
        result = true;
        //$('#s1s').addClass('s1ss');
        //flash('#s1s');
    }
    return result;
}

function switchTurn() {
    //
    if (checkForWinner(players.human)) {
        winner = players.human;
    }
    else if (checkForWinner(players.computer)) {
        winner = players.computer;
    }
    if (winner) {
        setMessage("Congratulations! Player " + winner + " wins!");
        //$(element).addClass('s1ss');
        return false;
    }

    isUserTurn = !isUserTurn;
    setMessage("It's " + getCurrentPlayer() + " turn!");
    if (!isUserTurn) compMove();
}


/*function flash(element) {
    var count = 0;
    return (function recursion () {
            return setTimeout(
                function () {
                    $(element).toggleClass('s1ss');
                    count++;
                    if (count === 6) {
                        return true;
                    } else {
                        recursion();
                    }
                }, 300);
        }
    )();
}*/


/*
 returns square to make move in
 */
function getCompMove() {
    var allPlayableKeys = [];
    for (var i in possiblePerm) {
        var combo = possiblePerm[i];
        var computerKeys = [];
        var humanKeys = [];
        var playableKeys = [];
        for (var j in combo) {
            var square = $('#s' + combo[j]).text();
            // check for human
            if (square === players.human)
                humanKeys.push(combo[j]);
            else if (square === players.computer)
                computerKeys.push(combo[j]);
            else {
                playableKeys.push(combo[j]);
                allPlayableKeys.push(combo[j]);
            }
        }
        if ((computerKeys.length > 1 || humanKeys.length > 1) && playableKeys.length > 0) {
            return playableKeys[0];
        }
    }
    return allPlayableKeys[0];
}

$(document).ready(function() {

    $('.square').on("click", function() {
        if (winner) { //this first 'if' does NOT work
            setMessage(winner + " already won the game.");
            return false;
        } else if ($(this).text() == '') {
            $(this).text(players.human);
            switchTurn();
        }
        else {
            setMessage("That square is already used!");
        }
    });

    modal = document.getElementById('myModal');
    var btn = document.getElementById("startBtn");
    // When the user clicks on the button, open the modal
    $(btn).on("click", function() {
        modal.style.display = "block";
        startGame();
    });
    // When the user clicks on <span> (x), close the modal
    $('.close').on("click", function() {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    selectPlayer();
});

