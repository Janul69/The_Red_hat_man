
//start screen var. and funcns.
var strtScrn = document.getElementById("startScreen");
var startScreenWorker = 0;
function start() {
    strtScrn.style.visibility="visible";
}


//sound
var runSound = new Audio("run.mp3");
runSound.loop = true;
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");

function keycheck(event) {

    if (event.which == 13) {

            strtScrn.style.visibility="hidden";
            if (runWorkerId == 0) {
                runWorkerId = setInterval(run,100);
                runSound.play();
                startScreenWorker = 1;
                backgroundWorkerId = setInterval(moveBackground,100);
                scoreWorkerId = setInterval(updateScore,100);
                blockWorkerId = setInterval(createBlocks,100);
                moveBlockWorkerId = setInterval(moveBlocks,100);
    
            }

        }
      


    if (event.which == 32) {
        if (startScreenWorker == 1) {

            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runWorkerId = -1;
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
                runSound.pause();
            }

        }
    } 
 
}

         

    

//run var.
var player = document.getElementById("player")
var runWorkerId = 0;
var runImageNumber = 1;

//run func.
function run() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 9) {
        runImageNumber = 1;

    }

    player.src = "Run ("+ runImageNumber +").png";

}

//jump var.
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 320;


//jump func.
function jump() {
    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber <= 7) {
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber >= 8) {
         playerMarginTop = playerMarginTop + 30;
         player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run, 100);
        runSound.play();
        jumpWorkerId = 0;
    }

    player.src = "Jump ("+ jumpImageNumber +").png";

    
}


//background var. and func.
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX +"px";

}

var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore() {
    newScore = newScore + 1;
    score.innerHTML = newScore;

}

//block var. and func.
var blockWorkerId = 0;
var blockMarginLeft = 500;
var blockId = 1;

function createBlocks() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;
    
    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

}

var moveBlockWorkerId = 0;

function moveBlocks() {

    for ( var i=1; i<=blockId; i++) {
        var currentBlock = document.getElementById("block" +i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft <= 180) {

            if (newMarginLeft >= 80) {

                if (playerMarginTop <= 320) {
                    if (playerMarginTop >= 280) {
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(blockWorkerId);
                        clearInterval(moveBlockWorkerId);
                        clearInterval(scoreWorkerId);

                        deadWorkerId = setInterval(dead, 100);
                        deadSound.play();
                    }
                }
            }
        }

    }

}

var deadImageNumber = 1;
var deadWorkerId = 0;

function dead() {
    deadImageNumber++;
    if (deadImageNumber == 10) {
        clearInterval(deadWorkerId);
        player.style.marginTop = "320px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("text2").innerHTML = "Your Score - " + newScore;

    }

    player.src = "Dead (" + deadImageNumber + ").png";

}

function reload() {
    location.reload();

}

 



