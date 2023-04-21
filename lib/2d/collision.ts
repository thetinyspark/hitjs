import AABB from "./primitive/AABB";
import Circle from "./primitive/Circle";
import Point from "./primitive/Point";

export function pointVSAABB(point:Point, aabb:AABB):boolean{
    const left:number   = aabb.x;
    const top:number    = aabb.y;
    const right:number  = aabb.x + aabb.width;
    const bottom:number = aabb.y + aabb.height;

    return !( point.x < left || point.y < top || point.x > right || point.y > bottom );
}

export function AABBVSAABB(boxA:AABB, boxB:AABB):boolean{

    const leftA:number   = boxA.x;
    const topA:number    = boxA.y;
    const rightA:number  = boxA.x + boxA.width;
    const bottomA:number = boxA.y + boxA.height;

    const leftB:number   = boxB.x;
    const topB:number    = boxB.y;
    const rightB:number  = boxB.x + boxB.width;
    const bottomB:number = boxB.y + boxB.height;

    return !(
        leftA > rightB || 
        rightA < leftB ||
        topA > bottomB ||
        bottomA < topB
    );
}

export function pointVSCircle(point:Point, circle:Circle):boolean{
    const dx = (point.x - circle.x);
    const dy = (point.y - circle.y);
    const d2 = (dx * dx) + (dy * dy) ;
    const r2 = circle.radius * circle.radius;
    return r2 >= d2;
    // const center = new Point(); 
    // center.x = circle.x;
    // center.y = circle.y;
    // return Point.getDistanceBetween(point,center) <= circle.radius;
}

export function circleVScircle(a:Circle, b:Circle):boolean{
    const centerA:Point = new Point();
    const centerB:Point = new Point();
    centerA.x = a.x;
    centerA.y = a.y;

    centerB.x = b.x;
    centerB.y = b.y;

    const distA:number = Point.getDistanceBetween(centerA, centerB);
    const distB:number = a.radius + b.radius;
    return  distA <= distB;
}