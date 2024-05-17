<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div v-if="shop_status == 'WORKING'" class="col-span-12 lg:col-span-3 xxl:col-span-2">
      <!-- BEGIN: File Manager Menu -->
      <div class="box p-5 mt-6">
        <div class="mt-1" ref="special">
          Search
        </div>
        <div class="border-t border-gray-200 dark:border-dark-5 mt-5 pt-5">
          <input
            v-model="search_text"
            type="text"
            class="input w-full border mt-2"
            placeholder="item name"
          />
        </div>
        <div class="mt-6 pt-5 border-t border-gray-200 dark:border-dark-5">
          Categories
        </div>
        <div class="border-t border-gray-200 dark:border-dark-5 mt-5 pt-5">
          <div v-for="(c) in categories" v-bind:key="c.categoriesid">
            <input
              v-model="category"
              :id="c.categoriesid"
              type="checkbox"
              class="input border mr-2"
              :value="c.categoriesid"
            />
            <label
              class="cursor-pointer select-none"
              for="vertical-remember-me"
              >{{ c.name }}</label
            >
          </div>
        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div v-if="shop_status == 'WORKING'" class="col-span-12 lg:col-span-9 xxl:col-span-10 mb-5 pb-12">
      <!-- BEGIN: Directory & Files -->
      <div class="grid grid-cols-12 gap-3 sm:gap-6 mt-5">
        <div
          v-for="(item, index) in paginatedData"
          :key="`item-${index}`"
          class="col-span-6 sm:col-span-4 md:col-span-3 xxl:col-span-2"
        >
          <div
            class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
          >
            <a
              href="javascript:;"
              class="w-3/5 file__icon--image mx-auto"
              data-toggle="modal"
              data-target="#buy_modal"
              @click="handleItem(item)"
            >
              <div class="">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  :src="require(`@/assets/items/${item.image}.png`)"
                  style="width:36px; height:36px; margin:auto;"
                />
              </div>
            </a>
            
            <div class="text-gray-600 text-xs text-center justify-center mt-5 flex">
              {{ item.price }}
              <img
                  alt="coin"
                  :src="require(`@/assets/images/coin.png`)"
                  class="ml-2"
                  style="width:20px;"
                />
            </div>
            <a
              href="javascript:;"
              class="block font-medium mt-4 text-center truncate border-t border-gray-200 dark:border-dark-5 pt-3"
              >{{ item.name }}</a
            >
          </div>
        </div>
      </div>
      <!-- END: Directory & Files -->
      <!-- BEGIN: Pagination -->
      <div
        class="flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
      >
        <div class="">
          Showing {{ (currentPage - 1) * perPage + 1 }} to
          {{
            currentPage * perPage > filteredData.length
              ? filteredData.length
              : currentPage * perPage
          }}
          of {{ filteredData.length }} items
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
              <a class="pagination__link" href="#" @click.prevent="prevPage"
                >Previous</a
              >
            </li>
            <li class="page-item" v-for="page in pages" :key="page">
              <a
                class="pagination__link"
                :class="{ 'pagination__link--active': currentPage === page }"
                href="#"
                @click.prevent="setPage(page)"
                >{{ page }}</a
              >
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage >= totalPages }"
            >
              <a class="pagination__link" href="#" @click.prevent="nextPage"
                >Next</a
              >
            </li>
          </ul>
        </nav>
        <!-- <select class="w-20 input box mt-3 sm:mt-0">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select> -->
      </div>
      <!-- END: Pagination -->
    </div>
    <div v-else class="col-span-12 lg:col-span-9 xxl:col-span-10 mt-10">The shop is currently in maintenance mode.</div>

    <!-- Buy Modal -->
    <div class="modal" id="buy_modal">
      <div class="modal__content">
        <div
          class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5"
        >
          <h2 class="font-medium text-base mr-auto">
            {{ item.name }}
          </h2>
        </div>
        <div class="p-5 grid grid-cols-12 gap-4 row-gap-3">
          <div class="flex col-span-12 items-center">
            <img
              v-if="item.name"
              :src="require(`@/assets/items/${item.image}.png`)"
              style="width:36px; height:36px;"
              class="flex items-center left"
            />
            <div class="items-center ml-3 mt-5">
              {{ item.description }}
              <div class="col-span-12 sm:col-span-12 flex">
                <label></label>
                <span>{{ item.price * quantity }}</span>
                <img
                  alt="coin"
                  :src="require(`@/assets/images/coin.png`)"
                  class="ml-2"
                  style="width:20px;"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5 grid grid-cols-12 gap-4 row-gap-3"
        >
          <div class="col-span-12 sm:col-span-6">
            <select v-model="character" class="input w-full border mt-2 flex-1">
              <option>select character</option>
              <option
                v-for="(t, index) in characters"
                :key="index"
                :value="t.Id"
                >{{ t.Name }}</option
              >
            </select>
          </div>
          <div class="col-span-12 sm:col-span-3">
            <input
              v-model="quantity"
              type="number"
              class="input w-full border mt-2 flex-1"
              placeholder=""
            />
          </div>

          <div class="col-span-12 sm:col-span-3">
            <button
              @click="buy()"
              type="button"
              class="button w-20 bg-theme-1 text-white mt-2 inline-flex items-center"
            >
              BUY
              <LoadingIcon
                v-if="loading"
                icon="oval"
                color="white"
                class="w-4 h-4 ml-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImageZoom from "./ImageZoom.vue";
import Toastify from "toastify-js";
import { setFips } from "crypto";

export default {
  components: { ImageZoom },
  data() {
    return {
      search_text: "",
      categories: [],
      category: [],
      data: [],
      shopItems: [],
      item: {},
      characters: [],
      quantity: 1,
      character: null,
      loading: false,

      currentPage: 1,
      perPage: 24,
      totalPages: 0,
      pages: [],
      shop_status: "WORKING"
    };
  },
  computed: {
    filteredData() {
      if (this.search_text && this.category.length == 0) {
        return this.data.filter(
          (item) =>
            item.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !==
            -1
        );
      } else if (!this.search_text && this.category.length > 0) {
        return this.data.filter((item) => this.category.includes(item.categoriesid));
      } else if (this.search_text && this.category) {
        return this.data.filter(
          (item) =>
          this.category.includes(item.categoriesid) &&
            item.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !==
              -1
        );
      } else {
        return this.data;
      }
    },
    paginatedData() {
      const from = (this.currentPage - 1) * this.perPage;
      const to = this.currentPage * this.perPage;
      return this.filteredData.slice(from, to);
    },
  },
  mounted() {
    this.getCategories();
    // this.getShopItems();
    this.getCharacters();
    this.getShopItems();
    this.getBalance();
  },
  methods: {
    getCategories() {
      let self = this;
      axios
        .get("/api/getCategories", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == "error"){
            self.handleError(res);
          } else {
            self.categories = res.data.categories;
            self.shop_status = res.data.shop_status;
          }
        });
    },

    getShopItems(page) {
      let self = this;
      axios
        .get("/api/getShopItems", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == "success"){
            self.data = res.data.shopItems;
            self.totalPages = Math.ceil(this.filteredData.length / this.perPage);
            self.generatePages();
          } else {
            self.handleError(res);
          }
        });
    },

    handleItem(item) {
      let self = this;

      self.item = item;
    },

    getCharacters() {
      let self = this;
      axios
        .get("/api/getCharacters", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == "success"){
            self.characters = res.data.characters;
          } else {
            self.handleError(res);
          }
          
        });
    },

    buy() {
      let self = this;
      if (!self.character) {
        Toastify({
          text: "please select the character!",
          duration: 3000,
          newWindow: true,
          close: false,
          gravity: "bottom",
          position: "center",
          backgroundColor: "#e80404",
          stopOnFocus: true,
        }).showToast();
        return;
      }

      if (self.item.price * self.quantity > self.$store.state.main.user.Coins) {
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
        return;
      }

      if (self.quantity < 1) {
        Toastify({
          text: "The quantity should be greater than 1!",
          duration: 3000,
          newWindow: true,
          close: false,
          gravity: "bottom",
          position: "center",
          backgroundColor: "#e80404",
          stopOnFocus: true,
        }).showToast();
        return;
      }

      self.loading = true;

      axios.post(
        "/api/buyItem",
        {
          pro_id: self.item.productid,
          quantity: self.quantity,
          character: self.character,
          total_price: self.item.price * self.quantity,
          vnum: self.item.vnum
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      ).then((res)=>{
        self.loading = false;
        // document.getElementById("buy_modal").;
        if(res.data.status == "success!"){
          Toastify({
            text: res.data.message,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "bottom",
            position: "center",
            backgroundColor: "#2af109",
            stopOnFocus: true
          }).showToast();
          this.$store.dispatch("main/setUser", res.data.user);
          this.$store.dispatch("main/setShop", res.data.shop_log);
        } else {
          Toastify({
            text: res.data.message,
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
    },

    filterData() {
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.filteredData.length / this.perPage);
      this.generatePages();
    },
    showData() {
      this.totalPages = Math.ceil(this.filteredData.length / this.perPage);
      this.generatePages();
    },
    setPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    generatePages() {
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    },
    searchCategory(id) {
      console.log(id);
      this.category = id;
    },
    handleError(res){
      if(res.data.status == 'error' && res.data.message == 'Token expired'){
          this.$store.dispatch('main/logout').then((res)=>{
              this.$router.push({ path: "/" });
          })
      }
    },
    getBalance(){
            let self = this;
          //  var spinning = setInterval(function(){
                axios.get('/api/getUser',{
                    headers:{
                        "Content-Type": "application/json",
                        token: localStorage.getItem('token'),
                    }
                }).then((res)=>{
                    if(res.data.status == "error"){
                        clearInterval(spinning);
                        self.handleError(res);
                    } else {
                        self.$store.dispatch("main/setUser", res.data.user);
                    }
                })
           // },15000);  // 5s
        }
  },
  watch: {
    filteredData() {
      this.showData();
      if (this.currentPage > this.totalPages) {
        this.currentPage = 1;
      }
    },
    currentPage() {
      this.generatePages();
    },
    perPage() {
      this.showData();
    },
  },
};
</script>
