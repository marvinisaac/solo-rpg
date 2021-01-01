<template>
    <div>
        <textarea v-model="text"></textarea>
    </div>
    <div>
        <button @click="ask()">
            Ask
        </button>
    </div>
</template>

<script>
import mythic from './services/mythic.js'

export default {
    data: () => ({
        text: ''
    }),
    methods: {
        ask() {
            const result = mythic.ask()
            this.text += '\r\n\r\n'
            this.text += `> ${result.result}`
            this.text += '\r\n\r\n'
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
</style>
