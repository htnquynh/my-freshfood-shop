import Vuex from "vuex";
import user from "./modules/user";
import products from "./modules/products";
import cart from "./modules/cart";
import wishlist from "./modules/wishlist";
import order from "./modules/order";
import group from "./modules/group";

import loading from "./modules/loading";

import createPersistedState from "vuex-persistedstate";

const storeData = {
  modules: {
    user,
    products,
    cart,
    wishlist,
    order,
    group,
    loading
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
};

const store = Vuex.createStore(storeData);
export default store;
