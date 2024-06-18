<template>
    <!-- <div> -->
        <div class="container sm:px-10">
            <div class="block xl:grid gap-4">

                <!-- BEGIN: Login Form -->
                <div
                    class="m-auto h-full flex py-5 xl:py-0 my-10 xl:my-0 bg-black"
                    style="min-width: 400px; width: 30%;"
                >
                    <div
                        class="flex-1 box py-16 mb-5 lg:mb-0"
                        style="background-color: #12171d;"
                    >
                        <div class="px-5 pt-5 text-center">
                            <div class="flex text-center justify-center">
                                <img
                                    alt="Noskingdom"
                                    class="rounded-full"
                                    :src="
                                        require(`@/assets/images/logo.png`)
                                    "
                                />
                                <div class="text-3xl mt-5">NOSKINGDOM</div>
                            </div>
                            <div class="text-gray-600 mt-2">Welcome back to Noskingdom!</div>
                            <div class="text-gray-600 mt-2">Don't forget to join our <a :href="discord" class="text-theme-1">Discord</a> server to be aware of our latest news, updates and more!</div>
                            <div v-if="login_failed" class="mt-5 text-theme-6">Unknown credentials</div>
                        </div>
                        <div class="px-5 mb-4"> 
                            <label>Email</label> 
                            <input v-model="email" type="email" class="input w-full border mt-2" placeholder="example@gmail.com" :style="error_email_text ? 'border-color: #e53e3e' : ''"> 
                            <small v-if="error_email_text" class="text-theme-6">{{ this.email_error }}</small>
                        </div>
                        <div class="relative px-5 mb-4"> 
                            <label>Password</label> 
                            <div class="relative mt-2"> 
                                <input v-on:keyup="enterpress" v-model="password" placeholder="***" :type="show_password_input ? 'text' : 'password'" class="input w-full border" :style="error_password_text ? 'border-color: #e53e3e' : ''"> 
                                <div class="absolute top-0 right-0 rounded-r w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600" :style="error_password_text ? 'border-top-color: #e53e3e;border-bottom-color: #e53e3e;border-right-color: #e53e3e;' : ''">
                                    <EyeIcon v-if="!show_password_input" @click="show_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_password_text ? 'color: #e53e3e;' : ''" />
                                    <EyeOffIcon v-if="show_password_input" @click="show_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_password_text ? 'color: #e53e3e;' : ''" />
                                </div>
                            </div>
                            <small v-if="error_password_text" class="text-theme-6">The Password field is required</small>
                        </div>
                        <!-- <div class="p-5"> 
                            <label>Password</label> 
                            <input v-on:keyup="enterpress" v-model="password" type="password" class="input w-full border mt-2" :style="error_password_text ? 'border-color: #e53e3e' : ''"> 
                            <small v-if="error_password_text" class="text-theme-6">The Password field is required</small>
                        </div> -->
                        <div class="flex px-5 mb-4 items-center text-gray-700 dark:text-gray-500"> <input type="checkbox" class="input border mr-2" id="vertical-remember-me"> <label class="cursor-pointer select-none" for="vertical-remember-me">Remember me</label> </div>
                        <div class="flex mb-4 justify-center"><button @click="login()" type="button" class="button bg-theme-1 text-white w-full mx-5 mt-5">Login</button></div>
                        <div class="text-center mb-4">
                            Are you new? <a href="javascript:;" @click="toRegister()" class="text-purple-500">Create an account</a>
                        </div>
                        <div class="text-center mb-4">
                            ● <a :href="elite">Elitepvpers</a> ● <a :href="cheat">Cheat-Gam3</a> ● <a :href="inforge">Inforge</a> ●
                      </div>
                    </div>
                </div>
                <!-- END: Login Form -->
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import axios from 'axios';
import Toastify from "toastify-js";
import VueRecaptcha from "vue-recaptcha";

export default {
    components: {
        VueRecaptcha
    },
    data(){
        return {
        email: "",
        password: "",

        username: "",
        register_email: "",
        register_password: "",
        confirm_password: "",
        show: true,
        terms_service: false, 

        error_email_text: false,
        error_register_email_text: false,
        error_password_text: false,
        error_register_password_text: false,
        error_confirm_password_text: false,
        login_failed: false,
        show_password_input: false,
        show_register_password_input: false,
        show_confirm_password_input: false,
        capcha : false,
        email_error: '',
        username_error:"username is required!",
        error_username_text: false,
        register_password_error: "password is required!",
        confirm_password_error: "Confirm password is required!",

        elite: "",
        cheat: "",
        inforge: '',
        discord: '',
        ragezone: ''
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.main.authToken !== null;
        },
        isButtonDisabled() {
           return !this.terms_service || !this.capcha;
        },
        darkMode() {
           return this.$store.state.main.darkMode;
        }
    },
    mounted() {
        cash("body")
            .removeClass("app")
            .addClass("login");
        this.setDarkModeClass();
        this.getLinks();
    },
    methods: {
        setDarkModeClass() {
        this.darkMode
            ? cash("html").addClass("dark")
            : cash("html").removeClass("dark");
        },
        toRegister(){
            this.$router.push({
            name: 'register'
          });
        },
        toEpvp() {
            document.location.href = this.elite;
        },
        toRage() {
            document.location.href = this.ragezone;
        },
        toInforge() {
            document.location.href = this.inforge;
        },
        login() {
            let self = this;
            if(self.error_email_text || self.error_password_text){
                return;
            }

            self.$store.dispatch('main/login', {
                email: self.email,
                password: self.password
            }).then((res) => {
                if(res.data.message == "success"){

                    Toastify({
                        text: res.data.response,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#2af109",
                        stopOnFocus: true
                    }).showToast();

                    self.$router.push({
                        name: 'Dashboard'
                    });
                  
                } else {
                    // self.login_failed = true;

                    Toastify({
                        text: res.data.response,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        },
        register() {
            let self = this;
            if(self.error_confirm_password_text || self.error_register_password_text || self.error_username_text){
                return;
            }
            axios
                .post("/api/register", {
                username: self.username,
                email: self.register_email,
                password: self.register_password,
                confirm_password: self.confirm_password
                })
                .then(function(response) {
                if(response.data.status == "success"){
                    Toastify({
                        text: response.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#2af109",
                        stopOnFocus: true
                    }).showToast();
                } else {
                    Toastify({
                        text: response.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                }
                })
                .catch(function(error) {
                
                });
            },
        showLogin(t){
            this.show = t;
        },
        enterpress(e){
            let self = this;
            if (e.keyCode === 13) {
                self.login();
            }
        }, 

        show_password(){
            this.show_password_input = !this.show_password_input;
        }, 

        show_register_password(){
            this.show_register_password_input = !this.show_register_password_input;
        }, 

        show_confirm_password(){
            this.show_confirm_password_input = !this.show_confirm_password_input;
        },
        
        verify(){
            this.capcha = true;
        }, 

        expired(){
            this.capcha = false;
        },

        getLinks(){
            let self = this;
            axios.get('/game/getData')
                .then((res)=>{
                    self.elite = res.data.result.elite;
                    // self.cheat = res.data.result.cheat;
                    self.inforge = res.data.result.inforge;
                    self.discord = res.data.result.discord;
                    self.ragezone = res.data.result.rage;
                    self.$store.dispatch("main/setInit", res.data.result.data);
                });
        }
    },

    watch: {
        email(){
            if (this.email == ""){
                this.error_email_text = true; this.email_error = "The Email is required!";
            } else if(!(/^[^@]+@\w+(\.\w+)+\w$/.test(this.email))) {
                this.error_email_text = true; this.email_error = "Invalied Email Format";
            } else {
                this.error_email_text = false;
            }
        },

        password(){
            if (this.password == ""){
                this.error_password_text = true;
                this.password_error = "The password is required!";
            } else if(this.password.length < 6){
                this.error_password_text = true;
                this.password_error = "The password must be at least 6 characters!";
            } else {
                this.error_password_text = false;
            }
        }, 

        register_password(){
            if (this.register_password == ""){
                this.error_register_password_text = true;
                this.register_password_error = "The password is required!";
            } else if(this.register_password.length < 6){
                this.error_register_password_text = true;
                this.register_password_error = "The password must be at least 6 characters!";
            } else {
                this.error_register_password_text = false;
            }
        }, 

        confirm_password(){
            if (this.confirm_password == ""){
                this.error_confirm_password_text = true;
                this.confirm_password_error = "The confirm password is required!";
            } else if(this.confirm_password.length < 6){
                this.error_confirm_password_text = true;
                this.confirm_password_error = "The confirm password must be at least 6 characters!";
            } else if(this.register_password != this.confirm_password){
                this.error_confirm_password_text = true;
                this.confirm_password_error = "The confirm password does not matched!";
            } else {
                this.error_confirm_password_text = false;
            }
        }, 

        register_email(){
            if (this.register_email == ""){
                this.error_register_email_text = true; this.register_email_error = "The Email is required!";
            } else if(!(/^[^@]+@\w+(\.\w+)+\w$/.test(this.register_email))) {
                this.error_register_email_text = true; this.register_email_error = "Invalied Email Format";
            } else {
                this.error_register_email_text = false;
            }
        },

        username(){
            if(this.username == ""){
                this.error_username_text = true; this.username_error = "Username field is required!";
            } else if (this.username.length < 6){
                this.error_username_text = true; this.username_error = "Username must be at least 6 characters";
            } else {
                this.error_username_text = false;
            }
        }


    }
};
</script>
<style scope>
.login {
    background: url("/login.jpg") !important;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover !important;
}
</style>
