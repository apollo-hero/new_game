<template>
  <div>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <img
            alt=""
            class="h-48 lg:h-auto"
            :src="require(`@/assets/images/Register.png`)"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-6xl font-medium">Sorry</div>
          <div class="intro-x text-xl lg:text-3xl font-medium">
            Oops. This site is under maintanence.
          </div>
          <div class="intro-x text-lg my-5">
            You can visit the site soon.
          </div>
                        <a :href='elite' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="epvp">ELITEPVPERS</a>
                        <a :href='ragezone' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="ragezone">RAGEZONE</a>
                       <a :href='info' class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10" id="inforge">INFORGE</a>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script>
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import axios from 'axios';

export default {
  components: {
    DarkModeSwitcher
  },
  data() {
    return {
        elite: "",
        cheat: "",
        info: '',
        discord: '',
        ragezone: ''
    }
  },
  mounted() {
    cash("body")
      .removeClass("app")
      .addClass("login");
    this.getLinks();
  },
  methods: {
    toEpvp() {
        document.location.href = this.elite;
    },
    toRage() {
        document.location.href = this.ragezone;
    },
    toInforge() {
        document.location.href = this.info;
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
            });
    }
  }
};
</script>
