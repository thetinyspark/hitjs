import AABB from "./primitive/AABB";
import Circle from "./primitive/Circle";
import OBB from "./primitive/OBB";
import Point from "./primitive/Point";
import Segment from "./primitive/Segment";

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
    return Point.getDistanceBetween(point, circle.getCenter()) <= circle.radius;
}

export function circleVScircle(a:Circle, b:Circle):boolean{
    return  Point.getDistanceBetween( a.getCenter() , b.getCenter()) <= a.radius + b.radius;
}

export function pointVSOBB(point:Point, obb:OBB):boolean{
    let right:boolean = null;
    const points = obb.getPoints();
    for( let i:number = 0; i < points.length ; i++ ){
        const a:Point = points[i];
        const b:Point = (i+1 >= points.length ) ? points[0] : points[i+1];
        const segment:Segment = new Segment(a,b);
        if( i == 0 ){
            right = segment.isOnRight(point);
        }
        else{
            if( right !== segment.isOnRight(point)){
                return false;
            }
        }
    }
    return true;
}

export function segmentVSSegment(a:Segment, b:Segment):boolean{
    return !(b.isOnLeft(a.a) === b.isOnLeft(a.b));
}

export function segmentVSCircle(segment:Segment, circ:Circle):boolean{
    return false;
}