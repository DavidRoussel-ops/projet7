<template>
  <div>
    <form @submit.prevent="addPost()" enctype="multipart/form-data">
      <input type="file" ref="file" @change="selectFile"/><br>
      <input id="com" type="text" placeholder="commentaire"/><br>
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
    }
  },
  methods : {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    addPost() {
      const fd = new FormData();
      fd.append('file', this.file);
      fd.append('com', document.getElementById('com').value);
      axios.post('http://localhost:3000/posts/', fd, {headers : {'Content-Type' : 'multipart/form-data', Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
    }
  }
}
</script>