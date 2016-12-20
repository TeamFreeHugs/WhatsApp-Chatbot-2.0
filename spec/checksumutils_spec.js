function padZeros(array) {
    return [0].concat(array).slice(-2);
}

function prefix(prefix) {
    return padZeros([...prefix]).join("");
}

function numPrefix(prefix) {
    var p;
    if (prefix.startsWith("0")) {
        p = prefix.substring(1);
    } else {
        p = prefix;
    }
    return padZeros([...p].map(c => c.codePointAt(0) - 64));
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
});
