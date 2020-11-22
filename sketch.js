var tower,towerImg
var door,doorImg
var climber,climberImg
var ghost,ghostImg
var PLAY = 0
var END = 1
var gameState= PLAY;
var lava,lavasGroup
var spookySound

function preload()
{
  towerImg=loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg=loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
}

function setup()
{
  spookySound.loop();
  createCanvas(600,600) ;
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImg);
  tower.velocityY=4;
  
  ghost=createSprite(300,300,2,23);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  ghost.setCollider("rectangle",0,0,110,ghost.height)
  
  climbersGroup= new Group();
  lavasGroup=new Group();
}

function draw()
{
   ghost.velocityY=ghost.velocityY+0.1;
   
  if(gameState===PLAY){
     if(tower.y>600)
    {
      tower.y = 300
    }
  
   if(keyDown("space")){
      ghost.velocityY=-3;
     
      }
     
    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+5
    }
  
   if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-5
    }
   
   if(ghost.isTouching(lavasGroup)||ghost.y>650){
     gameState=END;
   }
  
  ghost.collide(climbersGroup)
  
   spawnDoor();
   drawSprites(); 
   
  }
  
  else if(gameState===END) 
    {
      background("black")
      textSize(50 )
      fill("red")
      text("gameover",300,300)
      
    }
}

function spawnDoor()
{
  if( frameCount % 200 === 0)
  {
     door=createSprite(random(60,530),-40,34,43); 
     door.velocityY=2;
     door.addImage(doorImg)
     door.lifetime=320;
     
     climber= createSprite(door.x,25,34,43) ;
     climber.addImage(climberImg);
     climber.velocityY=2;
     climber.lifetime = 320;
     climbersGroup.add(climber)
    
     lava=createSprite(climber.x,climber.y+10,climber.width,4)
    lava.velocityY=2;
    lava.visible=false;                                 lava.lifetime=320
    lavasGroup.add(lava)
    
    ghost.depth=door.depth+2;
    
 }
  console.log(frameCount)
}




