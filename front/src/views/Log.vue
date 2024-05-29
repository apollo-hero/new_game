<template>
    <div>
        <div class="flex flex-col sm:flex-row items-center mt-8">
            <div
                class="nav-tabs flex sm:flex-row justify-center lg:justify-start"
            >
                <a
                    data-toggle="tab"
                    data-target="#level"
                    href="javascript:;"
                    class="py-4 mr-8 active"
                    @click="showShop"
                    >Shop</a
                >
                <a
                    data-toggle="tab"
                    data-target="#hero_level"
                    href="javascript:;"
                    class="py-4 mr-8"
                    @click="showWheel"
                    >Roulette</a
                >
                <a
                    data-toggle="tab"
                    data-target="#reputation"
                    href="javascript:;"
                    class="py-4 mr-8"
                    @click="showDonation"
                    >Donate</a
                >

                <a
                    data-toggle="tab"
                    data-target="#active"
                    href="javascript:;"
                    class="py-4 mr-8"
                    @click="showActive"
                    >Active</a
                >
            </div>
        </div>
        <!-- BEGIN: HTML Table Data -->
        <div class="tab-content mt-5">
            <div
                id="level"
                class="box p-5 mt-5 tab-content__pane active"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Date</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Time</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">User</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Description</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ new Date(item.date).toLocaleDateString() }}</td>
                                <td class="border-b dark:border-dark-5">
                                    {{  getTime(item) }}
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.account.Name}}</td>
                                <td class="border-b dark:border-dark-5 flex justify-center items-center" v-if="item.description">
                                    <!-- {{ item.description }} -->
                                    {{ item.description.split("-")[0] }}
                                    <img
                                        alt="item"
                                        v-if="item.description.split('-')[1]"
                                        :src="require(`@/assets/items/` + item.description.split('-')[1] + `.png`)"
                                        style="width:36px; height:36px; margin:auto;"
                                    />
                                </td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="4" class="border-b dark:border-dark-5">There is no matched data!</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- BEGIN: Pagination -->
                    <div
                        v-if="paginatedData.length != 0"
                        class="flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
                    >
                        <div class="">
                        Showing {{ (currentPage - 1) * perPage + 1 }} to
                        {{
                            currentPage * perPage > data.length
                            ? data.length
                            : currentPage * perPage
                        }}
                        of {{ data.length }} items
                        </div>
                        <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage == 1 }">
                            <a class="pagination__link" href="#" @click.prevent="firstPage"
                                ><ChevronsLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="pagination__link" href="#" @click.prevent="prevPage"
                                ><ChevronLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" v-for="page in pages" :key="page">
                            <a
                                class="pagination__link"
                                :class="{ 'link-active': currentPage === page }"
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
                                ><ChevronRightIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li
                            class="page-item"
                            :class="{ disabled: currentPage == totalPages }"
                            >
                            <a class="pagination__link" href="#" @click.prevent="lastPage"
                                ><ChevronsRightIcon class="w-4 h-4" /></a
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
                </div>
            </div>
            <div
                id="hero_level"
                class="box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Date</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Time</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">User</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Description</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ new Date(item.date).toLocaleDateString() }}</td>
                                <td class="border-b dark:border-dark-5">
                                    {{ getTime(item) }}
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.account.Name}}</td>
                                <td class="border-b dark:border-dark-5 flex justify-center items-center" v-if="item.description">
                                    <!-- {{  item.description }} -->
                                    {{ item.description.split("-")[0] }}
                                    <img
                                        alt="item"
                                        v-if="item.description.split('-')[1]"
                                        :src="require(`@/assets/items/` + item.description.split('-')[1] + `.png`)"
                                        style="width:36px; height:36px; margin:auto;"
                                    />
                                </td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="4" class="border-b dark:border-dark-5">There is no matched data!</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- BEGIN: Pagination -->
                    <div
                        v-if="paginatedData.length != 0"
                        class="flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
                    >
                        <div class="">
                        Showing {{ (currentPage - 1) * perPage + 1 }} to
                        {{
                            currentPage * perPage > data.length
                            ? data.length
                            : currentPage * perPage
                        }}
                        of {{ data.length }} items
                        </div>
                        <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage == 1 }">
                            <a class="pagination__link" href="#" @click.prevent="firstPage"
                                ><ChevronsLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="pagination__link" href="#" @click.prevent="prevPage"
                                ><ChevronLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" v-for="page in pages" :key="page">
                            <a
                                class="pagination__link"
                                :class="{ 'link-active': currentPage === page }"
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
                                ><ChevronRightIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li
                            class="page-item"
                            :class="{ disabled: currentPage == totalPages }"
                            >
                            <a class="pagination__link" href="#" @click.prevent="lastPage"
                                ><ChevronsRightIcon class="w-4 h-4" /></a
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
                </div>
            </div>
            
            <div
                id="reputation"
                class="box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Date</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Time</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Amount</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ new Date(item.date).toLocaleDateString() }}</td>
                                <td class="border-b dark:border-dark-5">{{ getTime(item) }}</td>
                                <td class="border-b dark:border-dark-5">{{ item.Amount }}</td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="3" class="border-b dark:border-dark-5">There is no matched data!</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- BEGIN: Pagination -->
                    <div
                        v-if="paginatedData.length != 0"
                        class="flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
                    >
                        <div class="">
                        Showing {{ (currentPage - 1) * perPage + 1 }} to
                        {{
                            currentPage * perPage > data.length
                            ? data.length
                            : currentPage * perPage
                        }}
                        of {{ data.length }} items
                        </div>
                        <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage == 1 }">
                            <a class="pagination__link" href="#" @click.prevent="firstPage"
                                ><ChevronsLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="pagination__link" href="#" @click.prevent="prevPage"
                                ><ChevronLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" v-for="page in pages" :key="page">
                            <a
                                class="pagination__link"
                                :class="{ 'link-active': currentPage === page }"
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
                                ><ChevronRightIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li
                            class="page-item"
                            :class="{ disabled: currentPage == totalPages }"
                            >
                            <a class="pagination__link" href="#" @click.prevent="lastPage"
                                ><ChevronsRightIcon class="w-4 h-4" /></a
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
                </div>
            </div>

            <div
                id="active"
                class="box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Date</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Time</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">Action</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ new Date(item.date).toLocaleDateString() }}</td>
                                <td class="border-b dark:border-dark-5">{{ getTime(item)}}</td>
                                <td class="border-b dark:border-dark-5">{{  item.action }}</td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="3" class="border-b dark:border-dark-5">There is no matched data!</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- BEGIN: Pagination -->
                    <div
                        v-if="paginatedData.length != 0"
                        class="flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
                    >
                        <div class="">
                        Showing {{ (currentPage - 1) * perPage + 1 }} to
                        {{
                            currentPage * perPage > data.length
                            ? data.length
                            : currentPage * perPage
                        }}
                        of {{ data.length }} items
                        </div>
                        <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage == 1 }">
                            <a class="pagination__link" href="#" @click.prevent="firstPage"
                                ><ChevronsLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="pagination__link" href="#" @click.prevent="prevPage"
                                ><ChevronLeftIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li class="page-item" v-for="page in pages" :key="page">
                            <a
                                class="pagination__link"
                                :class="{ 'link-active': currentPage === page }"
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
                                ><ChevronRightIcon class="w-4 h-4" /></a
                            >
                            </li>
                            <li
                            class="page-item"
                            :class="{ disabled: currentPage == totalPages }"
                            >
                            <a class="pagination__link" href="#" @click.prevent="lastPage"
                                ><ChevronsRightIcon class="w-4 h-4" /></a
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
                </div>
            </div>
        </div>

        <!-- END: HTML Table Data -->
    </div>
</template>

<script>
import xlsx from "xlsx";
import feather from "feather-icons";
import Tabulator from "tabulator-tables";
import axios from "axios";

export default {
    data() {
        return {
            shop: [],
            wheel: [],
            donation: [],
            data: [],
            currentPage: 1,
            perPage: 20,
            totalPages: 0,
            pages: [],
            active:[]
        };
    },
    computed: {
        paginatedData() {
            const from = (this.currentPage - 1) * this.perPage;
            const to = this.currentPage * this.perPage;
            return this.data.slice(from, to);
        },
    },
    mounted() {
        //this.shop = this.$store.state.main.shop_log;
        //this.wheel = this.$store.state.main.wheel_log;
        //this.donation = this.$store.state.main.donation_log;
        this.data = this.shop;
        this.totalPages = Math.ceil(this.data.length / this.perPage);
        this.generatePages();
        this.getDonation();
    },
    methods: {
        getTime(item) {
            const date = new Date(item.date);
            const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });
            const formattedTime = formatter.format(date);
            return formattedTime;
        },
        getDate(item) {
            if (!item){
                return "";
            }
            var year = item.substr(0,4);
            var month = item.substr(4,5);
            var temp = month.substr(0,2);
            var date = item.substr(6,7);
            return year + "-" + temp + "-" + date;
        },
        generatePages() {
            this.pages = [];

            for (let i = this.currentPage-2; i <= this.currentPage+2; i++) {
                if(i < 1 || i > this.totalPages){
                continue;
                }
                this.pages.push(i);
            }
        },
        showData() {
            this.totalPages = Math.ceil(this.filteredData.length / this.perPage);
            this.generatePages();
        },
        setPage(page) {
            this.currentPage = page;
        },
        firstPage(){
            if (this.currentPage > 1) {
                this.currentPage = 1;
            }
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
        lastPage(){
            if (this.currentPage < this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
        showShop(){
            this.data = this.shop;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showWheel(){
            this.data = this.wheel;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showDonation(){
            this.data = this.donation;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showActive(){
            this.data = this.active;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        getDonation(){
            let self = this;
            axios.get('/game/getLogs',{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then((res)=>{
                if(res.data.message == "success"){
                    self.donation = res.data.result.donate_log.map(t=>({...t, date: t.Date}));
                    self.shop = res.data.result.shop_log;
                    self.wheel = res.data.result.wheel_log;
                    self.active = res.data.result.active_log;
                } else {
                    //self.handleError(res);
                }
            })
        }
    },
    watch: {
        currentPage() {
            this.generatePages();
        },
        perPage() {
            this.showData();
        },
        shop(){
            this.showShop();
            this.generatePages();
        }
    }
};
</script>

<style scoped>
.link-active {
    background-color: #293145;
}
</style>

