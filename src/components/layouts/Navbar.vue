<template>
    <v-app-bar
            app
            absolute
            elevation="0"
    >
        <v-app-bar-nav-icon v-if="isMobile" @click="toggleDrawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="changeTheme" 
                        icon
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon v-if="isDark">mdi-weather-night</v-icon>
                    <v-icon v-else>mdi-weather-sunny</v-icon>
                </v-btn>
            </template>
            <span v-if="isDark">dark</span>
            <span v-else>light</span>
        </v-tooltip>
        
        <v-btn v-if="!isLogin"
                @click="openLogin"
                color="blue"
                text
        >
            LOGIN
        </v-btn>
        
        <v-menu v-else offset-y min-width="230">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs"
                        v-on="on"
                        icon
                        depressed
                        class="mr-1"
                >
                    <v-badge dot
                            bordered
                            bottom
                            color="success"
                            offset-x="10"
                            offset-y="10"
                    >
                        <v-avatar size="40">
                            <v-icon color="blue">mdi-account</v-icon>
                        </v-avatar>
                    </v-badge>
                </v-btn>
            </template>

            <v-list class="pa-0">
                <v-list-item>
                    <v-list-item-action>
                        <v-badge dot
                                bordered
                                bottom
                                color="success"
                                offset-x="10"
                                offset-y="10"
                        >
                            <v-avatar size="40">
                                <v-icon color="blue">mdi-account</v-icon>
                            </v-avatar>
                        </v-badge>
                    </v-list-item-action>

                    <v-list-item-title>
                        {{ userName }}
                    </v-list-item-title>
                </v-list-item>

                <v-list-item @click="logout">
                    <v-list-item-icon>
                        <v-icon size="22">
                            mdi-logout-variant
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import CommonStorageBase from "@/components/storage/CommonStorageBase";

export default {
    name: 'Navbar',
    props: {
        isMobile: Boolean,
    },
    data: () => ({
        storage: null,
    }),
    computed: {
        isDark() {
            return this.$vuetify.theme.isDark;
        },
        isLogin() {
            const token = this.storage.isLogin;
            if (token) {
                return true;
            }
            return false;
        },
        userName() {
            const name = this.storage.userInfo.name;
            if (name) {
                return name;
            }
            return "";
        },
    },
    watch: {
        "isMobile": {
            deep: true,
            handler(newVal) {
                console.log(newVal)
            }
        },
    },
    async created() {
        this.storage = new CommonStorageBase(this);
        await this.storage.loginUser();
    },
    methods: {
        toggleDrawer() {
            this.$emit('toggleDrawer');
        },
        changeTheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
        },
        openLogin() {
            this.$emit('openLoginDialog');
        },
        async logout() {
            await this.storage.logout();
        }
    }
}
</script>

<style>
.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #eff4f8;
}

.theme--dark.v-app-bar.v-toolbar.v-sheet {
    background-color: #2d2f31;
}
</style>