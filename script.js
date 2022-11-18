function rollTheDice(){
    let sides = checkFaces();
    let randomNumber = Math.floor(Math.random() * sides) + 1;
    return randomNumber;
};

function printNumber(number) {
    let diceResult = document.getElementById('diceResult');
    diceResult.innerHTML = number;
};

function roll(){
    let rollResult = rollTheDice();
    printNumber(rollResult);
    
};

function checkFaces() {
    let faces = document.querySelector('input[name="face"]:checked').value;
    return faces;

};
