import {pointVSAABB,AABBVSAABB} from "../../lib/2d/collision";
import AABB from "../../lib/2d/primitive/AABB";
import Point from "../../lib/2d/primitive/Point";

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
                const point = new Point();
                const box   = new AABB();

                point.x     = test.point.x;
                point.y     = test.point.y;

                box.x       = test.box.x;
                box.y       = test.box.y;
                box.width   = test.box.w;
                box.height  = test.box.h;

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
                const boxA   = new AABB();
                const boxB   = new AABB();

                boxA.x       = test.boxA.x;
                boxA.y       = test.boxA.y;
                boxA.width   = test.boxA.w;
                boxA.height  = test.boxA.h;

                boxB.x       = test.boxB.x;
                boxB.y       = test.boxB.y;
                boxB.width   = test.boxB.w;
                boxB.height  = test.boxB.h;

                return AABBVSAABB(boxA,boxB);
            }
        ); 

        // then 
        expect(expectedResults).toEqual(results);
    }); 
})