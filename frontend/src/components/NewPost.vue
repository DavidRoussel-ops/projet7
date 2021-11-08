<template>
  <form>
    <input v-model="dataNewPost.com" placeholder="commentaire" type="text"><br>
    <input v-model="dataNewPost.img" type="button" placeholder="Add Images"><br>
    <button @click="sendPost()">Posté</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      dataNewPost : {
        com: '',
        img : '',
        userId : localStorage.userId
      },
      dataPostSend : '',
    }
  },
  methods : {
    sendPost() {
      this.dataPostSend = JSON.stringify(this.dataNewPost)
      axios.post('http://localhost:3000/posts/', this.dataPostSend , {headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
          .then(response => {
            let dataPost = JSON.parse(response.data);
            console.log(dataPost)
            window.location.reload();
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>