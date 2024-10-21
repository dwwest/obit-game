/// NOTE ON THE COORDINATE SYSTEM ///
// The coordinates are set up so you can enter
// coordinates between 0 and 1200 for the width
// and 0 and 900 for the height and the 
// code will adjust to pixel accordingly

function preload(){
  img = loadImage('assets/apartment.png')
  jumpscare = loadImage('assets/scary_face.jpg')
  gear = loadImage('assets/gear.png')
  backArrow = loadImage('assets/back_button.jpg')
  gameState = new GameState()
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // BRIGHTNESS ADJUSTMENT WINDOW //
  bright_window = new Rect(-windowWidth/2, 0, windowWidth*2, windowHeight, 'white', gameState.bright_mod)

  // PHOTO SHADOW //
  photo_shadow = new Rect(560, 140, 150, 180, 'black', 140);

  // SETTINGS ICON OBJECTS //
  settings_circle = new Circle(1100, 40, 40, 'gray', alpha=140)
  settings_gear = new Img(1090, 30, 20, 20, gear)
  settings_icon = new CompoundObject([settings_circle, settings_gear], 0)
  
  // SETTINGS MENU OBJECTS //
  menu_box = new Rect(975, 15, 150, 300, 'white', 130, 20)
  sound_text = new TextBox(985, 80, 'black', 255, 'Sound on')
  bright_text = new TextBox(985, 120, 'black', 255, 'Brightness adjust')
  sound_clicker = new Circle(1060, 78, 20, 'black', 255, 1, 255)
  sliderX = 1050; sliderY = 150; sliderWidth = 5; sliderHeight = 150
  slider = new Rect(sliderX, sliderY, 5, 150, 'black', 255, 10)
  bottom_tick = new Rect(sliderX - 10, sliderY + sliderHeight - 5, 25, sliderWidth, 'black', 255, 5)
  top_tick = new Rect(sliderX - 10, sliderY, 25, sliderWidth, 'black', 255, 10)
  bright_indicator = new Circle(sliderX + 2.5, sliderY - 2.5 + sliderHeight, 15, 'white', 255)
  settings_menu = new CompoundObject([menu_box, sound_text, bright_text, sound_clicker, slider, top_tick, bottom_tick, bright_indicator], 0)

  // CANDLE //
  candle_color = '#330000'
  candleX = 451; candleTopY = 510; candleBottomY = 525; candleRound = 8;
  candleWidth = 25; candleHeight = 15;

  candle_bottom = new Ellipse(candleX, candleBottomY, candleWidth, candleRound, candle_color, 255)
  candle_side = new Rect(candleX - candleWidth/2, candleTopY, candleWidth, candleHeight, candle_color, 255)
  candle_top = new Ellipse(candleX, candleTopY, candleWidth, candleRound, candle_color, 255)
  candle = new CompoundObject([candle_bottom, candle_side, candle_top])

  // FLAME //
  flameWidth = 4; flameHeight = 7;
  flame = new Ellipse(candleX-2, candleTopY - flameWidth, flameWidth, flameHeight, '#FFFFCC', 255)
  illum = new Circle(candleX-2, candleTopY - flameWidth, 230, '#CC6600', 30)
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

  // SHADOW ON PHOTO //
  photo_shadow.display()

  // CANDLE BODY //
  candle.display()

  // SETTINGS MENU //
  settings_icon.display()
  if (gameState.settingsOpen == true) {
    settings_menu.display()
  }

  // IPAD COORDS //
  ipadX = X_(590); ipadWidth =  X_(60, adjust=false); ipadY = Y_(540);
  ipadHeight = Y_(30);

  // IPAD PICKED UP COORDS //
  ipadPickWidth = 500;
  ipadPickHeight = 700;

  // IPAD BUTTON COORDS //
  ipadCornerX = X_(imageWidth/2 - ipadPickWidth*.9/2);
  ipadCornerY = Y_(100+(ipadPickHeight*.1/2));
  backButtonX = ipadCornerX + X_(50, adjust=false); 
  backButtonY = ipadCornerY + Y_(80); backButtonWidth = X_(20, adjust=false); 
  backButtonHeight = Y_(20);

  // EVENTS //

  

  if (gameState.clicks < 1) {
    flame.x += X_(sin(frameCount/10), adjust=false)/5
    illum.x += X_(sin(frameCount/10), adjust=false)/5
    flame.display()
    illum.display()
  }
  else {
    snuffedOut()
  }
  
  // if (clicks >= 4 && frameCount - lastPutDown > 100) {
  //   blackout()
  // }

  if (frameCount < 100 || gameState.pickUp == true){
    ipadFlicker(ipadX, ipadY, ipadWidth, ipadHeight)
  }
  else {
    ipadFlicker(ipadX, ipadY, ipadWidth, ipadHeight, false)
  }

  if (gameState.clicks == 3 && frameCount - gameState.lastPutDown < 10) {
    thePlantsHaveEyes()
  }

  if (gameState.pickUp == true) {
    pickUpIpad(ipadPickWidth, ipadPickHeight)
  }

  // if (clicks == 4 && pickUp == false && frameCount - lastPutDown > 100 && frameCount - lastPutDown < 110) {
  //   boo()
  // }

  // if (clicks == 4 && pickUp == false && frameCount - lastPutDown > 120) {
  //   fill('black')
  //   rect(X_(0), Y_(0), X_(1200, adjust=0), Y_(900))
  // }

  adjust_brightness(gameState.bright_mod)
  bright_window.display()

  // DRAW CURSOR //

  if (boundingBox(ipadX + ipadWidth/2, ipadY + ipadHeight/2, ipadWidth, ipadHeight) && gameState.clicks < 4 && gameState.pickUp == false) {
    cursor(HAND)
  }
  else if (settings_circle.boundingBox() == true) {
    cursor(HAND)
  }
  else {
    cursor(ARROW)
  }

}

/// CLICKS ///


function mouseClicked(){
  // Pick up iPad
  if (boundingBox(ipadX + ipadWidth/2, ipadY + ipadHeight/2, ipadWidth, ipadHeight) && gameState.pickUp==false) {
    pickUp = true
    clicks += 1
  }
  // Put down the iPad
  else if (boundingBox(ipadCornerX + ipadPickWidth/2, ipadCornerY + ipadPickHeight/2, ipadPickWidth, ipadPickHeight) == false && gameState.pickUp == true) {
    gameState.pickUp = false
    gameState.lastPutDown = frameCount
  }
  // Open settings by clicking wheel
  else if (settings_circle.boundingBox() && gameState.settingsOpen == false) {
    gameState.settingsOpen = true
  }
  // Close settings by clicking outside
  else if (menu_box.boundingBox() == false && gameState.settingsOpen == true){
    gameState.settingsOpen = false
  }
  // Brightness slider
  else if (settings_menu.object_list[4].boundingBox()){
    gameState.bright_mod = Math.abs(mouseY - sliderHeight - sliderY)/sliderHeight * 50
    settings_menu.object_list[7].y = mouseY
  }
  // Back button in email
  else if (boundingBox(backButtonX + backButtonWidth/2, backButtonY + backButtonHeight/2, backButtonWidth, backButtonHeight) && pickUp == true && (emailOpen == 1 || emailOpen == 2)){
    emailOpen = 0
  }
  // Inbox from drafts
  else if (boundingBox()){
  }
  // Drafts from inbox
  else if (boundingBox()){
  }
  // Open one of the emails

}

// DEFINES BOUNDING BOX FOR CLICKS //

function boundingBox(centerX, centerY, width, height, debug=false) {
  if (debug==true) {
    fill(color('red'))
    rect(centerX - (width/2), centerY - (height/2), width, height)
  }
  return(Math.abs(mouseX - centerX) <= width/2 && Math.abs(mouseY - centerY) <= height/2)
}


function iSawTheIpadGlow(ipadX, ipadY, ipadWidth) {
  let c = color('#99FFFF')
  c.setAlpha(30)
  fill(c)
  noStroke()
  // COORDS  
  beginShape()
  vertex(ipadX, ipadY)
  vertex(ipadX + ipadWidth, ipadY)
  vertex(X_(730), 0)
  vertex(X_(490), 0)
  endShape(CLOSE)
}

function ipadDark(ipadX, ipadY, ipadWidth, ipadHeight){
  let c = color('black')
  c.setAlpha(200)
  fill(c)
  beginShape()
  vertex(ipadX, ipadY)
  vertex(ipadX - X_(12,adjust=false), ipadY + ipadHeight)
  vertex(ipadX + ipadWidth + X_(8,adjust=false), ipadY + ipadHeight)
  vertex(ipadX + ipadWidth, ipadY)
  endShape(CLOSE)
}

function pickUpIpad(ipadPickWidth,ipadPickHeight){
  fill(100)
  rect(X_(imageWidth/2 - ipadPickWidth/2), Y_(100), ipadPickWidth, ipadPickHeight, 10, 10)
  let c = color('#99FFFF')
  c.setAlpha(40)
  fill(c)
  rect(0,0,windowWidth,windowHeight)
  fill(255)
  rect(ipadCornerX, ipadCornerY, ipadPickWidth*.9, ipadPickHeight*.9)

  // ipad top strip icons
  fill(50)
  rect(ipadCornerX + X_(10, adjust=false), ipadCornerY + Y_(20), X_(5, adjust=false), Y_(10))
  rect(ipadCornerX + X_(20, adjust=false), ipadCornerY + Y_(15), X_(5, adjust=false), Y_(15))
  rect(ipadCornerX + X_(30, adjust=false), ipadCornerY + Y_(10), X_(5, adjust=false), Y_(20))
  text('11:24 pm', ipadCornerX + (ipadPickWidth/2) - X_(45, adjust=false), ipadCornerY + Y_(30))
  text('32%', ipadCornerX + (ipadPickWidth) - X_(90, adjust=false), ipadCornerY + Y_(30))

  emailScreen(ipadPickWidth, ipadPickHeight)

}

function emailScreen(ipadPickWidth, ipadPickHeight){

  // controlled by game state object emailOpen, which can be set to 0 (the
  // main page), 1 (the obit email), or 2 (the email from the dad to the girl)
  if (emailOpen == 0) {
    stroke(0)
    fill(255)
    rect(ipadCornerX + X_(45, adjust=false), ipadCornerY + Y_(60), X_(80, adjust=false), Y_(40))
    noStroke()

    fill(0)
    textStyle(BOLD)
    text('Inbox', ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(85))
    textStyle(NORMAL)

    stroke(0)
    fill(255)
    rect(ipadCornerX + X_(130, adjust=false), ipadCornerY + Y_(60), X_(80, adjust=false), Y_(40))
    noStroke()

    fill(0)
    textStyle(BOLD)
    text('Drafts', ipadCornerX + X_(150, adjust=false), ipadCornerY + Y_(85))
    textStyle(NORMAL)

    if (inboxOrDrafts == 0) {
      fill(255)
      stroke(0)
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2 - 5), Y_(250 -5), X_(355,adjust=false), Y_(450))
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(345,adjust=false), Y_(70))
      noStroke()
      fill(0)
      textStyle(BOLD)
      text("obituary", ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(140))
      text('To: Jacob Dobry  |  From: us  ', ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(155))
      text("sent today at 11:24pm", ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(170))
      textStyle(NORMAL)
    }

    if (inboxOrDrafts == 1) {
      fill(255)
      stroke(0)
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2 - 5), Y_(250 -5), X_(355,adjust=false), Y_(450))
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(345,adjust=false), Y_(70))
      noStroke()
      fill(0)
      textStyle(BOLD)
      text("please read", ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(140))
      text('To: Amanda Dobry', ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(155))
      text("last opened: August 30, 2024", ipadCornerX + X_(60, adjust=false), ipadCornerY + Y_(170))
      textStyle(NORMAL)
    }

  }


  if (emailOpen == 1) {
    stroke(0)
    fill(255)
    rect(backArrow, backButtonX, backButtonY, backButtonWidth, back_buttonHeight)
    image(backArrow, backButtonX, backButtonY, backButtonWidth, back_buttonHeight)
    noStroke()
    fill(0)
    textStyle(BOLD)
    text('To: Jacob Dobry  |  From: us  |  obituary  sent today at 11:24pm', ipadCornerX + X_(80, adjust=false), ipadCornerY + Y_(100))
    textStyle(NORMAL)

    let obit1 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 31rd, 2024.  Those who gathered report he died with a smile on his face. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his loving wife of 24 years, Mallory Dobry neé Nesbitt, and his daughter, Amanda Dobry. In the five years before his death, he devoted himself to the Church of the Mind, becoming a pillar of the spiritual community.  Those who knew Jacob described him as happy and hardworking.  He will be greatly missed. A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm in the same old church he and his wife were married."
    let obit2 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 31rd, 2024.  Those who gathered report he died with a smile on his face, though you doubt their word. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his loving wife of 24 years, Mallory Dobry neé Nesbitt, and you, his daughter.  In the five years before his death, he devoted himself to the Church of the Mind, becoming a pillar of the spiritual community.  You didn't know he'd joined the Church of the Mind for many years.  Not until it was too late.  Those who knew Jacob described him as happy and hardworking.  Your own mother called him bottled up.  Her mother called him, 'just a man, what did you expect?' You called him unstable.  He called you a worry wart. A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm in the same church he and your mother were married in."
    let obit3 = "Jacob Dobry, 47, passed away peacefully in his sleep on Sunday, August 3rd, 2024.  Those who gathered report he died with a smile on his face, though you doubt their word. Jacob was born on May 4th, 1977 in a small town to parents who loved him.  He is survived by his estranged wife, Mallory Dolbry and he is survived by you, his ever-hating daughter. He told you he joined the church at Christmas.  He told you he planned to give Us his mind over mashed potatoes and dry turkey.  He had to explain it to you, to describe the incredible meetings he’d been to, the process of cranial insertion.  He tried to describe the beautiful void of connection and love shared without walls, but you wouldn’t listen. Mallory called you selfish.  Jacob called you nothing at all.  By then he was no longer just himself. You see Us as grotesque.  Unnatural.  As though you yourself are not composed of four billion odd neurons.  Where do you end and your pieces begin? A service will be held to honor the life of Jacob Dolbry on September 17, 2024 at 4pm."
    let obit4 = "We will be there. We’ve been waiting for you."
    obitList = [obit1, obit2, obit3, obit4]

    fill(0)
    if (gameState.clicks < 5) {
      fill(255)
      stroke(0)
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2 - 5), Y_(250 - 5), X_(355,adjust=false), Y_(450))
      noStroke()
      fill(0)
      text(obitList[gameState.clicks-1], X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(350,adjust=false), Y_(570))
    }
    else {
      fill(255)
      stroke(0)
      rect(X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(350,adjust=false), Y_(570))
      noStroke()
      fill(0)
      text(obitList[3], X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(350,adjust=false), Y_(570))
    }
  }

  if (emailOpen == 2) {
    stroke(0)
    fill(255)
    rect(backButtonX, backButtonY, backButtonWidth, backButtonHeight)
    image(backArrow, backButtonX, backButtonY, backButtonWidth, backButtonHeight)
    noStroke()
    fill(0)
    textStyle(BOLD)
    text('To: Amanda Dobry | From: Jacob Dobry | please read (draft)', ipadCornerX + X_(80, adjust=false), ipadCornerY + Y_(100))
    textStyle(NORMAL)

    fill(255)
    stroke(0)
    rect(X_(imageWidth/2 - ipadPickWidth*.7/2 - 5), Y_(250 - 5), X_(355,adjust=false), Y_(450))
    noStroke()
    fill(0)
    text("Hi sweetie,", X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(250), X_(350,adjust=false), Y_(570))
    text("Sorry, you probably don't want to ", X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(280), X_(350,adjust=false), Y_(570))
    text("I know you're mad ", X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(310), X_(350,adjust=false), Y_(570))
    text("[need to say to check pic frame] ", X_(imageWidth/2 - ipadPickWidth*.7/2), Y_(340), X_(350,adjust=false), Y_(570))
  }

}

/// EVENTS ///

function ipadFlicker(ipadX, ipadY, ipadWidth, ipadHeight, off=true) {
  if (off) {
    ipadDark(ipadX, ipadY, ipadWidth, ipadHeight)
  }
  else {
    iSawTheIpadGlow(ipadX, ipadY, ipadWidth)
  }
}

function thePlantsHaveEyes() {
  fill('red')
  circle(X_(800), Y_(480), Y_(5))
  circle(X_(820), Y_(480), Y_(5))
}

function snuffedOut(){
  if (frameSnuffed == false){
    frameSnuffed = frameCount
  }

  if ((frameCount - frameSnuffed) % 10 == 0 || frameCount == frameSnuffed) {
    pts = []
    for (let i = 0; i < 4; i++){
      pts.push(X_(random(-7,7), adjust=false))
    }
  }

  c = color('white')
  c.setAlpha(80 + (frameSnuffed - frameCount)/10)
  fill(c)
  beginShape()
  vertex(X_(450), Y_(510))
  bezierVertex(X_(440) + pts[1], Y_(480), X_(460) + pts[2], Y_(450), X_(450), Y_(413))
  bezierVertex(X_(460) + pts[3], Y_(380), X_(440) + pts[4], Y_(340), X_(450), Y_(200))
  endShape()
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

function adjust_brightness() {
  bright_window.alpha = gameState.bright_mod
}

// DEBUGGING //

function printTo(...data){
  console.log(...data)
  return(data[0])
}
