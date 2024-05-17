<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <a href class>Application</a>
      <ChevronRightIcon class="breadcrumb__icon" />
      <a href class="breadcrumb--active">{{$route.name ? $route.name : "Dashboard"}}</a>
    </div>
    <!-- END: Breadcrumb -->
    <!-- User Name -->
    <div class="intro-x relative mr-3 sm:mr-6">
      {{ this.$store.state.main.user.Name }}
    </div>
    <!-- END: User Name -->
    <!-- Coin Amount -->
    <div class="intro-x relative mr-3 sm:mr-6 flex items-center justify-between">
      <img
          alt="coin"
          :src="require(`@/assets/images/coin.png`)"
          class="mr-2"
        />
      {{ this.$store.state.main.user.Coins }}
    </div>
    <!-- END: Coin Amount -->
    <!-- BEGIN: Account Menu -->
    <div class="intro-x dropdown w-8 h-8">
      <div
        class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
      >
        <img
          alt=""
          :src="require(`@/assets/avatars/avatar.png`)"
        />
      </div>
      <div class="dropdown-box w-56">
        <div
          class="dropdown-box__content box bg-theme-38 dark:bg-dark-6 text-white"
        >
          <div class="p-2">
            <a
              href = "/"
              class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
            >
              <UserIcon class="w-4 h-4 mr-2" /> Profile
            </a>
            <a
              href = "/settings"
              class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
            >
              <LockIcon class="w-4 h-4 mr-2" /> Settings
            </a>
          </div>
          <div class="p-2 border-t border-theme-40 dark:border-dark-3">
            <a
              @click="logout()"
              class="flex items-center cursor-pointer block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
            >
              <ToggleRightIcon class="w-4 h-4 mr-2" />
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>

<script>
export default {
  data() {
    return {
      searchDropdown: false
    };
  },
  methods: {
    logout() {
      let self = this;
      self.$store.dispatch('main/logout');
      self.$router.push({ path: "/login" });
    },
    showSearchDropdown() {
      this.searchDropdown = true;
    },
    hideSearchDropdown() {
      this.searchDropdown = false;
    }
  }
};
</script>
