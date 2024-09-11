/// NOTE ON THE COORDINATE SYSTEM ///
// The coordinates are set up so you can enter
// coordinates between 0 and 1200 for the width
// and 0 and 900 for the height and the 
// code will adjust to pixel accordingly

function preload(){
  img = loadImage('apartment.png')
  face = loadImage('scary_face_cropped.jpg')
  jumpscare = loadImage('scary_face.jpg')
  pickUp = false
  clicks = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // DRAW BLACK BACKGROUND //
  background(0)

  // IMAGE SIZE //
  imAspect = 900/1200
  imageWidth = windowWidth*0.8;
  imageHeight = imageWidth*imAspect;

  // DRAW APARTMENT //
  image(img, X_(0), Y_(0), imageWidth, imageHeight);
  c = color('black')
  c.setAlpha(140)
  fill(c)
  rect(X_(560), Y_(150), X_(150, adjust=false), Y_(180))
  
  // CANDLE COORDS //
  candleX = X_(451); candleTopY = Y_(510); candleBottomY = Y_(525); candleRound = Y_(8);
  candleWidth = X_(25,adjust=false); candleHeight = Y_(15);

  // IPAD COORDS //
  ipadXLeft = X_(590); ipadXRight =  X_(650); ipadYTop = Y_(540);
  ipadYBottom = Y_(570);
  let ipadXBounds = [ipadXLeft, ipadXRight]
  let ipadYBounds = [ipadYTop, ipadYBottom]

  // IPAD PICKED UP COORDS //
  ipadPickWidth = 500;
  ipadPickHeight = 700;

  // EVENTS //
  // if (clicks >= 1) {
  //   fill(10)
  //   circle(790, 230, 20)
  //   circle(770, 250, 20)
  // }
  // if (clicks >= 2) {
  //   let c = color(20)
  //   c.setAlpha(50)
  //   fill(c)
  //   circle(580+sin(frameCount/10), 450, 20)
  //   circle(630+sin(frameCount/10), 450, 20)
  // }

  // DRAW OBJECTS //
  // if (frameCount > 500) {
  //   blackout()
  // }

  if (frameCount > 300) {
    skullFlash()
  }

  drawCandle(candleX,candleTopY,candleBottomY,candleRound,candleHeight,candleWidth)
  if (frameCount < 200) {
    drawFlame(candleX,candleTopY)
  }
  else {
    snuffedOut()
  }
  
  // if (frameCount > 400) {
  //   blackout()
  // }

  if (frameCount < 100 || pickUp == true){
    ipadFlicker(ipadXBounds, ipadYBounds)
  }
  else {
    ipadFlicker(ipadXBounds, ipadYBounds, false)
  }

  // DRAW CURSOR //
  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom) {
    cursor(HAND)
  }
  else {
    cursor(ARROW)
  }

  if (frameCount > 300 && frameCount < 330) {
    thePlantsHaveEyes()
  }

  if (pickUp == true) {
    pickUpIpad(ipadPickWidth, ipadPickHeight)
  }

  // if (frameCount > 500 && frameCount < 510) {
  //   boo()
  // }

  // if (frameCount > 510) {
  //   fill('black')
  //   rect(X_(0), Y_(0), X_(1200, adjust=0), Y_(900))
  // }
}

function drawCandle(candleX,candleTopY,candleBottomY,candleRound,candleHeight,candleWidth) {
  fill('#330000')
  noStroke()
  ellipse(candleX,candleTopY,candleWidth,candleRound)
  rect(candleX - candleWidth/2,candleTopY,candleWidth,candleHeight)
  ellipse(candleX,candleBottomY,candleWidth,candleRound)
}

function iSawTheIpadGlow(ipadXBounds, ipadYBounds) {
  let c = color('#99FFFF')
  c.setAlpha(30)
  fill(c)
  noStroke()
  // COORDS  
  ipadY = ipadYBounds[0]; ipadX1 = ipadXBounds[0]; ipadX2 = ipadXBounds[1];
  ipadX3 = X_(730); ipadX4 = X_(490)
  beginShape()
  vertex(ipadX1, ipadY)
  vertex(ipadX2, ipadY)
  vertex(ipadX3, 0)
  vertex(ipadX4, 0)
  endShape(CLOSE)
}

function ipadDark(ipadXBounds, ipadYBounds){
  let c = color('black')
  c.setAlpha(200)
  fill(c)
  beginShape()
  vertex(ipadXBounds[0], ipadYBounds[0])
  vertex(ipadXBounds[0] - X_(12,adjust=false), ipadYBounds[1])
  vertex(ipadXBounds[1] + X_(8,adjust=false), ipadYBounds[1])
  vertex(ipadXBounds[1], ipadYBounds[0])
  endShape(CLOSE)
}

function drawFlame(candleX,candleTopY,flameSize=1) {
  fill('#FFFFCC')
  flameWidth = X_(4,adjust=false); flameHeight = Y_(7)*flameSize;
  candleTopY = candleTopY - flameWidth
  illumSize = X_(213,adjust=false)*flameSize
  noStroke()
  ellipse(candleX+sin(frameCount/10),candleTopY,flameWidth,flameHeight)
  let c = color('#CC6600');
  c.setAlpha(30);
  fill(c);
  circle(candleX+sin(frameCount/10),candleTopY,illumSize)
}

function pickUpIpad(ipadPickWidth,ipadPickHeight){
  fill(100)
  rect(X_(imageWidth/2 - ipadPickWidth/2), Y_(100), ipadPickWidth, ipadPickHeight)
  let c = color('#99FFFF')
  c.setAlpha(100)
  fill(c)
  rect(0,0,windowWidth,windowHeight)
  fill(255)
  rect(X_(imageWidth/2 - ipadPickWidth*.9/2), Y_(100+(ipadPickHeight*.1/2)), ipadPickWidth*.9, ipadPickHeight*.9)

  let obit1 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Those who gathered report he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  let obit2 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Despite what you might have been told, he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  fill(0)
  if (clicks <= 1) {
    text(obit1, X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(195), X_(350,adjust=false), Y_(570))
  }
  else {
    text(obit2, X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(195), X_(350,adjust=false), Y_(570))
  }
}

/// PICK UP OR PUT DOWN IPAD ///

function mouseClicked(){
  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom, pickUp==false) {
    pickUp = true
    clicks += 1
  }
  else {
    pickUp = false
  }

}

/// EVENTS ///

function ipadFlicker(ipadXBounds, ipadYBounds, off=true) {
  if (off) {
    ipadDark(ipadXBounds, ipadYBounds)
  }
  else {
    iSawTheIpadGlow(ipadXBounds, ipadYBounds)
  }
}

function skullFlash() {
  image(face, X_(611), Y_(198), X_(17, adjust=false), Y_(25))
  c = color('black')
  c.setAlpha(220)
  fill(c)
  rect(X_(610), Y_(197), X_(19, adjust=false), Y_(26))
}

function thePlantsHaveEyes() {
  fill('red')
  circle(X_(800), Y_(480), Y_(5))
  circle(X_(820), Y_(480), Y_(5))
}

function snuffedOut(){

}

function blackout() {
  c = color('black')
  c.setAlpha(240)
  fill(c)
  rect(X_(200), Y_(100), X_(350, adjust=false), Y_(300))
  rect(X_(700), Y_(100), X_(350, adjust=false), Y_(300))
  c.setAlpha(90)
  fill(c)
  rect(X_(0), Y_(0), X_(1200, adjust=false), Y_(900))
}

function boo() {
  
  if (frameCount % 2 == 0) {
    image(jumpscare, X_(0), Y_(0), X_(1200, adjust=false), Y_(900))
  }
}

/// OBJECT CLASSES ///

class SmokeParticle {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.radius = 1;
    this.color = color('white');
    this.color.setAlpha(40);
    this.lifespan = 200;
  }

  update() {

    // Different size snowflakes fall at different y speeds
    let ySpeed = 8 
    this.posY += ySpeed;

    // When snowflake reaches the top, delete
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  run() {
    this.update()
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.posX, this.posY, this.radius);
  }
}

/// COORDINATE ADJUSTMENT FUNCTIONS ///

function X_(input, adjust=true, coordWidth=1200) {
  // imageWidth is the actual width of the image in pixels
  // and coordWidth is the number input by the user for the 
  // coordinate system
  xAdjust = (windowWidth - imageWidth)/2; // adjustment to center image
  if (adjust == true) {
    return input/coordWidth * imageWidth + xAdjust
  }
  else {
    return input/coordWidth * imageWidth
  }
}

function Y_(input, coordHeight=900) {
  // imageHeight is the actual height of the image in pixels
  // and coordHeight is the number input by the user for the 
  // coordinate system
  return input/coordHeight * imageHeight
}
