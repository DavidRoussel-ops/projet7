<template>
  <div class="conteneur-nav">
    <i class="fas fa-users" @click="forum"></i>
    <i class="fas fa-address-card" v-if="userGet.admin === 0" @click="profil"></i>
    <i class="fas fa-power-off" @click="logout"></i>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userGet: {
        admin: '',
      }
    }
  },
  methods: {
    //Fonction router
    forum: function () {
      this.$router.push('/groupomania')
    },
    profil: function () {
      this.$router.push('/profil')
    },
    logout: function () {
      localStorage.clear();
      this.$router.push('/')
    },
  },
  mounted() {
    axios.get('http://localhost:3000/users/', {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
          let userData = JSON.parse(response.data);
          this.userGet.admin = userData[0].admin;
        })
  }
}
</script>

<style>
@media screen and (min-width: 1300px) {

  .fas {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 50px;
    color: #222831;
  }

}

@media screen and (max-width: 1300px) {

  .fas {
    font-size: 50px;
    color: #222831;
  }

  .fa-users {
    padding-right: 20px;
  }

  .fa-address-card {
    padding-right: 20px;
  }

}


</style>