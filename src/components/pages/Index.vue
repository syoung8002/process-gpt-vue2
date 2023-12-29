<template>
    <v-container fluid>
        <v-row>
            <v-sheet v-for="(card, index) in cards"
                    :key="index"
                    elevation="4"
                    height="280"
                    width="280"
                    rounded
                    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-4 rounded-lg"
            >
                <div class="d-block">
                    <div class="mb-3">
                        <v-icon color="blue"
                                size="64"
                        >
                            {{ card.icon }}
                        </v-icon>
                    </div>
                    <v-btn :to="card.link"
                            color="blue"
                            class="font-weight-bold"
                            outlined
                            rounded
                    >
                        {{ card.text }}
                    </v-btn>
                </div>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Index',
        data: () => ({
            cards: [
                {
                    text: "조직도",
                    link: "/organization",
                    icon: "mdi-sitemap"
                },
                {
                    text: "프로세스",
                    link: "/definitions",
                    icon: "mdi-chat-outline"
                },
                {
                    text: "인스턴스",
                    link: "/instances",
                    icon: "mdi-chat-outline"
                },
                {
                    text: "Todolist",
                    link: "/todolist",
                    icon: "mdi-view-list-outline"
                },
            ],
        }),
    };
</script>
