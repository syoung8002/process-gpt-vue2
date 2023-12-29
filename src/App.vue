<template>
    <v-app>
        <NavigationDrawer 
                :isMobile="isMobile"        
                :drawer="drawer" 
        />

        <Navbar :isMobile="isMobile"
                @toggleDrawer="toggleDrawer"
                @openLoginDialog="openLoginDialog" 
        />

        <v-main>
            <v-container fluid>
                <router-view :isMobile="isMobile"></router-view>
            </v-container>
        </v-main>

        <!-- Login -->
        <v-dialog v-model="loginDialog" width="500">
            <LoginByAcebase 
                    :storage="storage"
                    @login="login"
            />
        </v-dialog>
    </v-app>
</template>

<script>
import CommonStorageBase from "@/components/storage/CommonStorageBase";

import NavigationDrawer from "@/components/layouts/NavigationDrawer.vue";
import Navbar from "@/components/layouts/Navbar.vue";
import LoginByAcebase from "@/components/oauth/LoginByAcebase.vue";

export default {
    name: 'App',
    components: {
        NavigationDrawer,
        Navbar,
        LoginByAcebase,
    },
    data: () => ({
        isMobile: false,
        drawer: true,
        loginDialog: false,
    }),
    async created() {
        if (window.innerWidth <= 1080) {
            console.log('dd')
            this.isMobile = true;
        }
        this.isMobile = false;

        try {
            this.storage = new CommonStorageBase(this);
            await this.storage.loginUser();
            
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer = true;
        },
        openLoginDialog() {
            this.loginDialog = true;
        },
        closeLoginDialog() {
            this.loginDialog = false;
        },
        async login(token) {
            if (token) {
                await this.storage.loginUser();
                this.closeLoginDialog();
            }
        },
        async logout() {
            await this.storage.logout();
        }
    },
}
</script>

<style>
.theme--light.v-application {
    background-color: #eff4f8;
}

.theme--dark.v-application {
    background-color: #2d2f31;
}

.theme--light.v-application .text--primary {
    color: rgba(0, 0, 0, 0.7) !important;
}
</style>