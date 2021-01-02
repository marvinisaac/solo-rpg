<template>
    <div class="button-container">
        <button @click="ask()">
            <span v-if="state.isAsking">
                Asking...
            </span>
            <span v-else>
                Ask (Ctrl + Enter)
            </span>
        </button>
        <button @click="save()">
            <span v-if="state.isSaving">
                Saving...
            </span>
            <span v-else>
                Save (Ctrl + S)
            </span>
        </button>
    </div>
    <div>
        <textarea id="textarea" v-model="text"></textarea>
    </div>
</template>

<script>
import mythic from './services/mythic.js'
import hotkeys from 'hotkeys-js'

export default {
    data: () => ({
        state: {
            isAsking: false,
            isSaving: false
        },
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
            this.state.isAsking = true
            setTimeout(() => {
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
                this.state.isAsking = false
                this.save()
            }, 500);
        }, 
        save() {
            this.state.isSaving = true
            setTimeout(() => {
                localStorage.setItem('text', this.text)
                this.state.isSaving = false
            }, 500);
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
.button-container {
    margin-bottom: 0.25em;

    button {
        margin-right: 0.25em;
    }
}
</style>
