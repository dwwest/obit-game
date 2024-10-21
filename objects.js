

class Box {
    constructor(x, y, c = '', alpha = 0, stroke=null, stroke_color=0, on_click=null) {
        this.x = X_(x);
        this.y = Y_(y);
        this.color = color(c);
        this.alpha = alpha;
        this.stroke = stroke;
        this.stroke_color = stroke_color;
        this.on_click = on_click;
    }
    setColor() {
        this.color.setAlpha(this.alpha)
        fill(this.color)
        if (this.stroke === null){
            noStroke()
        }
        else {
            strokeWeight(this.stroke)
            stroke(this.stroke_color)
        }
    }
}

class Rect extends Box {
    constructor(x, y, width, height, c, alpha, round=null, stroke=null, stroke_color=0){
        super(x, y, c, alpha, stroke, stroke_color)
        this.width = X_(width, false);
        this.height = Y_(height);
        this.round = round
    }
    boundingBox(debug=false) {
        if (debug==true) {
        fill(color('red'))
        rect(this.x, this.y, this.width, this.height)
        }
        return(Math.abs(this.x + this.width/2 - mouseX) <= this.width/2 && Math.abs(this.y + this.height/2 - mouseY) <= this.height/2)
    }
    display() {
        this.setColor()
        rect(this.x, this.y, this.width, this.height, this.round)
    }
}

class Circle extends Box {
    constructor(x, y, diameter, c, alpha, stroke=null, stroke_color=0){
        super(x, y, c, alpha, stroke=null, stroke_color=0)
        this.diameter = X_(diameter, false);
    }
    boundingBox(debug=false) {
        if (debug==true) {
            fill(color('red'))
            rect(this.x, this.y, this.diameter)
        }
        return(Math.abs(mouseX - this.x) <= this.diameter/2 && Math.abs(mouseY - this.y) <= this.diameter/2)
    }
    display() {
        this.setColor()
        circle(this.x, this.y, this.diameter)
    }
}

class Ellipse extends Box {
    constructor(x, y, width, height, c, alpha, stroke=null, stroke_color=0){
        super(x, y, c, alpha, stroke, stroke_color)
        this.width = X_(width, false);
        this.height = Y_(height);
    }
    display() {
        this.setColor()
        ellipse(this.x, this.y, this.width, this.height)
    }
}

class Polygon extends Box {
    constructor(points, c, alpha, stroke=null, stroke_color=0) {
        super(0, 0, c, alpha, stroke, stroke_color)
        this.points = points
    }
    display() {
        this.setColor()
        beginShape()
        for (let i = 0; i < this.points.length; i++) {
            vertex(X_(this.points[i][0]), Y_(this.points[i][1]))
        }
        endShape(CLOSE)
    }
}


class Img extends Box {
    constructor(x, y, width, height, image=''){
        super(x, y)
        this.width = X_(width, false);
        this.height = Y_(height);
        this.image = image;
    }
    display() {
        image(this.image, this.x, this.y, this.width, this.height)
    }
}

class TextBox extends Box {
    constructor(x, y, c='', alpha=255, txt='', style=NORMAL) {
        super(x, y, c, alpha)
        this.txt = txt
        this.style = style
    }
    display() {
        this.setColor()
        textStyle(this.style)
        text(this.txt, this.x, this.y)
    }
}

/// DEFINES AN OBJECT MADE OF MULTIPLE BOXES ///

class CompoundObject {
    constructor(object_list, bounder_ind=null) {
        this.object_list = object_list
        this.bounder_ind = bounder_ind
    }
    // commented the following lines out because this wasn't working
    // boundingBox() {
    //     this.object_list[this.bounder_ind].boundingBox()
    // }
    display() {
        for (let i = 0; i < this.object_list.length; i++) {
            this.object_list[i].display()
        }
    }
}

/// GAME STATE OBJECT THAT HOLDS ALL GAME STATE VARIABLES ///

class GameState {
    constructor(pickUp, settingsOpen, soundOn, bright_mod, clicks, frameSnuffed, emailOpen, inboxOrDrafts, lastPutDown) {
        this.pickUp = pickUp || false
        this.settingsOpen = settingsOpen || false
        this.soundOn = soundOn|| false
        this.bright_mod = bright_mod || 0
        this.clicks = clicks || 0
        this.frameSnuffed = frameSnuffed || false
        this.emailOpen = emailOpen || 2
        this.inboxOrDrafts = inboxOrDrafts || 0
        this.lastPutDown = lastPutDown || 0;
    }
}

/// COORDINATE ADJUSTMENT FUNCTIONS ///

function X_(input, adjust=true, coordWidth=1200, imageWidth=windowWidth*0.8) {
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
  
function Y_(input, coordHeight=900, imAspect = 900/1200, imageWidth=windowWidth*0.8, imageHeight=imAspect*imageWidth) {
    // imageHeight is the actual height of the image in pixels
    // and coordHeight is the number input by the user for the 
    // coordinate system
    return input/coordHeight * imageHeight
  }