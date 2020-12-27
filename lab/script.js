// Ask a question on the Fate Chart
function fate(chaos = 5, odds =  '50/50') {
    let die = roll(100);
    let range = getRange(chaos, odds);

    return {
        fate: fateResult(die, range),
        event: fateEvent(die, chaos)
    };
}

// Consult the Fate Chart for result
function fateResult(die, range) {
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

// Check if question triggered a random event
function fateEvent(die, chaos) {
    if (die % 11 === 0
        && die / 11 <= chaos
    ) {
        return true;
    }
    return false;
}

// Roll an n-sided die
function roll(sides) {
    return getRandomInt(1, sides);
}

function getRange(chaos, odds) {
    let base = getBase(chaos, odds);
    return {
        noExceptional: base + ((100 - base) * 4 / 5),
        no: base,
        yes: base / 5
    };
}

function getBase(chaos, odds) {
    const chart = {
        'impossible': {
            9: 50,
            8: 25,
            7: 15,
            6: 10,
            5: 5,
            4: 5,
            3: 0,
            2: 0,
            1: -20
        },
        'no way': {
            9: 75,
            8: 50,
            7: 35,
            6: 25,
            5: 15,
            4: 10,
            3: 5,
            2: 5,
            1: 0
        },
        'very unlikely': {
            9: 85,
            8: 65,
            7: 50,
            6: 45,
            5: 25,
            4: 15,
            3: 10,
            2: 5,
            1: 5
        },
        'unlikely': {
            9: 90,
            8: 75,
            7: 55,
            6: 50,
            5: 35,
            4: 20,
            3: 15,
            2: 10,
            1: 5
        },
        '50/50': {
            9: 95,
            8: 85,
            7: 75,
            6: 65,
            5: 50,
            4: 35,
            3: 25,
            2: 15,
            1: 10
        },
        'somewhat likely': {
            9: 95,
            8: 90,
            7: 85,
            6: 80,
            5: 65,
            4: 50,
            3: 45,
            2: 25,
            1: 20
        },
        'likely': {
            9: 100,
            8: 95,
            7: 90,
            6: 85,
            5: 75,
            4: 55,
            3: 50,
            2: 35,
            1: 25
        },
        'very likely': {
            9: 105,
            8: 95,
            7: 95,
            6: 90,
            5: 85,
            4: 75,
            3: 65,
            2: 50,
            1: 45
        },
        'near sure thing': {
            9: 115,
            8: 100,
            7: 95,
            6: 95,
            5: 90,
            4: 80,
            3: 75,
            2: 55,
            1: 50
        },
        'a sure thing': {
            9: 125,
            8: 110,
            7: 95,
            6: 95,
            5: 90,
            4: 85,
            3: 80,
            2: 65,
            1: 55
        },
        'has to be': {
            9: 145,
            8: 130,
            7: 100,
            6: 100,
            5: 95,
            4: 95,
            3: 90,
            2: 85,
            1: 80
        }
    };
    return chart[odds][chaos];
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
