<template>
    <div>
      <div class="flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: Profile Menu -->
        <div
          class="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse"
        >
          <div class="box mt-5">
            <div class="relative flex items-center p-5">
              <div class="w-12 h-12 image-fit">
                <img
                  alt=""
                  class="rounded-full"
                  :src="require(`@/assets/avatars/avatar.png`)"
                />
              </div>
              <div class="ml-4 mr-auto">
                <div class="font-medium text-base">
                  {{ this.$store.state.main.user.Name }}
                </div>
                <div class="text-gray-600">{{ this.$store.state.main.user.Email }}</div>
              </div>
            </div>
            <div class="p-5 border-t border-gray-200 dark:border-dark-5">
              <a 
                 data-toggle="tab"
                 data-target="#change_password" 
                 class="flex items-center mt-5" 
                 href="javascript:;"
              >
                <LockIcon class="w-4 h-4 mr-2" /> Change Password
              </a>
            </div>
            <div class="p-5 border-t border-gray-200 dark:border-dark-5">
              <a 
                data-toggle="tab"
                data-target="#change_email" 
                class="flex items-center" 
                href="javascript:;"
              >
                <MailIcon class="w-4 h-4 mr-2" /> Email Settings
              </a>
            </div>
            <div class="p-5 border-t flex dark:border-dark-5">
              
            </div>
          </div>
        </div>
        <!-- END: Profile Menu -->
        <div class="col-span-12 lg:col-span-8 xxl:col-span-9 tab-content">
          <!-- BEGIN: Change Password -->
        <div class="box lg:mt-5 tab-content__pane" id="change_password">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Password</h2>
          </div>
          <div class="p-5">
            <div>
              <label>Old Password</label>
              <input
                v-model="old_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="******"
                :style="error_old_password_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_old_password_text" class="text-theme-6">{{ this.old_password_error }}</small>
            </div>
            <div class="mt-3">
              <label>New Password</label>
              <input
                v-model="new_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="******"
                :style="error_new_password_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_new_password_text" class="text-theme-6">{{ this.new_password_error }}</small>
            </div>
            <div class="mt-3">
              <label>Confirm New Password</label>
              <input
                v-model="confirm_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="******"
                :style="error_confirm_password_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_confirm_password_text" class="text-theme-6">{{ this.confirm_password_error }}</small>
            </div>
            <button @click="changePassword()" type="button" class="button bg-theme-1 text-white mt-4">
              Change Password
            </button>
          </div>
        </div>
        <!-- END: Change Password -->
        <!-- BEGIN: Change Email -->
        <div class="box lg:mt-5 tab-content__pane" id="change_email">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Email</h2>
          </div>
          <div class="p-5">
            <div>
              <label>Old Email</label>
              <input
                v-model="old_email"
                type="email"
                class="input w-full border mt-2"
                placeholder="Old Email"
                :style="error_old_email_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_old_email_text" class="text-theme-6">{{ this.old_email_error }}</small>
            </div>
            <div class="mt-3">
              <label>New Email</label>
              <input
                v-model="new_email"
                type="email"
                class="input w-full border mt-2"
                placeholder="New Email"
                :style="error_new_email_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_new_email_text" class="text-theme-6">{{ this.new_email_error }}</small>
            </div>
            <div class="mt-3">
              <label>Confirm Password</label>
              <input
                v-model="password"
                type="password"
                class="input w-full border mt-2"
                placeholder="******"
                :style="error_password_text ? 'border-color: #e53e3e' : ''"
              />
              <small v-if="error_password_text" class="text-theme-6">{{ this.password_error }}</small>
            </div>
            <button @click="changeEmail()" type="button" class="button bg-theme-1 text-white mt-4">
              Change Email
            </button>
          </div>
        </div>
        <!-- END: Change Email -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Toastify from "toastify-js";

  export default {
    data() {
      return {
        old_email: '',
        new_email: '',
        password: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
        error_old_email_text: false,
        old_email_error: '',
        error_new_email_text: false,
        new_email_error: '',
        error_confirm_password_text: false,
        confirm_password_error: '',
        error_password_text: false,
        password_error: '',
        error_old_password_text: false,
        old_password_error: '',
        error_new_password_text: false,
        new_password_error: ''
      };
    },
    mounted(){
        this.old_email = this.$store.state.main.user.Email;
    },  
    methods: {
        changeEmail() {
            let self = this;
            if(!self.new_email || !self.password){
                Toastify({
                        text: "please fill the fields!",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                return;
            }

            self.$store.dispatch('main/changeEmail', {
                email: self.new_email,
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
                    self.old_email = res.data.user.Email;
                    self.new_email = '';
                    self.password = '';
                } else {
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();

                    if(res.data.status == 'error' && res.data.message == 'Token expired'){
                        this.$store.dispatch('main/logout').then((res)=>{
                            this.$router.push({ path: "/" });
                        })
                    }
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        },
        changePassword(){
            let self = this;
            if(!self.new_password || !self.old_password || !self.confirm_password){
                Toastify({
                        text: "please fill the fields!",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                return;
            }
            
            self.$store.dispatch('main/changePassword', {
                old_password: self.old_password,
                new_password: self.new_password,
                confirm_password: self.confirm_password
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
                    self.old_email = res.data.user.Email;
                    self.new_email = '';
                    self.password = '';
                } else {
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();

                    if(res.data.status == 'error' && res.data.message == ''){
                    
                        this.$store.dispatch('main/logout').then((res)=>{
                            this.$router.push({ path: "/" });
                        })
                    }
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        }
    },
    watch:{
      old_email(){
        if(this.old_email == ''){
          this.error_old_email_text = true;
          this.old_email_error = "The email is required!";
        } else if(!(/^[^@]+@\w+(\.\w+)+\w$/.test(this.old_email))) {
          this.error_old_email_text = true; this.old_email_error = "Invalied Email Format";
        } else {
          this.error_old_email_text = false;
        }
      },

      new_email(){
        if(this.new_email == ''){
          this.error_new_emaill_text = true;
          this.new_email_error = "The email is required!";
        } else if(!(/^[^@]+@\w+(\.\w+)+\w$/.test(this.new_email))) {
          this.error_new_email_text = true; this.new_email_error = "Invalied Email Format";
        } else {
          this.error_new_email_text = false;
        }
      },

      password(){
        if(this.password == ''){
          this.error_passwordl_text = true;
          this.password_error = "The password is required!";
        } else if(this.password.length < 6) {
          this.error_password_text = true; this.password_error = "The password must be at least 6 characters!";
        } else {
          this.error_password_text = false;
        }
      },

      old_password(){
        if(this.old_password == ''){
          this.error_old_passwordl_text = true;
          this.old_password_error = "The old_password is required!";
        } else if(this.old_password.length < 6) {
          this.error_old_password_text = true; this.old_password_error = "The old_password must be at least 6 characters!";
        } else {
          this.error_old_password_text = false;
        }
      },

      new_password(){
        if(this.new_password == ''){
          this.error_new_passwordl_text = true;
          this.new_password_error = "The new_password is required!";
        } else if(this.new_password.length < 6) {
          this.error_new_password_text = true; this.new_password_error = "The new_password must be at least 6 characters!";
        } else {
          this.error_new_password_text = false;
        }
      },

      confirm_password(){
        if(this.confirm_password == ''){
          this.error_confirm_passwordl_text = true;
          this.confirm_password_error = "The password is required!";
        } else if(this.confirm_password.length < 6) {
          this.error_confirm_password_text = true; this.confirm_password_error = "The password must be at least 6 characters!";
        } else {
          this.error_confirm_password_text = false;
        }
      }
    }
  };
  </script>
  