import AABB from "../../../lib/2d/primitive/AABB";

describe('2d Point test suite', 
()=>{
    it('should be able to create a new Point and its default coordinates should be x = 0, y = 0, width = 0, height = 0', 
    ()=>{
        // given
        const box = new AABB();

        // when then 
        expect(box).not.toBeNull();
        expect(box.x).toEqual(0);
        expect(box.y).toEqual(0);
        expect(box.width).toEqual(0);
        expect(box.height).toEqual(0);
    })
})