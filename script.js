let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let totalTime = 10;
let displayTime = document.getElementById("theTime");
let counting = 0;
let trackClicks = document.getElementById("clickCounter");
let trackTotal = document.getElementById("totalCirclesCounter");
let clickedOnCircles = 0;
let totalOrangeCircles = 0;

initialCircles();

function initialCircles(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    totalTime = 10;
    displayTime.innerHTML = "Timer: " + totalTime;
    context.beginPath();
    context.fillStyle = "orange";
    context.arc(500, 250, 25, 0, 2 * Math.PI);
    context.fill();
    canvas.onclick = function(){
        let theClick = context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
        if (event.offsetX >= 475 && event.offsetX <= 525 && event.offsetY >= 225 && event.offsetY <= 275){
            startGame();
        }
    }
}

function startGame(){
    let menuSelection = document.getElementById("fillPercent").value;
    menuSelection = Number(menuSelection);
    // console.log("Obtained Value: " + menuSelection);
    // let initialIsClicked = false;
    // initialCircle();
    drawCircle(menuSelection);
}

function drawCircle(menuSelection){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // let totalCircles = 200 * (menuSelection / 100);
    // console.log("Transferred value: " + menuSelection);
    for (let i = 25; i < canvas.width; i += 50){
        for(let j = 25; j < canvas.height; j += 50){
            let randomDraw = 0;
            let colour = "";
            // Fix math random not working!!!
            // Problem was that .value doesn't get integer but rather String
            switch (menuSelection){
                // case 10:
                //     randomDraw = Math.trunc(Math.random() * 10);
                //     // console.log("In switch: " + randomDraw);
                //     break;
                // case 25:
                //     randomDraw = Math.trunc(Math.random() * 4);
                //     // console.log("In switch: " + randomDraw);
                //     break;
                // case 50:
                //     randomDraw = Math.trunc(Math.random() * 2);
                //     // console.log("In switch: " + randomDraw);
                //     break;
                case 100:
                    randomDraw = 0;
                    break;
                default:
                    randomDraw = Math.trunc(1 + (Math.random() * 100));
                    if (randomDraw < menuSelection){
                        randomDraw = 0;
                    }
                    else
                        randomDraw = 1;
                    break;
            }
            // console.log("The value for 10/20/50 chance is: " + randomDraw);
            // if (menuSelection >= 60 && menuSelection < 100){
                // randomDraw = Math.random() * (100 / menuSelection);
                // if (randomDraw >= 0.5){
                //     randomDraw = Math.ceil(randomDraw);
                // }
                // else
                //     randomDraw = Math.floor(randomDraw);
            // }
            // console.log("The value for any chance is: " + randomDraw);
            let colourChooser = Math.trunc(Math.random() * 5);
            switch (colourChooser){
                case 0:
                    colour = "orange";
                    break;
                case 1:
                    colour = "blue";
                    break;
                case 2:
                    colour = "green";
                    break;
                case 3:
                    colour = "red";
                    break;
                case 4:
                    colour = "grey";
                    break;
            }
            if (randomDraw == 0){
                context.beginPath();
                context.fillStyle = colour;
                if (colour == "orange"){
                    totalOrangeCircles++;
                    trackTotal.innerHTML = "Total Circles: " + totalOrangeCircles;
                }
                context.arc(i, j, 25, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }
    if (totalOrangeCircles == 0){
        drawCircle(menuSelection);
    }
    counting = setInterval(theTimer, 1000);
    detectClick(counting);
}

function theTimer(){
    totalTime--;
    displayTime.innerHTML = "Timer: " + totalTime;
    if (totalTime === 0){
        alert("You ran out of time! \nYour score: " + clickedOnCircles + " out of " + totalOrangeCircles);
        clearInterval(counting);
        clickedOnCircles = 0;
        totalOrangeCircles = 0;
        trackTotal.innerHTML = "Total Circles: 0";
        trackClicks.innerHTML = "Circles Clicked: 0";
        initialCircles();
    }
}
function detectClick(counting){
    // console.log("Checking");
    let counter = 0;
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    let red = 255;
    let green = 165;
    let blue = 0;
    let alpha = 255;
    // console.log("The total amount of orange circles is " + totalOrangeCircles);
    canvas.onclick = function(){
        let pxlData = context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
        let remainderX = 0;
        let remainderY = 0;
        let hasRemainderX = false;
        let hasRemainderY = false;
        for (let i = 0; i < data.length; i++){
            if (pxlData[i * 4 + 0] == red && pxlData[i * 4 + 1] == green && pxlData[i * 4 + 2] == blue && pxlData[i * 4 + 3] == alpha){
                counter++;
                // console.log(counter);
                // console.log("Location X: " + event.offsetX + " Location: Y " + event.offsetY);
                for (let j = 25; j < canvas.width; j += 50){
                    for (let k = 25; k < canvas.height; k += 50){
                        if (hasRemainderX == false && j > event.offsetX && j - event.offsetX <= 25){
                            // remainderX = j - event.offsetX;
                            remainderX = j;
                            hasRemainderX = true;
                            break;
                        }
                        
                        if (hasRemainderX == false && j < event.offsetX && event.offsetX - j <= 25){
                            // remainderX = event.offsetX - j;
                            remainderX = j;
                            hasRemainderX = true;
                            break;
                        }

                        if (hasRemainderX == false && j == event.offsetX){
                            remainderX = j;
                            hasRemainderX = true;
                            break;
                        }


                        if (hasRemainderY == false && k > event.offsetY && k - event.offsetY <= 25){
                            // remainderY = k - event.offsetY;
                            remainderY = k;
                            hasRemainderY = true;
                            break;
                        }

                        if (hasRemainderY == false && k < event.offsetY && event.offsetY - k <= 25){
                            // remainderY = event.offsetY - k;
                            remainderY = k;
                            hasRemainderY = true;
                            break;
                        }

                        if (hasRemainderY == false && k == event.offsetY){
                            remainderY = k;
                            hasRemainderY = true;
                            break;
                        }
                    }
                    if (hasRemainderX == true && hasRemainderY == true){
                        trackClicks.innerHTML = "Circles Clicked: " + (++clickedOnCircles);
                        break;
                    }
                }
                if (clickedOnCircles == totalOrangeCircles){
                    alert("Congratulations! You win!\nYour score: " + clickedOnCircles + " out of " + totalOrangeCircles + "!");
                    clearInterval(counting);
                    // counting = 10;
                    clickedOnCircles = 0;
                    totalOrangeCircles = 0;
                    trackTotal.innerHTML = "Total Circles: 0";
                    trackClicks.innerHTML = "Circles Clicked: 0";
                    initialCircles();
                }
                // console.log("Coordinate: " + remainderX + " and " + remainderY + " will be deleted!");
                context.clearRect(remainderX - 25, remainderY - 25, 50, 50);
                break;
            }
        }
    }
}

// Hardest Part: making the removal of orange circles work
// creating the timer
// making the circles print out properly in Canvas