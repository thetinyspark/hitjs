class Line {
    constructor(a,b,color="red"){
        this.a = a; 
        this.b = b;
        this.color = color;
    }

    getY(x){
        return this.a*x + this.b;
    }

    getDirVector(){
        const x1 = 1; 
        const x2 = 2; 
        const y1 = this.getY(x1);
        const y2 = this.getY(x2);
        const dx = x2 - x1;
        const dy = y2 - y1;
        return new Vector(dx,dy);
    }

    static getCrossPoint(lineA, lineB){
        if( lineA.a === lineB.a)
            return null;

        const x = -( lineA.b - lineB.b ) / (lineA.a - lineB.a );
        return {x, y: lineA.a * x + lineA.b};
    }

    static getLineFromPointAndVecDir(pt, vec){
        const a = vec.y / vec.x;
        const b = -(a*pt.x - pt.y);
        return new Line(a,b);
    }

    draw(context){
        context.save();
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(-10000, this.getY(-10000));
        context.lineTo(10000, this.getY(10000));
        context.stroke();
        context.closePath();
        context.restore();
    }
}

class Circle{

    constructor(x = 0, y = 0, radius = 0, color = "brown"){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    getCenter(){
        return new {x:this.x,y:this.y};
    }

    draw(context){
        context.save();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x+this.radius, this.y);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        context.restore();
    }
}

class Vector{
    constructor(x = 0, y = 0, color="purple"){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(context){
        context.save();
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
        context.restore();
    }

    static determinant(a, b){
        return (a.x * b.y) - (b.x * a.y);
    }

    static scalarProduct(a,b){
        return (a.x * b.x) + (a.y * b.y);
    }

    static areOrtho(a, b){
        return Vector.scalarProduct(a,b) === 0;
    }

    static getOrtho(vec){
        const angleRad = Math.PI / 180 * 90;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        const dx = vec.x;
        const dy = vec.y;
        const x = Math.round(cos * dx + sin * dy);
        const y = Math.round(cos * dy - sin * dx);
        return new Vector(x,y);
    }
}

function drawScene(canvas, context, children){
    const midW = canvas.width >> 1;
    const midH = canvas.height >> 1;

    context.clearRect(0,0,canvas.width, canvas.height);
    context.save(); 
    context.translate(midW, midH);
    children.forEach( 
        (child)=>{
            child.draw(context);
        }
    );
    context.restore();
}

function render(){
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("2d"); 
    const a = parseInt(document.getElementById("a_value").value);
    const b = parseInt(document.getElementById("b_value").value);

    const v1 = new Vector(0,-1000);
    const v2 = new Vector(0,1000);
    const v3 = new Vector(-1000,0);
    const v4 = new Vector(1000,0);
    const circ = new Circle(100,-100,50);
    const lineA = new Line(a,b);

    const director = lineA.getDirVector();
    const ortho = Vector.getOrtho(director);
    const perp = Line.getLineFromPointAndVecDir({x:100,y:-100}, ortho);
    const crossPoint = Line.getCrossPoint(lineA,perp);
    const crossCircle = new Circle( crossPoint.x, crossPoint.y, 4, "orange");

    director.color = "green";
    ortho.color = "pink";
    perp.color = "blue";

    const children = [v1,v2,v3,v4,lineA,circ, perp, crossCircle]; 

    drawScene(canvas,context, children);

    // const vec = lineA.getDirVector(); 
    // const pt = {x:5, y:lineA.getY(5)};
    // const lineB = lineA.getLineFromPointAndVecDir(pt,vec);

    // console.log(lineA, lineB);

    // lineB.a++;

    // const x = -( lineA.b - lineB.b ) / (lineA.a - lineB.a );
    // const cross = {x, y: lineA.a * x + lineA.b};
    // console.log(cross);

    // console.log(lineA.getY(cross.x), lineB.getY(cross.x));
}

window.onload = function(){
    document.getElementById("renderBtn").addEventListener("click", render);
    render();
}