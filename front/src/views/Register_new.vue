<template>
    <!-- <div> -->
        <div class="container sm:px-10">
        <div class="block xl:grid gap-4">
            <div class="box">
                <div class="flip-card-inner">
                    <div class="box-signup">
                        <ul>
                            <form action="" method="get">
                                <h1>SIGN UP</h1>
                                <div class="user-signup">
                                    <input class="inpt" type="text" name="" id="username" placeholder="User Name">
                                    <i class="fa fa-user"></i>
                                </div>

                                <div class="email-signup">
                                    <input class="inpt" type="email" name="email" id="email-login" placeholder="Email "
                                        required>
                                    <i class='fa fa-envelope'></i>

                                </div>

                                <div class="password-signup">
                                    <input class="inpt" type="password" name="password" id="password-signup"
                                        placeholder="Password" required>
                                    <i id="eye-signup" class="fa fa-eye-slash"></i>

                                </div>

                                <div class="forget">
                                    <input type="checkbox" name="checkbox1" id="checkbox1">
                                    <label for="checkbox1">Remember me</label>
                                    <a href="#">Forget Password?</a>
                                </div>
                                <button type="submit" class="btn">SIGN UP</button>

                            </form>
                            <div class="register-link">
                                <p>Already have an account? <a href="#" onclick="flipAgain()">Log In</a></p>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
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
        ragezone: '',
        capchakey: ''
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
        // cash("body")
        //     .removeClass("app")
        //     .addClass("login");
        // this.setDarkModeClass();
        this.getLinks();
    },
    methods: {
        // setDarkModeClass() {
        // this.darkMode
        //     ? cash("html").addClass("dark")
        //     : cash("html").removeClass("dark");
        // },
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
                .post("/account/register", {
                fullName: self.username,
                email: self.register_email,
                password: self.register_password,
                })
                .then(function(response) {
                if(response.data.message == "success"){
                    Toastify({
                        text: response.data.response,
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
                        text: response.data.response,
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
                    // self.cheat = res.data.cheat;
                    self.info = res.data.result.inforge;
                    self.discord = res.data.result.discord;
                    self.ragezone = res.data.result.ragezone;
                    self.capchakey = res.data.result.captcha_key;
                    // self.$store.dispatch("main/setInit", res.data.data);
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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Poppins", sans-serif;
  background-image: url("/bg.png");
  background-repeat: no-repeat;
  color: white;
  background-size: fixed;
}

.box {
  background-color: transparent !important;
  width: 530px;
  height: 500px;
  perspective: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 25px;
  box-shadow: 0 4px 8px 10px rgba(0, 0, 0, 0.2);
}

/* .box:hover .flip-card-inner {
            transform: rotateY(-180deg);
        } */

.box-login,
.box-signup {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.box-login {
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
    background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  /* border: 1px solid white; */
  position: absolute;
}

.box-login h1 {
  letter-spacing: 2px;
}

.box-signup h1 {
  padding-top: 5px;
  letter-spacing: 2px;
}

.box-login ul {
  padding: 26px;
}

.box-signup ul {
  padding: 10px;
}

.box-login .inpt {
  width: 27rem;
  padding: 15px 10px;
  font-size: 1.4rem;
  border-radius: 15px;
  margin: 15px;
  background: transparent;
  outline: none;
}

input::placeholder {
  color: white;
  font-size: 1.2rem;
}

.btn {
  height: 3.2rem;
  width: 27rem;
  margin: 15px 15px 0 15px;
  padding: 10px;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  border-radius: 50px;
  background: white;
  color: black;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn:hover {
  transform: translateY(-0.4rem);
}

.box-login form a {
  text-decoration: none;
  color: white;
  padding-left: 150px;
  font-size: 1rem;
}

label {
  font-size: 1rem;
  cursor: pointer;
}

.box-signup {
  color: white;
  transform: rotateY(180deg);
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  text-align: center;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  position: absolute;
}

.box input {
  color: white;
  border-radius: 0px;
  border: 1px solid white;
  /* border-bottom-color:white ; */
  /* padding: 20px 10px; */
  /* transition: 0.3s ease; */
}

.box input:focus{
    border: 2px solid cyan;
}

.box-signup .inpt {
  width: 27rem;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 15px;
  margin: 10px;
  background: transparent;
  transition: 0.5s ease;
  outline: none;
}

.box-signup form a {
  /* display: flex; */
  text-align: right;
  text-decoration: none;
  color: white;
  padding-left: 155px;
  font-size: 1rem;
  /* transition: 0.5s ease; */
}

form a:active {
  color: blueviolet;
}

.box-login .register-link {
  font-size: 1rem;
  /* margin-bottom: rem; */
  padding-bottom: 15px;
  font-style: italic;
}

.box-signup .register-link {
  font-size: 1rem;
  /* margin-bottom: 3rem; */
  padding-bottom: 30px;
  font-style: italic;
}

.register-link a {
  color: blueviolet;
  transition: 0.5s ease;
}

.register-link a:active {
  color: blue;
}

.register-link a:hover {
  color: red;
  transform: scale(1.5);
}

.email-login i {
  /* content: "\eee1"; */
  position: absolute;
  top: 11rem;
  right: 3.5rem;
  cursor: pointer;
}

.password-login i {
  position: absolute;
  right: 3.5rem;
  top: 16.4rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.user-signup i {
  position: absolute;
  right: 3.8rem;
  top: 8.7rem;
  cursor: pointer;
}

.email-signup i {
  top: 13.3rem;
  position: absolute;
  right: 3.6rem;
  cursor: pointer;
}

.password-signup i {
  top: 17.9rem;
  position: absolute;
  right: 3.7rem;
  cursor: pointer;
  transition: 0.3s ease;
}

@media (max-width: 480px) {
  .box {
    width: 90%;
  }

  .box .inpt {
    width: 85%;
    font-size: 90%;
  }

  .box form a {
    padding-left: 1rem;
    font-size: 0.9rem;
  }

  .box-login ul {
    padding: 5px;
  }

  .btn {
    width: 80%;
  }
}

</style>
