const state = () => {
  return {
    menu: [
      {
        icon: "",
        pageName: "",
        title: "site_name"
      },
      {
        icon: "DownloadIcon",
        pageName: "Download-Launcher",
        title: "Download Launcher"
      },
      {
        icon: "SlidersIcon",
        pageName: "Rankings",
        title: "LeaderBoards"
      },
      {
        icon: "HelpCircleIcon",
        pageName: "Support",
        title: "Support"
      },
      "devider",
      {
        icon: "",
        pageName: "",
        title: "My Profile"
      },
      {
        icon: "TrelloIcon",
        pageName: "Profile",
        title: "profile"
      },
      {
        icon: "SettingsIcon",
        pageName: "Settings",
        title: "Settings"
      },
      {
        icon: "FileTextIcon",
        pageName: "Logs",
        title: "Logs"
      },
      "devider",
      {
        icon: "",
        pageName: "",
        title: "site_shop"
      },
      {
        icon: "ShoppingBagIcon",
        pageName: "Shop",
        title: "Shop"
      },
      {
        icon: "DollarSignIcon",
        pageName: "Donate",
        title: "Donate"
      },
      {
        icon: "CrosshairIcon",
        pageName: "Roulette",
        title: "Roulette"
      },
    ]
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
