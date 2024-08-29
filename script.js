const gameboard = (function() {
    const row1 = [null, null, null];
    const row2 = [null, null, null];
    const row3 = [null, null, null];
    return {row1, row2, row3};
})();

function setPlayers(){
    let p1 = {};
    let p2 = {};
    p1.name = prompt("Enter a name of first player (O):");
    p2.name = prompt("Enter a name of second player (X):");
    p1.sign = "O";
    p2.sign = "X";
    return {p1, p2};
};



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
        }
    }

    console.log(`Winner is ${lastPlayed}`);
    console.table(gameboard);
}