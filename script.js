// i hate my fucking life and my dumb ass i just cant even think or just man just kill me im so done
















const gameboard = (function() {
    // why not put rows in an object as well?
    const row1 = [null, null, null];
    const row2 = [null, null, null];
    const row3 = [null, null, null];
    const columns = {
        column1: [],
        column2: [],
        column3: [],
    };
    const diagonals = {
        diagonal1: [],
        diagonal2: [],
    }
    const hasNull = {};
    let lastPlayed = null;
    return {row1, row2, row3, columns, diagonals, hasNull, lastPlayed};
})();

const rows = (function() {
    const row1 = {},
          row2 = {},
          row3 = {};
    
    row1.dom = document.querySelector(".row1");
    row1.dom = row1.dom.children;
    row1.dom = Array.from(row1.dom);
    row1.dom.forEach(element => {
        element.addEventListener("click", playGame)
    });

    row2.dom = document.querySelector(".row2");
    row2.dom = row2.dom.children;
    row2.dom = Array.from(row2.dom);
    row2.dom.forEach(element => {
        element.addEventListener("click", playGame)
    });

    row3.dom = document.querySelector(".row3");
    row3.dom = row3.dom.children;
    row3.dom = Array.from(row3.dom);
    row3.dom.forEach(element => {
        element.addEventListener("click", playGame)
    });

    return {row1, row2, row3}
})();

const btnPlay = document.querySelector(".play");
      btnPlay.addEventListener("click", playGame);

const p1Input = document.querySelector("#name-p1");
const p2Input = document.querySelector("#name-p2");

function setPlayers(){
    let p1 = {};
    let p2 = {};
    p1.name = p1Input.value;
    p2.name = p2Input.value;
    p1.sign = 0; // O
    p2.sign = 1; // X
    return {p1, p2};
};

// may the god have mercy on my soul

/* 
*  basically the way it works is that it checks whether or not 
*  rows (and columns/diagonals) are full (which is absence of "null"'s)
*  and then checks the sum of values in them (if they are full).
*  if result is 0 then p1 (O) has won, if 3, then p2 (X) has won.
*  any other value means triplet is borked and ignored.
*  if all triplets are borked it means game is a tie.
*
*  there are probably ways to do it more efficiently
*  (like throwing a tie if some cells are empty but no win
*   condition is possible) but as of now it works
*
*  the same thing repeated two more times. currently i cant
*  (or rather dont want to) think of better solution, too bad!
*/

function checkWinRows(){
    let win = false;
    if (gameboard.hasNull.row1 == "full" &&
        gameboard.hasNull.row2 == "full" &&
        gameboard.hasNull.row3 == "full" &&
        gameboard.hasNull.column1 == "full" &&
        gameboard.hasNull.column2 == "full" &&
        gameboard.hasNull.column3 == "full" &&
        gameboard.hasNull.diagonal1 == "full" &&
        gameboard.hasNull.diagonal2 == "full"){
            return win = "tie";
        }
    for (const row in gameboard) {
        if (row == "hasNull"){
            return;
        }
        if ( gameboard.hasNull[row] == "full"){
            continue;
        }
        if (gameboard.hasNull[row] == true && gameboard[row].includes(null)){
            continue;
        }
        if (gameboard[row].includes(null)){
            gameboard.hasNull[row] = true;
            return;
        } else {
            gameboard.hasNull[row] = false;
        }
        if (gameboard.hasNull[row] == false){
            if (gameboard[row].reduce((total, current) => total + current) == 0 ||
                gameboard[row].reduce((total, current) => total + current) == 3){
                return win = true
            } else {
                gameboard.hasNull[row] = "full";
                return;
            }
        }
    }
}

// double work lol
function checkWinColumns(){
    let win = false;
    
    // todo: better way to do this ?
    gameboard.columns.column1[0] = gameboard.row1[0];
    gameboard.columns.column1[1] = gameboard.row2[0];
    gameboard.columns.column1[2] = gameboard.row3[0];

    gameboard.columns.column2[0] = gameboard.row1[1];
    gameboard.columns.column2[1] = gameboard.row2[1];
    gameboard.columns.column2[2] = gameboard.row3[1];

    gameboard.columns.column3[0] = gameboard.row1[2];
    gameboard.columns.column3[1] = gameboard.row2[2];
    gameboard.columns.column3[2] = gameboard.row3[2];

    for (const column in gameboard.columns) {
        if (gameboard.hasNull[column] == "full"){
            continue;
        }
        if (gameboard.hasNull[column] == true && gameboard.columns[column].includes(null)){
            continue;
        }
        if (gameboard.columns[column].includes(null)){
            gameboard.hasNull[column] = true;
            return;
        } else {
            gameboard.hasNull[column] = false;
        }
        if (gameboard.hasNull[column] == false){
            if (gameboard.columns[column].reduce((total, current) => total + current) == 0 ||
                gameboard.columns[column].reduce((total, current) => total + current) == 3){
                return win = true
            } else {
                gameboard.hasNull[column] = "full";
                return;
            }
        }
    }
}

// triple work lol
function checkWinDiagonals(){
    let win = false;
    
    // todo: better way to do this ?
    gameboard.diagonals.diagonal1[0] = gameboard.row1[0];
    gameboard.diagonals.diagonal1[1] = gameboard.row2[1];
    gameboard.diagonals.diagonal1[2] = gameboard.row3[2];

    gameboard.diagonals.diagonal2[0] = gameboard.row1[2];
    gameboard.diagonals.diagonal2[1] = gameboard.row2[1];
    gameboard.diagonals.diagonal2[2] = gameboard.row3[0];
    
    for (const diagonal in gameboard.diagonals) {
        if (gameboard.hasNull[diagonal] == "full"){
            continue;
        }
        if (gameboard.hasNull[diagonal] == true && gameboard.diagonals[diagonal].includes(null)){
            continue;
        }
        if (gameboard.diagonals[diagonal].includes(null)){
            gameboard.hasNull[diagonal] = true;
            return;
        } else {
            gameboard.hasNull[diagonal] = false;
        }
        if (gameboard.hasNull[diagonal] == false){
            if (gameboard.diagonals[diagonal].reduce((total, current) => total + current) == 0 ||
                gameboard.diagonals[diagonal].reduce((total, current) => total + current) == 3){
                return win = true
            } else {
                gameboard.hasNull[diagonal] = "full";
                return;
            }
        }
    }
}

function playGame(){
    let players;
    if (this.textContent == "Play!"){
        players = setPlayers();
    }
    console.log(players);
    console.table(gameboard);
    let player;
    if (gameboard.lastPlayed === "p1"){
        player = "p2";
    } else {
        player = "p1";
    }
    console.log(this)


   /*  while(true){
        if (lastPlayed === "p1"){
            player = "p2";
        } else {
            player = "p1";
        }
        
        let move = prompt("Enter a row and index of a cell you want to play in:", "row1, 0");
        move = move.split(", ");
        move[1] = parseInt(move[1]);
        gameboard[move[0]][move[1]] = players[player].sign;
        lastPlayed = player;
        console.table(gameboard);

        if (players[player].sign === 0){
            rows[move[0]].dom[move[1]].innerText = "O";
        } else {
            rows[move[0]].dom[move[1]].innerText = "X";
        }

        if (checkWinRows() || checkWinColumns() || checkWinDiagonals()) {
            console.log(`Winner is ${lastPlayed}`);
            break;
        } else if (checkWinRows() == "tie" || checkWinColumns() == "tie" || checkWinDiagonals() == "tie"){
            console.log("It's a tie!");
            break;
        }
    }
    console.table(gameboard); */
}