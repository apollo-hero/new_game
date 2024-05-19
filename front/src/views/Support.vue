<template>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="text-white mt-10 lg:mt-0 text-center">
          <div class="text-6xl font-medium">Contact our Support</div>
          <div class="text-lg mt-3">
            Any issues encountered? Create a ticket on our Discord support!
          </div>
          <div class="text-lg mt-3">
            For any game questions, don't forget that we have a wiki available!
          </div>
          <div class="flex justify-center">
            <a
                :href="discordLink"
                target="_blank"
                class="w-64 button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10 bg-theme-1"
            >
                Open Discord Link
            </a>
          </div>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
</template>
  
<script>
import axios from 'axios';


export default {
components: {
},
data() {
    return {
    discordLink: ''
    };
},
mounted(){
  this.discordLink = this.$store.state.main.init.discord;
},  
methods: {
}
};
</script>
