<template>
    <div class="input-container">
        <input @keyup.enter="createNpc()"
            v-model="input.npc"
            placeholder="Add new NPC...">
        <button @click="createNpc()">Create</button>
    </div>
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
    <div class="list-container">
        <ul>
            <li v-for="npc in list.npc" :key="npc">{{npc}}</li>
        </ul>
    </div>
</template>

<script>
import mythic from './services/mythic.js'
import hotkeys from 'hotkeys-js'
import dexie from 'dexie'

export default {
    data: () => ({
        db: undefined,
        input: {
            npc: ''
        },
        list: {
            npc: []
        },
        state: {
            campaignId: 0,
            isAsking: false,
            isSaving: false
        },
        text: ''
    }),
    async created () {
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

        // Initialize indexedDB
        this.db = new dexie('solo-rpg')
        this.db.version(1).stores({
            campaign: '++id, name',
            npc: '++id, campaignId, name',
            thread: '++id, campaignId, description',
            location: '++id, campaignId, name'
        })

        // Load saved items, if any
        const filter = {
            campaignId: this.state.campaignId
        }
        const rawNpc = await this.db.npc.where(filter).toArray() || []
        rawNpc.forEach(npc => {
            this.list.npc.push(npc.name)  
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
        async createNpc() {
            const npc = this.input.npc
            this.list.npc.push(npc)
            await this.db.npc.put({
                campaignId: this.state.campaignId,
                name: npc
            })

            // Clear input
            this.input.npc = ''
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
        min-width: 480px;
}
.button-container {
    margin-bottom: 0.25em;

    button {
        margin-right: 0.25em;
    }
}
.input-container {
    margin-bottom: 0.25em;
}
</style>
