/// NOTE ON THE COORDINATE SYSTEM ///
// The coordinates are set up so you can enter
// coordinates between 0 and 1200 for the width
// and 0 and 900 for the height and the 
// code will adjust to pixel accordingly

function preload(){
  img = loadImage('apartment.png')
  face = loadImage('scary_face_cropped.jpg')
  jumpscare = loadImage('scary_face.jpg')
  gear = loadImage('gear.png')
  pickUp = false
  settingsOpen = false
  clicks = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastPutDown = 0;
}

function adjust_brightness(bright_mod) {
  // img.loadPixels();
  // for (let x = 0; x < img.width; x += 1) {
  //   for (let y = 0; y < img.height; y += 1) {
  //     pix = img.get(x, y)
  //     img.set(x, y, [pix[0]+bright_mod, pix[1]+bright_mod, pix[2]+bright_mod, 255]);
  //   }
  // }
  // img.updatePixels();
}

function draw() {
  // DRAW BLACK BACKGROUND //
  background(0)

  // IMAGE SIZE //
  imAspect = 900/1200
  imageWidth = windowWidth*0.8;
  imageHeight = imageWidth*imAspect;
  
  // DRAW APARTMENT //
  if (frameCount % 10 == 0) {
    adjust_brightness(10)
  }

  image(img, X_(0), Y_(0), imageWidth, imageHeight);

  // SHADOW ON PHOTO //
  c = color('black')
  c.setAlpha(140)
  fill(c)
  rect(X_(560), Y_(150), X_(150, adjust=false), Y_(180))

  // SETTINGS MENU //
  settingsX = 1100
  settingsY = 40
  settingsD = 40
  c = color('gray')
  c.setAlpha(110)
  fill(c)
  circle(X_(settingsX), Y_(settingsY), Y_(settingsD))
  // todo: make the gear image dependent on settings xyr
  image(gear, X_(1090), Y_(30), X_(20, adjust=false), Y_(20))
  openSettings(settingsOpen)
  
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

  if (clicks >= 2) {
    skullFlash()
  }

  drawCandle(candleX,candleTopY,candleBottomY,candleRound,candleHeight,candleWidth)
  if (clicks < 1) {
    drawFlame(candleX,candleTopY)
  }
  else {
    // snuffedOut()
  }
  
  if (clicks >= 4 && frameCount - lastPutDown > 100) {
    blackout()
  }

  if (frameCount < 100 || pickUp == true){
    ipadFlicker(ipadXBounds, ipadYBounds)
  }
  else {
    ipadFlicker(ipadXBounds, ipadYBounds, false)
  }

  if (clicks == 3 && frameCount - lastPutDown < 10) {
    thePlantsHaveEyes()
  }

  if (pickUp == true) {
    pickUpIpad(ipadPickWidth, ipadPickHeight)
  }

  if (clicks == 4 && pickUp == false && frameCount - lastPutDown > 100 && frameCount - lastPutDown < 110) {
    boo()
  }

  if (clicks == 4 && pickUp == false && frameCount - lastPutDown > 120) {
    fill('black')
    rect(X_(0), Y_(0), X_(1200, adjust=0), Y_(900))
  }

    // DRAW CURSOR //

    if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom && clicks < 4) {
      cursor(HAND)
    }
    else if (Math.abs(mouseX - settingsX) <= (settingsD/2) && Math.abs(mouseY - settingsY) <= (settingsD/2)) {
      cursor(HAND)
    }
    else {
      cursor(ARROW)
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

  let obit1 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 31rd, 2024.  Those who gathered report he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his loving wife of 24 years, Mallory Dobry neé Nesbitt, and his daughter, Amanda Dobry. In the five years before his death, he devoted himself to the Church of the Mind, becoming a pillar of the spiritual community.  Those who knew Jacob described him as happy and hardworking.  He will be greatly missed. A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm in the same old church he and his wife were married."
  let obit2 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 31rd, 2024.  Those who gathered report he died with a smile on his face, though you doubt their word. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his loving wife of 24 years, Mallory Dobry neé Nesbitt, and you, his daughter.  In the five years before his death, he devoted himself to the Church of the Mind, becoming a pillar of the spiritual community.  You didn't know he'd joined the Church of the Mind for many years.  Not until it was too late.  Those who knew Jacob described him as happy and hardworking.  Your own mother called him bottled up.  Her mother called him, 'just a man, what did you expect?' You called him unstable.  He called you a worry wart. A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm in the same church he and your mother were married in."
  let obit3 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Those who gathered report he died with a smile on his face, though you doubt their word. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his estranged wife, Mallory Dolbry and he is survived by you, his ever-hating daughter. He told you he joined the church at Christmas.  He told you he planned to give Us his mind over mashed potatoes and dry turkey.  He had to explain it to you, to describe the incredible meetings he’d been to, the process of cranial insertion.  He tried to describe the beautiful void of connection and love shared without walls, but you wouldn’t listen. Mallory called you selfish.  Jacob called you nothing at all.  By then he was no longer just himself. You see Us as grotesque.  Unnatural.  As though you yourself are not composed of four billion odd neurons.  Where do you end and your pieces begin? A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm."
  let obit4 = "We will be there. We’ve been waiting for you."
  obitList = [obit1, obit2, obit3, obit4]

  fill(0)
  if (clicks < 5) {
    text(obitList[clicks-1], X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(195), X_(350,adjust=false), Y_(570))
  }
  else {
    text(obitList[3], X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(195), X_(350,adjust=false), Y_(570))
  }

}

function openSettings(settingsOpen) {
  if (settingsOpen) {
    c = color('white')
    c.setAlpha(120)
    fill(c)
    rect(X_(1000), Y_(30), X_(100, adjust=false), Y_(100))
  }
}

/// OPENING STUFF WITH CLICKS ///

function mouseClicked(){
  if (mouseX > ipadXLeft && mouseX < ipadXRight && mouseY > ipadYTop && mouseY < ipadYBottom && pickUp==false) {
    pickUp = true
    clicks += 1
  }
  else if (pickUp == true) {
    pickUp = false
    lastPutDown = frameCount
  }
  //fix this
  else if (Math.abs(mouseX - settingsX) <= (settingsD/2) && Math.abs(mouseY - settingsY) <= (settingsD/2) && settingsOpen == false) {
    settingsOpen = true
  }
  else if (settingsOpen == true){
    settingsOpen = false
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
  // todo thursday
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
