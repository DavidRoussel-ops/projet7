<template>
  <div id="conteneurNav">
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
#conteneurNav{
  display: flex;
  flex-direction: row-reverse;
}

.btn-nav{
  width: 150px;
  height: 50px;
  border-radius: 20px;
  color: white;
  background-color: blue;
}
</style>

