function rollTheDice(){
    var sides = checkFaces();
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    return randomNumber;
};

function printNumber(number) {
    var diceResult = document.getElementById('diceResult');
    diceResult.innerHTML = number;
};

function roll(){
    var rollResult = rollTheDice();
    printNumber(rollResult);
    
};

function checkFaces() {
    let faces = document.querySelector('input[name="face"]:checked').value;
    return faces;

};
