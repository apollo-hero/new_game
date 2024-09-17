<template>
  <div>
    <component :is="currentComponent" :id="id" :detail="logDetail" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentComponent: null,
      id: this.$route.params.id,
      logDetail: {}
    };
  },
  created() {
    this.loadComponent();
  },
  watch: {
    '$route.params.id': 'loadComponent'
  },
  methods: {
    async loadComponent() {
      const id = this.$route.params.id;
      
      await this.getLogDetail(id);

      try {
        // Dynamically import the component based on the id
        const component = await import(`../views/changelogs/log-${id}.vue`);
        this.currentComponent = component.default || component;
      } catch (error) {
        console.error('Failed to load component:', error);
        // Fallback to a default component or error component
        this.currentComponent = () => import('../views/Wiki.vue');
      }
    },

    async getLogDetail(id) {
      let self = this;
      return axios
        .get("/game/getLogDetail/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if(res.data.message == "success"){
            self.logDetail = res.data.result.log;
          } else {
            self.handleError(res);
          }

          return true;
        })
        .catch(function(error) {
           self.handleError(error);
        });
    },
  }
};
</script>
