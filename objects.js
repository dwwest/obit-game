


// draw object
// bounding box
// 

class Box {
    constructor(x, y, color, alpha, stroke=null, stroke_color=0, on_click=null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.alpha = alpha;
        this.stroke = stroke;
        this.stroke_color = stroke_color;
        this.on_click = on_click;
    }
}

class Rect extends Box {
    constructor(x, y, width, height, color, alpha, stroke=null, stroke_color=0){
        super(x, y, color, alpha, stroke, stroke_color)
        this.width = width;
        this.height = height;
    }
    boundingBox(debug=false) {
        if (debug==true) {
        fill(color('red'))
        rect(this.x, this.y, this.width, this.height)
        }
        return(Math.abs(mouseX - this.x) <= this.width/2 && Math.abs(mouseY - this.y) <= this.height/2)
    }
    draw() {
        this.color.setAlpha(this.alpha)
        fill(this.color)
        if (this.stroke === null){
            noStroke()
        }
        else {
            strokeWeight(this.stroke)
            stroke(this.stroke_color)
        }
        rect(this.x, this.y, this.width, this.height);
    }
}

class Circle extends Box {
    constructor(x, y, diameter){
        super(x, y)
        this.diameter = diameter;
    }
    boundingBox(debug=false) {
        if (debug==true) {
        fill(color('red'))
        rect(this.x, this.y, this.diameter)
        }
        return(Math.abs(mouseX - this.x) <= this.diameter/2 && Math.abs(mouseY - this.y) <= this.diameter/2)
    }
}
