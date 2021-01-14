<template>
    <div>
        <button @click="toggleMode()">
            Toggle Mode
        </button>
    </div>
    <div id="editor-container">
        <textarea id="input"
            v-if="!readOnly" v-model="input">
        </textarea>
        <div id="output"
            v-else v-html="output">
        </div>
    </div>
</template>

<script>
import md from 'markdown-it'

export default {
    data: () => ({
        input: '',
        readOnly: false,
        renderer: undefined
    }),
    computed: {
        output: function () {
            return this.renderer.render(this.input)
        }
    },
    created () {
        this.renderer = new md()
    },
    methods: {
        toggleMode() {
            this.readOnly = !this.readOnly
        }
    }
}
</script>

<style lang="scss" scoped>
#editor-container {
    height: 50vh;
    overflow: auto;
    width: 80vw;

    div, textarea {
        height: 100%;
        width: 100%;
    }

    textarea {
        border: 0;
        display: block;
        margin: 0;
        padding: 0;
        resize: none;
    }
}
</style>
