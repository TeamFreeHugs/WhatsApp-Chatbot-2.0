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

function multiply(carPlate) {
    const factors = [9, 4, 5, 4, 3, 2];
    return carPlate.map((e, i) => {
        return e * factors[i];
    });
}

function remainder(numbers) {
    return numbers.reduce((x, y) => x + y, 0) % 19;
}

describe("Singapore Car Plate Checksum", () => {
    describe("Prefix", () => {
        describe("Letter selection", () => {
            it("selects last 2 of 3 letters", () => {
                var myPrefix = "SJG";
                expect(prefix(myPrefix)).toEqual("JG");
            });

            it("returns both letters for 2-letter prefixes", () => {
                var myPrefix = "SE";
                expect(prefix(myPrefix)).toEqual("SE");
            });

            it("returns zero-padded letter", () => {
                var myPrefix = "E";
                expect(prefix(myPrefix)).toEqual("0E");
            });
        });

        describe("Convert to numbers", () => {
            it("maps letters to numbers", () => {
                var myPrefix = "JG";
                expect(numPrefix(myPrefix)).toEqual([10, 7]);
            });
            it("returns leading 0 and maps remaining letters to numbers", () => {
                var myPrefix = "0E";
                expect(numPrefix(myPrefix)).toEqual([0, 5]);
            });
        });
    });

    describe("Number", () => {
        it("zero-pads numbers to 4-digit array", () => {
            var n = "1";
            expect(number(n)).toEqual([0, 0, 0, 1]);
        });
    });

    describe("toNumber", () => {
        it("converts car plate into numbers", () => {
            var carPlate = "SGA666";
            expect(toNumber(carPlate)).toEqual([7, 1, 0, 6, 6, 6]);
        });
    });

    describe("Multiply", () => {
        it("should convert the car plate numbers into the multiplied numbers", () => {
            var carPlate = [7, 1, 0, 6, 6, 6];
            expect(multiply(carPlate)).toEqual([63, 4, 0, 24, 18, 12]);
        });
    });

    describe("Convert numbers to letter", () => {
        it("returns mod19-remainder of sum of numbers", () => {
            var numbers = [63, 4, 0, 24, 18, 12];
            expect(remainder(numbers)).toEqual(7);
        });
    });
});
