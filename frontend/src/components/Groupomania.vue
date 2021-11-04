<template>
    <div class="conteneur">
      <button @click="logout">Déconnexion</button>
      <div v-for="posts in allPosts" v-bind:key="posts">
        <p>{{ posts.com }}</p>
        <p>Un post de {{ posts.lname }} {{ posts.fname }}</p>
      </div>
      <newpost/>
    </div>
</template>

<script>
import axios from "axios";
import newpost from '../components/NewPost'

export default {
  components : {
    newpost : newpost
  },
  data() {
    return {
      comment : '',
      userId : '',
      dataGetUsers: {
        mail : '',
        lname : '',
        fname : '',
      },
      allPosts : [],
    }
  },
  methods : {
    logout : function () {
      localStorage.clear();
      this.$router.push('/')
    }
  },
  mounted() {
    this.userId = localStorage.userId;
    axios.get('http://localhost:3000/users/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let user = JSON.parse(response.data);
      this.dataGetUsers.mail = user[0].mail;
      this.dataGetUsers.lname = user[0].lname;
      this.dataGetUsers.fname = user[0].fname;
    })
    .catch(error => {
      console.log(error);
    })
    axios.get('http://localhost:3000/posts/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let posted = JSON.parse(response.data);
      this.allPosts = posted;
    })
  }
}
</script>