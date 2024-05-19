<template>
  <div>
    <MobileMenu />
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <!-- BEGIN: Logo -->
        <router-link
          :to="{ name: 'Dashboard' }"
          tag="a"
          class="flex items-center pl-5 pt-4"
        >
          <img
            alt="Midone Tailwind HTML Admin Template"
            class="w-6"
            src="@/assets/images/logo.png"
            style="width: 250px; height: 100px;"
          />
          <span class="hidden xl:block text-white text-lg ml-3">
            
          </span>
        </router-link>
        <!-- END: Logo -->
        <div class="side-nav__devider my-6"></div>
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menuKey"
              class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menuKey">
              <SideMenuTooltip
                tag="a"
                :content="menu.title"
                href="javascript:;"
                :class="{
                  'active': menu.active,
                  'side-menu--open': menu.activeDropdown,
                  'side-menu' : menu.icon
                }"
                @click.native="linkTo(menu)"
              >
                <div class="side-menu__icon" :style="menu.icon ? 'color:white;' : ''">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title" :style="!menu.icon ? 'margin-left:0px; padding-left:1.25rem; color:#a0aec0; padding-bottom: 10px;' : 'color:white;'">
                  {{ 
                    menu.title == "site_name" ? site_name : 
                    menu.title == "site_shop" ?  site_name + " Shop":
                    menu.title
                  }}
                  <ChevronDownIcon
                    v-if="$h.isset(menu.subMenu)"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  />
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="$h.isset(menu.subMenu) && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <SideMenuTooltip
                      tag="a"
                      :content="subMenu.title"
                      href="javascript:;"
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active }"
                      @click.native="linkTo(subMenu)"
                    >
                      <div class="side-menu__icon">
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <ChevronDownIcon
                          v-if="$h.isset(subMenu.subMenu)"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown
                          }"
                        />
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul
                        v-if="
                          $h.isset(subMenu.subMenu) && subMenu.activeDropdown
                        "
                      >
                        <li
                          v-for="(lastSubMenu,
                          lastSubMenuKey) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="lastSubMenu.title"
                            href="javascript:;"
                            class="side-menu"
                            :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click.native="linkTo(lastSubMenu)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </SideMenuTooltip>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content relative">
        <TopBar />
        <router-view />
        <div class="flex justify-between w-full absolute" style="bottom: 20px;">
          <div class="flex">
            COPYRIGHT @ 2023  
            <a href="" class="ml-1 text-blue-400">{{this.$store.state.main.init.site_name }}</a>
            , All rights Reserved
          </div>
          <div class="md:flex hidden" style="margin-right:50px;">
            ● <a href="/terms_service" class="mx-1">Terms Service</a> 
            ● <a href="/privacy_policy" class="mx-1">Privacy Policy</a> 
            ● <a :href="this.$store.state.main.init.site_link_elitepvpers" class="mx-1">Elitepvpers</a> 
            ● <a :href="this.$store.state.main.init.site_link_cheat" class="mx-1">Cheat-Gam3</a> 
            ● <a :href="this.$store.state.main.init.site_link_inforge" class="mx-1">Inforge</a> 
            ●
          </div>
        </div>
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import TopBar from "@/components/TopBar";
import MobileMenu from "@/components/MobileMenu";
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import SideMenuTooltip from "@/components/SideMenuTooltip";

export default {
  components: {
    DarkModeSwitcher,
    SideMenuTooltip,
    MobileMenu,
    TopBar
  },
  data() {
    return {
      formattedMenu: [],
      site_name: ''
    };
  },
  computed: {
    sideMenu() {
      if(this.$store.state.main.user.Authority == 30000) {
        return this.nestedMenu(this.$store.state.sideMenu.menu);
      } else {
        return this.nestedMenu(this.$store.state.sideMenu.menu.filter(t=>t.title != 'Server-Settings'));
      }
    }
  },
  watch: {
    $route() {
      this.formattedMenu = this.$h.assign(this.sideMenu);
    }
  },
  mounted() {
    cash("body")
      .removeClass("login")
      .addClass("app");
    this.formattedMenu = this.$h.assign(this.sideMenu);
    this.site_name = this.$store.state.main.init.name;
  },
  methods: {
    nestedMenu(menu) {
      menu.forEach((item, key) => {
        if (typeof item !== "string") {
          menu[key].active =
            (item.pageName == this.$route.name ||
              (this.$h.isset(item.subMenu) &&
                this.findActiveMenu(item.subMenu))) &&
            !item.ignore;
        }

        if (this.$h.isset(item.subMenu)) {
          menu[key].activeDropdown = this.findActiveMenu(item.subMenu);
          menu[key] = {
            ...item,
            ...this.nestedMenu(item.subMenu)
          };
        }
      });

      return menu;
    },
    findActiveMenu(subMenu) {
      let match = false;
      subMenu.forEach(item => {
        if (item.pageName == this.$route.name && !item.ignore) {
          match = true;
        } else if (!match && this.$h.isset(item.subMenu)) {
          match = this.findActiveMenu(item.subMenu);
        }
      });
      return match;
    },
    linkTo(menu) {
      if (this.$h.isset(menu.subMenu)) {
        menu.activeDropdown = !menu.activeDropdown;
      } else {
        this.$router.push({
          name: menu.pageName
        });
      }
    },
    enter(el, done) {
      Velocity(
        el,
        "slideDown",
        {
          duration: 300
        },
        {
          complete: done
        }
      );
    },
    leave(el, done) {
      Velocity(
        el,
        "slideUp",
        {
          duration: 300
        },
        {
          complete: done
        }
      );
    },
  }
};
</script>
