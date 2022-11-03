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

function checkFaces(){

    var d2 = document.getElementById("d2");
    var d4 = document.getElementById("d4");
    var d6 = document.getElementById("d6");
    var d8 = document.getElementById("d8");
    var d10 = document.getElementById("d10");
    var d12 = document.getElementById("d12");
    var d20 = document.getElementById("d20");

    if(d2.checked == true)
        return 2;
    else if(d4.checked == true)
        return 4;
    else if(d6.checked == true)
        return 6;
    else if(d8.checked == true)
        return 8;
    else if(d10.checked == true)
        return 10;
    else if(d12.checked == true)
        return 12;
    else if(d20.checked == true)
        return 20;
        
};
