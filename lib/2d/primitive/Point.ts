export default class Point{
    public x:number = 0;
    public y:number = 0;

    static getDistanceBetween(a:Point,b:Point):number{
        const dx:number = a.x - b.x;
        const dy:number = a.y - b.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }
}