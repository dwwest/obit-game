/// NOTE ON THE COORDINATE SYSTEM ///
// The coordinates are set up so you can enter
// coordinates between 0 and 1200 for the width
// and 0 and 900 for the height and the 
// code will adjust to pixel accordingly

// To dos
// 2) clean up the if statements so they're easier to read

function preload(){
  apartment = loadImage('assets/apartment.png')
  pictureFrame = loadImage('assets/apartment_picture.png')
  plantImg = loadImage('assets/apartment_plant.png')
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
  settings_circle = new Circle(1100, 40, 40, 'gray', 140)
  settings_gear = new Img(1090, 30, 20, 20, gear)
  settings_icon = new CompoundObject([settings_circle, settings_gear], 0)
  
  // SETTINGS MENU OBJECTS //
  menu_box = new Rect(975, 15, 150, 300, 'white', 130, null, 0, 20)
  sound_text = new TextBox(985, 80, 'black', 255, 'To restart, refresh page')
  bright_text = new TextBox(985, 120, 'black', 255, 'Brightness adjust')
  sliderX = 1050; sliderY = 150; sliderWidth = 5; sliderHeight = 150
  slider = new Rect(sliderX, sliderY, 5, 150, 'black', 255, null, 0, 10)
  bottom_tick = new Rect(sliderX - 10, sliderY + sliderHeight - 5, 25, sliderWidth, 'black', 255, null, 0, 5)
  top_tick = new Rect(sliderX - 10, sliderY, 25, sliderWidth, 'black', 255, null, 0, 10)
  bright_indicator = new Circle(sliderX + 2.5, sliderY - 2.5 + sliderHeight, 15, 'white', 255)
  settings_menu = new CompoundObject([menu_box, sound_text, bright_text, slider, top_tick, bottom_tick, bright_indicator], 0)

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
  ipadBody = new Rect(ipadCornerX, ipadCornerY, ipadPickWidth, ipadPickHeight, 'gray', 255, null, 0, 10)
  ipadScreen = new Rect(ipadScreenX, ipadScreenY, ipadScreenWidth, ipadScreenHeight, 'white', 255, 1, 'black')
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
  emailSubjectText = ['obituary', 'please read']
  emailToText = ['To: Jacob Dobry | From: us', 'To: Amanda Dobry']
  emailTimestampText = ['sent today at 11:24pm', 'last opened: August 30, 2024']
  emailSubject = new TextBox(ipadScreenX + 60, ipadScreenY + 140, 'black', 255, emailSubjectText[gameState.inboxOrDrafts], BOLD)
  emailTo = new TextBox(ipadScreenX + 60, ipadScreenY + 155, 'black', 255, emailToText[gameState.inboxOrDrafts], BOLD)
  emailTimestamp = new TextBox(ipadScreenX + 60, ipadScreenY + 170, 'black', 255, emailTimestampText[gameState.inboxOrDrafts], BOLD)
  menu = new CompoundObject([menuRect, emailButton, emailSubject, emailTo, emailTimestamp, inboxButton, inboxText, draftsButton, draftsText])

  // EMAILS //
  headerTexts = ['To: Jacob Dobry  |  From: us  |  obituary  sent today at 11:24pm', 'To: Amanda Dobry | From: Jacob Dobry | please read (draft)']
  header = new TextBox(ipadScreenX + 40, ipadScreenY + 100, 'black', 255, headerTexts[gameState.inboxOrDrafts], BOLD)
  emailBox = new Rect(ipadScreenX + 40, 230, 355, 450, 'white', 255, 1, 'black')
  emailContent = new TextBox(ipadScreenX + 60, 250, 'black', 255, obits[0], NORMAL, 300, 450)
  email = new CompoundObject([header, emailBox, emailContent, backButton, backImage])

  // ZOOMS //
  backOutBox = new Rect(300, 0, 600, 900, 'white', 255, 1)

  // PICTURE //
  pictureBox = new Rect(570, 170, 100, 130, 'white', 255, 1)
  picZoomed = new Img(0, 0, imageWidth, imageHeight, pictureFrame)

  // LETTER FROM PICTURE //
  letterBox = new Rect(650, 780, 100, 8, 40, 255)
  letterLarge = new Rect(400, 200, 200, 400, 'white', 255)
  letterText = new TextBox(410, 210, 'black', 255, letter, NORMAL, 190, 390)
  letter = new CompoundObject([letterLarge, letterText])
  letterOnTable = new Polygon([[700, 540],[730, 540], [760, 570], [720, 570]], 100, 255)
  letterTableBox = new Rect(700, 540, 40, 30, 'white', 255)

  // PLANT //
  plantBox = new Rect(750, 400, 150, 80, 'white', 255, 1)
  plantZoomed = new Img(-200, -800, 1600, 2200, plantImg)

  // PLANT EYES //
  eyeLocations = [[800, 480, 20], [615, 207, 8], [624, 235, 7], [440, 500, 20], [420, 160, 40], [560, 700, 10]]
  eyeOne = new Circle(0, 0, 5, 'red', 255)
  eyeTwo = new Circle(20, 0, 5, 'red', 255)
  eyes = new CompoundObject([eyeOne, eyeTwo])
  blinkFreq = 500

  // VIAL //
  vialInPlantTop = new Ellipse(650, 550, 100, 16, 8, 255)
  vialInPlantMid = new Rect(600, 550, 100, 50, 8, 255)
  vialInPlantBottom = new Ellipse(650, 600, 100, 16, 8, 255)
  vialInPlant = new CompoundObject([vialInPlantBottom, vialInPlantMid, vialInPlantTop])
  vialTop = new Ellipse(700, 500, 15, 8, 50, 255)
  vialBottom = new Ellipse(700, 530, 15, 8, '#010E0A', 255)
  vialMid = new Rect(692, 500, 15, 30, '#010E0A', 255)
  vialOnTable = new CompoundObject([vialBottom, vialMid, vialTop])

  // DRINK VIAL QUESTION PANEL //
  drinkRect = new Rect(0, 0, 1200, 900, 'black', 255)
  drinkQuestion = new TextBox(460, 300, 'white', 255, 'Will you drink the vial?  Choose carefully...')
  drinkYes = new TextBox(500, 400, 'white', 255, 'Yes')
  drinkYesRect = new Rect(500, 400, 10, 10, 'white', 255, 1)
  drinkNo = new TextBox(600, 400, 'white', 255, 'No')
  drinkNoRect = new Rect(600, 400, 10, 10, 'white', 255)
  drink = new CompoundObject([drinkRect, drinkQuestion, drinkYes, drinkNo])
  gameOverFade = new Rect(0, 0, 1200, 900, 'black', 0)
  // add an x to go back to keep searching

  // LEAVE //
  goodEndgameText = new TextBox(300, 300, 'white', 255, 'You flee the apartment.  Shadows seem to follow you out of the corner of your eye, but you manage to escape...')

  // DRINK THE VIAL //
  badEndgameText = new TextBox(200, 300, 'white', 255, "You begin to feel strange... before you collapse to the floor.  You shouldn't have trusted him.  They're here already, you can feel them.  They've come for you.")

  // RUN OUT OF TIME //
  timeOutText = new TextBox(250, 300, 'white', 255, "You feel breath ghost against the back of your neck, hear a skittering behind you...  It seems you've dwelt here too long...")

  // ENDGAME //
  blackoutOne = new Rect(200, 100, 350, 300, 'black', 240, 1)
  blackoutTwo = new Rect(700, 100, 350, 300, 'black', 240, 1)
  partialBlackout = new CompoundObject([blackoutOne, blackoutTwo])
  fullBlackout = new Rect(0, 0, 1200, 900, 'black', 255, 1)
  
  boo = new Img(0, 0, 1200, 900, jumpscare)

}

function draw() {

  // DRAW BLACK BACKGROUND //
  background(0)
  
  // DRAW APARTMENT //
  image(apartment, X_(0), Y_(0), imageWidth, imageHeight);

  // SHADOW ON PHOTO //
  photo_shadow.display()

  // CANDLE BODY //
  candle.display()

  // SETTINGS MENU //
  settings_icon.display()
  if (gameState.settingsOpen == true) {
    settings_menu.display()
  }

  if (frameCount % blinkFreq == 0 && gameState.anyZoomWindow == false) {
    let i = Math.floor(Math.random() * (eyeLocations.length));
    eyeOne.x = X_(eyeLocations[i][0])
    eyeOne.y = Y_(eyeLocations[i][1])
    eyeTwo.x = X_(eyeLocations[i][0] + eyeLocations[i][2])
    eyeTwo.y = Y_(eyeLocations[i][1])
    eyes.display()
  }

  // FLAME //
  if (gameState.vialFound == false) {
    flame.x += X_(sin(frameCount/10), adjust=false)/5
    illum.x += X_(sin(frameCount/10), adjust=false)/5
    flame.display()
    illum.display()
  }
  else {
    snuffedOut()
  }
  
  if (frameCount > 17500 && gameState.anyZoomWindow == false) {
    partialBlackout.display()
  }

  // IPAD IS DARK FOR THE FIRST 100 FRAMES, THEN TURNS ON
  if (frameCount < 100){
    ipad_dark.display()
  }
  else {
    glow.display()
  }

  // DISPLAY LETTER ON TABLE, IF FOUND
  if (gameState.letterPickUp == false && gameState.letterFound == true){
    letterOnTable.display()
  }

  // DISPLAY VIAL ON TABLE, IF FOUND
  if (gameState.vialFound == true && gameState.gameOver == false) {
    vialOnTable.display()
  }

  if (gameState.questionMenu == true) {
    drink.display()
  }

  if (gameState.pickUp == true) {
    ipad.display()
    
    if (gameState.emailOpen == 0) {
      menu.display()
    }  
    else if (gameState.emailOpen == 1) {
      email.display()
    }
  }

  if (gameState.picZoom == true) {
    picZoomed.display()
    if (gameState.letterFound == false) {
      letterBox.display()
    }
  }
  if (gameState.plantZoom == true) {
    plantZoomed.display()
    if (gameState.vialFound == false) {
      vialInPlant.display()
    }
  }

  if (gameState.letterPickUp == true) {
    letter.display()
  }

  if (gameState.gameOver == true) {
    gameOverFade.a += 1
    gameOverFade.display()
    if (frameCount - gameState.gameOverTime > 800 && frameCount - gameState.gameOverTime < 810 && gameState.no == false) {
      if (frameCount % 2) {
        boo.display()
      }
    }
    if (frameCount - gameState.gameOverTime < 700 && frameCount - gameState.gameOverTime > 200 && gameState.yes == true) {
      badEndgameText.display()
    }
    if (frameCount - gameState.gameOverTime < 700 && frameCount - gameState.gameOverTime > 200 && gameState.yes == false && gameState.no == false) {
      timeOutText.display()
    }
    if (frameCount - gameState.gameOverTime > 300 && gameState.no == true) {
      goodEndgameText.display()
    }
  }
  
  if (frameCount > 17500 && gameState.gameOver == false) {
    gameState.gameOver = true
    gameState.gameOverTime = frameCount
    gameState.pickUp = false
    blinkFreq = 10
  }

  adjust_brightness(gameState.bright_mod)
  bright_window.display()

  if (gameState.pickUp == true || gameState.letterPickUp == true || gameState.picZoom == true || gameState.plantZoom == true) {
    gameState.anyZoomWindow = true
  }
  else {
    gameState.anyZoomWindow = false
  }

  // DRAW CURSOR //

  if (ipad_hitbox.boundingBox() && gameState.anyZoomWindow == false) {
    cursor(HAND)
  }
  else if (settings_circle.boundingBox() == true) {
    cursor(HAND)
  }
  else if (pictureBox.boundingBox() == true && gameState.anyZoomWindow == false) {
    cursor(HAND)
  }
  else if (plantBox.boundingBox() == true && gameState.anyZoomWindow == false) {
    cursor(HAND)
  }
  else if (letterBox.boundingBox() == true && gameState.picZoom == true & gameState.letterFound == false) {
    cursor(HAND)
  }
  else if (letterTableBox.boundingBox() == true && gameState.letterFound == true && gameState.anyZoomWindow == false) {
    cursor(HAND)
  }
  else if (vialInPlantMid.boundingBox() == true && gameState.vialFound == false && gameState.plantZoom == true) {
    cursor(HAND)
  }
  else if (vialMid.boundingBox() == true && gameState.vialFound == true && gameState.anyZoomWindow == false) {
    cursor(HAND)
  }
  else {
    cursor(ARROW)
  }
}

/// CLICKS ///

// you can click on things when the photo is up, the photo and the plant
// same here

function mouseClicked(){

  if (gameState.gameOver == false) {
    // Pick up iPad
    if (ipad_hitbox.boundingBox() && gameState.anyZoomWindow==false) {
      if (gameState.inboxOrDrafts == 0){
        gameState.clicks += 1
      }
      updateEmailByGamestate()
      gameState.pickUp = true
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
    else if (settings_menu.object_list[3].boundingBox() && gameState.settingsOpen == true){
      gameState.bright_mod = Math.abs(mouseY - sliderHeight - sliderY)/sliderHeight * 50
      settings_menu.object_list[6].y = mouseY
    }
    // Zoom in on picture
    else if (pictureBox.boundingBox() && gameState.anyZoomWindow == false) {
      gameState.picZoom = true
    }
    // Zoom in on plant
    else if (plantBox.boundingBox() && gameState.anyZoomWindow == false) {
      gameState.plantZoom = true
    }
    // Pick up the vial and zoom out of plant
    else if (vialInPlantMid.boundingBox() && gameState.plantZoom == true) {
      gameState.plantZoom = false
      gameState.vialFound = true
    }
    // Zoom out of picture
    else if (backOutBox.boundingBox() == false && gameState.picZoom == true) {
      gameState.picZoom = false
    }
    // Zoom out of plant
    else if (backOutBox.boundingBox() == false && gameState.plantZoom == true) {
      gameState.plantZoom = false
    }
    // Pick up the letter from picture frame and zoom out of picture
    else if (letterBox.boundingBox() == true && gameState.picZoom == true) {
      gameState.picZoom = false
      gameState.letterPickUp = true
      gameState.letterFound = true
    }
    // Put down letter on table
    else if (letterLarge.boundingBox() == false && gameState.letterPickUp == true) {
      gameState.letterPickUp = false
    }
    // Pick up letter from table
    else if (letterTableBox.boundingBox() == true && gameState.letterFound == true && gameState.anyZoomWindow == false) {
      gameState.letterPickUp = true
    }
    // Pick up vial and get final question
    else if (vialMid.boundingBox() == true && gameState.vialFound == true && gameState.anyZoomWindow == false) {
      gameState.questionMenu = true
    }
    // Exit final question menu
    else if (gameState.questionMenu == true) {
      if (backOutBox.boundingBox() == false && gameState.questionMenu == true) {
        gameState.questionMenu = false
      }
      else if (drinkYesRect.boundingBox() == true && gameState.questionMenu == true && gameState.gameOver == false){
        gameState.yes = true
        gameState.gameOver = true
        gameState.gameOverTime = frameCount
        gameState.questionMenu = false
        blinkFreq = 50
      }
      else if (drinkNoRect.boundingBox() == true && gameState.questionMenu == true && gameState.gameOver == false){
        gameState.no = true
        gameState.gameOver = true
        gameState.gameOverTime = frameCount
        gameState.questionMenu = false
        blinkFreq = 1000
      }
    }
    // Email stuff
    else if (gameState.pickUp == true) {
    // Back button in email
      if (backButton.boundingBox() && gameState.emailOpen > 0){
        gameState.emailOpen = 0
      }
      // Open an email
      else if (emailButton.boundingBox()){
        if (gameState.inboxOrDrafts == 0 && gameState.emailOpen == 0) {
          gameState.clicks += 1
        }
        updateEmailByGamestate()
        gameState.emailOpen = 1
      }
      // Inbox from drafts
      else if (inboxButton.boundingBox() && gameState.emailOpen == 0){
        gameState.clicks += 1
        updateEmailByGamestate()
        menu.object_list[2].txt = emailSubjectText[0]
        menu.object_list[3].txt = emailToText[0]
        menu.object_list[4].txt = emailTimestampText[0]
        gameState.inboxOrDrafts = 0
      }
      // Drafts from inbox
      else if (draftsButton.boundingBox() && gameState.emailOpen == 0){
        menu.object_list[2].txt = emailSubjectText[1]
        menu.object_list[3].txt = emailToText[1]
        menu.object_list[4].txt = emailTimestampText[1]
        gameState.inboxOrDrafts = 1
        updateEmailByGamestate()
      }
      // Put down the iPad
      else if (ipadBody.boundingBox() == false) {
        gameState.pickUp = false
        gameState.lastPutDown = frameCount
      }
    }
  }
}

/// EVENTS ///

function updateEmailByGamestate() {
  if (gameState.inboxOrDrafts == 0 && gameState.clicks < obits.length) {
    email.object_list[2].txt = obits[gameState.clicks-1]
  }
  else if (gameState.inboxOrDrafts == 0 && gameState.clicks >= obits.length) {
    email.object_list[2].txt = obits[obits.length-1]
  }
  else if (gameState.inboxOrDrafts == 1) {
    email.object_list[2].txt = drafts[0]
  }
}

function adjust_brightness() {
  bright_window.a = gameState.bright_mod
}


// DEBUGGING //

function printTo(...data){
  console.log(...data)
  return(data[0])
}
