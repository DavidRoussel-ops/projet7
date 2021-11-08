<template>
    <div class="conteneur">
      <button @click="logout">Déconnexion</button>
      <div class="style-post" v-for="posts in allPosts" v-bind:key="posts">
        <p>{{ posts.img }}</p>
        <p>{{ posts.com }}</p>
        <p>Un post de {{ posts.lname }} {{ posts.fname }}</p>
        <button @click="delPost(posts.id)">Supprimer</button>
        <button @click="getComment(posts.id)">Voir les commentaires</button>
        <div v-if="postId === posts.id">
          <div v-for="comments in allComments" v-bind:key="comments">
            <p>{{ comments.content }}</p>
            <p>Commenté par {{ comments.lname }} {{ comments.fname }}</p>
            <button @click="delCom(comments.id)">Supprimer</button>
          </div>
        </div>
        <div v-if="postId === posts.id">
        <button class="btn-com" @click="addComment(posts.id)">Ajouter un commentaire</button>
        <form v-if="addCom">
          <input v-model="dataNewComment.content" type="text">
          <button @click="sendComment(posts.id)">Envoyer</button>
        </form>
        </div>
      </div>
      <newpost/>
    </div>
</template>

<script>
import axios from "axios";
import newpost from '../components/NewPost';

export default {
  components : {
    newpost : newpost,
  },
  data() {
    return {
      addCom : false,
      commentId : '',
      userId : '',
      postId : '',
      dataGetUsers: {
        mail : '',
        lname : '',
        fname : '',
      },
      dataNewComment : {
        id : '',
        content : '',
        userId : '',
      },
      dataCommentSend : '',
      allPosts : [],
      allComments : [],
    }
  },
  methods : {
    logout : function () {
      localStorage.clear();
      this.$router.push('/')
    },
    getComment(postId) {
      this.postId = postId;
      axios.get('http://localhost:3000/posts/' + postId + '/comments', {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let comments = JSON.parse(response.data);
        this.allComments = comments;
      })
    },
    addComment() {
      this.addCom = true;
    },
    sendComment(postId) {
      this.dataNewComment.userId = this.userId;
      this.dataCommentSend = JSON.stringify(this.dataNewComment)
      axios.post('http://localhost:3000/posts/' + postId + '/comments', this.dataCommentSend ,{headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
          .then(response => {
            let dataComment = JSON.parse(response.data);
            console.log(dataComment);
            this.dataNewComment.content = '';
            this.dataNewComment.userId = '';
            window.location.reload();
          })
          .catch(error => {
            console.log(error)
          })
    },
    delPost(postId) {
      this.postId = postId;
      axios.delete('http://localhost:3000/posts/' + postId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delData = JSON.parse(response.data);
        console.log(delData);
        window.location.reload();
      })
    },
    delCom(comId) {
      this.dataNewComment.id = comId;
      axios.delete('http://localhost:3000/posts/comments/' + comId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delComData = JSON.parse(response.data);
        console.log(delComData);
        window.location.reload();
      })
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

<style>
.style-post{
  border: 1px solid black;
}
</style>