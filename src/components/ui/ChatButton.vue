<template>
    <div>
        <v-btn @click="toggleChatDialog"
                color="blue"
                dark
                fab
                class="chat-btn"
        >
            <v-icon v-if="chatDialog">mdi-close</v-icon>
            <v-icon v-else>mdi-chat</v-icon>
        </v-btn>

        <v-card v-if="chatDialog" width="500" class="chat-dialog">
            <Chat :messages="messages"
                    @sendMessage="beforeSendMessage"
            >
                <template v-slot:alert>
                    <v-alert :type="alertInfo.type"
                            colored-border
                            border="top"
                    >
                        <div class="subtitle-1">
                            {{ alertInfo.title }}
                        </div>
                        <div class="body-2">
                            {{ alertInfo.text }}
                        </div>
                    </v-alert>
                </template>
            </Chat>
        </v-card>
    </div>
</template>

<script>
import Chat from "../ui/Chat.vue";

export default {
    name: 'ChatButton',
    props: {
        chatDialog: Boolean,
        messages: Array,
        alertInfo: Object,
    },
    components: {
        Chat,
    },
    methods: {
        toggleChatDialog() {
            console.log(this.alertInfo)
            this.$emit("toggleChatDialog");
        },
        beforeSendMessage() {
            this.$emit("beforeSendMessage");
        },
    }
}
</script>

<style scoped>
.chat-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.chat-dialog {
    z-index: 99;
    position: absolute;
    bottom: 90px;
    right: 20px;
}
</style>