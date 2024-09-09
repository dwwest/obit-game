/// NOTE ON THE COORDINATE SYSTEM ///
// The coordinates are set up so you can enter
// coordinates between 0 and 1200 for the width
// and 0 and 900 for the height and the 
// code will adjust to pixel accordingly

function preload(){
  img = loadImage('apartment.png')
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
  if (windowWidth <= windowHeight){
    imageWidth = windowWidth;
    imageHeight = imageWidth*imAspect;
  }
  else {
    imageHeight = windowHeight;
    imageWidth = imageHeight/imAspect;
    
  }
  image(img, X_(0), Y_(0), imageWidth, imageHeight);

  // CANDLE COORDS //
  candleX = X_(451); candleTopY = Y_(510); candleBottomY = Y_(525); candleRound = Y_(8);
  candleWidth = X_(25,adjust=false); candleHeight = Y_(15);

  // IPAD COORDS //
  ipadXLeft = X_(590); ipadXRight =  X_(645); ipadYTop = Y_(540);
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
  drawCandle(candleX,candleTopY,candleBottomY,candleRound,candleHeight,candleWidth)
  drawFlame(candleX,candleTopY)
  iSawTheIpadGlow(ipadXBounds, ipadYBounds)

  // DRAW CURSOR //
  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom) {
    cursor(HAND)
  }
  else {
    cursor(ARROW)
  }

  if (pickUp == true) {
    pickUpIpad(ipadPickWidth, ipadPickHeight)
  }
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
  rect(X_(windowWidth/2 - ipadPickWidth/2), Y_(100), ipadPickWidth, ipadPickHeight)
  let c = color('#99FFFF')
  c.setAlpha(100)
  fill(c)
  rect(0,0,windowWidth,windowHeight)
  fill(255)
  rect(X_(windowWidth/2 - ipadPickWidth*.9/2), Y_(100+(ipadPickHeight*.1/2)), ipadPickWidth*.9, ipadPickHeight*.9)

  let obit1 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Those who gathered report he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  let obit2 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Despite what you might have been told, he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  fill(0)
  if (clicks <= 1) {
    text(obit1, X_(485), Y_(195), 280, 570)
  }
  else {
    text(obit2, X_(485), Y_(195), 280, 570)
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

/// COORDINATE ADJUSTMENT FUNCTIONS ///

function X_(input, adjust=true, imageWidth=1200, coordWidth=1200) {
  // imageWidth is the actual width of the image in pixels
  // and coordWidth is the number input by the user for the 
  // coordinate system
  xAdjust = (windowWidth - imageWidth)/2; // adjustment to center image
  if (adjust == true) {
    return input/coordWidth * imageWidth //+ xAdjust
  }
  else {
    return input/coordWidth * imageWidth
  }
}

function Y_(input, imageHeight=900, coordHeight=900) {
  // imageHeight is the actual height of the image in pixels
  // and coordHeight is the number input by the user for the 
  // coordinate system
  return input/coordHeight * imageHeight
}
