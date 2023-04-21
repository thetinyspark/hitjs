import AABB from "../../../lib/2d/primitive/AABB";
import Point from "../../../lib/2d/primitive/Point";
import Circle from "../../../lib/2d/primitive/Circle";

describe('Primitives', 
()=>{
    describe('Point test suite', 
    ()=>{
        it('should be able to create a new Point and its default coordinates should be x = 0, y = 0', 
        ()=>{
            // given
            const point = new Point();
    
            // when then 
            expect(point).not.toBeNull();
            expect(point.x).toEqual(0);
            expect(point.y).toEqual(0);
        }); 

        it('should be able to give the distance a point and another one', 
        ()=>{
            // given
            const testbed = [
                {a:{x:0,y:0} , b:{x:100,y:0} , expected:100 },
                {a:{x:0,y:0} , b:{x:0,y:100} , expected:100 },
                {a:{x:0,y:0} , b:{x:100,y:100} , expected:Math.sqrt(20000) },
                {a:{x:50,y:50} , b:{x:100,y:100} , expected:Math.sqrt(5000) },
            ];

            // when 
            const expectedResults = testbed.map( (t)=>t.expected);
            const results = testbed.map(
                (test)=>{
                    const a = new Point();
                    const b = new Point();

                    a.x     = test.a.x;
                    a.y     = test.a.y;

                    b.x     = test.b.x;
                    b.y     = test.b.y;

                    return Point.getDistanceBetween(a,b);
                }
            ); 

            // then 
            expect(expectedResults).toEqual(results);
        })
    })
    

    it('should be able to create a new AABB and its default coordinates should be x = 0, y = 0, width = 0, height = 0', 
    ()=>{
        // given
        const box = new AABB();

        // when then 
        expect(box).not.toBeNull();
        expect(box.x).toEqual(0);
        expect(box.y).toEqual(0);
        expect(box.width).toEqual(0);
        expect(box.height).toEqual(0);
    });

    it('should be able to create a new Circle and its default coordinates should be x = 0, y = 0, radius = 0', 
    ()=>{
        // given
        const box = new Circle();

        // when then 
        expect(box).not.toBeNull();
        expect(box.x).toEqual(0);
        expect(box.y).toEqual(0);
        expect(box.radius).toEqual(0);
    });
})