<template>
    <div>
        <div class="flex flex-col sm:flex-row items-center mt-8">
            <div
                class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start"
            >
                <a
                    data-toggle="tab"
                    data-target="#level"
                    href="javascript:;"
                    class="py-4 sm:mr-8 active"
                    @click="showLevel()"
                    >Level</a
                >
                <a
                    data-toggle="tab"
                    data-target="#hero_level"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    @click="showHero()"
                    >Hero Level</a
                >
                <a
                    data-toggle="tab"
                    data-target="#reputation"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    @click="showReput()"
                    >Reputation</a
                >
                <a
                    data-toggle="tab"
                    data-target="#act"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    @click="showAct()"
                    >Act4</a
                >
                <a
                    data-toggle="tab"
                    data-target="#monster"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    @click="showMonster()"
                    >Monster</a
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
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">RANK</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">CLASS</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">NAME</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">LEVEL</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                <td class="border-b dark:border-dark-5">
                                    <div class="flex lg:justify-center">
                                        <div class="intro-x w-10 h-10 image-fit">
                                            <img 
                                                alt="" 
                                                class="rounded-full" 
                                                :src="getCharacterImage(item)"
                                            >
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.Name}}</td>
                                <td class="border-b dark:border-dark-5">{{  item.Level }}</td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="4" class="border-b dark:border-dark-5">Loading the Ranking Table!</td>
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
                    <!-- END: Pagination -->
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
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">RANK</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">CLASS</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">NAME</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">HEROLEVEL</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                <td class="border-b dark:border-dark-5">
                                    <div class="flex lg:justify-center">
                                        <div class="intro-x w-10 h-10 image-fit">
                                            <img 
                                                alt="" 
                                                class="rounded-full" 
                                                :src="
                                                    item.Class == 0 && item.Gender == 0 ? `${require('@/assets/items/32000.png')}` :
                                                    item.Class == 0 && item.Gender == 1 ? `${require('@/assets/items/32020.png')}` :
                                                    item.Class == 1 && item.Gender == 0 ? `${require('@/assets/items/32040.png')}` :
                                                    item.Class == 1 && item.Gender == 1 ? `${require('@/assets/items/32060.png')}` :
                                                    item.Class == 2 && item.Gender == 0 ? `${require('@/assets/items/32080.png')}` :
                                                    item.Class == 2 && item.Gender == 1 ? `${require('@/assets/items/32100.png')}` :
                                                    item.Class == 3 && item.Gender == 0 ? `${require('@/assets/items/32120.png')}` : `${require('@/assets/items/32140.png')}`
                                                "
                                            >
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.Name}}</td>
                                <td class="border-b dark:border-dark-5">{{  item.HeroLevel }}</td>
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
                    <!-- END: Pagination -->
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
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">RANK</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">CLASS</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">NAME</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">REPUTATION</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                <td class="border-b dark:border-dark-5">
                                    <div class="flex lg:justify-center">
                                        <div class="intro-x w-10 h-10 image-fit">
                                            <img 
                                                alt="" 
                                                class="rounded-full" 
                                                :src="
                                                    item.Class == 0 && item.Gender == 0 ? `${require('@/assets/items/32000.png')}` :
                                                    item.Class == 0 && item.Gender == 1 ? `${require('@/assets/items/32020.png')}` :
                                                    item.Class == 1 && item.Gender == 0 ? `${require('@/assets/items/32040.png')}` :
                                                    item.Class == 1 && item.Gender == 1 ? `${require('@/assets/items/32060.png')}` :
                                                    item.Class == 2 && item.Gender == 0 ? `${require('@/assets/items/32080.png')}` :
                                                    item.Class == 2 && item.Gender == 1 ? `${require('@/assets/items/32100.png')}` :
                                                    item.Class == 3 && item.Gender == 0 ? `${require('@/assets/items/32120.png')}` : `${require('@/assets/items/32140.png')}`
                                                "
                                            >
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.Name}}</td>
                                <td class="border-b dark:border-dark-5">{{  item.Reput }}</td>
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
                    <!-- END: Pagination -->
                </div>
            </div>
            <!-- act4 table -->
            <div
                id="act"
                class="box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">RANK</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">CLASS</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">NAME</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/4 text-center whitespace-no-wrap">ACT4KILL</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                <td class="border-b dark:border-dark-5">
                                    <div class="flex lg:justify-center">
                                        <div class="intro-x w-10 h-10 image-fit">
                                            <img 
                                                alt="" 
                                                class="rounded-full" 
                                                :src="
                                                    item.Class == 0 && item.Gender == 0 ? `${require('@/assets/items/32000.png')}` :
                                                    item.Class == 0 && item.Gender == 1 ? `${require('@/assets/items/32020.png')}` :
                                                    item.Class == 1 && item.Gender == 0 ? `${require('@/assets/items/32040.png')}` :
                                                    item.Class == 1 && item.Gender == 1 ? `${require('@/assets/items/32060.png')}` :
                                                    item.Class == 2 && item.Gender == 0 ? `${require('@/assets/items/32080.png')}` :
                                                    item.Class == 2 && item.Gender == 1 ? `${require('@/assets/items/32100.png')}` :
                                                    item.Class == 3 && item.Gender == 0 ? `${require('@/assets/items/32120.png')}` : `${require('@/assets/items/32140.png')}`
                                                "
                                            >
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.Name}}</td>
                                <td class="border-b dark:border-dark-5">{{  item.Act4Kill }}</td>
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
                    <!-- END: Pagination -->
                </div>
            </div>

            <!-- Monster Table -->
            <!-- <div
                id="monster"
                class="box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">RANK</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">CLASS</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">NAME</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">LEVEL</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">HERO LEVEL</th>
                                <th class="border-b-2 dark:border-dark-5 w-1/6 text-center whitespace-no-wrap">MONSTERS KILLED</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr 
                                class="bg-gray-200 dark:bg-dark-1"
                                v-for="(item, index) in paginatedData"
                                :key="`item-${index}`"
                            >
                                <td class="border-b dark:border-dark-5">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                <td class="border-b dark:border-dark-5">
                                    <div class="flex lg:justify-center">
                                        <div class="intro-x w-10 h-10 image-fit">
                                            <img 
                                                alt="" 
                                                class="rounded-full" 
                                                :src="
                                                    item.Class == 0 && item.Gender == 0 ? `${require('@/assets/items/32000.png')}` :
                                                    item.Class == 0 && item.Gender == 1 ? `${require('@/assets/items/32020.png')}` :
                                                    item.Class == 1 && item.Gender == 0 ? `${require('@/assets/items/32040.png')}` :
                                                    item.Class == 1 && item.Gender == 1 ? `${require('@/assets/items/32060.png')}` :
                                                    item.Class == 2 && item.Gender == 0 ? `${require('@/assets/items/32080.png')}` :
                                                    item.Class == 2 && item.Gender == 1 ? `${require('@/assets/items/32100.png')}` :
                                                    item.Class == 3 && item.Gender == 0 ? `${require('@/assets/items/32120.png')}` : `${require('@/assets/items/32140.png')}`
                                                "
                                            >
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b dark:border-dark-5">{{item.Name}}</td>
                                <td class="border-b dark:border-dark-5">{{item.Level}}</td>
                                <td class="border-b dark:border-dark-5">{{item.HeroLevel}}</td>
                                <td class="border-b dark:border-dark-5">{{  JSON.parse(item.LifetimeStats).TotalMonstersKilled }}</td>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-dark-1" v-if="paginatedData.length == 0">
                                <td colspan="4" class="border-b dark:border-dark-5">There is no matched data!</td>
                            </tr>
                        </tbody>
                    </table> -->
                    <!-- BEGIN: Pagination -->
                    <!-- <div
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
                    </div> -->
                    <!-- END: Pagination -->
                <!-- </div>
            </div> -->
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
            table: [],
            table_hero: [],
            table_reputation: [],
            table_act: [],
            table_monster: [],
            data: [],
            currentPage: 1,
            perPage: 20,
            totalPages: 0,
            pages: [],
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
        //this.table = this.$store.state.main.rank; 
        //this.table_hero = this.$store.state.main.hero_rank;  
        //this.table_reputation = this.$store.state.main.reput_rank;
        //this.data = this.table;
        //this.totalPages = Math.ceil(this.data.length / this.perPage);
        //this.generatePages();
        this.getRank();
        // this.getInitRank();
    },
    methods: {
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
        showLevel(){
            this.data = this.table;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showHero(){
            this.data = this.table_hero;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showReput(){
            this.data = this.table_reputation;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showAct(){
            this.data = this.table_act;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        showMonster(){
            this.data = this.table_monster;
            this.totalPages = Math.ceil(this.data.length / this.perPage);
            this.currentPage = 1;
            this.generatePages();
        },
        getRank(){
            let self = this;
            axios.get(
                "/account/leaderboards",{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then((res)=>{
                if(res.data.message == "success"){
                    self.table = res.data.result.level_data;
                    self.table_hero = res.data.result.hero_data;
                    self.table_reputation = res.data.result.reput_data;
                    self.data = res.data.result.level_data;
                    self.table_act = res.data.result.act_data;
                    // const filteredCharacters = res.data.result.level_data.filter((character) => JSON.parse(character.LifetimeStats) && JSON.parse(character.LifetimeStats).TotalMonstersKilled);
                    // let sortedCharacters = filteredCharacters.sort((a, b) => JSON.parse(b.LifetimeStats).TotalMonstersKilled - JSON.parse(a.LifetimeStats).TotalMonstersKilled);
                    // self.table_monster = sortedCharacters;
                } else {
                    clearInterval(spinning);
                    self.handleError(res);
                }
                
            })
            .catch(function(error) {
                self.handleError(error);
            });
            
        },

        handleError(res){
            if((res.data?.status == 'error' && res.data?.message == 'Token expired') || res.response?.status == 401){
                this.$store.dispatch('main/logout').then((res)=>{
                    this.$router.push({ path: "/" });
                })
            }
        },

        getCharacterImage(character){
            let image = character.Class == 0 && character.Gender == 0 ? '32000' :
                        character.Class == 0 && character.Gender == 1 ? '32020' :
                        character.Class == 1 && character.Gender == 0 ? '32040' :
                        character.Class == 1 && character.Gender == 1 ? '32060' :
                        character.Class == 2 && character.Gender == 0 ? '32080' :
                        character.Class == 2 && character.Gender == 1 ? '32100' :
                        character.Class == 3 && character.Gender == 0 ? '32120' : '32140';

            return require(`@/assets/items/${image}.png`);
        }

     },
    watch: {
        currentPage() {
            this.generatePages();
        },
        perPage() {
            this.showData();
        },
        table() {
            this.showLevel();
            this.generatePages();
        }
    }
};
</script>
<style>
.tabulator-col-title {
  text-align: center;
}
.link-active {
    background-color: #293145;
}
</style>
