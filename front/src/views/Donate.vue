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
            <div v-if="init.payment_method == 'stripe'" class="report-box zoom-in">
              <div v-if="init.coin_discount == 0" class="box p-5">
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

              <div v-if="init.coin_discount > 0" class="box p-5">
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
                          <div class="text-3xl font-bold leading-8">{{ (coin.Price * (1-init.coin_discount/100)).toFixed(2) }}</div> 
                          <div class="text-theme-10 flex items-end ml-2">{{ init.site_paypal_currency }}</div>
                          <div class="text-theme-10 flex items-end ml-2">{{ init.coin_discount }} % off</div>
                        </div>
                      </button>
                
                <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
                <!-- </form> -->
              </div>
            </div>

            <div v-if="init.payment_method == 'paypal'" class="report-box zoom-in">
              <div v-if="init.coin_discount == 0" class="box p-5">
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                      <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://api.noszelda.eu/game/ipn">
                      <input type="hidden" name="item_number" :value="coin.CoinId">
                      <button>
                      <div class="flex">
                        <div class="text-3xl font-bold leading-8">{{ coin.Price }}</div>
                        <div class="report-box__icon text-theme-10 flex items-end ml-2">€</div>
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
                      <!-- <div class="text-3xl font-bold leading-8 mt-6">4.510</div> -->
                      <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
                      </button>
                  </form>
              </div>

              <div v-if="init.coin_discount > 0" class="box p-5">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                      <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.site_coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://api.noszelda.eu/game/ipn">
                      <input type="hidden" name="item_number" :value="coin.CoinId">
                      <button>
                        <div class="flex">
                          <div class="text-3xl font-bold leading-8 line-through">{{ coin.Price }}</div>
                          <div class="report-box__icon text-theme-10 flex items-end ml-2 line-through">{{ init.site_paypal_currency }}</div>
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
                          <div class="text-3xl font-bold leading-8">{{ coin.Price * (1-init.coin_discount/100) }}</div>
                          <div class="text-theme-10 flex items-end ml-2">€</div>
                          <div class="text-theme-10 flex items-end ml-2">{{ init.coin_discount }} % off</div>
                        </div>
                      </button>
                
                <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
                </form>
              </div>
            </div>

            <div v-if="init.payment_method == 'hybrid'" class="report-box zoom-in">
              <div v-if="init.coin_discount == 0" class="box p-5" @click="selectCoin(coin)" :style="coin.CoinId == chooseCoin.CoinId ? 'border: 1px solid #91C714' : ''">
                      <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://api.noszelda.eu/game/ipn">
                      <input type="hidden" name="item_number" :value="coin.CoinId">
                      <div class="flex">
                        <div class="text-3xl font-bold leading-8">{{ coin.Price }}</div>
                        <div class="report-box__icon text-theme-10 flex items-end ml-2">€</div>
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
                      <!-- <div class="text-3xl font-bold leading-8 mt-6">4.510</div> -->
                      <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
              </div>

              <div v-if="init.coin_discount > 0" class="box p-5" @click="selectCoin(coin)">
                      <input type="hidden" name="business" v-model="init.site_email">
                      <input type="hidden" name="cmd" value="_donations">
                      <input type="hidden" name="no_shipping" value="1">
                      <input type="hidden" name="shipping_preference" value="NO_SHIPPING">
                      <input type="hidden" name="item_name" value="Server donation">
                      <input type="hidden" name="amount" :value="coin.Price * (1-init.site_coin_discount/100)">
                      <input type="hidden" name="custom" v-model="user.Id">
                      <input type="hidden" name="currency_code" value="EUR">
                      <input type="hidden" name="notify_url" value="https://api.noszelda.eu/game/ipn">
                      <input type="hidden" name="item_number" :value="coin.CoinId">
                      <button>
                        <div class="flex">
                          <div class="text-3xl font-bold leading-8 line-through">{{ coin.Price }}</div>
                          <div class="report-box__icon text-theme-10 flex items-end ml-2 line-through">{{ init.site_paypal_currency }}</div>
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
                          <div class="text-3xl font-bold leading-8">{{ coin.Price * (1-init.coin_discount/100) }}</div>
                          <div class="text-theme-10 flex items-end ml-2">€</div>
                          <div class="text-theme-10 flex items-end ml-2">{{ init.coin_discount }} % off</div>
                        </div>
                      </button>
                
                <div class="text-base text-gray-600 mt-1">{{coin.Coins}} + {{coin.BonusCoins}} Bonus Coins ({{coin.BonusCoins/coin.Coins*100}}%)</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="init.payment_method == 'hybrid'" class="flex px-5 mt-10 mb-4 items-center text-gray-700 dark:text-gray-500 justify-center"> 
            <input v-model="terms_service" type="checkbox" class="input border mr-2" id="terms_service"> 
            <label class="cursor-pointer select-none" for="vertical-remember-me">
            I consent to NosMyth immediately beginning to perform the contract by activating digital content in my account.<br>
            I accept that I lose the right to cancel this contract and get a refund once the digital content has been activated in my account.
            </label> 
        </div>
        <div v-if="init.payment_method == 'hybrid'" class="grid grid-cols-12 gap-6 mt-5">
          <div class="col-span-12 sm:col-span-6">
            <button
                class="button button--lg border border-white w-full dark:border-dark-5 dark:text-gray-300 mt-2 mr-20 bg-theme-1"
                @click="paypal()"
            >
                PAYPAL
            </button>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <button
                class="button button--lg border border-white w-full dark:border-dark-5 dark:text-gray-300 mt-2 bg-theme-9"
                @click="crypto()"
            >
                CRYPTO
            </button>
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
        chooseCoin: false,
        terms_service: false
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
        .catch(function(error) {
            self.handleError(error);
        });
      },
      handleError(res){
        if((res.data?.status == 'error' && res.data?.message == 'Token expired') || res.response?.status == 401){
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
              window.open(res?.data.result.url, '_blank', 'noreferrer');
              // document.location.href = res.data.result.url;
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
        })
        .catch(function(error) {
            self.handleError(error);
        });
      },

      selectCoin(coin) {
        this.chooseCoin = coin;
      },

      paypal() {
        if(!this.chooseCoin){
          return; 
        } else if(!this.terms_service){
          return;
        }
        const formData = {
          business: this.init.site_email,
          cmd: "_donations",
          no_shipping: "1",
          shipping_preference: "NO_SHIPPING",
          item_name: "Server donation",
          amount: this.chooseCoin.Price * (1 - this.init.coin_discount / 100),
          custom: this.user.Id,
          currency_code: "EUR",
          notify_url: "https://api.noszelda.eu/game/ipn",
          item_number: this.chooseCoin.CoinId
        };

        window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${this.init.email}&item_name=${formData.item_name}&amount=${formData.amount}&currency_code=${formData.currency_code}&custom=${formData.custom}&item_number=${formData.item_number}&notify_url=${formData.notify_url}`;
      },

      crypto(){
        if(!this.chooseCoin){
          return; 
        } else if(!this.terms_service){
          return;
        }

        let self = this;
        axios.post("/account/pay_crypto", {
          amount: self.chooseCoin.price,
          coinId: self.chooseCoin.CoinId,
          customer_id: self.user.Id
        },{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res)=>{
          if(res.data && res.data.message ==='success'){
              // window.open(res?.data.result.link, '_blank', 'noreferrer');
              document.location.href = res.data.result.link;
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
        })
        .catch(function(error) {
            self.handleError(error);
        });
      }
    }
  }
  </script>
  