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
  // IMAGE SIZE //
  imAspect = 900/1200
  imageWidth = windowWidth*0.8;
  imageHeight = imageWidth*imAspect;
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

  // SMALL IPAD COORDS //
  ipadX = 590; ipadWidth = 60; ipadY = 540; ipadHeight = 30;
  glow = new Polygon([[ipadX, ipadY],[ipadX + ipadWidth, ipadY], [730, 0], [490, 0]], '#99FFFF', 30)
  ipad_dark = new Polygon([[ipadX, ipadY], [ipadX - 12, ipadY + ipadHeight], [ipadX + ipadWidth + 8, ipadY + ipadHeight], [ipadX + ipadWidth, ipadY]], 'black', 200)
  ipad_hitbox = new Rect(ipadX, ipadY, ipadWidth, ipadHeight, '', 0)

  // BIG IPAD COORDS //
  ipadCornerX = 400; ipadCornerY = 80; 
  ipadPickWidth = 525; ipadPickHeight = 700;
  ipadScreenX = ipadCornerX + 30; ipadScreenY = ipadCornerY + 30;
  ipadScreenWidth = ipadPickWidth - 60; ipadScreenHeight = ipadPickHeight - 60
  backButtonX = ipadCornerX + 50; backButtonY = ipadCornerY + 80; backButtonWidth = 20; backButtonHeight = 20;
  backlight = new Rect(-windowWidth, 0, windowWidth*2, windowHeight, '#99FFFF', 40)
  ipadBody = new Rect(ipadCornerX, ipadCornerY, ipadPickWidth, ipadPickHeight, 'gray', 255, 10)
  ipadScreen = new Rect(ipadScreenX, ipadScreenY, ipadScreenWidth, ipadScreenHeight, 'white', 255)
  ipadBarOne = new Rect(ipadScreenX + 10, ipadScreenY + 20, 5, 10, 'black', 255)
  ipadBarTwo = new Rect(ipadScreenX + 20, ipadScreenY + 15, 5, 15, 'black', 255)
  ipadBarThree = new Rect(ipadScreenX + 30, ipadScreenY + 10, 5, 20, 'black', 255)
  ipadTime = new TextBox(ipadScreenX + (ipadScreenWidth/2) - 20 , ipadScreenY + 30, 'black', 255, '11:24 pm')
  ipadBattery = new TextBox(ipadScreenX + ipadScreenWidth - 40, ipadScreenY + 30, 'black', 255, '32%')
  ipad = new CompoundObject([backlight, ipadBody, ipadScreen, ipadBarOne, ipadBarTwo, ipadBarThree, ipadTime, ipadBattery])

  // BACK BUTTON ON IPAD //
  backButton = new Rect(backButtonX, backButtonY, backButtonWidth, backButtonHeight, 'white', 255, 1, 'black')
  backImage = new Img(backButtonX, backButtonY, backButtonWidth, backButtonHeight, backArrow)

  // INBOX BUTTON ON IPAD //
  inboxButton = new Rect(ipadScreenX + 45, ipadScreenY + 60, 80, 40, 'white', 255, 1, 'black')
  inboxText = new TextBox(ipadScreenX + 60, ipadScreenY + 85, 'black', 255, 'Inbox', BOLD)

  // DRAFTS BUTTON ON IPAD //
  draftsButton = new Rect(ipadScreenX + 130, ipadScreenY + 60, 80, 40, 'white', 255, 1, 'black')
  draftsText = new TextBox(ipadScreenX + 150, ipadScreenY + 85, 'black', 255, 'Drafts', BOLD)

  // MENU LABELS //
  menuRect = new Rect(ipadScreenX + 40, 230, 355, 450, 'white', 255, 1, 'black')
  emailButton = new Rect(ipadScreenX + 40, 230, 355, 70, 'white', 255, 1, 'black')
  emailSubjectText = ['please read', 'obituary']
  emailToText = ['To: Amanda Dobry', 'To: Jacob Dobry | From: us']
  emailTimestampText = ['last opened: August 30, 2024', 'sent today at 11:24pm']
  emailSubject = new TextBox(ipadScreenX + 60, ipadScreenY + 140, 'black', 255, emailSubjectText[gameState.inboxOrDrafts], BOLD)
  emailTo = new TextBox(ipadScreenX + 60, ipadScreenY + 155, 'black', 255, emailToText[gameState.inboxOrDrafts], BOLD)
  emailTimestamp = new TextBox(ipadScreenX + 60, ipadScreenY + 170, 'black', 255, emailTimestampText[gameState.inboxOrDrafts], BOLD)
  menu = new CompoundObject([menuRect, emailButton, emailSubject, emailTo, emailTimestamp, inboxButton, inboxText, draftsButton, draftsText])

  // EMAILS //
  headerTexts = ['To: Amanda Dobry | From: Jacob Dobry | please read (draft)', 'To: Jacob Dobry  |  From: us  |  obituary  sent today at 11:24pm']
  header = new TextBox(ipadScreenX + 40, ipadScreenY + 100, 'black', 255, headerTexts[gameState.inboxOrDrafts], BOLD)
  emailBox = new Rect(ipadScreenX + 40, 230, 355, 450, 'white', 255, 1, 'black')
  emailContent = new TextBox(ipadScreenX + 60, 250, 'black', 255, obits[gameState.emailOpen], NORMAL, 300, 450)
  email = new CompoundObject([header, emailBox, emailContent, backButton, backImage])

}

function draw() {

  // DRAW BLACK BACKGROUND //
  background(0)
  
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

  // FLAME //
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
    ipad_dark.display()
  }
  else {
    glow.display()
  }

  if (gameState.clicks == 3 && frameCount - gameState.lastPutDown < 10) {
    thePlantsHaveEyes()
  }

  if (gameState.pickUp == true) {
    ipad.display()
    
    if (gameState.emailOpen == 0) {
      menu.display()
    }  
    else if (gameState.emailOpen > 0) {
      email.display()
    }

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

  if (ipad_hitbox.boundingBox() && gameState.clicks < 4 && gameState.pickUp == false) {
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
  if (ipad_hitbox.boundingBox() && gameState.pickUp==false) {
    gameState.pickUp = true
    gameState.clicks += 1
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
  else if (gameState.pickup == true) {
  // Back button in email
    if (backButton.boundingBox() && (gameState.emailOpen == 1 || gameState.emailOpen == 2)){
      gameState.emailOpen = 0
    }
    // Inbox from drafts
    // else if (emailButton.boundingBox()){
      // gameState.emailOpen = 1
      // email.object_list[2].txt = obits[0]
    // }
    // Drafts from inbox
    // else if (inboxButton.boundingBox()){
    //   menu.object_list[2].txt = emailSubjectText[0]
    //   menu.object_list[3].txt = emailToText[0]
    //   menu.object_list[4].txt = emailTimestampText[0]
    // }
    // Inbox from drafts
    // else if (draftsButton.boundingBox()){
    //   menu.object_list[2].txt = emailSubjectText[1]
    //   menu.object_list[3].txt = emailToText[1]
    //   menu.object_list[4].txt = emailTimestampText[1]
    // }
    // Put down the iPad
    else if (ipadBody.boundingBox() == false) {
      gameState.pickUp = false
      gameState.lastPutDown = frameCount
    }

  }
}


/// EVENTS ///

function thePlantsHaveEyes() {
  fill('red')
  circle(X_(800), Y_(480), Y_(5))
  circle(X_(820), Y_(480), Y_(5))
}

function snuffedOut(){
  if (gameState.frameSnuffed == false){
    gameState.frameSnuffed = frameCount
  }
  if ((frameCount - gameState.frameSnuffed) % 10 == 0 || frameCount == gameState.frameSnuffed) {
    pts = []
    for (let i = 0; i < 4; i++){
      pts.push(X_(random(-7,7), adjust=false))
    }
  }
  c = color('white')
  c.setAlpha(80 + (gameState.frameSnuffed - frameCount)/10)
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
