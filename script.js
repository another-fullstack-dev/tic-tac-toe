const gameboard = (function() {
    const row1 = [null, null, null];
    const row2 = [null, null, null];
    const row3 = [null, null, null];
    const hasNull = {};
    return {row1, row2, row3, hasNull};
})();

function setPlayers(){
    let p1 = {};
    let p2 = {};
    p1.name = prompt("Enter a name of first player (O):");
    p2.name = prompt("Enter a name of second player (X):");
    p1.sign = 0; // O
    p2.sign = 1; // X
    return {p1, p2};
};

// may the god have mercy on my soul
function checkWin(){
    let win = false;
    if (gameboard.hasNull.row1 == "null" &&
        gameboard.hasNull.row2 == "null" &&
        gameboard.hasNull.row3 == "null"){
            return win = "tie";
        }
    for (const row in gameboard) {
        if (row == "hasNull"){
            return;
        }
        if ( gameboard.hasNull[row] == "null"){
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
                gameboard.hasNull[row] = "null";
                return;
            }
        }
    }
}

function playGame(){
    const players = setPlayers();
    console.log(players);
    console.table(gameboard);
    let player;
    let lastPlayed = null;
    
    while(true){
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
        if (checkWin()) {
            break;
        } else if (checkWin() == "tie"){
            console.table(gameboard);
            console.log("It's a tie!")
            return;
        }
    }

    console.log(`Winner is ${lastPlayed}`);
    console.table(gameboard);
}