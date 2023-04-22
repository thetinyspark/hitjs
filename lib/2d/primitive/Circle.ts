import Point from "./Point";

export default class Circle{
    public x:number = 0;
    public y:number = 0;
    public radius:number = 0;

    constructor(x:number = 0, y:number = 0, radius:number = 0){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    getCenter():Point{
        return new Point(this.x,this.y);
    }
}