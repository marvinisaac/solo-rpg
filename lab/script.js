// Consult the Fate Chart
function fate() {
    let die = roll(100);
    let range = getRange();
    if (die >= range.noExceptional) {
        return 'Exceptional no'
    }
    if (die >= range.no) {
        return 'No'
    }
    if (die >= range.yes) {
        return 'Yes'
    }
    return 'Exceptional yes'
}

// Roll an n-sided die
function roll(sides) {
    return getRandomInt(1, sides);
}

function getRange() {
    let base = 50;
    return {
        noExceptional: base + ((100 - base) * 4 / 5),
        no: base,
        yes: base / 5
    };
}

// Source: https://stackoverflow.com/a/18230432
function getRandomInt(min, max) {
    // Create byte array and fill with 1 random number
    let byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    let range = max - min + 1;
    let max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
}
