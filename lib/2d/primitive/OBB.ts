import AABB from "./AABB";
import Point from "./Point";

export default class OBB extends AABB{
    public rotation:number = 0;
    constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0, rotation:number = 0){
        super(x,y,width,height);
        this.rotation = rotation;
    }

    getPoints():Point[]{
        const center:Point = new Point(
            Math.round(this.x + this.width / 2), 
            Math.round(this.y + this.height / 2)
        ); 
        const a:Point = new Point(this.x, this.y);                              //  top left
        const b:Point = new Point(this.x + this.width, this.y);                 //  top right
        const c:Point = new Point(this.x + this.width, this.y + this.height);   //  bottom right
        const d:Point = new Point(this.x, this.y+ this.height);                 //  bottom left

        const points = [a,b,c,d];
        const angleRad = Math.PI / 180 * this.rotation;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        return points.map( 
            (pt)=>{
                const dx = pt.x - center.x;
                const dy = pt.y - center.y;
                const x = Math.round(cos * dx + sin * dy + center.x);
                const y = Math.round(cos * dy - sin * dx + center.y);
                return {x,y};
            }
        );
    }
}