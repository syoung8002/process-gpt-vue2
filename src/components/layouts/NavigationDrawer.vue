<template>
    <v-navigation-drawer
            app
            v-if="drawer"
    >
        <template v-slot:prepend>
            <v-list-item @click="goHome">
                <v-list-item-avatar>
                    <v-icon color="blue">mdi-home</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Process-GPT
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list v-for="item in items"
                :key="item.title"
                nav
                dense
                subheader
        >
            <v-divider></v-divider>

            <v-subheader>
                {{ item.title }}
            </v-subheader>

            <v-list-item
                    v-for="menu in item.menus"
                    :key="menu.title"
                    :to="menu.link"
                    color="blue"
                    link
            >
                <v-list-item-icon>
                    <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="subtitle-2 font-weight-bold text--primary">
                        {{ menu.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'NavigationDrawer',
    props: {
        isMobile: Boolean,
        drawer: Boolean,
    },
    data: () => ({
        items: [
            {
                title: "정의 관리",
                menus: [
                    {
                        title: "조직도 정의",
                        link: "/organization",
                        icon: "mdi-sitemap"
                    },
                    {
                        title: "프로세스 정의",
                        link: "/definitions",
                        icon: "mdi-plus"
                    },
                ]
            },
            {
                title: "프로세스 실행",
                menus: [
                    {
                        title: "프로세스 실행",
                        link: "/instances",
                        icon: "mdi-plus"
                    },
                ]
            },
            {
                title: "ToDoList",
                menus: [
                    {
                        title: "할 일",
                        link: "/todolist",
                        icon: "mdi-view-list"
                    },
                ]
            },
        ],
    }),
    methods: {
        goHome() {
            this.$router.push("/");
        },
    },
}
</script>

<style>
.theme--light.v-navigation-drawer {
    background-color: #eff4f8;
}

.theme--dark.v-navigation-drawer {
    background-color: #2d2f31;
}
</style>