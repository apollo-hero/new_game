<template>
    <div class="container-fluid">
      <!-- BEGIN: Terms Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center text-center lg:text-left"
      >
        <div class="text-white mt-10 lg:mt-0 justify-center w-full">
          <div class="flex mt-8 text-center">
            <img
              alt=""
              class="rounded-full"
              :src="require(`@/assets/images/logo.png`)"
              style="width: 100px; height: 100px"
            />
            <a
              href="javascript:;"
              class="text-lg font-medium ml-auto flex items-center px-5"
              @click="goto()"
              style="color: #3f51b5"
            >
              <img
                alt="ZENOS"
                class="rounded-full mr-1"
                :src="require(`@/assets/images/left.png`)"
                style="width: 25px; height: 25px"
              />
              Go To Home
            </a>
          </div>
  
          <div class="intro-y flex items-center mt-8">
            <!-- <h2 class="text-lg font-medium mr-auto">Accordion</h2> -->
          </div>
          <div class="intro-y grid grid-cols-12 gap-6 mt-5">
            <!-- BEGIN: Boxed Accordion -->
            <div class="col-span-3"></div>
            <div class="col-span-6">
              <div class="intro-y box">
                <div
                  class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
                >
                  <h2 class="font-medium text-base mr-auto"><a href="javascript:;" @click="toLogs()">Change Logs </a> / log-{{ id }}</h2>
                </div>
                <div id="boxed-accordion" class="p-5">
                  <div class="preview text-center">
                    <div class="accordion">
                      <div
                        class="accordion__pane active border border-gray-200 dark:border-dark-5 p-4"
                      >
                        <a
                          href="javascript:;"
                          class="accordion__pane__toggle font-medium flex justify-between"
                        >
                          <span>Change Log 1.1</span>
                          <span>admin (2024-08-29)</span>
                        </a>
                        <div
                          class="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed"
                        >
                          <div
                            class="text-white p-5"
                            style="text-align: start"
                            data-hot="36"
                            data-up="28"
                            data-down="0"
                          >
                            <strong class="block w-full text-center">Changelogs 1.4.1</strong><br /><br /><strong>New</strong
                            ><br />
                            <ul>
                              <br />
                              <li>
                                <strong>Attempt to fix lag spikes after teleport.</strong>
                              </li>
                              <li>Added Search feature at chat interface.</li>
                              <li>Improved Personal Shops optimization.</li>
                              <li>
                                Improved Multi-open feature to open up to 500 stack
                                instantly without affecting performance.
                              </li>
                              <li>
                                New items received into Consumables Inventory will not
                                enable anymore with Activate button until you filter them.
                              </li>
                              <li>
                                Bulk insert in personal shop will now work even if only few
                                slots are available, instead of requiring enough space for
                                all items you wanted to insert.
                              </li>
                              <li>
                                Costume binding feature now also works for Hairstyles and
                                Armour costumes.
                              </li>
                              <li>Improved and reworked all Wikipedia guides.</li>
                              <li>Improved wikipedia Tables.</li>
                              <li>Improved wikipedia pages loading time.</li>
                              <li>
                                Scrollbars are now clickable without requiring to move the
                                cursor.
                              </li>
                              <li>Added a scroll to top button at Wikipedia guides.</li>
                              <li>
                                Dragon Aid and Blessing skills are now giving 54% value with
                                178 INT instead of 53.9.
                              </li>
                              <li>
                                Event Calendar will now order events by date instead of
                                randomly.
                              </li>
                              <li>
                                When Metinhunter event is active, the Metin damage limit
                                will also increase by 10%.
                              </li>
                            </ul>
                            <br /><strong>PvM small correction</strong><br />
                            <ul>
                              <br />
                              <li>
                                Those changes are not a nerf, but rather a balance, a
                                Ninja/Shaman should be maximum equal, but never better than
                                Warrior/Sura.
                              </li>
                              <li>
                                Lowered the metin damage limit for shamans. e.g at Beta
                                Metinstones: Warrior max damage is 60k, Shaman max dmg is
                                50k.
                              </li>
                              <li>Increased Bell Defence at Jotun Thrym to 75.</li>
                              <li>Increased Dagger Defence at Jotun Thrym to 75.</li>
                              <li>Increased Bell Defence at Dragon Statue to 80.</li>
                              <li>Increased Dagger Defence at Dragon Statue to 80.</li>
                            </ul>
                            <br /><strong>Adjustments</strong><br />
                            <ul>
                              <br />
                              <li>
                                Polymorph &amp; Inspiration passive skill books can no
                                longer fail with Concentrated Reading.
                              </li>
                              <li>
                                For M1-G you now need 30 successful books for Polymorph
                                &amp; Inspiration passive skills.
                              </li>
                              <li>
                                For G1-P you now need 40 successful books for Polymorph
                                &amp; Inspiration passive skills.
                              </li>
                              <li>
                                Removed Blue Dragon Bean and Stone of the Blacksmith from
                                Razador &amp; Nemere Chest.
                              </li>
                              <li>
                                Added Mighty Researcher Elixir &amp; Mighty Time Spiral at
                                Razador &amp; Nemere Chest.
                              </li>
                              <li>
                                Added Gray Yarn, Blue Yarn &amp; Red Yarn at Razador &amp;
                                Nemere Chest.
                              </li>
                              <li>
                                Increased Bonus Changer at Mystic Realm Chest from 40 to
                                150.
                              </li>
                              <li>
                                Increased Bonus Changer at Spider Baroness Chest from 50 to
                                200.
                              </li>
                              <li>
                                Increased Energy Fragment at Elite Gnoll Chest from 30 to
                                50.
                              </li>
                              <li>
                                You can now use Multi-open on mission book point items.
                              </li>
                              <li>
                                Bonus Changer+ can only be sold in minimum 100 stack now.
                              </li>
                              <li>Slightly increased Dash skill damage.</li>
                              <li>Slightly increased Sword Spin damage.</li>
                              <li>
                                Added a new bonus: Chance for unblockable hit. It is added
                                on Body Warrior and Weapon Sura to help them in PvP.
                              </li>
                              <li>
                                Mission board mini window can now show up to 5 mission books
                                instead of 4.
                              </li>
                              <li>Reworked icons of Energy Crystal.</li>
                            </ul>
                            <br /><strong>Bugfixes</strong><br />
                            <ul>
                              <br />
                              <li>
                                Fixed a Pet scaling bug being affected of hide pets model
                                feature.
                              </li>
                              <li>
                                Fixed a bug at Mission system having few non-existent
                                monsters.
                              </li>
                              <li>Fixed a bug at notification system settings.</li>
                              <li>
                                Fixed a bug at Baljit's Aura first buff being 5h instead of
                                6h.
                              </li>
                              <li>
                                Fixed a bug at Dispel skill not recalculating stats
                                correctly for Enchanted Blade.
                              </li>
                            </ul>
                            <br />
                            <div class="flex justify-end">
                              <button class="button w-32 rounded-full mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white" @click="hot()">
                                  🔥 {{data.hot?.length}} 
                              </button>
  
                              <button class="button w-32 rounded-full mr-2 mb-2 flex items-center justify-center bg-theme-1 text-white" @click="up()">
                                  👍 {{data.thumbUp?.length}} 
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-3"></div>
            <!-- END: Boxed Accordion -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Toastify from "toastify-js";
  import axios from 'axios';
  
  export default {
    props: {
      id: {
        type: String,  // or Number, depending on your use case
        required: true
      },
      detail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
          data: {}
      }
    },
    mounted() {
        cash("body")
            .removeClass("login")
            .addClass("app");
  
        this.data = this.detail;
        console.log(this.detail,'test')
    },
    methods: {
      goto() {
        history.back();
      },
      up() {
        let self = this;
        const user_id = this.$store.state.main.user.Id;
        const id = this.id;
        const check = this.data.thumbUp.filter((t)=>t == user_id);
        if(check.length > 0 && this.$store.state.main.user.Authority != 30000){
          Toastify({
              text: 'You already thumb up!',
              duration: 3000,
              newWindow: true,
              close: false,
              gravity: "bottom",
              position: "center",
              backgroundColor: "#e80404",
              stopOnFocus: true
          }).showToast();
        } else {
          let self = this;
          axios
            .post("/game/thumbUp", {
              log_id: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
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
  
                  self.data = response.data.result.log;
  
                  console.log(self.data,'test')
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
              if(error.response.status == 401) {
                Toastify({
                    text: "You should login first!",
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
  
      hot() {
        const user_id = this.$store.state.main.user.Id;
        const id = this.id;
        const check = this.data.hot.filter((t)=>t == user_id);
        if(check.length > 0 && this.$store.state.main.user.Authority != 30000){
          Toastify({
              text: 'You already Hot!',
              duration: 3000,
              newWindow: true,
              close: false,
              gravity: "bottom",
              position: "center",
              backgroundColor: "#e80404",
              stopOnFocus: true
          }).showToast();
        } else {
          let self = this;
          axios
            .post("/game/hot", {
              log_id: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
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
  
                  self.data = response.data.result.log;
  
                  console.log(self.data,'test')
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
              if(error.response.status == 401) {
                Toastify({
                    text: "You should login first!",
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
  
      toLogs(){
          this.$router.push({
              name: 'wiki'
          });
      }
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style: disc
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .logo-container {
    margin-bottom: 20px;
  }
  
  .logo {
    width: 250px;
    height: 100px;
    border-radius: 50%;
  }
  
  .logo-text {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .content {
    text-align: left;
  }
  
  .page-title {
    font-size: 32px;
    font-weight: bold;
    color: #2990e2;
    margin-bottom: 20px;
  }
  
  .intro-text {
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    color: #2990e2;
    margin-bottom: 10px;
  }
  
  .terms-section {
    margin-bottom: 30px;
  }
  
  p {
    line-height: 1.5;
  }
  </style>
  