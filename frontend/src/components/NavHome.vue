<template>
  <div class="conteneur-nav">
    <a href="#" @click="forum"><i class="fas fa-users"></i></a>
    <a href="#" @click="profil"><i class="fas fa-address-card"></i></a>
    <a href="#" @click="logout"><i class="fas fa-power-off"></i></a>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods : {
    //Fonction router
    forum : function () {
      this.$router.push('/groupomania')
    },
    profil : function () {
      this.$router.push('/profil')
    },
    logout : function () {
      localStorage.clear();
      this.$router.push('/')
    },
  }
}
</script>

<style>
@media screen and (min-width: 1300px){

  .fas {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 50px;
    color: #222831;
  }

}

@media screen and (max-width: 1300px){

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