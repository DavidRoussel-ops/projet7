<template>
  <div class="conteneur-nav">
    <button class="btn-nav" @click="forum">Acceuil</button>
    <button class="btn-nav" @click="profil">Profile</button>
    <button class="btn-nav" @click="logout">Déconnexion</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods : {
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