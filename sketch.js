var monkey,monkeyrunning;
var banana,bananaimg;
var stone,stoneimg;
var jungle,jungleimg,ground;
var gamestate,PLAY,OVER;
var edges;
var bananas,stones;
var score;
function preload(){
monkeyrunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaimg=loadImage("banana.png");
stoneimg=loadImage("stone.png");
jungleimg=loadImage("jungle.jpg");
  

}

function setup() {
  createCanvas(500, 300);
  PLAY=1;
  END=0;
  gamestate=PLAY;
  jungle=createSprite(300,100,5,3);
  jungle.addImage("jungle1",jungleimg);
  jungle.scale=1;
  //jungle.visible=false;

  
  monkey=createSprite(50,270,20,20);
  monkey.addAnimation("running",monkeyrunning); 
  monkey.scale=0.1;
  //monkey.debug=true;
  
  ground=createSprite(250,300,500000000000000000000000,4);
  //ground.visible=false;
  
  bananas=createGroup();
  stones=createGroup();
  
  score=0;
  score.depth=score.depth+1;
  
}

function draw() {
  background('white');
   drawSprites();
  
  text(mouseX+","+mouseY,48,31);
  if(jungle.x<0){
  jungle.x=jungle.width/2;
  }
  
  //camera.position.x=0;
  camera.position.y=height/2;
  camera.visible=false;
  
  
  if(gamestate===PLAY){
    jungle.velocityX=7;
    monkey.velocityX=7;
    camera.position.x=camera.position.x+7;
    if(score===score+10){
      monkey.scale=monkey.scale+0.02;
    }
    if(monkey.y>268 &&monkey.scale===0.1){
    if(keyDown("space")){
     monkey.velocityY=-14; 
    }
    }
    if(monkey.y>260&&monkey.scale>0.1&&monkey.scale<0.13){
    if(keyDown("space")){
     monkey.velocityY=-14; 
    }
    }
    if(monkey.y>255&&monkey.scale<0.15){
    if(keyDown("space")){
     monkey.velocityY=-14; 
    }
    }
    if(monkey.y>249&&monkey.scale<0.17){
    if(keyDown("space")){
     monkey.velocityY=-14; 
    }
    }
    if(monkey.y>247&&monkey.scale<0.19){
    if(keyDown("space")){
     monkey.velocityY=-14; 
    }
    }
     if(monkey.y>240&&monkey.scale<0.21){
    if(keyDown("space")){
     monkey.velocityY=-16; 
    }
    }
     if(monkey.y>230&monkey.scale<0.24){
    if(keyDown("space")){
     monkey.velocityY=-17; 
    }
    }
    if(monkey.isTouching(bananas)&&monkey.scale<0.2){
       bananas.destroyEach();       
       monkey.scale=monkey.scale+0.02;
      score=score+2;
    }
       if(monkey.isTouching(bananas)){
         score=score+2;
         bananas.destroyEach();
       }
    if(monkey.isTouching(stones)){
    monkey.scale=monkey.scale-0.02;
      stones.destroyEach();
    }
    if(monkey.scale<0.1){
     gamestate=END; 
    }
    spawnbanana();
    spawnstones();
  } 
 switch(score){
   case 10&&monkey.scale<0.2:monkey.scale=monkey.scale+0.02;
        break;
   case 20&&monkey.scale<0.2:monkey.scale=monkey.scale+0.02;
        break;
   case 30&&monkey.scale<0.2:monkey.scale=monkey.scale+0.02;
        break;
   case 40&&monkey.scale<0.2:monkey.scale=monkey.scale+0.02;
        break;
   default:break;
        }
  //console.log(monkey.y);
  monkey.velocityY=monkey.velocityY+0.8; 
  monkey.collide(ground);
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,400,40);
  if (gamestate===END){
    stones.setVelocityXEach(0);
    bananas.setVelocityXEach(0);
    jungle.velocityX=0;
    monkey.velocityX=0;
    stones.setLifetimeEach(-1); 
    monkey.pause();
    text("Game Over",camera.position.x-40,150);
    text("Press Space To Restart",camera.position.x-70,200);
    if(keyDown("space") ){
      gamestate=PLAY;
      stones.destroyEach();
      bananas.destroyEach();
      monkey.play();
      monkey.scale=0.1;
    }
  }
  
}

function spawnbanana(){
  var posX=550;
 if(frameCount%200===0){
   posX=posX+1450;
   banana = createSprite(posX,random(130,260),20,20); 
   banana.addImage("banana",bananaimg);
   banana.velocityX=0;
   banana.scale=0.05;
   bananas.add(banana);
   bananas.setLifetimeEach=17;
 }
}

function spawnstones(){
  var posx=530;
  if(World.frameCount%120===0){ 
    posx=posx+1150;
    var stone=createSprite(posx,270,20,20);
    //giving the properties to the stone
    stone.addImage(stoneimg);
    //stone.velocityX=0;
    stone.scale=0.15;
    stone.lifetime=150;
    stones.add(stone);
    //stone.debug=true;
    stone.setCollider("rectangle",0,0,300,100);
  }
}




