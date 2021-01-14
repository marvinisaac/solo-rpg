export default {
    roll(sides = 6) {
        return this._getRandomInt(1, sides);
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
}
