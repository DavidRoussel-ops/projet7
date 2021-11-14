<template>
  <div class="conteneur-nav">
    <button class="btn-nav" @click="home" >Accueil</button>
    <button class="btn-nav" @click="sign" >S'inscrire</button>
    <button class="btn-nav" @click="log">Se connecter</button>
  </div>
</template>

<script>


export default {
  data(){
    return{
    }
  },
  methods : {
    sign : function () {
      this.$router.push('/sign')
      },
    log : function () {
      this.$router.push('/log')
    },
    home : function () {
      this.$router.push('/')
    }
    }
}
</script>

<style>
.conteneur-nav{
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  background-color: #FD7014;
  border: 20px solid #FD7014;
  width: 100%;
}

.btn-nav{
  width: 150px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #222831;
  color: black;
  background-color: #EEEEEE;
}
</style>

