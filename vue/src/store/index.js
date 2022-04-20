import { createStore } from "vuex";
import axiosClient from "@/axios/axios";
const store = createStore({
  state() {
    return {
      user: {
        data: {},
        token: sessionStorage.getItem("TOKEN") || null,
      },
    };
  },
  getters: {},
  mutations: {
    logout(state) {
      state.user.data = {};
      state.user.token = null;
    },
    setUser(state, userData) {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  actions: {
    async login({ commit }, user) {
      const response = await fetch("http://localhost:8000/api/login", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      commit("setUser", data);

      return data;
    },

    login({ commit }, user) {
      axiosClient
        .post("/login", user)
        .then(({ data }) => {
          commit("setUser", data);
          return data;
        })
        .catch((err) => console.log("err", err));
    },
  },
  modules: {},
});

export default store;
