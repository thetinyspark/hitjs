import AABB from "../../../lib/2d/primitive/AABB";
import Point from "../../../lib/2d/primitive/Point";
import Circle from "../../../lib/2d/primitive/Circle";
import Segment from "../../../lib/2d/primitive/Segment";
import Vector from "../../../lib/2d/primitive/Vector";
import OBB from "../../../lib/2d/primitive/OBB";

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

        it('should be able to set x and y with the constructor', 
        ()=>{
            // given
            const pointA = new Point(10,10);
            const pointB = new Point(11,12);

            // when then
            expect(pointA.x).toEqual(10);
            expect(pointA.y).toEqual(10);

            expect(pointB.x).toEqual(11);
            expect(pointB.y).toEqual(12);
        })

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
    });

    describe('Circle test suite', 
    ()=>{
        it('should be able to create a new Circle and set its x,y,radius with constructor', 
        ()=>{
            // given
            const circ = new Circle(10,11,12);
    
            // when then 
            expect(circ.x).toEqual(10);
            expect(circ.y).toEqual(11);
            expect(circ.radius).toEqual(12);
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
    });

    describe('AABB test suite', 
    ()=>{
        it('should be able to create an AABB and set its x,y,width,height with constructor', 
        ()=>{
            // given
            const box = new AABB(10,11,12,13);

            // when then 
            expect(box).not.toBeNull();
            expect(box.x).toEqual(10);
            expect(box.y).toEqual(11);
            expect(box.width).toEqual(12);
            expect(box.height).toEqual(13);
        });
        
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
    });

    describe('Segment test suite', 
    ()=>{
        it('should be able to create a a segment and set its two points from constructor', 
        ()=>{
            // given
            const segment = new Segment( new Point(10,11), new Point(12,13));

            // when then 
            expect(segment).not.toBeNull();
            expect(segment.a.x).toEqual(10);
            expect(segment.a.y).toEqual(11);
            expect(segment.b.x).toEqual(12);
            expect(segment.b.y).toEqual(13);
        });

        it('should be able to turn a segment into a vector', 
        ()=>{
            // given
            const data = [
                {x1:0, y1:0, x2:100, y2:100, expected: new Vector(100-0, 100-0)},
                {x1:10, y1:20, x2:100, y2:100, expected: new Vector(100-10, 100-20)},
                {x1:-10, y1:-20, x2:100, y2:100, expected: new Vector(100+10, 100+20)},
                {x1:-10, y1:-20, x2:-100, y2:100, expected: new Vector(-100+10, 100+20)},
                {x1:-10, y1:-20, x2:-100, y2:-100, expected: new Vector(-100+10, -100+20)},
            ];

            // when
            const expected = data.map( t => t.expected );
            const results = data.map( 
                (test)=>{
                    const segment = new Segment(
                        new Point(test.x1, test.y1),
                        new Point(test.x2, test.y2)
                    );
                    return segment.toVector();
                }
            );

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to say if a point is on the right of a segment or not', 
        ()=>{
            // given
            const data = [
                { seg: {x1:100, y1:0, x2:100, y2:100}, point:{x:105,y:0}, expected:true},
                { seg: {x1:100, y1:0, x2:100, y2:100}, point:{x:95,y:0}, expected:false},
                { seg: {x1:100, y1:100, x2:100, y2:0}, point:{x:95,y:0}, expected:true},
                { seg: {x1:100, y1:100, x2:100, y2:0}, point:{x:105,y:0}, expected:false},
            ];

            // when
            const expected = data.flatMap( t => [t.expected,!t.expected] );
            const results = data.flatMap( 
                (test)=>{
                    const segment = new Segment(
                        new Point(test.seg.x1, test.seg.y1),
                        new Point(test.seg.x2, test.seg.y2)
                    );
                    const isOnRight = segment.isOnRight(new Point(test.point.x, test.point.y));
                    const isOnLeft = segment.isOnLeft(new Point(test.point.x, test.point.y));
                    return [isOnRight, isOnLeft];
                }
            );

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to say if a point is on the same line', 
        ()=>{
            // given
            const data = [
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:50,y:50}, expected:true},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:-50,y:-50}, expected:true},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:-150,y:-150}, expected:true},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:100,y:101}, expected:false},
            ];

            // when
            const expected = data.flatMap( t => t.expected );
            const results = data.flatMap( 
                (test)=>{
                    const segment = new Segment(
                        new Point(test.seg.x1, test.seg.y1),
                        new Point(test.seg.x2, test.seg.y2)
                    );
                    return segment.isOnSameLine(new Point(test.point.x, test.point.y));
                }
            );

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to say if a point is on a segment or not', 
        ()=>{
            // given
            const data = [
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:50,y:50}, expected:true},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:-50,y:-50}, expected:false},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:-150,y:-150}, expected:false},
                { seg: {x1:0, y1:0, x2:100, y2:100}, point:{x:100,y:101}, expected:false},
            ];

            // when
            const expected = data.flatMap( t => t.expected );
            const results = data.flatMap( 
                (test)=>{
                    const segment = new Segment(
                        new Point(test.seg.x1, test.seg.y1),
                        new Point(test.seg.x2, test.seg.y2)
                    );
                    return segment.isOnSegment(new Point(test.point.x, test.point.y));
                }
            );

            // then 
            expect(results).toEqual(expected);
        });
    });

    describe('Vector test suite', 
    ()=>{
        it('should be able to create a vector from constructor', 
        ()=>{
            // given
            const vector = new Vector( 10,11);

            // when then 
            expect(vector).not.toBeNull();
            expect(vector.x).toEqual(10);
            expect(vector.y).toEqual(11);
        });

        it('should be able to calculate the determinant of 2 vectors', 
        ()=>{
            // given
            const data = [
                {a:{x:1, y:5}, b:{x:2,y:5}, expected: (1*5)-(2*5)},
                {a:{x:2, y:5}, b:{x:2,y:5}, expected: (2*5)-(2*5)},
                {a:{x:2, y:6}, b:{x:3,y:5}, expected: (2*5)-(3*6)},
                {a:{x:2, y:1}, b:{x:-4,y:3}, expected: (2*3)-(-4*1)},
            ];
            
            // when 
            const expected = data.map(t=>t.expected);
            const results = data.map( 
                (test)=>{
                    const a = new Vector( test.a.x,test.a.y);
                    const b = new Vector( test.b.x,test.b.y);
                    const determinant:number = Vector.determinant(a,b);
                    return determinant;
                }
            )

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to say if two vectors are ortho or not', 
        ()=>{
            // given
            const data = [
                {a:{x:0, y:1}, b:{x:1,y:0}, expected: true},
                {a:{x:0, y:100}, b:{x:100,y:0}, expected: true},
                {a:{x:0, y:-100}, b:{x:100,y:0}, expected: true},
                {a:{x:0, y:-100}, b:{x:-100,y:0}, expected: true},
                {a:{x:0, y:-100}, b:{x:-100,y:1}, expected: false},
            ];
            
            // when 
            const expected = data.map(t=>t.expected);
            const results = data.map( 
                (test)=>{
                    const a = new Vector( test.a.x,test.a.y);
                    const b = new Vector( test.b.x,test.b.y);
                    const ortho:boolean = Vector.areOrtho(a,b);
                    return ortho;
                }
            )

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to calculate a vector orthogonal (perpendicular) to another one', 
        ()=>{
            // given
            const maxX:number = 100; 
            const maxY:number = 100;
            const num:number = 20;
            const results:boolean[] = [];
            const expected:boolean[] = [];
            // when 
            for( let i:number = 0; i < num; i++ ){
                const vec = new Vector( Math.round( Math.random() * maxX) , Math.round( Math.random() * maxY));
                const ortho = Vector.getOrtho(vec);
                expected.push(true);
                results.push(Vector.areOrtho(vec,ortho));
            }

            // then 
            expect(results).toEqual(expected);
        });

        it('should be able to calculate the scalar product of two vectors', 
        ()=>{
            // given
            const data = [
                {a:{x:0, y:1}, b:{x:1,y:0}, expected: 0},
                {a:{x:1, y:1}, b:{x:1,y:1}, expected: 2},
                {a:{x:2, y:1}, b:{x:1,y:1}, expected: 3},
                {a:{x:2, y:1}, b:{x:1,y:2}, expected: 4},
                {a:{x:2, y:1}, b:{x:2,y:2}, expected: 6},
            ];
            
            // when 
            const expected = data.map(t=>t.expected);
            const results = data.map( 
                (test)=>{
                    const a = new Vector( test.a.x,test.a.y);
                    const b = new Vector( test.b.x,test.b.y);
                    return Vector.scalarProduct(a,b);
                }
            )

            // then 
            expect(results).toEqual(expected);
        });
    });

    describe('OBB test suite', 
    ()=>{
        it('should be able to create an OBB from constructor', 
        ()=>{
            // given
            const obb:OBB = new OBB(0,0,100,100,0);

            // when then 
            expect(obb.x).toEqual(0);
            expect(obb.y).toEqual(0);
            expect(obb.width).toEqual(100);
            expect(obb.height).toEqual(100);
            expect(obb.rotation).toEqual(0);
        });

        it('should be able to getPoints according to the OBB rotation ',
        ()=>{
            // given
            const obb:OBB = new OBB(0,0,100,100,45);

            // when 
            const points:Point[] = obb.getPoints();


            //then 
            expect(points[0].x).toEqual(-21);
            expect(points[0].y).toEqual(50);

            expect(points[1].x).toEqual(50);
            expect(points[1].y).toEqual(-21);

            expect(points[2].x).toEqual(121);
            expect(points[2].y).toEqual(50);

            expect(points[3].x).toEqual(50);
            expect(points[3].y).toEqual(121);
        });
    });
})