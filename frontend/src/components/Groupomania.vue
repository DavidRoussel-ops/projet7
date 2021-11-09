<template>
    <div class="conteneur">
      <navhome/>
      <button @click="logout">Déconnexion</button>
      <newpost/>
      <div class="style-post" v-for="(post, index) in allPosts" v-bind:key="index">
        <p>{{ post.img }}</p>
        <p>{{ post.com }}</p>
        <p>Un post de {{ post.lname }} {{ post.fname }}</p>
        <form v-if="postId === post.id">
          <input v-model="dataPutPost.com" placeholder="commentaire"><br>
          <input v-model="dataPutPost.img" placeholder="image"><br>
          <button @click="putPost()">Valider</button>
        </form>
        <button @click="getComment(post.id)">Voir les commentaires</button><br>
        <button @click="delPost(post.id)">Supprimer</button>
        <div v-if="postId === post.id">
          <div v-for="comments in allComments" v-bind:key="comments">
            <p>{{ comments.content }}</p>
            <p>Commenté par {{ comments.lname }} {{ comments.fname }}</p>
            <button @click="delCom(comments.id)">Supprimer</button>
          </div>
        </div>
        <div v-if="postId === post.id">
        <button class="btn-com" @click="addComment(post.id)">Ajouter un commentaire</button>
        <form v-if="addCom">
          <input v-model="dataNewComment.content" type="text">
          <button @click="sendComment(post.id)">Envoyer</button>
        </form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import newpost from '@/components/NewPost';
import navhome from "@/components/NavHome";

export default {
  components : {
    newpost : newpost,
    navhome : navhome,
  },
  data() {
    return {
      showme : localStorage.userId,
      addCom : false,
      formPut : false,
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
      dataPutPost : {
        id : '',
        com : '',
        img : '',
        userId : '',
      },
      dataCommentSend : '',
      dataPostPut : '',
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
    putPost() {
      this.dataPutPost.userId = localStorage.userId;
      this.dataPostPut = JSON.stringify(this.dataPutPost);
      axios.put('http://localhost:3000/posts/' + this.dataPutPost.id , this.dataPostPut , {headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
          .then(response => {
            let putPostData = JSON.parse(response.data);
            console.log(putPostData);
            this.allPosts.com = '';
            this.allPosts.img = '';
            this.allPosts.userId = '';
            this.allPosts.id = '';
            window.location.reload();
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
    axios.get('http://localhost:3000/posts/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let posts = JSON.parse(response.data);
      this.allPosts = posts;
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
.style-post{
  border: 1px solid black;
}

.center {
  position: absolute;
  left: 50%;
}
</style>