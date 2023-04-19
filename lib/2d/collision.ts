import AABB from "./primitive/AABB";
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