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
          <div class="col-span-12">
            <div class="intro-y box">
              <div
                class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
              >
                <h2 class="font-medium text-base mr-auto">Change Log</h2>
              </div>
              <div id="boxed-accordion" class="p-5">
                <div class="preview text-center">
                  <div class="accordion" v-for="(log, index) in changeLogs" :key="`item-${index}`">
                    <div
                      class="accordion__pane border border-gray-200 dark:border-dark-5 p-4"
                    >
                      <a
                        href="javascript:;"
                        class="accordion__pane__toggle font-medium flex justify-between"
                        @click="toDetail(log.log_id)"
                      >
                        <span>Change Log {{log.log_id}}</span>
                        <span>admin (2024-08-29)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Boxed Accordion -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        thumbup: 2,
        changeLogs: []
    }
  },
  mounted() {
      cash("body")
          .removeClass("login")
          .addClass("app");
      this.getChangeLogs();
  },
  methods: {
    goto() {
      history.back();
    },
    up() {
      
    },
    toDetail(id) {
      this.$router.push("/wiki/" + id);
    },

    getChangeLogs() {
      let self = this;
      axios.get('/game/changeLogs',{
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
      }).then((res)=>{
          if(res.data.message == "success"){
              self.changeLogs = res.data.result.changeLogs;
          } else {
              //self.handleError(res);
          }
      })
      .catch(function(error) {
          self.handleError(error);
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
