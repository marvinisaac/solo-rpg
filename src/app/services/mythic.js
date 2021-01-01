import config from './mythic-config';

export default {
    // "Public" functions
    ask(chaos = config.defaults.chaos, odds = config.defaults.odds) {
        const die = this.roll(100);
        const range = this._getRange(chaos, odds);

        return {
            result: this._getResult(die, range),
            randomEvent: this._getRandomEvent(die, chaos)
        }
    },
    roll(sides = config.defaults.sides) {
        return this._getRandomInt(1, sides);
    },
    // "Private" functions
    _getEventAction() {
        const die = this.roll(100) - 1;
        return config.actions[die];
    },
    _getEventFocus() {
        const focusesUpperLimit = Object.keys(config.focuses);
        const die = this.roll(100);

        // Loop over upper limits and compare against die roll
        for (let index = 0; index < focusesUpperLimit.length; index++) {
            const limit = focusesUpperLimit[index];
            if (die <= parseInt(limit)) {
                return config.focuses[limit];
            }
        }
    },
    _getEventSubject() {
        const die = this.roll(100) - 1;
        return config.subjects[die];
    },
    _getRandomEvent(die, chaos) {
        if (die % 11 === 0 && die / 11 <= chaos) {
            return {
                action: this._getEventAction(),
                focus: this._getEventFocus(),
                subject: this._getEventSubject()
            };
        }
        return false;
    },
    _getRandomInt(min, max) {
        // Create byte array and fill with 1 random number
        const byteArray = new Uint8Array(1);
        window.crypto.getRandomValues(byteArray);
    
        const range = max - min + 1;
        const max_range = 256;
        if (byteArray[0] >= Math.floor(max_range / range) * range)
            return this._getRandomInt(min, max);
        return min + (byteArray[0] % range);
    },
    _getRange(chaos, odds) {
        const base = config.chart[odds][chaos];
        return {
            noExceptional: base + ((100 - base) * 4 / 5),
            no: base,
            yes: base / 5
        };
    },
    _getResult(die, range) {
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
};
