<template>
    <v-card>
        <v-tabs centered>
            <v-tab>LOGIN</v-tab>
            <v-tab>SignUp</v-tab>

            <v-tab-item>
                <v-card-text class="pt-5 pb-0">
                    <div class="pb-6">
                        ※ Please ensure 3rd party cookies are enabled if login fails.
                    </div>

                    <v-text-field
                            v-model="userInfo.email"
                            :rules="[rules.emailRequired, rules.emailMatch]"
                            label="Email"
                            outlined
                    ></v-text-field>

                    <v-text-field
                            v-model="userInfo.password"
                            label="Password"
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required]"
                            :type="passwordShow ? 'text' : 'password'"
                            @click:append="passwordShow = !passwordShow"
                            @keydown.enter="signInAcebase()"
                            outlined
                    ></v-text-field>

                    <div v-if="loginText.length > 0" class="mt-3">
                        {{ loginText }}
                    </div>
                </v-card-text>

                <v-card-actions class="pt-0">
                    <v-btn @click="signInAcebase()"
                            color="blue"
                            block
                            dark
                    >
                        Sign In
                    </v-btn>
                </v-card-actions>
            </v-tab-item>

            <v-tab-item>
                <v-card-text class="pb-0">
                    <v-text-field
                            v-model="userInfo.username"
                            label="NAME"
                            outlined
                    ></v-text-field>

                    <v-text-field
                            v-model="userInfo.email"
                            :rules="[rules.emailRequired, rules.emailMatch]"
                            label="Email"
                            outlined
                    ></v-text-field>

                    <v-text-field
                            v-model="userInfo.password"
                            label="PASSWORD"
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required]"
                            :type="passwordShow ? 'text' : 'password'"
                            @click:append="passwordShow = !passwordShow"
                            @keydown.enter="signUpAcebase()"
                            outlined
                    ></v-text-field>

                    <div v-if="loginText.length > 0" class="mt-3">
                        {{ loginText }}
                    </div>
                </v-card-text>
                
                <v-card-actions class="pt-0">
                    <v-btn @click="signUpAcebase()" 
                            color="blue"
                            block
                            dark
                    >
                        Sign Up
                    </v-btn>
                </v-card-actions>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
// import CommonStorageBase from "../storage/CommonStorageBase";

export default {
    name: 'LoginByAcebase',
    props: {
        storage: Object,
    },
    data: () => ({
        userImage: null,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            emailRequired: v => !!v || 'E-mail is required',
        },
        passwordShow: false,
        userInfo: {
            email: "",
            password: "",
            username: ""
        },
        loginText: "",
        storage: null,
    }),
    watch: {
        tab(newVal, oldVal) {
            if (newVal != oldVal) {
                this.loginText = "";
            }
        },
        "userImage": {
            handler(newVal) {
                // localStorage.setItem("picture", this.userIcon(newVal));
            }
        }
    },
    // created() {
    //     this.storage = new CommonStorageBase(this);
    // },
    methods: {
        async signInAcebase() {
            try {
                if (this.userInfo.email && this.userInfo.password) {
                    var result = await this.storage.signIn('db://login', this.userInfo);
                    if(result){
                        window.localStorage.setItem("author", result.user.email);
                        window.localStorage.setItem("userName", result.user.username);
                        window.localStorage.setItem("email", result.user.email);
                        window.localStorage.setItem("picture", result.user.picture);
                        window.localStorage.setItem("accessToken", result.accessToken);
                        window.localStorage.setItem("uid", result.user.uid);

                        this.writeUserData(result.user.uid, result.user.username, result.user.email, result.user.picture);

                        this.$emit("login", result.accessToken);
                    }
                } else {
                    this.loginText = '로그인 실패: 로그인 정보를 확인해주세요.';
                }
            } catch (e) {
                if (e.code == 'not_found') {
                    this.loginText = `로그인 실패: 존재하지 않은 계정입니다. ${e}`;
                } else {
                    this.loginText = `로그인 실패: 로그인 정보를 확인해주세요. ${e}`;
                }
                console.log(e);
            }
        },
        async signUpAcebase() {
            try {
                if (this.userInfo.email && this.userInfo.password && this.userInfo.username) {
                    var result = await this.storage.signUp('db://login', this.userInfo);

                    if (result) {
                        window.localStorage.setItem("author", result.user.email);
                        window.localStorage.setItem("userName", result.user.username);
                        window.localStorage.setItem("email", result.user.email);
                        window.localStorage.setItem("picture", result.user.picture);
                        window.localStorage.setItem("accessToken", result.accessToken);
                        window.localStorage.setItem("uid", result.user.uid);

                        this.writeUserData(result.user.uid, result.user.username, result.user.email, result.user.picture);

                        this.$emit("login", result.accessToken);
                    }
                } else {
                    this.loginText = '가입 실패: 가입 정보를 확인해주세요.';
                }

            } catch (e) {
                if (e.code == "invalid_details") {
                    this.loginText = `가입 실패: 가입 정보를 확인해주세요. ${e}`;
                } else {
                    this.loginText = `가입 실패: 가입 정보를 확인해주세요. ${e}`;
                }
                console.log(e);
            }
        },
        writeUserData(userId, name, email, imageUrl) {
            var obj = {
                username: name,
                email: email,
                profile_picture: imageUrl,
                state: 'signIn',
                loginDate: Date.now()
            };

            var eObj = {
                uid: userId,
                userName: name,
                profile_picture: imageUrl,
                email: email,
            };

            this.storage.putObject(`db://users/${userId}`, obj);
            
            //새로운 로그인 유저
            if (email) {
                var convertEmail = email.replace(/\./gi, '_');
                this.storage.putObject(`db://enrolledUsers/${convertEmail}`, eObj);
            }

        },
    },

}
</script>

