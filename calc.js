function start()
{
    let divContent = "";
    let calcButtons = new Array(24);

    calcButtons[0] = "%";
    calcButtons[1] = "CE";
    calcButtons[2] = "C";
    calcButtons[3] = '<i class="icon-cancel-alt"> </i>';
    calcButtons[4] = "t";
    calcButtons[5] = "t";
    calcButtons[6] = "t";
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
        divContent += '<div class = "buttons" id = "nr' + i + '">' + calcButtons[i] + '</div>'; 

    }

    document.getElementById("calcBody").innerHTML = divContent;
}

window.onload = start;