var monkey, monkeyimg ,monkey_still ;

var jungle, jungleimg ;

var ground;

var banana, bananaimg, banG ;

var stone, stoneimg ;

var eat, score, stonG ;

var gameState ;

function preload(){
  
  jungleimg = loadImage("jungle.jpg");
  
  stoneimg = loadImage("stone.png");
  
  bananaimg = loadImage("banana.png");
  
  monkey_still=loadImage("Monkey_03.png");
  
  monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  
  createCanvas(800,400);

  jungle=createSprite(400,150);
  jungle.addImage(jungleimg);
  jungle.velocityX=-4;
  jungle.scale=1.2;
  
  ground = createSprite(400,365,800,10);
  ground.visible=false;

  monkey = createSprite(200,320,0,0);
  monkey.addAnimation("running",monkeyimg);
  monkey.scale=0.14;
  monkey.addAnimation("still",monkey_still);
  
  banG = new Group();
  stoG = new Group();
  
  gameState = "play";
  
  eat = 0;
  score = 0;
  
}

function draw(){
  
  
  if(keyDown("space") && monkey.collide(ground) && gameState==="play"){
    monkey.velocityY=-16;
  } 
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  
 if(gameState==="play"){
  
   if (jungle.x < 200){
    jungle.x = jungle.width/2;
  }
   
  if(frameCount%120===0){
    bananas();     
  } 
  
  if(frameCount%200===0){
    obstacles();  
  } 
   
   if(banG.isTouching(monkey)){
     banG.destroyEach();
     eat=eat+2;
  }
  
  if(stoG.isTouching(monkey)){
    stoG.destroyEach();
    gameState="end";    
  }
   
   switch (eat){
  
    case 0:
      monkey.scale=0.14;
      break;
      
    case 10:
      monkey.scale=0.17;
      break;
      
    case 20:
      monkey.scale=0.2;
      break;
      
    case 30:
      monkey.scale=0.24;
      break;
  
   }
  }else if(gameState==="end"){
  
   jungle.velocityX=0;
    
   banG.destroyEach();
   
   monkey.changeAnimation("still",monkey_still);
    
   if(frameCount%10===0){
     score=score-1;   
  }
    
     
  }
  
   drawSprites();  
  
   fill("yellow");
  textSize(20);
  if(frameCount%10===0){
     score=score+1;
  }
  text("Score= "+score,520,55 ); 
  text("BP Earned : "+ eat,500,30);
  
}
  


function bananas(){
  
 banana =  createSprite(815,random(150,250),0,0);
 banana.addImage(bananaimg); 
 banana.scale=0.06;
 banana.velocityX=-(6+score/70);
 banana.lifetime=220;
 banG.add(banana); 
  
}

function obstacles(){

  stones = createSprite(815,360,0,0);
  stones.addImage(stoneimg);
  stones.scale=0.2;
  stones.velocityX=-(6+score/70);
  stones.lifetime=220;
  stoG.add(stones);

}  




