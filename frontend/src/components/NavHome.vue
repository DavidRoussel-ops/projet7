<template>
  <div>
    <button @click="forum">Acceuil</button>
    <button @click="profil">Profile</button>
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
    }
  }
}
</script>