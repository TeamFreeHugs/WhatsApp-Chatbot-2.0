function padZeros(array, size) {
    return Array(size - 1).fill(0).concat(array).slice(-size);
}

function number(numbers) {
    return padZeros([...numbers].map(e => parseInt(e)), 4);
}

function prefix(prefix) {
    return padZeros([...prefix], 2).join("");
}

function numPrefix(prefix) {
    var p;
    if (prefix.startsWith("0")) {
        p = prefix.substring(1);
    } else {
        p = prefix;
    }
    return padZeros([...p].map(c => c.codePointAt(0) - 64), 2);
}

function toNumber(carPlate) {
    var [p, n] = carPlate.match(/([A-Z]+)(\d+)/).slice(1, 3);
    return numPrefix(p).concat(number(n));
}


describe("Singapore Car Plate Checksum", function() {
    describe("Prefix", function() {
        describe("Letter selection", function() {
            it("selects last 2 of 3 letters", function() {
                var myPrefix = "SJG";
                expect(prefix(myPrefix)).toEqual("JG");
            });

            it("returns both letters for 2-letter prefixes", function() {
                var myPrefix = "SE";
                expect(prefix(myPrefix)).toEqual("SE");
            });

            it("returns zero-padded letter", function() {
                var myPrefix = "E";
                expect(prefix(myPrefix)).toEqual("0E");
            });
        });

        describe("Convert to numbers", function() {
            it("maps letters to numbers", function() {
                var myPrefix = "JG";
                expect(numPrefix(myPrefix)).toEqual([10, 7]);
            });
            it("returns leading 0 and maps remaining letters to numbers", function() {
                var myPrefix = "0E";
                expect(numPrefix(myPrefix)).toEqual([0, 5]);
            });
        });
    });

    describe("Number", function() {
        it("zero-pads numbers to 4-digit array", function() {
            var n = "1";
            expect(number(n)).toEqual([0, 0, 0, 1]);
        });
    });

    describe("toNumber", function() {
        it("converts car plate into numbers", function() {
            var carPlate = "SGA666";
            expect(toNumber(carPlate)).toEqual([7, 1, 0, 6, 6, 6]);
        })
    });
});
