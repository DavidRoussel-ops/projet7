<template>
  <div class="conteneur-nav">
    <a href="#" @click="home"><i class="fas fa-home"></i></a>
    <a href="#" @click="sign"><i class="fas fa-sign-in-alt"></i></a>
    <a href="#" @click="log"><i class="fas fa-id-badge"></i></a>
  </div>
</template>

<script>


export default {
  data(){
    return{
    }
  },
  methods : {
    //Fonction router
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
@media screen and (min-width: 1300px){

  .conteneur-nav{
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    background-color: #FD7014;
    border: 20px solid #FD7014;
    width: 100%;
  }

}

@media screen and (max-width: 1300px){

  .conteneur-nav{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #FD7014;
    width: 100%;
    padding: 5px;
  }

  .fa-home {
    padding-right: 20px;
  }

  .fa-sign-in-alt {
    padding-right: 20px;
  }

}
</style>

