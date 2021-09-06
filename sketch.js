var ghost, ghostImage, tower, towerImage;
var door, doorImage, doorGroup, climber, climberImage, climberGroup, invisibleBlock, invisibleGroup;
PLAY = 1;
END = 0;
var gameState = PLAY;

function preload(){
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  background("white")
  
  tower = createSprite(windowWidth/2,windowHeight/2)
  tower.addImage("tower", towerImage)
  tower.velocityY = 2;
  
  ghost = createSprite(windowWidth/2,windowHeight/2)
  ghost.addImage("ghost", ghostImage)
  ghost.scale = 0.3

  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
}

function draw(){
  background("white")
  if(gameState = PLAY){
  spawnObstacles();
  if(keyDown("space")){
    ghost.velocityY = -12;
  }
  ghost.velocityY = ghost.velocityY + 0.5 
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5
  }
  
  if(tower.y>windowHeight){
    tower.y = windowHeight/2
  }
  
  
  if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroup.isTouching(ghost) || ghost.y > windowHeight || ghost.y<0){
      ghost.destroy();
      gameState = END;
    }
  }
  
  
  drawSprites();
  if (gameState ===  END){
    background("white")
    stroke("teal");
    fill("teal");
    textSize(70);
    text("Game Over", 430,350)
  }
}

function spawnObstacles(){
  if(frameCount%400 === 0){
    door = createSprite(500, -50)
    door.x = Math.round(random(550, 700))
    door.addImage(doorImage)
    door.velocityY = 2
    doorGroup.add(door)
    door.lifetime = 700
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    
    climber = createSprite(500, 0)
    climber.addImage(climberImage)
    climber.x = door.x
    climber.velocityY = 2
    climberGroup.add(climber)
    climber.lifetime = 700

    
    invisibleBlock = createSprite(500, 15)
    invisibleBlock.x = door.x
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 2;
    invisibleGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 700
    invisibleBlock.visible=false

    
  }
}
