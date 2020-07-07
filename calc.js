let calcButtons = new Array(24);
let calculation = "";
let lastEquation = 0;
let flag = false;

function start()
{
    let divContent = "";

    calcButtons[0] = "%";
    calcButtons[1] = "CE";
    calcButtons[2] = "C";
    calcButtons[3] = '<i class="icon-cancel-alt"> </i>';
    calcButtons[4] = "t";
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
}

function chosenTile(index)
{
    let equation = "";
   
    if(calcButtons[index] == "0" || calcButtons[index] == "1" || calcButtons[index] == "2" || calcButtons[index] == "3"
        || calcButtons[index] == "4" || calcButtons[index] == "5" || calcButtons[index] == "6" || calcButtons[index] == "7"
        || calcButtons[index] == "8" || calcButtons[index] == "9")
        {
            calculation += calcButtons[index];
            equation = calculation;
            flag = true;
        }
    else if(calcButtons[index] == '<i class="icon-plus"> </i>' && flag == true)
    {
        equation = String(Number(document.getElementById("fastInput").innerHTML ) + Number(lastEquation));
        lastEquation = equation;
        calculation = "";
        flag = false;
    } 
    else if(calcButtons[index] == '<i class="icon-minus"> </i>' && flag == true)
    {
        equation = String(Number(document.getElementById("fastInput").innerHTML ) - Number(lastEquation));
        lastEquation = equation;
        calculation = "";
        flag = false;
    }
    else if(calcButtons[index] == '<i class="icon-minus"> </i>')
    {
        document.getElementById("fastInput").innerHTML = equation;
    }
    else if(calcButtons[index] == "C")
    {
        equation = "";
        lastEquation = "";
        calculation = "";
        flag = false;
    }
    else
    {
        equation = document.getElementById("fastInput").innerHTML;
    }
    document.getElementById("fastInput").innerHTML = equation;
}

window.onload = start;