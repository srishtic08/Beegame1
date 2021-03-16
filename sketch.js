var balloonImg, pinkB, blueB, purpleB, yellowB;
var red, pink, blue, purple, yellow;
var beeImg, coinImg;
var backgroundImg;
var backImg = "background.jpg"
var score ;
var beeGroup, coinGroup;
var gameover, gameoverImg, restart, restartImg;
var song, beep, over, pop;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var counter = 0;

function preload(){
    balloonImg = loadImage("balloon.png");
    beeImg = loadImage("bee.png")
    //backgroundImg = loadImage("background.jpg")
    pinkB = loadImage("pinkB.png")
    purpleB = loadImage("purpleB.png")
    blueB = loadImage("blueB.png")
    yellowB = loadImage("yellowB.png")
    coinImg = loadImage("coin.png")
    gameoverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");
    song = loadSound("song.wav")
    // beep = loadSound("beep.wav")
    // over = loadSound("gameover.wav")
    // pop = loadSound("sound2.wav")
    
    getBackgroundImg();
}

function setup(){
canvas = createCanvas(windowWidth, windowHeight);

red = createSprite( 200, 300)
red.addImage(balloonImg)
red.scale = 0.6;
// red.debug = true;
// red.setCollider("rectangle", 0,0,80,red.height)

pink = createSprite( 150, 370)
pink.addImage(pinkB)
pink.scale = 0.6;
// pink.debug = true;
// pink.setCollider("rectangle", 0,0,80,pink.height)

yellow = createSprite( 270, 325)
yellow.addImage(yellowB)
yellow.scale = 0.6;
// yellow.debug = true;
// yellow.setCollider("rectangle", 0,0,80,yellow.height)

blue = createSprite( 260, 380)
blue.addImage(blueB)
blue.scale = 0.6;
// blue.debug = true;
// blue.setCollider("rectangle", 0,0,80,blue.height)

purple = createSprite( 200, 400)
purple.addImage(purpleB)
purple.scale = 0.6;
// purple.debug = true;
// purple.setCollider("rectangle", 0,0,80,purple.height)


beeGroup = new Group();
coinGroup = new Group();
balloonGroup = new Group();

score = 0; 
gameover = createSprite(600, 100);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5
  restart = createSprite(600, 250);
  restart.addImage(restartImg);
  restart.scale = 0.5
  restart.debug = true;
  // restart.setCollider("circle", 0,0,100)
  gameover.visible=false;
  restart.visible=false;


  //song.loop();

}

function draw(){
  
  
  if(backgroundImg)
  background(backgroundImg);

    balloonGroup.add(yellow)
    balloonGroup.add(red)
    balloonGroup.add(blue)
    balloonGroup.add(pink)
    balloonGroup.add(purple)
    camera.position.y = balloonGroup.y;

    if(gameState === PLAY){
    
     if(coinGroup.isTouching(red)){
       score = score+1;
    }  
    if(coinGroup.isTouching(yellow)){
      score = score+1;
   }  
   if(coinGroup.isTouching(blue)){
    score = score+1;
 }  
    if(coinGroup.isTouching(purple)){
    score = score+1;
  }  
  if(coinGroup.isTouching(pink)){
    score = score+1;
 }  

//   if(bg.y<0){
//    bg.y =i bg.height/2
//    red.y = bg.y
//    yellow.y = bg.y
//    blue.y = bg.y
//    purple.y = bg.y
//    pink.y = bg.y
//  }

if (keyDown(RIGHT_ARROW)) {
    red.x = red.x+5;
    blue.x = red.x +60
    purple.x = red.x
    yellow.x = red.x +70
    pink.x = red.x -5
    
  }
  
  
  if (keyDown(LEFT_ARROW)){
    red.x = red.x - 5;
    blue.x = red.x + 60
    purple.x = red.x
    yellow.x = red.x + 70
    pink.x = red.x - 5
    
  }
  
  
  if (keyDown(UP_ARROW)) {
    red.y = red.y-5;
    blue.y = blue.y-5
    purple.y = purple.y-5
    yellow.y = yellow.y-5
    pink.y = pink.y-5
  }
   
  if (keyDown(DOWN_ARROW)) {
    red.y = red.y+5;
    blue.y = red.y + 80
    purple.y = red.y + 100
    yellow.y = red.y + 25
    pink.y = red.y + 70
  } 

  

spawncoins();
spawnBees();
if(beeGroup.isTouching(red)){
  red.destroy(); 
  counter = counter+1
}

if(beeGroup.isTouching(blue)){
  blue.destroy(); 
  counter = counter+1
}

if(beeGroup.isTouching(purple)){
  purple.destroy(); 
  counter = counter+1
}

if(beeGroup.isTouching(yellow)){
  yellow.destroy(); 
  counter = counter+1
}

if(beeGroup.isTouching(pink)){
  pink.destroy(); 
  counter = counter+1
}
if(counter === 5){
  gameState = END

}
}

else if(gameState === END){
  gameover.visible = true;
    restart.visible = true;

    beeGroup.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
    beeGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    console.log(2)
  if(mousePressedOver(restart)) {
    console.log(3)
    reset();
  }
}
// if(coinGroup.isTouching(red)){
//   coin.destroy();
// }

// if(coinGroup.isTouching(blue)){
//   coin.destroy();
// }

// if(coinGroup.isTouching(purple)){
//   coin.destroy();
// }

// if(coinGroup.isTouching(pink)){
//   coin.destroy();
// }

// if(coinGroup.isTouching(yellow)){
//   coin.destroy();
// }



drawSprites();

fill("yellow")
textSize(30)
text("Score: "+ score, 500,50);
}

function spawnBees(){
    if(frameCount % 100 === 0){
        var bee = createSprite( 400, 400,)
        bee.debug = true;
        bee.setCollider("circle", 0,0,150)
        bee.y = Math.round(random(0,400))
        bee.x = Math.round(random(0,800))
        bee.addImage(beeImg)
        bee.scale = 0.19;
        bee.velocityY = 3 
        bee.lifetime = 200;
      beeGroup.add(bee)
    
    }
}

function spawncoins(){
  if(frameCount % 80 === 0){
      var coin = createSprite( 400, height)
      coin.debug = true;
      coin.setCollider("circle", 0,0,80)
      coin.y = Math.round(random(800,120))
      coin.x = Math.round(random(800,120))
      coin.addImage(coinImg)
      coin.scale = 0.2;
      coin.velocityY = 3 
     coin.lifetime = 200;
     coinGroup.add(coin)
  
  }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=18){
        backImg = "background.jpg";
    }
    else{
        backImg = "nightSky.jpg";
    }

    backgroundImg = loadImage(backImg);
}

function reset(){
  console.log(1)
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  beeGroup.destroyEach();
  coinGroup.destroyEach();
  score = 0;
  counter = 0;
}



