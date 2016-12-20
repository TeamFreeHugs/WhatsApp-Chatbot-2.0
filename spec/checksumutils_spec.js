function prefix(prefix) {
    return [0].concat([...prefix]).slice(-2).join('');
}

describe("Singapore Car Plate Checksum", function() {
    describe("Prefix", function() {
          it("selects last 2 of 3 letters", function() {
              var my_prefix = "SJG";
              expect(prefix(my_prefix)).toBe("JG");
          });

          it("returns both letters for 2-letter prefixes", function() {
              var my_prefix = "SE";
              expect(prefix(my_prefix)).toBe("SE");
          });

          it("returns zero-padded letter", function() {
              var my_prefix = "E";
              expect(prefix(my_prefix)).toBe("0E");
          });
    });
});
