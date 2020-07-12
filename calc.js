// percentage needs rework
// CE needs to be made

let calcButtons = new Array(24);

let displayedValue = "";
let firstValue;
let secondValue;
let chosenSign;
let storedSign = undefined;
let actualValue = "";
let fullEquation = "";
let signToChoose = false;
let actualNumber;

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
    debugger;
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
        addOperator("=");
    }
    else if(calcButtons[index] == '<i class="icon-superscript"> </i>')
    {
        addOperator("^2");
    }
    else if(calcButtons[index] == '<i class="icon-math"> </i>')
    {
        addOperator("sqrt");
    }
    else if(calcButtons[index] == "1/x")
    {
        addOperator("1/x");
    }
    else if(calcButtons[index] == '<i class="icon-cancel-alt"> </i>')
    {
        addOperator("<-");
    }
    else if(calcButtons[index] == ",")
    {
        addOperator(",");
    }
    else if(calcButtons[index] == "+/-")
    {
        addOperator("+/-");
    }
    else if(calcButtons[index] == "%")
    {
        addOperator("%");
    }
    else if(calcButtons[index] == "CE")
    {
        addOperator("CE");
    }
    else if(calcButtons[index] == "C")
    {
        clearAll();
    }

    update();
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
        case "^2":
            actualValue = Math.pow(actualValue, 2);
            break;
        case "sqrt":
            actualValue = Math.sqrt(actualValue);
            break;
        case "1/x":
            actualValue = 1/actualValue;
            break;
    }
}
function clearAll()
{
    firstValue = undefined;
    secondValue = undefined;
    chosenSign = undefined;
    //actualNumber = "0.";
    storedSign = "";
    actualValue = "";
    fullEquation = "";
    signToChoose = false;
    document.getElementById("fastInput").innerHTML = 0;
    document.getElementById("equation").innerHTML = 0;
}
function addOperator(operator)
{
    if(operator == "<-")
    {
        deleteLastDigit();
        operator = undefined;
    }
    if(operator == "CE")
    {
        actualValue = "";
        if(actualValue == "")
        {
            document.getElementById("fastInput").innerHTML = 0;
        }
        actualNumber = actualValue;
        operator = undefined;
    }
    else if(operator == ",")
    {
        actualValue += ".";
        if(actualNumber == undefined) actualNumber = actualValue;
        else actualNumber += ".";

        if(firstValue != undefined)
        {
            clearAll();
            actualNumber = "0.";
        }
        //if(actualNumber != undefined) actualNumber += "."
        operator = undefined;
    }
    else if(operator == "+/-")
    {
        actualValue = -actualValue;
        if(!isNaN(actualNumber)) actualNumber = - actualNumber;
        if(firstValue != undefined) firstValue = - firstValue;
        operator = undefined;
    }
    else if(operator == "%")
    {
        actualValue = actualValue/100;
        if(!isNaN(actualNumber)) actualNumber = actualNumber / 100;
       // if(firstValue != undefined) firstValue = firstValue / 100;
        operator = undefined;
    }
    else
    {
        updateNumber();

        if(secondValue == undefined && (operator == "^2" || operator == "sqrt" || operator == "1/x")) 
        {
            chosenSign = operator;
            doMath(chosenSign, firstValue, secondValue);
         //   firstValue = undefined;
        }
        else if(secondValue == undefined)
        {
            chosenSign = operator;
        }
        else
        {
            doMath(chosenSign, firstValue, secondValue);
            storedSign = operator;
        } 
        actualNumber = undefined;

        writeFullEquation();
    }
    
    if(operator != undefined) chosenSign = operator; 
}

function addNumber(index)
{ 
    if(actualNumber == undefined) actualNumber = calcButtons[index];
    else actualNumber += calcButtons[index];

   // if(actualValue == undefined) actualValue = actualNumber;
   // else actualValue += actualNumber;
    actualValue = actualNumber;
    signToChoose = true;
}

function deleteLastDigit()
{
    actualValue = actualValue.toString().slice(0,-1);
    if(actualValue == "")
    {
        document.getElementById("fastInput").innerHTML = 0;
    }
    actualNumber = actualValue;
}

function update()
{
    if(fullEquation[fullEquation.length-1] == "=") fullEquation = "";
    if(firstValue != undefined && secondValue != undefined && chosenSign != undefined && signToChoose == false)
    {
        chosenSign = storedSign;
        storedSign = "";

        firstValue = actualValue;
        secondValue = undefined;
    }   

    if(actualValue != "")    document.getElementById("fastInput").innerHTML = actualValue;
    if(fullEquation != "")   document.getElementById("equation").innerHTML = fullEquation;
}

function writeFullEquation()
{ 
    if(isNaN(parseFloat(fullEquation[fullEquation.length - 1])) && signToChoose == false)
    {
        if(fullEquation == "") 
        {
            if(storedSign != "") fullEquation += firstValue + storedSign;
            else fullEquation += firstValue + chosenSign;
        }
        else fullEquation = fullEquation.slice(0,-1) + chosenSign;
    }
    else
    {
        if(secondValue == undefined) fullEquation += firstValue;
        else fullEquation += secondValue;

        if(chosenSign == "1/x")
        {
            fullEquation = fullEquation.slice(0,-3);
            fullEquation = "1/" + fullEquation;
        }
        else if(chosenSign == ",") {}
        else if(storedSign == "=") fullEquation += "=";
        else fullEquation += chosenSign;
    }

    if(secondValue != undefined) 
    {
        fullEquation += secondValue;
        if(chosenSign == "1/x")
        {
            fullEquation = fullEquation.slice(0,-3);
            fullEquation = "1/" + fullEquation;
        }
        else if(chosenSign == ",") {}
        else if(storedSign != undefined) fullEquation += storedSign;
        else fullEquation += chosenSign;
    }
    
    document.getElementById("equation").innerHTML = fullEquation;
}

function updateNumber()
{
    if(firstValue == undefined)
    {
        if(actualNumber == undefined) firstValue = actualValue;
        else firstValue = actualNumber;
    } 
    else if(secondValue == undefined) 
    {
        secondValue = actualNumber
        signToChoose = false;
    }
}

window.onload = start;