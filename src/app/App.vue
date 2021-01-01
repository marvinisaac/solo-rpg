<template>
    <button @click="ask()">
        Ask
    </button>
</template>

<script>
import mythic from './services/mythic.js'

export default {
    methods: {
        ask() {
            console.log(mythic.ask())
        }
    }
}
</script>
