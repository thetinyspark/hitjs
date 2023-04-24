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

    isOnSegment(point:Point):boolean{
        if( !this.isOnSameLine(point) )
            return false;

        const minX:number = Math.min(this.a.x, this.b.x);
        const maxX:number = Math.max(this.a.x, this.b.x);
        const minY:number = Math.min(this.a.y, this.b.y);
        const maxY:number = Math.max(this.a.y, this.b.y);

        return !(
            point.x < minX || 
            point.x > maxX || 
            point.y < minY || 
            point.y > maxY 
        );
    }

    isOnSameLine(point:Point):boolean{
        const a = this.toVector();
        const b = new Segment(this.a, point).toVector();
        const determinant = Vector.determinant(a,b);
        return determinant === 0;
    }
}