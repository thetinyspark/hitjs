import Point from "./Point";
import Vector from "./Vector";

export default class Segment{
    public a:Point;
    public b:Point;

    constructor(a:Point, b:Point){
        this.a = a;
        this.b = b;
    }
    
    toVector():Vector{
        return new Vector( this.b.x - this.a.x, this.b.y - this.a.y );
    }

    isOnRight(point:Point):boolean{
        const a = this.toVector();
        const b = new Segment(this.a, point).toVector();
        const determinant = Vector.determinant(a,b);
        return determinant < 0;
    }

    isOnLeft(point:Point):boolean{
        const a = this.toVector();
        const b = new Segment(this.a, point).toVector();
        const determinant = Vector.determinant(a,b);
        return determinant > 0;
    }

    isOnSameLine(point:Point):boolean{
        const a = this.toVector();
        const b = new Segment(this.a, point).toVector();
        const determinant = Vector.determinant(a,b);
        return determinant === 0;
    }
}