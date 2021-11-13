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
  background-color: black;
  border: 20px solid black;
  width: 100%;
}

.btn-nav{
  width: 150px;
  height: 50px;
  border-radius: 20px;
  color: black;
  background-color: white;
}
</style>

