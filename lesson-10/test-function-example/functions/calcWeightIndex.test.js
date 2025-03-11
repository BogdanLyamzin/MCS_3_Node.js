import calcWeightIndex from "./calcWeightIndex.js";

/*
1. Given weight and height.
2. If argument valid arguments return weight / (height * height) round to 2.
3. If given invalid arguments throw error with correct message.

90, 1.9 => 24.93
1.9, 90 => error 'weight must be first argument and height - second'
-90, -1.9 => error 'weight and height must be positive number'
'90', '1.9' => error 'weight and height must be number'
 => error 'weight and height required'
*/

describe("test calcWeightIndex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    if(value !== this.result) {
                        throw new Error("Test failed");
                    }
                    return true;
                }
             }
        }
        */
    })

    test("1.9, 90 => error 'weight must be first argument and height - second'", ()=> {
        expect(() => calcWeightIndex(1.9, 90)).toThrow('weight must be first argument and height - second');
    })

    it("-90, -1.9 => error 'weight and height must be positive number'", ()=> {
        expect(() => calcWeightIndex(-90, -1.9)).toThrow('weight and height must be positive number');
    })

    test("'90', '1.9' => error 'weight and height must be number'", ()=> {
        expect(() => calcWeightIndex('90', 1.9)).toThrow('weight and height must be number');
        expect(() => calcWeightIndex(90, '1.9')).toThrow('weight and height must be number');
    })

    test(" => error 'weight and height required'", ()=> {
        expect(() => calcWeightIndex(90)).toThrow('weight and height required');
        expect(() => calcWeightIndex()).toThrow('weight and height required');
    })
})