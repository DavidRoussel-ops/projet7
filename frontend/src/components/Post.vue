<template>
  <div>
    <form @submit.prevent="addPost()" enctype="multipart/form-data">
      <label for="com">Commentaire</label><input id="com" type="text" placeholder="commentaire"/><br>
      <input type="file" ref="file" @change="selectFile"/><br>
      <button>Posté</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file : '',
      userId : localStorage.userId
    }
  },
  methods : {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    addPost() {
      const fd = new FormData();
      fd.append('com', document.getElementById('com').value);
      fd.append('file', this.file);
      fd.append('userId', this.userId);
      axios.post('http://localhost:3000/posts/', fd, {headers : {'Content-Type' : 'multipart/form-data', Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
    }
  }
}
</script>

<style>

label{
  display: none;
}

</style>