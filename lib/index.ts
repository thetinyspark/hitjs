import Circle from "./2d/primitive/Circle";
import Point from "./2d/primitive/Point";
import Segment from "./2d/primitive/Segment";
import Vector from "./2d/primitive/Vector";

var colors = {
    line: "red", 
    segment: "blue", 
    circle: "orange",
    vector: "purple"
}

class Line {
    public a:number;
    public b:number;

    constructor(a:number,b:number){
        this.a = a; 
        this.b = b;
    }

    getY(x:number):number{
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
}

function segmentVSCircle(segment:Segment, circ:Circle):boolean{

    const vec:Vector = segment.toVector();
    const ortho:Vector = Vector.getOrtho(vec);
    const dividor:number = 1 / 1000000000000;

    const a1:number = ( vec.x === 0 ) ? vec.y / dividor : vec.y / vec.x;
    const b1:number = -(a1 * segment.a.x - segment.a.y);

    const a2:number = ( ortho.x === 0 ) ? ortho.y / dividor :ortho.y / ortho.x;
    const b2:number = -(a2*circ.x - circ.y);

    if( a1 === a2 )
        return false;

    const crossPointX:number = -(b1 - b2) / (a1 - a2);
    const crossPointY:number = crossPointX * a1 + b1;
    const crossPoint:Point = new Point( Math.round( crossPointX ), Math.round( crossPointY) );
    const dist:number = Point.getDistanceBetween(circ.getCenter(), crossPoint);

    const minX:number = Math.min(segment.a.x, segment.b.x);
    const maxX:number = Math.max(segment.a.x, segment.b.x);
    const minY:number = Math.min(segment.a.y, segment.b.y);
    const maxY:number = Math.max(segment.a.y, segment.b.y);
    const isOnSegment:boolean = !(
        crossPoint.x < minX || 
        crossPoint.x > maxX || 
        crossPoint.y < minY || 
        crossPoint.y > maxY 
    );

    console.log("*****************************");
    console.log("dir: ", vec);
    console.log("ortho: ", ortho);
    console.log("segment", segment);
    console.log("crossPoint: ", crossPoint);
    console.log("dist: ", dist);
    console.group("isonsegment: ", isOnSegment);
    console.log( crossPoint.x < minX );
    console.log( crossPoint.x > maxX );
    console.log( crossPoint.y < minY );
    console.log( crossPoint.y > maxY  );
    console.groupEnd();
    
    // return crossPoint;
    return isOnSegment && dist <= circ.radius;
}

function drawSegment(context:CanvasRenderingContext2D, segment:Segment):void{
    context.save();
    context.strokeStyle = colors.segment;
    context.beginPath();
    context.moveTo(segment.a.x, segment.a.y);
    context.lineTo(segment.b.x, segment.b.y);
    context.stroke();
    context.closePath();
    context.restore();
}

function drawLine(context:CanvasRenderingContext2D, line:Line):void{
    context.save();
    context.strokeStyle = colors.line;
    context.beginPath();
    context.moveTo(-10000, line.getY(-10000));
    context.lineTo(10000, line.getY(10000));
    context.stroke();
    context.closePath();
    context.restore();
}

function drawCircle(context:CanvasRenderingContext2D, circ:Circle):void{
    context.save();
    context.strokeStyle = colors.circle;
    context.fillStyle = colors.circle;
    context.beginPath();
    context.moveTo(circ.x+circ.radius, circ.y);
    context.arc(circ.x, circ.y, circ.radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
    context.restore();
}

function drawVector(context:CanvasRenderingContext2D, vec:Vector):void{
    context.save();
    context.strokeStyle = colors.vector;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(vec.x, vec.y);
    context.stroke();
    context.closePath();
    context.restore();
}

function drawScene(canvas, context, children){
    const midW = canvas.width >> 1;
    const midH = canvas.height >> 1;

    context.clearRect(0,0,canvas.width, canvas.height);
    context.save(); 
    context.translate(midW, midH);
    children.forEach( 
        (child)=>{
            child.renderFunc(context, child.obj);
        }
    );
    context.restore();
}

function render(data){
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("2d"); 

    const v1 = new Vector(0,-1000);
    const v2 = new Vector(0,1000);
    const v3 = new Vector(-1000,0);
    const v4 = new Vector(1000,0);
    
    const entry = data.shift();

    const segment = new Segment(
        new Point(
            entry.segment[0].x,
            entry.segment[0].y
        ),
        new Point(
            entry.segment[1].x,
            entry.segment[1].y
        )
    );

    const circ = new Circle( entry.circle.x,entry.circle.y,entry.circle.radius);
    const crossing = segmentVSCircle(segment, circ);

    colors.circle = crossing ? "green" : "red";

    const children = [
        { renderFunc: drawVector, obj: v1},
        { renderFunc: drawVector, obj: v2},
        { renderFunc: drawVector, obj: v3},
        { renderFunc: drawVector, obj: v4},
        { renderFunc: drawCircle, obj: circ},
        { renderFunc: drawSegment, obj: segment},
    ];
    
    drawScene(canvas,context, children);

    if( data.length > 0  )
        setTimeout( ()=>render(data), 2500 );
}

window.onload = async function(){
    const response = await window.fetch("./data.json")
    const data = await response.json();
    render(data);
}