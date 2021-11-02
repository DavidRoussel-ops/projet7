import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL : 'http://localhost:3000/users',
})

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId : -1,
    token : '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (err) {
    user = {
      userId : -1,
      token : '',
    };
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status : '',
    user : user,
    mail : '',
    lname : '',
    fname : '',
  },
  mutations: {
    setStatus : function (state, status) {
      state.status = status;
    },
    logUser : function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.user = userInfos;
    },
    /*userLocal : function () {
        localStorage.getItem(user)
    },*/
    logout : function (state) {
      state.user = {
        userId : '',
        token : '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login : ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/login', userInfos)
            .then(function (response) {
              commit('setStatus', '');
              commit('logUser', response.data);
              resolve(response);
            })
            .catch(function (erreur) {
              commit('setStatus', 'error_login');
              reject(erreur);
            });
      });
    },
    createAccount : ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading');
        instance.post('/create', userInfos)
            .then(function (response) {
              commit('setStatus', 'created');
              resolve(response);
            })
            .catch(function (erreur) {
              commit('setStatus', 'error_create');
              reject(erreur);
            });
      });
    },
    showUserById: ({ commit }) => {
      instance.get('/', {
        headers : {
          Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJpYXQiOjE2MzU1ODY3MTksImV4cCI6MTYzNTY3MzExOX0.iS-wUUcXZYyMImxnenECKodrIqGhek_NchMd9YRc67I'
        }
      })
          .then(function (response) {
            let user = JSON.parse(response.data);
            this.state.mail = user[0].mail;
            this.state.lname = user[0].lname;
            this.state.fname = user[0].fname
            commit('mail', 'lname', 'fname', user)
          })
                .catch(function (erreur) {
                  console.log(erreur);
                })
    }
  },
  modules: {
  }
})
