import Point2D from "../../../lib/2d/primitive/Point2D";

describe('2d Point test suite', 
()=>{
    it('should be able to create a new Point and its default coordinates should be x = 0, y = 0', 
    ()=>{
        // given
        const point = new Point2D();

        // when then 
        expect(point).not.toBeNull();
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(0);
    })
})