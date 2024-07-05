<template>
  <div>
    <div v-if="wheel_status" class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="box p-5">
          <div class="items-center pb-5">
            <h2 class="text-lg font-medium text-center">
              How does the Fortune Wheel work?
            </h2>
          </div>
          <div
            class="box p-3 text-justify"
            style="background-color: #232a3b"
          >
            <div class="text-gray-500 mt-1 font-medium">
              To spin the wheel, you need 200 Coins.
            </div>
            <div class="text-gray-500 mt-1 font-medium">
              Select on which character you want to receive your reward.
            </div>
            <div class="text-gray-500 mt-1 font-medium">
              You will get the jackpot every 30 spins.
            </div>
          </div>
          <div class="items-center text-center mt-3 p-3" style="background-color: #a3ecff; color: black">
            <!-- <button
              class="button w-full mr-2 mb-2 flex items-center justify-center bg-theme-1 mt-3 text-white"
            >
                <RefreshCwIcon class="mr-2" /> Refresh
            </button> -->
            {{ 30 - this.$store.state.main.user.reward }} more spins to get a guaranteed jackpot spin!
          </div>

          <!-- <div class="intro-y items-center pt-3">
            <label>Select your jackpot</label>
            <select v-model="jackpot" class="input w-full border mt-2 flex-1">
              <option>select jackpot</option>
              <option
                v-for="(t, index) in jackpots"
                :key="index"
                :value="t.Id"
                >{{ t.Name }}</option
              >
            </select>
          </div> -->

          <div class="items-center pt-3">
            <label>Select your jackpot</label>
            <v-select v-model="jackpot" :options="jackpots" label="name" style="background-color: #232a3b">
              <template slot="option" slot-scope="option">
                <div class="flex items-center">
                  <img :src="getImageSrc(option.iconId)" class="mr-2">
                  {{ option.name }}
                </div>
              </template>

              <template slot="selected-option" slot-scope="option">
                <div class="flex items-center">
                  <img :src="getImageSrc(option.iconId)" class="mr-2">
                  <span>{{ option.name }}</span>
                </div>
              </template>
            </v-select>
          </div>

          <!-- <div class="items-center pt-3">
            <label>Select your characters</label>
            <select v-model="character" class="input w-full border mt-2 flex-1">
              <option
                v-for="(t, index) in characters"
                :key="index"
                :value="t.Id"
                >{{ t.Name }}</option
              >
            </select>
          </div> -->

          <div class="items-center pt-3">
            <label>Select your characters</label>
            <v-select v-model="character" :options="characters" label="Name" style="background-color: #232a3b">
              <template slot="option" slot-scope="option">
                <div class="flex items-center">
                  <img :src="getCharacterImage(option)" class="mr-2" width="35">
                  {{ option.Name }}
                </div>
              </template>

              <template slot="selected-option" slot-scope="option">
                <div class="flex items-center">
                  <img :src="getCharacterImage(option)" class="mr-2" width="35">
                  <span>{{ option.Name }}</span>
                </div>
              </template>
            </v-select>
          </div>
        </div>

        
        <!-- END: Form Layout -->
      </div>

      <!-- Roulette -->
      <div class="col-span-12 lg:col-span-6 flex items-center">
        <div class="w-full flex justify-center">
            <div ref="roulette" id="imgkolo" class="wheel mx-auto" :style="`background-image:url(${require(`@/assets/images/wheel.png`)})`">
                <!-- <input type="checkbox" name="sound" id="sound"> -->
                <img class="wheel-field jackpot" 
                    :src="require(`@/assets/images/none.png`)"
                    style="transform:rotate(0deg)"
                    :style="`background-image:url(${require(`@/assets/images/wheel_field_jackpot.png`)})`"
                >
                <img
                    v-if="double_jackpot" 
                    class="wheel-field jackpot jackpot-2" 
                    :src="require(`@/assets/images/none.png`)"
                    style="transform:rotate(180deg)"
                    :style="`background-image:url(${require(`@/assets/images/wheel_field_jackpot.png`)})`"
                >
                    
                <img 
                    class="wheel-field drawn" 
                    :src="require(`@/assets/images/none.png`)"
                    style="opacity: 1;"
                    :style="`background-image:url(${require(`@/assets/images/wheel_field_drawn.png`)}); transform: rotate(${degree}deg);` "
                >
                    

                <div class="wheel-button-play" data-status="0" @click="playWheel()">
                    <p v-if="status == 0" class="w-full spin">Spin <br>200 Coins</p>
                    <p v-else-if="status == 1" class="w-full spin">Wait ...</p>
                    <p v-else class="w-full spin">Clear</p>
                </div>
                <span v-html="html" class="flex w-full h-full"></span>
            </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="box p-5 mt-5">
          <div class="items-center pb-5">
            <h2 class="text-lg font-medium">
                Possible loots
            </h2>
          </div>

          <div class="items-center pt-3 flex-auto">
            <div v-for="(item, index) in items" :key="index" class="inline-flex m-1">
                <img
                    :alt="item.name"
                    :src="getImageSrc(item.iconId)"
                    style="width:45px; height:45px;"
                    class="tooltip"
                    :title="item.name + ' ' + item.amount"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 lg:col-span-6">
        The wheel is currently in maintenance mode.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Toastify from 'toastify-js';

export default {
  components:{
    // vSelect
  },
  data() {
    return {
        jackpots:[],
        jackpot: null,
        characters: [],
        character: null,
        items:[],
        status: 0,
        wheel_items: [],
        reward_id: null,
        double_jackpot: false,
        target: null,
        drawn_reward: null,
        amount: null,
        vnum: null,
        html: '',
        degree: 0,
        ticks: 0,
        tick_delay: 66.25,
        tick_sound: null,
        wheel_status: true
    };
  },
  mounted(){
    this.getJackpots();
    this.getItems();
    this.tick_sound = new Audio(require('@/assets/sound/tick.mp3'));
    this.getBalance();
    this.wheel_status = this.$store.state.main.init.roulette_status;
    this.double_jackpot = this.$store.state.main.init.jackpot_status;
    this.characters = this.$store.state.main.user.characters.filter(t=>!t.DeletedAt);
  },
  methods: {
    getImageSrc(iconId) {
      try {
        return require(`@/assets/items/${iconId}.png`);
      } catch (e) {
        console.error(`Image not found for iconId: ${iconId}`);
        return ''; // Return a placeholder or empty string if image not found
      }
    },
    getJackpots(){
        let self = this;
        axios.get('/game/getJackpots',{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((res)=>{
          if(res.data.message == "success"){
            self.jackpots = res.data.result.jackpots;
            // self.double_jackpot = res.data.double_jackpot == 1 ? true : false;
          } else {

          }
        })
        .catch(function(error) {
            self.handleError(error);
        });
    },

    getItems(){
        let self = this;
        axios
            .get("/game/getItems", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            })
            .then((res) => {
            if(res.data.message == "success"){
                self.items = res.data.result.items;
            } else {
                self.handleError(res);
            }
            
            })
            .catch(function(error) {
                self.handleError(error);
            });
    },

    playWheel() {
      let self = this;
      var postions = [
          {"top": '25', "left" : '181'},
          {"top" : '40', "left" : '238'},
          {"top" : '73', "left" : '292'},
          {"top" : '123', "left" : '328'},
          {"top" : '181', "left" : '340'},
          {"top" : '243', "left" : '328'},
          {"top" : '295', "left" : '295'},
          {"top" : '330', "left" : '240'},
          {"top" : '340', "left" : '180'},
          {"top" : '330', "left" : '120'},
          {"top" : '295', "left" : '70'},
          {"top" : '243', "left" : '38'},
          {"top" : '181', "left" : '22'},
          {"top" : '123', "left" : '38'},
          {"top" : '73', "left" : '73'},
          {"top" : '40', "left" : '122'},
      ];

      if(!self.character || !self.jackpot) {
        Toastify({
          text: "please select the character / jackpot",
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

      if(self.status == 0){
        self.status = 1;
        axios.post('/game/getWheelItems',{
          doubleJackpot: self.$store.state.main.init.jackpot_status,
          jackpot: self.jackpot.id,
          character: self.character.Id,
        },{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }).then((res)=>{
          if(res.data.message == "error"){
            self.handleError(res);
          } else if(res.data.message == "warning"){
            self.$store.dispatch("main/getAccount");
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
            self.status = 0;
          } else if(res.data.message == "success") {

            self.$store.dispatch("main/getAccount");
            self.reward_id = res.data.result.reward.id;
            const items = res.data.result.wheel_items;
            self.double_jackpot = self.$store.state.main.init.jackpot_status;

            for (let index = 0; index < items.length; index++) {
                if(items[index].id == self.reward_id){
                  self.drawn_reward = index;
                  self.target = res.data.result.target;
                  self.vnum = items[index].VNUM;
                  self.amount = items[index].Amount;
                }                        
            }

            for (let i = 0; i < 16; i++) {
                self.html += '<div class="wheel-rewards-slot jackpot opacity1" style="top:' + postions[i].top + 'px; left:' + postions[i].left + 'px;">';
                self.html +=    '<div class="wheel-rewards-group">';
                self.html +=       '<div class="nt-item-small">';
                self.html +=         `<img src="${self.getImageSrc(items[i].iconId)}" />`;
                self.html +=       '</div>';
                self.html +=     '</div>';
                self.html += '</div>';    
            }

            self.start_pin();
          } else {
            self.status = 0;
            self.double_jackpot = false;
          }
        })
        .catch(function(error) {
            self.handleError(error);
        });
          
      } else if(self.status == 2){
        self.html = "";
        self.status = 0;
        self.degree = 0;
        self.tick_delay = 66.25;
        self.ticks = 0;
        self.drawn_reward = null;
      }

    },

    handleError(res){
      if((res.data?.status == 'error' && res.data?.message == 'Token expired') || res.response?.status == 401){
          this.$store.dispatch('main/logout').then((res)=>{
              this.$router.push({ path: "/" });
          })
      }
    },

    start_pin(){
      let self = this;
      self.drawn_reward += 4; //
      if (self.drawn_reward > 15){self.drawn_reward -= 16;}
      self.status = 1;

      var spinning = setInterval(function(){
          self.degree += 22.5;
          if (self.degree >= 360){self.degree -= 360;}
          self.ticks++;   
          
          // if ($('input[name="sounds"]').val() == "1"){
              self.tick_sound.pause();
              self.tick_sound.currentTime = 0
              self.tick_sound.play();
          // }

          if (self.ticks > 32 && self.ticks % 16 == self.drawn_reward){
              clearInterval(spinning);
              self.slowing_function()
          }

      },self.tick_delay); 
    },

    slowing_function(){
      let self = this;
      var slowing = setInterval(function(){

            self.degree += 22.5;
            if (self.degree >= 360){self.degree -= 360;}
            self.tick_delay += Math.pow(self.tick_delay / 25, 2);
            self.ticks++;
            // if ($('input[name="sounds"]').val() == "1"){
              self.tick_sound.pause();
              self.tick_sound.currentTime = 0
              self.tick_sound.play();
            // }

            clearInterval(slowing);
            if (self.tick_delay < 2000) {self.slowing_function()}
            else { //IT STOPPED! CONGRATZ
                if(self.jackpot == 1 && self.drawn_reward < 8){
                    var animate_slot = self.drawn_reward - 3;    
                } else {
                    var animate_slot = self.drawn_reward - 4;
                }

                self.status = 2;

                const myElement = self.$refs.roulette;
                const selectedElement = myElement.querySelector(".wheel-rewards-slot:nth-child("+Number(self.target + 1) +") img");

                self.bounce_won(selectedElement);
                // add_to_saved();
                // add_to_item();
            }

        },self.tick_delay);
    },

    bounce_won(element) {
      var old_width = element.width;
      var old_height = element.height;

      let scale = 1;
      let isGrowing = true;
      const maxScale = 2;
      const growthSpeed = 0.1;
      let repetitions = 0;
      const totalRepetitions = 3;

      function animateImage() {
          if (isGrowing) {
              scale += growthSpeed;
          } else {
              scale -= growthSpeed;
          }

          if (scale >= maxScale) {
              isGrowing = false;
          }

          // element.width = old_width * scale;
          // element.height = old_height * scale;
          element.style = "scale: " + scale;

          if (scale <= 1) {
              repetitions++;

              if (repetitions === totalRepetitions) {
                  clearInterval(animation);
              } else {
                  scale = 1;
                  isGrowing = true;
              }
          }
      }

      const animation = setInterval(animateImage, 50);

      Toastify({
        text: "Wheel Reward sent, please relog in game to receive your items",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#2af109",
        stopOnFocus: true
      }).showToast();
    },

    getBalance(){
      let self = this;
      self.$store.dispatch("main/getAccount");
    },

    getCharacterImage(character){
        let image = character.Class == 0 && character.Gender == 0 ? '32000' :
                    character.Class == 0 && character.Gender == 1 ? '32020' :
                    character.Class == 1 && character.Gender == 0 ? '32040' :
                    character.Class == 1 && character.Gender == 1 ? '32060' :
                    character.Class == 2 && character.Gender == 0 ? '32080' :
                    character.Class == 2 && character.Gender == 1 ? '32100' :
                    character.Class == 3 && character.Gender == 0 ? '32120' : '32140';

        return require(`@/assets/items/${image}.png`);
    }
  }
};
</script>

<style scoped>
.wheel {
    position: relative;
    height: 424px;
    width: 424px;
    display: inline-block;
    margin: 0px 10px;
}
.wheel-button-play {
    position: absolute;
    left: 152px;
    top: 154px;
    cursor: var(--nt-cursor-pointer);
    width: 116px;
    height: 116px;
}

.wheel-button-play p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFF;
    font-weight: bold;
    font-size: 17px;
    text-align: center;
    user-select: none;
    line-height: 23px;
    text-shadow: 0 0 2px #000, 0 0 2px #000, 0 0 2px #000, 0 0 2px #000, 0 0 2px #000, 0 0 2px #000, 0 0 2px #000;
}

.wheel-field {
    height: 382px;
    width: 76px;
    position: absolute;
    background-size: 76px 122px;
    background-repeat: no-repeat;
    left: 173px;
    top: 21px;
}

>>> {
  --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: #664cc3;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}

</style>

<style>
.vs__search::placeholder,
.vs__dropdown-toggle,
.vs__dropdown-menu {
  background: #232a3b !important;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.vs__dropdown-toggle {
  height: 40px !important;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.wheel-rewards-slot {
    height: 60px;
    width: 60px;
    display: inline-block;
    position: absolute;
    opacity: 0;
}

.wheel-rewards-slot.opacity1 {
    opacity: 1;
    animation: full_opacity 1s forwards;
}

.wheel-rewards-slot .wheel-rewards-group {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wheel-rewards-slot .wheel-rewards-group > div {
    margin: -8px -9px;
}




</style>
