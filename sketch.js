function preload(){
  img = loadImage('apartment.png')
  pickUp = false
  clicks = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0)
  imageWidth = 1200
  imageHeight = 900
  xAdjust = (windowWidth - 1200)/2
  image(img, xAdjust, 0, imageWidth, imageHeight)
  candleX = imageWidth*0.375+xAdjust
  candleTopY = imageHeight * 0.567
  candleBottomY = imageHeight * 0.5844
  candleRound = imageHeight * 0.008
  candleWidth = imageWidth * 0.0167
  candleHeight = imageWidth * 0.0121
  ipadXLeft = (0.4917 * imageWidth) + xAdjust
  ipadXRight =  (0.5417 * imageWidth) + xAdjust
  ipadYTop = 0.60 * imageHeight
  ipadYBottom = 0.63 * imageHeight
  let ipadXBounds = [ipadXLeft, ipadXRight]
  let ipadYBounds = [ipadYTop, ipadYBottom]
  if (clicks >= 1) {
    fill(10)
    circle(790, 230, 20)
    circle(770, 250, 20)
  }
  if (clicks >= 2) {
    let c = color(20)
    c.setAlpha(50)
    fill(c)
    circle(580+sin(frameCount/10), 450, 20)
    circle(630+sin(frameCount/10), 450, 20)
  }
  drawCandle(candleX,candleTopY,candleBottomY,candleRound,candleHeight,candleWidth)
  drawFlame(candleX,candleTopY)
  iSawTheIpadGlow(ipadXBounds, ipadYBounds)

  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom) {
    cursor(HAND)
  }
  else {
    cursor(ARROW)
  }

  if (pickUp == true) {
    pickUpIpad()
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
  ipadY = ipadYBounds[0]
  ipadX1 = ipadXBounds[0]
  ipadX2 = ipadXBounds[1]
  ipadX3 = 0.6083 * imageWidth + xAdjust
  ipadX4 = 0.4083 * imageWidth + xAdjust
  beginShape()
  vertex(ipadX1, ipadY)
  vertex(ipadX2, ipadY)
  vertex(ipadX3, 0)
  vertex(ipadX4, 0)
  endShape(CLOSE)
}

function drawFlame(candleX,candleTopY,flameSize=1) {
  fill('#FFFFCC')
  flameWidth = 0.0033*imageWidth*flameSize
  flameHeight = 0.0077*imageHeight*flameSize
  candleTopY = candleTopY - 0.0033*imageHeight
  illumSize = 0.1777*imageHeight*flameSize
  noStroke()
  ellipse(candleX+sin(frameCount/10),candleTopY,flameWidth,flameHeight)
  let c = color('#CC6600');
  c.setAlpha(30);
  fill(c);
  circle(candleX+sin(frameCount/10),candleTopY,illumSize)
}

function pickUpIpad(){
  fill(100)
  rect(370 + xAdjust, 100, 500, 700)
  let c = color('#99FFFF')
  c.setAlpha(100)
  fill(c)
  rect(0,0,windowWidth,windowHeight)
  fill(255)
  rect(470 + xAdjust, 180, 300, 570)

  let obit1 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Those who gathered report he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  let obit2 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Despite what you might have been told, he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He married his girl-of-three-doors-down Mallory Dobry neé Nesbitt in 2000."
  fill(0)
  if (clicks <= 1) {
    text(obit1, 485 + xAdjust, 195, 280, 570)
  }
  else {
    text(obit2, 485 + xAdjust, 195, 280, 570)
  }
}

function mouseClicked(){
  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom, pickUp==false) {
    pickUp = true
    clicks += 1
  }
  else {
    pickUp = false
  }

}

