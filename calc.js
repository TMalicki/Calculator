// try to use one variable and than assign it to firstValue or secondValue
// percentage needs rework

let calcButtons = new Array(24);

let displayedValue = "";
let firstValue;
let secondValue;
let chosenSign;
let storedSign = "";
let actualValue = "";
let fullEquation = "";
let signToChoose = false;

function start()
{
    let divContent = "";

    calcButtons[0] = "%";
    calcButtons[1] = "CE";
    calcButtons[2] = "C";
    calcButtons[3] = '<i class="icon-cancel-alt"> </i>';
    calcButtons[4] = "1/x";
    calcButtons[5] = '<i class="icon-math"> </i>';
    calcButtons[6] = '<i class="icon-superscript"> </i>';
    calcButtons[7] = '<i class="icon-divide"> </i>';
    calcButtons[8] = "7";
    calcButtons[9] = "8";
    calcButtons[10] = "9";
    calcButtons[11] = '<i class="icon-cancel"> </i>';
    calcButtons[12] = "4";
    calcButtons[13] = "5";
    calcButtons[14] = "6";
    calcButtons[15] = '<i class="icon-minus"> </i>';
    calcButtons[16] = "1";
    calcButtons[17] = "2";
    calcButtons[18] = "3";
    calcButtons[19] = '<i class="icon-plus"> </i>';
    calcButtons[20] = "+/-";
    calcButtons[21] = "0";
    calcButtons[22] = ",";
    calcButtons[23] = '<i class="icon-eq"> </i>';
    
    for(let i = 0; i <24; i++)
    {
        divContent += '<div class = "buttons" onclick = "chosenTile(' + i + ')" id = "nr' + i + '">' + calcButtons[i] + '</div>'; 
    }

    document.getElementById("calcBody").innerHTML = divContent;
    document.getElementById("fastInput").innerHTML = 0;
    document.getElementById("equation").innerHTML = 0;
}

function chosenTile(index)
{
    let tempEquation = "";
    
    if(calcButtons[index] == "0" || calcButtons[index] == "1" || calcButtons[index] == "2" || calcButtons[index] == "3"
        || calcButtons[index] == "4" || calcButtons[index] == "5" || calcButtons[index] == "6" || calcButtons[index] == "7"
        || calcButtons[index] == "8" || calcButtons[index] == "9")
        {          
           addNumber(index);
        }
    else if(calcButtons[index] == '<i class="icon-plus"> </i>')
    {
        addOperator("+");
    } 
    else if(calcButtons[index] == '<i class="icon-minus"> </i>')
    {
        addOperator("-")
    }
    else if(calcButtons[index] == '<i class="icon-cancel"> </i>')
    {
        addOperator("*");
    }
    else if(calcButtons[index] == '<i class="icon-divide"> </i>')
    {
        addOperator("/");
    }
    else if(calcButtons[index] == "%")
    {
        addOperator("%");
    }
    else if(calcButtons[index] == '<i class="icon-eq"> </i>')
    {
        signToChoose = false;
    }
    else if(calcButtons[index] == "C")
    {
        clearAll();
    }

    if(firstValue != undefined && secondValue == undefined) fullEquation += firstValue;
    else if(secondValue != undefined) fullEquation += secondValue;
    
    if(firstValue != undefined && secondValue != undefined && chosenSign != undefined && signToChoose == false)
    {
        doMath(chosenSign, firstValue, secondValue);
        firstValue = actualValue;
        secondValue = undefined;

        chosenSign = storedSign;
        storedSign = "";

        fullEquation += chosenSign;
        console.log('ActualValue: ' + actualValue);
   }   

    if(actualValue != "" && fullEquation != "")
    {
        console.log('OK');
        document.getElementById("fastInput").innerHTML = actualValue;
        document.getElementById("equation").innerHTML = fullEquation;
    }
}

function doMath(chooseSign, firstValue, secondValue)
{
    switch(chosenSign)
    {
        case "+": 
            actualValue = Number(firstValue) + Number(secondValue);
            break;
        case "-":
            actualValue = Number(firstValue) - Number(secondValue);
            break;
        case "*":
            actualValue = Number(firstValue) * Number(secondValue);
            break;
        case "/":
            if(secondValue == 0) actualValue = "Cannot divide by zero.";
            else    actualValue = Number(firstValue) / Number(secondValue);
            break;
        case "%":
            actualValue = Number(firstValue) % Number(secondValue);
            break;
    }
}
function clearAll()
{
    displayedValue = "";
    firstValue = undefined;
    secondValue = undefined;
    chosenSign = undefined;
    storedSign = "";
    actualValue = "";
    fullEquation = "";
    signToChoose = false;
    document.getElementById("fastInput").innerHTML = 0;
    document.getElementById("equation").innerHTML = 0;
}
function addOperator(operator)
{
    if(secondValue == undefined) chosenSign = operator;
    else storedSign = operator;
    signToChoose = false;
}
function addNumber(index)
{
    //let actualNumber = calcButtons[index];
    if(firstValue != undefined && chosenSign != undefined)
    {
        if(secondValue != undefined) 
        {
            secondValue += calcButtons[index];
        }
        else
        {
            secondValue = calcButtons[index];
        }
        actualValue = secondValue;
        signToChoose = true;
    }
    else
    {
        if(firstValue != undefined)
        {
            firstValue += calcButtons[index];
        }
        else
        {
            firstValue = calcButtons[index];
        }
        actualValue = firstValue;
        signToChoose = true;
    }
}

window.onload = start;