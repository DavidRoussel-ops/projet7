<template>
    <div class="conteneur">
      <navhome v-if="userGet.admin === 0"/>
      <button @click="logout">Déconnexion</button>
      <newpost/>
      <div class="style-post" v-for="(post, index) in allPosts" v-bind:key="index">
        <div>
          <img src="post.img"/>
        <p>{{ post.img }}</p>
        <p>{{ post.com }}</p>
        <p>Un post de {{ post.lname }} {{ post.fname }}</p>
          <button v-if="post.userId === userGet.id" @click="delPost(post.id)">Supprimer</button>
          <button v-if="userGet.admin === 1" @click="delPostAdmin(post.id)">Supprimer</button>
          <div v-if="post.userId === userGet.id">
          <button @click="postPut(post.img, post.com, post.id, post.userId)">Modifier post</button>
              <form v-if="formPutPost">
                <input v-model="dataPutPost.com" placeholder="commentaire"><br>
                <input v-model="dataPutPost.img" placeholder="image"><br>
                <button @click="putPost(post.id)">Valider</button>
                <button @click="endPut">Annuler</button>
              </form>
          </div>
        <button @click="getComment(post.id)">Voir les commentaires</button><br>
          <div v-if="seeCom">
        <div v-if="postId === post.id">
          <div v-for="comments in allComments" v-bind:key="comments">
            <p>{{ comments.content }}</p>
            <p>Commenté par {{ comments.lname }} {{ comments.fname }}</p>
            <button v-if="userGet.admin === 1" @click="delComAdmin(comments.id)">Supprimer</button>
            <button v-if="comments.userId === userGet.id" @click="comPut(comments.content, comments.id, comments.userId)">Modifier</button>
            <form v-if="formPutCom">
              <input v-model="dataPutCom.content"><br>
              <button @click="putCom(comments.id)">Valider</button>
              <button @click="endPutCom()">Fermer</button>
            </form>
            <button v-if="comments.userId === userGet.id" @click="delCom(comments.id)">Supprimer</button>
          </div>
        </div>
            <button @click="endCom()">Fermer</button>
          </div>
        <div v-if="postId === post.id">
        <button v-if="seeCom" class="btn-com" @click="addComment(post.id)">Ajouter un commentaire</button>
        <form v-if="addCom">
          <input v-model="dataNewComment.content" type="text">
          <button @click="sendComment(post.id)">Envoyer</button>
          <button @click="endComment()">Annuler</button>
        </form>
        </div>
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
      addCom : false,
      formPutPost : false,
      formPutCom : false,
      seeCom : false,
      commentId : '',
      userId : '',
      postId : '',
      userGet : {
        mail : '',
        pass : '',
        lname: '',
        fname: '',
        id : '',
        admin : '',
      },
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
      dataPutCom : {
        id : '',
        content : '',
        userId : '',
      },
      dataCommentSend : '',
      dataPostPut : '',
      dataComPut : '',
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
        this.seeCom = true;
      })
    },
    addComment() {
      this.addCom = true;
    },
    endCom() {
      this.seeCom = false;
    },
    endComment() {
      this.addCom = false;
    },
    endPut() {
      this.formPutPost = false;
    },
    endPutCom() {
      this.formPutCom = false;
    },
    postPut(postImg, postCom, postId, postUserId) {
      this.dataPutPost.img = postImg;
      this.dataPutPost.com = postCom;
      this.dataPutPost.id = postId;
      this.dataPutPost.userId = postUserId;
      this.formPutPost = true;
    },
    comPut(comContent, comId, comUserId) {
      this.dataPutCom.content = comContent;
      this.dataPutCom.id = comId;
      this.dataPutCom.userId = comUserId;
      this.formPutCom = true;
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
    putPost(postId) {
      this.postId = postId;
      this.dataPostPut = JSON.stringify(this.dataPutPost);
      axios.put('http://localhost:3000/posts/' + postId , this.dataPostPut , {headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
          .then(response => {
            let putPostData = JSON.parse(response.data);
            console.log(putPostData);
            this.dataPutPost.com = '';
            this.dataPutPost.img = '';
            this.dataPutPost.userId = '';
            this.dataPutPost.id = '';
            window.location.reload();
          })
      .catch(err => {
        console.log(err)
      })
    },
    putCom(commentId) {
      this.commentId = commentId;
      this.dataComPut = JSON.stringify(this.dataPutCom);
      axios.put('http://localhost:3000/posts/comments/' + commentId , this.dataComPut, {headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let putComData = JSON.parse(response.data);
        console.log(putComData);
        this.dataPutCom.content = '';
        this.dataPutCom.userId = '';
        this.dataPutCom.id = '';
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
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
    delPostAdmin(postId) {
      axios.delete('http://localhost:3000/posts/admin/' + postId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delDataAdmin = JSON.parse(response.data);
        console.log(delDataAdmin);
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
    },
    delComAdmin(comId) {
      axios.delete('http://localhost:3000/posts/admin/comments/' + comId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
          .then(response => {
            let delComDataAdmin = JSON.parse(response.data);
            console.log(delComDataAdmin);
            window.location.reload();
          })
    },
  },
  mounted() {
    this.userId = localStorage.userId;
    axios.get('http://localhost:3000/posts', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let posts = JSON.parse(response.data);
      this.allPosts = posts;
    })
    .catch(err => {
      console.log(err)
    })
    axios.get('http://localhost:3000/users/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let userData = JSON.parse(response.data);
      this.userGet.mail = userData[0].mail;
      this.userGet.pass = userData[0].pass;
      this.userGet.lname = userData[0].lname;
      this.userGet.fname = userData[0].fname;
      this.userGet.id = userData[0].id;
      this.userGet.admin = userData[0].admin;
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