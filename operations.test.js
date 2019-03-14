var operations = require("./operations");
var assert = require("assert");

describe("Operation Tests", function(){
    it("should multiply two numbers", function(){
        var expected = 15;
        var result = operations.multiply(3, 5);
        assert.equal(result, expected);
        // assert.notEqual(result, expected);
    });


    it("should add two numbers", function(){
        var expectedResult = 20;
        var result = operations.add(13, 7);
        if(result!==expectedResult){
            throw new Error('Expected '+expectedResult+' but got '+result);
        }
        // else {
        //   console.log("Всё прекрасно работает!");
        // }
    });


    it("should async multiply two numbers", function(done){

        var expectedResult = 12;
        operations.multiplyAsync(4, 3, function(result){
            if(result!==expectedResult){
                throw new Error('Expected'+expectedResult+' but got '+result);
            }
            done();
        });
    });
});
