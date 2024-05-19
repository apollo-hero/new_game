<template>
    <div>
      <div class="flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Server Config</h2>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <div
            class="col-span-12 lg:col-span-8 xxl:col-span-8 flex lg:block flex-col-reverse"
          >
        <!-- BEGIN: Change Email -->
        <div class="box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <!-- <h2 class="font-medium text-base mr-auto">Change Email</h2> -->
          </div>
          <div class="p-5">
            <div class="flex flex-col sm:flex-row items-center"> 
              <label class="w-full sm:w-40 sm:text-right sm:mr-5">Site Name</label> 
              <input type="text" v-model="site_name" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
              <label class="w-full sm:w-40 sm:text-right sm:mr-5">86x Download</label> 
              <input type="text" v-model="x64_download_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
              <label class="w-full sm:w-40 sm:text-right sm:mr-5">64x Download</label> 
              <input type="text" v-model="x86_download_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
              <label class="w-full sm:w-40 sm:text-right sm:mr-5">Site Domain</label> 
              <input type="text" v-model="site_domain" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
              <label class="w-full sm:w-40 sm:text-right sm:mr-5">Site Status</label>
              <div class="mt-2"> 
                <input type="checkbox" v-model="site_status" class="input input--switch border"> 
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Store Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="store_status" class="input input--switch border"> </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Site Captcha</label> 
                <input type="text" v-model="site_captcha" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Roulette Price</label> 
                <input type="text" v-model="site_roulette_price" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Coin Discount</label> 
                <input type="text" v-model="site_coin_discount" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Coin Bonus</label> 
                <input type="text" v-model="site_coin_bonus" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Site Coin Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="coin_status" class="input input--switch border"> </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Discord Link</label> 
                <input type="text" v-model="site_discord_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Ragezone Link</label> 
                <input type="text" v-model="site_ragezone_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>


            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Elitepvpers Link</label> 
                <input type="text" v-model="site_elite_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Inforge Link</label> 
                <input type="text" v-model="site_inforge_link" class="input w-full border mt-2 flex-1" placeholder=""> 
            </div>

            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Wheel Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="wheel_status" class="input input--switch border"> </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Register Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="register_status" class="input input--switch border"> </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Login Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="login_status" class="input input--switch border"> </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center"> 
                <label class="w-full sm:w-40 sm:text-right sm:mr-5">Jackpot Status</label>
                <div class="mt-2"> <input type="checkbox" v-model="jackpot_status" class="input input--switch border"> </div>
            </div>

            <button @click="changeConfig()" type="button" class="button bg-theme-1 text-white mt-4">
              Change Config
            </button>
          </div>
        </div>
        <!-- END: Change Email -->
        </div>
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
        site_name : '',
        x64_download_link : '',
        x86_download_link : '',
        site_domain : '',
        site_captcha : '',
        site_roulette_price : 0,
        site_coin_discount : 0,
        site_coin_bonus : 0,
        site_discord_link : '',
        site_ragezone_link : '',
        site_elite_link : '',
        site_inforge_link : '',
        store_status : false,
        coin_status : false,
        wheel_status : false,
        register_status : false,
        login_status : false,
        jackpot_status : false,
        site_status : false
      };
    },
    mounted(){
        this.site_name = this.$store.state.main.init.name;
        this.x64_download_link = this.$store.state.main.init.x64_download;
        this.x86_download_link = this.$store.state.main.init.x86_download;
        this.site_domain = this.$store.state.main.init.domain;
        this.site_captcha = this.$store.state.main.init.captcha_key;
        this.site_roulette_price = this.$store.state.main.init.roulette_price;
        this.site_coin_discount = this.$store.state.main.init.coin_discount;
        this.site_coin_bonus = this.$store.state.main.init.coin_bonus;
        this.site_discord_link = this.$store.state.main.init.discord;
        this.site_ragezone_link = this.$store.state.main.init.ragezone;
        this.site_elite_link = this.$store.state.main.init.elite;
        this.site_inforge_link = this.$store.state.main.init.inforge;
        this.store_status = this.$store.state.main.init.store_status;
        this.coin_status = this.$store.state.main.init.coin_status;
        this.wheel_status = this.$store.state.main.init.roulette_status;
        this.register_status = this.$store.state.main.init.register_status;
        this.login_status = this.$store.state.main.init.login_status;
        this.jackpot_status = this.$store.state.main.init.jackpot_status;
        this.site_status = this.$store.state.main.init.status;
    },  
    methods: {
      changeConfig(){
        let self = this;
        axios.post("/game/setting", {
            site_name: self.site_name,
            x64_download_link: self.x64_download_link,
            x86_download_link: self.x86_download_link,
            site_domain: self.site_domain,
            site_captcha: self.site_captcha,
            site_roulette_price: self.site_roulette_price,
            site_coin_discount: self.site_coin_discount,
            site_coin_bonus: self.site_coin_bonus,
            site_discord_link: self.site_discord_link,
            site_ragezone_link: self.site_ragezone_link,
            site_elite_link: self.site_elite_link,
            site_inforge_link: self.site_inforge_link,
            store_status: self.store_status,
            coin_status: self.coin_status,
            wheel_status: self.wheel_status,
            register_status: self.register_status,
            login_status: self. login_status,
            jackpot_status: self.jackpot_status,
            site_status: self. site_status
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res)=>{
          if(res?.data && res?.data?.message ==='success'){

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

            this.$store.dispatch('main/getAccount')
          }
          else{
            console.log("error");
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
        });
      }
    },
    watch:{
      
    }
  };
  </script>
  