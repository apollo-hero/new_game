<template>
    <!-- <div> -->
        <div class="container sm:px-10">
            <div class="block xl:grid grid-cols-2 gap-4">
            <!-- BEGIN: Register Info -->
                <div class="hidden xl:flex flex-col min-h-screen">
                    <a href="" class="-intro-x flex items-center pt-5">
                        <img
                        alt="Midone Tailwind HTML Admin Template"
                        class="w-6"
                        :src="
                            require(`@/assets/images/logo.png`)
                        "
                        />
                        <span class="text-white text-lg ml-3">
                        </span>
                    </a>
                    <div class="my-auto">
                        <img
                        alt="Midone Tailwind HTML Admin Template"
                        class="-intro-x w-1/2 -mt-16"
                        :src="
                            require(`@/assets/images/Register.png`)
                        "
                        />
                        <div
                        class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
                        >
                        <br />
                        </div>
                        <div class="-intro-x mt-5 text-lg text-white dark:text-gray-500">
                        </div>
                    </div>
                </div>
                <!-- END: Register Info -->
                <!-- BEGIN: Register Form -->
                <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                    <div
                        class="my-auto mx-auto xl:ml-20 bg-black xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
                    >
                        <h2
                        class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
                        >
                        Sign Up
                        </h2>
                        <div
                        class="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center"
                        >
                        accounts in one place
                        </div>
                        <div class="intro-x mt-8">
                        <input
                            type="text"
                            v-model="username"
                            class="intro-x w-full input input--lg border border-gray-300 block"
                            placeholder="User Name"
                            id="user_name"
                            :style="error_username_text ? 'border-color: #e53e3e' : ''"
                        />
                        <small v-if="error_username_text" class="text-theme-6">{{ this.username_error }}</small>
                        <input
                            type="email"
                            v-model="register_email"
                            class="intro-x w-full input input--lg border border-gray-300 block mt-4"
                            placeholder="Email"
                            id="email"
                            :style="error_register_email_text ? 'border-color: #e53e3e' : ''"
                        />
                        <small v-if="error_register_email_text" class="text-theme-6">{{ this.register_email_error }}</small>
                        <div class="relative mt-4"> 
                            <input v-model="register_password" :type="show_register_password_input ? 'text' : 'password'" class="input w-full border" :style="error_register_password_text ? 'border-color: #e53e3e' : ''" placeholder="password"> 
                            <div class="absolute top-0 right-0 rounded-r w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600" :style="error_register_password_text ? 'border-top-color: #e53e3e;border-bottom-color: #e53e3e;border-right-color: #e53e3e;' : ''">
                                <EyeIcon v-if="!show_register_password_input" @click="show_register_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_register_password_text ? 'color: #e53e3e;' : ''" />
                                <EyeOffIcon v-if="show_register_password_input" @click="show_register_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_register_password_text ? 'color: #e53e3e;' : ''" />
                            </div>
                        </div>
                        <small v-if="error_register_password_text" class="text-theme-6">{{this.register_password_error}}</small>
                        <div class="relative mt-4"> 
                            <input v-on:keyup="enterpress" v-model="confirm_password" :type="show_confirm_password_input ? 'text' : 'password'" class="input w-full border" :style="error_confirm_password_text ? 'border-color: #e53e3e' : ''" placeholder="confirm password"> 
                            <div class="absolute top-0 right-0 rounded-r w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600" :style="error_register_password_text ? 'border-top-color: #e53e3e;border-bottom-color: #e53e3e;border-right-color: #e53e3e;' : ''">
                                <EyeIcon v-if="!show_confirm_password_input" @click="show_confirm_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_confirm_password_text ? 'color: #e53e3e;' : ''" />
                                <EyeOffIcon v-if="show_confirm_password_input" @click="show_confirm_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_confirm_password_text ? 'color: #e53e3e;' : ''" />
                            </div>
                        </div>
                        <small v-if="error_confirm_password_text" class="text-theme-6">{{ this.confirm_password_error }}</small>
                        </div>
                        <div
                        class="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-4 text-xs sm:text-sm"
                        >
                        <input
                            id="remember-me"
                            type="checkbox"
                            class="input border mr-2"
                            v-model="terms_service"
                        />
                        <label class="cursor-pointer select-none" for="remember-me"
                        >
                        I agree to <a href="/terms_service" class="text-theme-1 dark:text-theme-10 ml-1">Terms of Service</a> and <a href="/privacy_policy" class="text-theme-1 dark:text-theme-10 ml-1">Privacy Policy</a>
                        </label
                        >
                        </div>
                        <div class="flex justify-center">
                            <vue-recaptcha
                                sitekey="6LeWAO4lAAAAAHfC83S8PKH-jOANIv5YCEMFnMxP"
                                theme="dark"
                                style="display: flex; justify-content: center; height: 78px; margin-top: 10px;"
                                @verify="verify"
                                @expired="expired"
                            ></vue-recaptcha>
                        </div>
                        <div class="intro-x my-5 xl:my-8 text-center xl:text-left">
                        <button
                            :disabled="isButtonDisabled"
                            class="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3 align-top"
                            @click="register()"
                        >
                            Register
                        </button>
                        <button
                            class="button button--lg w-full xl:w-32 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0 align-top"
                            @click="toLogin()"
                        >
                            Sign in
                        </button>
                        </div>
                        <a :href='elite' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="epvp">ELITEPVPERS</a>
                        <a :href='ragezone' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="ragezone">RAGEZONE</a>
                       <a :href='info' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="inforge">INFORGE</a>
                    </div>
                </div>
                <!-- END: Register Form -->
                <!-- BEGIN: Login Form -->
                <div
                    class="m-auto h-full flex py-5 xl:py-0 my-10 xl:my-0 bg-black"
                    style="min-width: 400px; width: 30%;"
                    v-if="show"
                >
                    <div
                        class="flex-1 box py-16 mb-5 lg:mb-0"
                        style="background-color: #12171d;"
                    >
                        <div class="px-5 pt-5 text-center">
                            <div class="flex text-center justify-center">
                                <img
                                    alt=""
                                    class="rounded-full"
                                    :src="
                                        require(`@/assets/images/logo.png`)
                                    "
                                />
                            </div>
                            <div class="text-gray-600 mt-2">Don't forget to join our <a :href="discord" class="text-theme-1">Discord</a> server to be aware of our latest news, updates and more!</div>
                            <div v-if="login_failed" class="mt-5 text-theme-6">Unknown credentials</div>
                        </div>
                        <div class="px-5 mb-4"> 
                            <label>Email</label> 
                            <input v-model="email" type="email" class="input w-full border mt-2" placeholder="example" :style="error_email_text ? 'border-color: #e53e3e' : ''"> 
                            <small v-if="error_email_text" class="text-theme-6">{{ this.email_error }}</small>
                        </div>
                        <div class="relative px-5 mb-4"> 
                            <label>Password</label> 
                            <div class="relative mt-2"> 
                                <input v-on:keyup="enterpress" v-model="password" :type="show_password_input ? 'text' : 'password'" class="input w-full border" :style="error_password_text ? 'border-color: #e53e3e' : ''"> 
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
                            Are you new? <a href="/register" class="text-purple-500">Create an account</a>
                        </div>
                        <div class="text-center mb-4">
                            ● <a :href="elite">Elitepvpers</a> ● <a :href="cheat">Cheat-Gam3</a> ● <a :href="info">Inforge</a> ●
                      </div>
                    </div>
                </div>
                <!-- END: Login Form -->
                <!-- BEGIN: Register Form -->
                <!-- <div
                    class="m-auto h-full flex py-5 xl:py-0 my-10 xl:my-0 bg-black"
                    style="min-width: 400px; width: 30%;"
                    v-if="!show"
                >
                    <div
                        class="flex-1 box py-16 mb-5 lg:mb-0"
                        style="background-color: #12171d;"
                    >
                        <div class="p-5 text-center">
                            <div class="flex text-center justify-center">
                                <img
                                    alt=""
                                    class="rounded-full"
                                    :src="
                                        require(`@/assets/images/logo.png`)
                                    "
                                />
                            </div>
                        </div>
                        <div class="px-5 mb-4"> 
                            <label>Username</label> 
                            <input v-model="username" type="text" class="input w-full border mt-2" placeholder="username" :style="error_username_text ? 'border-color: #e53e3e' : ''"> 
                            <small v-if="error_username_text" class="text-theme-6">{{ this.username_error }}</small>
                        </div>
                        <div class="px-5 mb-4"> 
                            <label>Email</label> 
                            <input v-model="register_email" type="email" class="input w-full border mt-2" placeholder="example@gmail.com"
                            :style="error_register_email_text ? 'border-color: #e53e3e' : ''"> 
                            <small v-if="error_register_email_text" class="text-theme-6">{{ this.register_email_error }}</small>
                        </div>
                        <div class="relative px-5 mb-4"> 
                            <label>Password</label> 
                            <div class="relative mt-2"> 
                                <input v-model="register_password" :type="show_register_password_input ? 'text' : 'password'" class="input w-full border" :style="error_register_password_text ? 'border-color: #e53e3e' : ''"> 
                                <div class="absolute top-0 right-0 rounded-r w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600" :style="error_register_password_text ? 'border-top-color: #e53e3e;border-bottom-color: #e53e3e;border-right-color: #e53e3e;' : ''">
                                    <EyeIcon v-if="!show_register_password_input" @click="show_register_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_register_password_text ? 'color: #e53e3e;' : ''" />
                                    <EyeOffIcon v-if="show_register_password_input" @click="show_register_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_register_password_text ? 'color: #e53e3e;' : ''" />
                                </div>
                            </div>
                            <small v-if="error_register_password_text" class="text-theme-6">{{this.register_password_error}}</small>
                        </div>

                        <div class="relative px-5 mb-4"> 
                            <label>Confirm Password</label> 
                            <div class="relative mt-2"> 
                                <input v-on:keyup="enterpress" v-model="confirm_password" :type="show_confirm_password_input ? 'text' : 'password'" class="input w-full border" :style="error_confirm_password_text ? 'border-color: #e53e3e' : ''"> 
                                <div class="absolute top-0 right-0 rounded-r w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600" :style="error_register_password_text ? 'border-top-color: #e53e3e;border-bottom-color: #e53e3e;border-right-color: #e53e3e;' : ''">
                                    <EyeIcon v-if="!show_confirm_password_input" @click="show_confirm_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_confirm_password_text ? 'color: #e53e3e;' : ''" />
                                    <EyeOffIcon v-if="show_confirm_password_input" @click="show_confirm_password()" class="w-4 h-4 text-white cursor-pointer" :style="error_confirm_password_text ? 'color: #e53e3e;' : ''" />
                                </div>
                            </div>
                            <small v-if="error_confirm_password_text" class="text-theme-6">{{ this.confirm_password_error }}</small>
                        </div>

                        <div class="flex px-5 mb-4 items-center text-gray-700 dark:text-gray-500"> 
                            <input v-model="terms_service" type="checkbox" class="input border mr-2" id="terms_service"> 
                            <label class="cursor-pointer select-none" for="vertical-remember-me">
                            I agree to <a href="/terms_service" class="text-purple-500">Terms of Service</a> and <a href="/privacy_policy" class="text-purple-500">Privacy Policy</a>
                            </label> 
                        </div>
                        <div class="flex justify-center">
                            <vue-recaptcha
                                sitekey="6LeWAO4lAAAAAHfC83S8PKH-jOANIv5YCEMFnMxP"
                                theme="dark"
                                style="display: flex; justify-content: center; height: 78px; margin-top: 10px;"
                                @verify="verify"
                                @expired="expired"
                            ></vue-recaptcha>
                        </div>
                        <div class="flex justify-center mb-4">
                            <button :disabled="isButtonDisabled" @click="register()" type="button" class="button bg-theme-1 text-white w-full mx-5 mt-5">Register</button>
                        </div>
                        <div class="text-center mb-4">
                            Already have an account? <a href="javascript:;" @click="toLogin()" class="text-purple-500">Login</a>
                        </div>
                        <div class="text-center mb-4">
                            ● <a :href="elite">Elitepvpers</a> ● <a :href="cheat">Cheat-Gam3</a> ● <a :href="inforge">Inforge</a> ●
                        </div>
                    </div>
                </div> -->
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
        show: false,
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
        info: '',
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
        toLogin() {
          this.$router.push({
            name: 'login'
          });
        },
        toEpvp() {
            document.location.href = this.elite;
        },
        toRage() {
            document.location.href = this.ragezone;
        },
        toInforge() {
            document.location.href = this.info;
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
                if(res.data.status == "success"){
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#2af109",
                        stopOnFocus: true
                    }).showToast();
                    self.$router.push({ path: "/dashboard" });
                } else {
                    self.login_failed = true;
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        },
        register() {
            let self = this;
            if(self.username == ""){
                self.error_username_text = true; self.username_error = "username is required!";
            }
            if(self.register_email ==""){
                self.error_register_email_text = ture; self.register_email_error = "register email is required!";
            }
            if(self.register_password == ""){
                self.error_register_password_text = true; self.register_password_error = "register password is required!";
            }
            if(self.confirm_password == ""){
                self.error_confirm_password_text = ture; self.confirm_password_error = "confirm password is required!";
            }
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
                    self.$router.push({
                      name: 'login'
                    });
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
            console.log("verfy", this.capcha);
            this.capcha = true;
        }, 

        expired(){
            this.capcha = false;
        },

        getLinks(){
            let self = this;
            axios.get('/api/getSocialLinks')
                .then((res)=>{
                    self.elite = res.data.elite;
                    self.cheat = res.data.cheat;
                    self.info = res.data.inforge;
                    self.discord = res.data.discord;
                    self.ragezone = res.data.rage;
                    self.$store.dispatch("main/setInit", res.data.data);
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
