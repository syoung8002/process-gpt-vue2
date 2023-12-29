<template>
    <div class="process-manager">
        <div v-if="bpmn" class="bpmn-area">
        </div>

        <ChatButton
                :chatDialog="chatDialog"
                :messages="messages"
                :alertInfo="alertInfo"
                @toggleChatDialog="toggleChatDialog"
                @beforeSendMessage="beforeSendMessage"
        ></ChatButton>
    </div>
</template>

<script>
import partialParse from "partial-json-parser";
import { VectorStorage } from "vector-storage";

import ChatGenerator from "../ai/ProcessDefinitionGenerator";

import ChatModule from "../ChatModule.vue";
import ChatButton from "../ui/ChatButton.vue"

export default {
    mixins: [ChatModule],
    name: 'ProcessManagerChat',
    components: {
        ChatButton,
    },
    data: () => ({
        processDefinition: null,
        bpmn: null,
        path: "definitions",
        alertInfo: {
            type: "info",
            title: "프로세스 정의 관리",
            text: "대화형으로 프로세스를 관리하십시오. 예를 들어, '영업관리 프로세스를 다음과 같이 등록해줘: 1. 영업기회등 고객명, 예상사업규모, 키맨, 요구사항 2. 제안 작성: 제안 내용, 가격 3. 수주 혹은 실주 4. 수주한 경우, 계약진행' 와 같은 명령을 할 수 있습니다."
        },
    }),
    async created() {
        this.init();

        this.generator = new ChatGenerator(this, {
            isStream: true,
            preferredLanguage: "Korean"
        });

        var path = this.$route.path.replace("/", "");
        this.loadData(path);

        this.setMessages(path);
    },
    watch: {
        "$route": {
            deep: true,
            async handler(newVal, oldVal) {
                if (newVal.path !== oldVal.path) {
                    this.processDefinition = null;
                    this.bpmn = null;

                    var path = this.$route.path.replace("/", "");
                    this.loadData(path);
                    this.setMessages(path);
                }
            }
        }
    },
    methods: {
        async setMessages(path) {
            this.messages = await this.loadMessages(path);
            this.generator.previousMessages = [
                ...this.generator.previousMessages,
                ...this.messages
            ];
        },
        async loadData(path) {
            const value = await this.getData(path);

            if (value) {
                if (this.$route.params && this.$route.params.id) {
                    this.processDefinition = partialParse(value.model);
                    if (!this.processDefinition) {
                        this.processDefinition = []
                    } else {
                        // this.bpmn = this.createBpmnXml(this.processDefinition);
                    }

                } else {
                    this.messages = [];

                    var list = Object.values(value);
                    list.forEach(item => {
                        const msg = JSON.parse(item.messages);
                        this.messages = [...this.messages, ...msg];

                        item.model = JSON.parse(item.model);
                        this.saveDefinition(item.model);
                    });

                    this.generator.previousMessages = [
                        ...this.generator.previousMessages, 
                        ...this.messages
                    ];
                }
            }
        },

        beforeSendMessage(newMessage) {
            this.sendMessage(newMessage);
        },

        afterModelCreated(response) {
            let messageWriting = this.messages[this.messages.length -1];
            let jsonProcess = this.extractProcessJson(response);

            if (jsonProcess) {
                this.processDefinition = partialParse(jsonProcess);
                // messageWriting.bpmn = this.createBpmnXml(this.processDefinition);
                // this.bpmn = messageWriting.bpmn;
            }
        },

        afterGenerationFinished(putObj){
            let modelText = "";
            let path = this.path;
            
            if (this.processDefinition) {
                path = `${this.path}/${this.processDefinition.processDefinitionId}`;

                modelText = JSON.stringify(this.processDefinition);
                this.saveDefinition(this.processDefinition);

                putObj.model = modelText;
                this.saveMessages(path, putObj);
            }
        },

        async saveDefinition(definition) {
            // Create an instance of VectorStorage
            const apiToken = this.generator.getToken();
            const vectorStore = new VectorStorage({ openAIApiKey: apiToken });

            // Add a text document to the store
            await vectorStore.addText(JSON.stringify(definition), {
                category: definition.processDefinitionId
            });
        },
    }
}
</script>

<style scoped>
@media screen and (min-width: 1081px) {
    .process-manager {
        display: flex !important;
        flex-direction: row-reverse !important;
    }

    .bpmn-area {
        width: 40% !important;
        margin-left: 12px;
    }
}

@media screen and (max-width: 1080px) {
    .process-manager {
        display: block;
    }

    .bpmn-area {
        margin-bottom: 12px;
    }

}
</style>