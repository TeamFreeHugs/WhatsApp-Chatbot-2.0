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

function calculateRemainder(numbers) {
    return numbers.reduce((x, y) => x + y, 0) % 19;
}

function getChecksum(remainder) {
    const numberPlateChars = {
        0: "A",
        1: "Z",
        2: "Y",
        3: "X",
        4: "U",
        5: "T",
        6: "S",
        7: "R",
        8: "P",
        9: "M",
        10: "L",
        11: "K",
        12: "J",
        13: "H",
        14: "G",
        15: "E",
        16: "D",
        17: "C",
        18: "B"
    };
    return numberPlateChars[remainder];
}

function calculateChecksum(numberPlate) {
    var carPlateNumbers = toNumber(numberPlate);
    var multiplied = multiply(carPlateNumbers);
    var remainder = calculateRemainder(multiplied);
    var checksum = getChecksum(remainder);
    return checksum;
}

module.exports = {calculateChecksum};
