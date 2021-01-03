<template>
    <div class="input-container">
        <div class="input">
            <input @keyup.enter="createLocation()"
                v-model="input.location"
                placeholder="Add new location...">
            <button @click="createLocation()">Create (Enter)</button>
        </div>
        <div class="input">
            <input @keyup.enter="createNpc()"
                v-model="input.npc"
                placeholder="Add new NPC...">
            <button @click="createNpc()">Create (Enter)</button>
        </div>
        <div class="input">
            <input @keyup.enter="createThread()"
                v-model="input.thread"
                placeholder="Add new thread...">
            <button @click="createThread()">Create (Enter)</button>
        </div>
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
        <div class="list">
            <h2>Locations</h2>
            <ul>
                <li v-for="location in list.location" :key="location">{{location}}</li>
            </ul>
        </div>
        <div class="list">
            <h2>NPCs</h2>
            <ul>
                <li v-for="npc in list.npc" :key="npc">{{npc}}</li>
            </ul>
        </div>
        <div class="list">
            <h2>Threads</h2>
            <ul>
                <li v-for="thread in list.thread" :key="thread">{{thread}}</li>
            </ul>
        </div>
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
            location: '',
            npc: '',
            thread: ''
        },
        list: {
            location: [],
            npc: [],
            thread: []
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
        const rawLocation = await this.db.location.where(filter).toArray() || []
        rawLocation.forEach(location => {
            this.list.location.push(location.name)  
        })
        const rawNpc = await this.db.npc.where(filter).toArray() || []
        rawNpc.forEach(npc => {
            this.list.npc.push(npc.name)  
        })
        const rawThread = await this.db.thread.where(filter).toArray() || []
        rawThread.forEach(thread => {
            this.list.thread.push(thread.description)  
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
        async createLocation() {
            const location = this.input.location
            this.list.location.push(location)
            await this.db.location.put({
                campaignId: this.state.campaignId,
                name: location
            })

            // Clear input
            this.input.location = ''
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
        async createThread() {
            const thread= this.input.thread
            this.list.thread.push(thread)
            await this.db.thread.put({
                campaignId: this.state.campaignId,
                description: thread
            })

            // Clear input
            this.input.thread = ''
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
    .input {
        margin-bottom: 0.25em;
    }
}
.list-container {
    display: flex;

    .list {
        width: 33.33%;
    }
}
</style>
