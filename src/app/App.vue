<template>
    <div>
        <textarea id="textarea" v-model="text"></textarea>
    </div>
    <div>
        <button @click="ask()">
            Ask (Ctrl + Enter)
        </button>
        <button @click="save()">
            Save (Ctrl + S)
        </button>
    </div>
</template>

<script>
import mythic from './services/mythic.js'
import hotkeys from 'hotkeys-js'

export default {
    data: () => ({
        text: ''
    }),
    created () {
        this.text = localStorage.getItem('text') || ''

        // Hotkeys do NOT work with inputs by default
        // Documentation: https://www.npmjs.com/package/hotkeys-js#filter
        hotkeys.filter = function () { return true }
        hotkeys('ctrl+enter', () => {
            this.ask()
        })
        hotkeys('ctrl+s', (event) => {
            event.preventDefault()
            this.save()
        })
    },
    methods: {
        ask() {
            const result = mythic.ask()
            this.text += '\r\n\r\n'
            this.text += `> ${result.result}\r\n`

            if (result.randomEvent) {
                this.text += '> Random event!\r\n'
                this.text += `  Focus:   ${result.randomEvent.focus}\r\n`
                this.text += `  Subject: ${result.randomEvent.subject}\r\n`
                this.text += `  Action:  ${result.randomEvent.action}\r\n`
            }

            this.text += '\r\n'
            this.save()
        }, 
        save () {
            localStorage.setItem('text', this.text)
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    height: 50vh;
    outline: none;
    resize: none;
    width: 50%;
}
button {
    margin-right: 0.25em;
}
</style>
