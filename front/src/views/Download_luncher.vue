<template>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="text-white mt-10 lg:mt-0 text-center">
          <div class="text-6xl font-medium">Download the game</div>
          <div class="text-xl lg:text-3xl font-medium">
            (v. 3.20.0)
          </div>
          <div class="text-lg mt-3">
            Download the game to start playing!
          </div>
          <div class="flex justify-center">
            <a
                :href="download_64"
                target="_blank"
                class="button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10 mr-20 bg-theme-1"
            >
                Download x64 version
            </a>
            <a
                :href="download_86"
                target="_blank"
                class="button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10 bg-theme-1"
            >
                Download x86 version
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
    salesReportFilter: "",
    download_64: '',
    download_86: ''
    };
},
mounted(){
  this.getLinks();
},
methods: {
  getLinks(){
    let self = this;
    axios.get('/api/getLinks',{
                headers:{
                    "Content-Type": "application/json",
                    token: localStorage.getItem('token'),
                }
            })
      .then((res)=>{
        self.download_64 = res.data.download_64;
        self.download_86 = res.data.download_86;
      })
  }
}
};
</script>
