<template>
    <input v-model="diceNotation">
    <button @click="roll()">
        Roll
    </button>
    <span v-html="result"></span>
</template>

<script>
import dice from './../services/dice.js'

export default {
    data: () => ({
        diceNotation: '3d10',
        result: ''
    }),
    methods: {
        roll: function () {
            // Check if notation is valid
            const notation = this.diceNotation
            if (!this._checkNotation(notation)) {
                console.error('> Please check the dice notation')
                return false
            }

            // Parse notation and start rolling
            const input = notation.split('d')
            const side = input[1]
            let count = input[0]
            let resultRolls = []
            for (; count > 0; count--) {
                resultRolls.push(dice.roll(side))
            }

            // Format result for display
            const result = this._formatResult(resultRolls)
            this.result = result
            return true
        },
        _checkNotation(notation) {
            // Check notation's pattern
            const pattern = RegExp(/^[0-9]{1,2}d[0-9]{1,3}/)
            if (!pattern.test(notation)) {
                return false
            }

            // Check if sides are valid
            let sideInput = notation.split('d')[1]
            const sideValid = ['4', '6', '10', '12', '20', '100']
            if (!sideValid.includes(sideInput)) {
                return false
            }

            return true
        },
        _formatResult(resultArray) {
            let resultString = ''
            let total = 0

            for (let index = 0; index < resultArray.length; index++) {
                const result = resultArray[index];
                total += parseInt(result)

                if (index !== 0) {
                    resultString += ' + '
                }

                resultString += result
                
                if (index === resultArray.length - 1 && resultArray.length !== 1) {
                    resultString += ' = ' + total
                }
            }

            return resultString
        }
    }
}
</script>
