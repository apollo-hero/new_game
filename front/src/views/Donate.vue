<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6">
      <!-- BEGIN: General Report -->
      <div class="col-span-12 mt-8">
        <div class="flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">Select {{this.$store.state.main.init.name}} Coins amount</h2>
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5">
          <div v-for="coin, index in coins" :key="index" class="col-span-12 sm:col-span-6 xl:col-span-3">
            <div class="report-box zoom-in">
              <div v-if="init.coin_discount == 0" class="box p-5">
                  <!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                      <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.site_coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://nzennos.com/nosback/public/api/paypal-postback">
                      <input type="hidden" name="item_number" :value="coin.CoinsId"> -->
                      <button @click="handleDonate(coin.Price * (1 - init.coin_discount/100),coin.CoinId)">
                      <div class="flex">
                        <div class="text-3xl font-bold leading-8">{{ coin.Price }}€</div>
                        <div class="report-box__icon text-theme-10 flex items-end ml-2"></div>
                        <div class="ml-auto">
                          <Tippy
                            tag="div"
                            class="report-box__indicator bg-theme-9 cursor-pointer"
                          >
                          {{coin.BonusCoins/coin.Coins*100}}% <ChevronUpIcon class="w-4 h-4" />
                          </Tippy>
                        </div>
                      </div>
                      <!-- <div class="text-3xl font-bold leading-8 mt-6">4.510</div> -->
                      <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
                      </button>
                  <!-- </form> -->
              </div>

              <div v-if="init.site_coin_discount > 0" class="box p-5">
                <!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post"> -->
                      <!-- <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.site_coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://nzennos.com/nosback/public/api/paypal-postback">
                      <input type="hidden" name="item_number" :value="coin.CoinsId"> -->
                      <button @click="handleDonate(coin.Price * (1 - init.coin_discount/100),coin.CoinId)">
                        <div class="flex">
                          <div class="text-3xl font-bold leading-8 line-through">{{ coin.Price }}€</div>
                          <div class="report-box__icon text-theme-10 flex items-end ml-2 line-through"></div>
                          <div class="ml-auto">
                            <Tippy
                              tag="div"
                              class="report-box__indicator bg-theme-9 cursor-pointer"
                              content="33% Higher than last month"
                            >
                            {{coin.BonusCoins/coin.Coins*100}}% <ChevronUpIcon class="w-4 h-4" />
                            </Tippy>
                          </div>
                        </div>
                      
                
                        <div class="flex">
                          <div class="text-3xl font-bold leading-8">{{ coin.Price * (1-init.site_coin_discount/100) }}</div>
                          <div class="text-theme-10 flex items-end ml-2">{{ init.site_paypal_currency }}</div>
                          <div class="text-theme-10 flex items-end ml-2">{{ init.site_coin_discount }} % off</div>
                        </div>
                      </button>
                
                <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
                <!-- </form> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>

  import axios from 'axios';
  import Toastify from 'toastify-js';

  export default {
    data(){
      return {
        coins: [],
      }
    },
    computed : {
      init(){
        return this.$store.state.main.init;
      },
      user(){
        return this.$store.state.main.user;
      }
    },
    mounted() {
      this.getCoins();
      this.getBalance();
    },
    methods: {
      getCoins(){
        let self = this;
        axios.get('/game/getCoins',{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res)=>{
          if(res.data.message == "success"){
            self.coins = res.data.result.coins;
          } else {
            self.handleError(res);
          }
        })
      },
      handleError(res){
        if(res.data.status == 'error' && res.data.message == 'Token expired'){
            this.$store.dispatch('main/logout').then((res)=>{
                this.$router.push({ path: "/" });
            })
        }
      },
      getBalance(){
        let self = this;
        self.$store.dispatch("main/getAccount");
      },

      handleDonate(amount, coinId){
        let self = this;
        axios.post("/game/donate", {
          amount: amount,
          coinId: coinId,
          customer_id: self.user.Id
        },{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res)=>{
          if(res.data && res.data.message ==='success'){
              // window.open(res?.data.result.url, '_blank', 'noreferrer');
              document.location.href = res.data.result.url;
          } else{
              Toastify({
                text: "The coins is not enough!",
                duration: 3000,
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "center",
                backgroundColor: "#e80404",
                stopOnFocus: true,
              }).showToast();
          }
        });
      }
    }
  }
  </script>
  