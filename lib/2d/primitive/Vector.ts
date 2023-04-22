export default class Vector{
    public x:number = 0;
    public y:number = 0;

    constructor(x:number = 0, y:number = 0){
        this.x = x;
        this.y = y;
    }

    static getOrtho(vec:Vector):Vector{
        const angleRad = Math.PI / 180 * 90;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        const dx = vec.x;
        const dy = vec.y;
        const x = Math.round(cos * dx + sin * dy);
        const y = Math.round(cos * dy - sin * dx);
        return new Vector(x,y);
    }
    
    static determinant(a:Vector, b:Vector):number{
        return (a.x * b.y) - (b.x * a.y);
    }

    static scalarProduct(a:Vector,b:Vector):number{
        return (a.x * b.x) + (a.y * b.y);
    }

    static areOrtho(a:Vector, b:Vector):boolean{
        return Vector.scalarProduct(a,b) === 0;
    }
}