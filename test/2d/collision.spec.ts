import {pointVSAABB,AABBVSAABB, pointVSCircle, circleVScircle,segmentVSSegment, pointVSOBB, segmentVSCircle} from "../../lib/2d/collision";
import AABB from "../../lib/2d/primitive/AABB";
import Circle from "../../lib/2d/primitive/Circle";
import OBB from "../../lib/2d/primitive/OBB";
import Point from "../../lib/2d/primitive/Point";
import Segment from "../../lib/2d/primitive/Segment";

describe('2d collision test suite', 
()=>{
    it('should be able to say if a point collides an AABB or not', 
    ()=>{
        // given
        const testbed = [
            {point:{x:0,y:0}        , box:{x:0,y:0,w:0,h:0}     , expected:true     },
            {point:{x:0,y:0}        , box:{x:1,y:1,w:0,h:0}     , expected:false    },
            {point:{x:1,y:1}        , box:{x:1,y:1,w:0,h:0}     , expected:true     },
            {point:{x:10,y:10}      , box:{x:1,y:1,w:100,h:100} , expected:true     },
            {point:{x:10,y:10}      , box:{x:1,y:1,w:100,h:9}   , expected:true     },
            {point:{x:10,y:10}      , box:{x:1,y:1,w:100,h:8}   , expected:false    },
            {point:{x:-1,y:-1}      , box:{x:0,y:0,w:100,h:100} , expected:false    },
            {point:{x:101,y:101}    , box:{x:0,y:0,w:100,h:100} , expected:false    },
        ]

        // when 

        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const point = new Point(test.point.x, test.point.y);
                const box   = new AABB(test.box.x, test.box.y, test.box.w, test.box.h);
                return pointVSAABB(point,box);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 

    it('should be able to say if an AABB collides another one', 
    ()=>{
        // given
        const testbed = [
            {boxA:{x:0,y:0,w:0,h:0}             , boxB:{x:0,y:0,w:0,h:0}        , expected:true },
            {boxA:{x:0,y:0,w:100,h:100}         , boxB:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxA:{x:10,y:10,w:100,h:100}       , boxB:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxA:{x:15,y:15,w:100,h:100}       , boxB:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxA:{x:20,y:20,w:100,h:100}       , boxB:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxA:{x:31,y:31,w:100,h:100}       , boxB:{x:10,y:10,w:20,h:20}    , expected:false },

            // reversed
            {boxB:{x:0,y:0,w:100,h:100}         , boxA:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxB:{x:10,y:10,w:100,h:100}       , boxA:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxB:{x:15,y:15,w:100,h:100}       , boxA:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxB:{x:20,y:20,w:100,h:100}       , boxA:{x:10,y:10,w:20,h:20}    , expected:true },
            {boxB:{x:31,y:31,w:100,h:100}       , boxA:{x:10,y:10,w:20,h:20}    , expected:false },
        ]

        // when 
        
        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const boxA   = new AABB(test.boxA.x,test.boxA.y,test.boxA.w,test.boxA.h);
                const boxB   = new AABB(test.boxB.x,test.boxB.y,test.boxB.w,test.boxB.h);
                return AABBVSAABB(boxA,boxB);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 

    it('should be able to say if a Point collides a circle', 
    ()=>{
        // given
        const testbed = [
            {point:{x:-1,y:-1}      , circ:{x:100,y:100,r:100}, expected:false },
            {point:{x:0,y:0}        , circ:{x:100,y:100,r:100}, expected:false },
            {point:{x:100,y:100}    , circ:{x:100,y:100,r:100}, expected:true },
            {point:{x:100,y:200}    , circ:{x:100,y:100,r:100}, expected:true },
            {point:{x:0,y:200}      , circ:{x:100,y:100,r:100}, expected:false },
            {point:{x:200,y:100}    , circ:{x:100,y:100,r:100}, expected:true },
            {point:{x:0,y:200}      , circ:{x:100,y:100,r:100}, expected:false },
        ]

        // when 
        
        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const point   = new Point(test.point.x,test.point.y);
                const circ   = new Circle(test.circ.x,test.circ.y,test.circ.r);
                return pointVSCircle(point,circ);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 

    it('should be able to say if a circle collides another circle', 
    ()=>{
        // given
        const testbed = [
            {a:{x:0,y:0, r: 100}, b:{x:100,y:100,r:100}, expected:true },
            {a:{x:-1,y:-1, r: 100}, b:{x:100,y:100,r:100}, expected:true },
            {a:{x:-100,y:100, r: 100}, b:{x:100,y:100,r:100}, expected:true },
            {a:{x:100,y:-100, r: 100}, b:{x:100,y:100,r:100}, expected:true },
            {a:{x:-100,y:-100, r: 100}, b:{x:100,y:100,r:100}, expected:false },
        ];

        // when 
        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const a   = new Circle(test.a.x,test.a.y,test.a.r);
                const b   = new Circle(test.b.x,test.b.y,test.b.r);
                return circleVScircle(a,b);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 

    it('should be able to say if a point collides an OBB or not', 
        ()=>{
            // given
            const data = [
                { 
                    obb: new OBB(0,0,100,100,0), 
                    target: new Point(50,50), 
                    expected: true
                },
                { 
                    obb: new OBB(0,0,100,100,45), 
                    target: new Point(50,50), 
                    expected: true
                },
                { 
                    obb: new OBB(0,0,100,100,45), 
                    target: new Point(10,10), 
                    expected: false
                },
                { 
                    obb: new OBB(0,0,100,100,45), 
                    target: new Point(100,100), 
                    expected: false
                },
            ];

            // when 
            const expected = data.map( t => t.expected); 
            const results = data.map(
                (test)=>{
                    return pointVSOBB(test.target, test.obb);
                }
            );


            // when then 
            expect(results).toEqual(expected)
    });

    it('should be able to say if a segment crosses another one', 
    ()=>{
        // given
        const testbed = [
            {
                a:{x1:0,y1:0,x2:100,y2:100}, 
                b:{x1:0,y1:100,x2:100,y2:0}, 
                expected:true 
            },
            {
                // shares one vertex
                a:{x1:0,y1:0,x2:100,y2:100}, 
                b:{x1:100,y1:100,x2:100,y2:0}, 
                expected:false 
            },
            {
                // shares 0 vertex
                a:{x1:0,y1:0,x2:100,y2:100}, 
                b:{x1:101,y1:101,x2:100,y2:0}, 
                expected:false 
            },
            {
                a:{x1:0,y1:0,x2:1000,y2:0}, 
                b:{x1:100,y1:-100,x2:0,y2:100}, 
                expected:true
            },
        ];

        // when 
        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const a   = new Segment( new Point(test.a.x1,test.a.y1), new Point(test.a.x2,test.a.y2));
                const b   = new Segment( new Point(test.b.x1,test.b.y1), new Point(test.b.x2,test.b.y2));
                return segmentVSSegment(a,b);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 

    it('should be able to say if a segment crosses a circle or not', 
    ()=>{
        // given
        const testbed = [
 
                {
                    segment:[{x:0,y:0}, {x:150,y:-20}], 
                    circle: {x:150,y:-20,radius:50}, 
                    expected: true
                },
                {
                    segment:[{x:0,y:-70}, {x:300,y:-68}], 
                    circle: {x:150,y:-20,radius:50},
                    expected: true
                },
                {
                    segment:[{x:0,y:-71}, {x:300,y:-71}], 
                    circle: {x:150,y:-20,radius:50}, 
                    expected: false
                },
                {
                    segment:[{x:150,y:100}, {x:150,y:-100}], 
                    circle: {x:150,y:-20,radius:50}, 
                    expected: true
                },
                {
                    segment:[{x:150,y:20}, {x:150,y:-40}], 
                    circle: {x:150,y:-20,radius:50}, 
                    expected: true
                }
            
        ];

        // when 
        const expectedResults = testbed.map( (t)=>t.expected);
        const results = testbed.map(
            (test)=>{
                const segment = new Segment( 
                    new Point(test.segment[0].x,test.segment[0].y), 
                    new Point(test.segment[1].x,test.segment[1].y)
                ); 

                const circle = new Circle( test.circle.x, test.circle.y, test.circle.radius);
                return segmentVSCircle(segment,circle);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 
})