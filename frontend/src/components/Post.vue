<template>
  <div class="post">
    <form v-if="formPost" class="new-post" @submit.prevent="addPost()" enctype="multipart/form-data">
      <button class="btn-stop-post" @click="exitNewPost">X</button>
      <label for="com"></label><input class="input-post-com" id="com" type="text" placeholder="commentaire"/><br>
      <input class="btn-choice" type="file" ref="file" @change="selectFile"/><br>
      <button class="btn-post">Posté</button>
    </form>
    <button v-if="btnPost" @click="showNewPost" class="btn-new-post"><i class="fas fa-comment"></i></button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formPost : false,
      btnPost : true,
      file : '',
      userId : localStorage.userId
    }
  },
  methods : {
    showNewPost() {
      this.formPost = true;
      this.btnPost = false;
    },
    exitNewPost() {
      this.formPost = false;
      this.btnPost = true;
    },
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
@media screen and (min-width: 1300px) {

  .post {
    position: absolute;
    width: 30%;
    height: 250px;
    left: 67%;
    top: 65%;
  }

  .new-post {
    position: fixed;
    background-color: #EEEEEE;
    border: 1px solid black;
    width: 30%;
    height: 250px;
    border-radius: 20px;
  }

  .btn-stop-post {
    border-radius: 50%;
    color: white;
    background-color: red;
    position: absolute;
    left: 93%;
    top: 5%;
  }

  .input-post-com {
    position: absolute;
    left: 15%;
    top: 30%;
    width: 70%;
    height: 20px;
    border-radius: 20px;
  }

  .btn-choice {
    position: absolute;
    left: 35%;
    top: 50%;
  }

  .btn-post {
    background-color: royalblue;
    color: white;
    border-radius: 20px;
    position: absolute;
    left: 25%;
    top: 70%;
    width: 50%;
    height: 50px;
    font-size: 40px;
  }

  .btn-new-post {
    position: fixed;
    background-color: #FD7014;
    border: 1px solid #222831;
    color: #EEEEEE;
    border-radius: 50%;
    left: 92%;
    top: 82%;
    width: 100px;
    height: 100px;
    font-size: 50px;
  }

}

@media screen and (max-width: 1300px) {

  .post {
    position: absolute;
    width: 70%;
    height: 250px;
    left: 20%;
    top: 3%;
  }

  .new-post {
    position: fixed;
    background-color: #EEEEEE;
    border: 1px solid black;
    width: 70%;
    height: 250px;
    border-radius: 20px;
  }

  .btn-stop-post {
    border-radius: 50%;
    color: white;
    background-color: red;
    position: absolute;
    left: 85%;
    top: 5%;
  }

  .input-post-com {
    position: absolute;
    left: 5%;
    top: 30%;
    width: 90%;
    height: 20px;
    border-radius: 20px;
  }

  .btn-choice {
    position: absolute;
    left: 5%;
    top: 50%;
  }

  .btn-post {
    background-color: royalblue;
    color: white;
    border-radius: 20px;
    position: absolute;
    left: 15%;
    top: 70%;
    width: 70%;
    height: 50px;
    font-size: 30px;
  }

  .btn-new-post {
    position: fixed;
    background-color: #FD7014;
    border: 1px solid #222831;
    color: #EEEEEE;
    border-radius: 50%;
    left: 77%;
    top: 3%;
    width: 50px;
    height: 50px;
  }

  .fas {
    margin: 0;
  }

  .fa-comment {
    font-size: 30px;
  }

}

</style>