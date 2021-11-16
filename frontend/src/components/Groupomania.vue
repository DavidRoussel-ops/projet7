<template>
    <div class="conteneur">
      <navhome v-if="userGet.admin === 0"/>
      <post/>
      <div class="style-post" v-for="post in allPosts" v-bind:key="post">
        <img class="img-post" v-if="post.img" :src="post.img" :alt="post.com">
        <div class="info-post">
        <p>{{ post.com }}</p>
        <p>Un post de {{ post.lname }} {{ post.fname }}</p>
        </div>
        <div class="btn-post-choice">
          <button class="btn-warning" v-if="post.userId === userGet.id" @click="delPost(post.id)">Supprimer</button>
          <button v-if="userGet.admin === 1" @click="delPostAdmin(post.id)">Supprimer</button>
        <button class="btn-show-com" @click="getComment(post.id)">Voir les commentaires</button><br>
        </div>
          <div class="style-comment" v-if="seeCom">
            <button class="btn-close" @click="endCom()">X</button>
          <div v-if="postId === post.id">
          <div v-for="comments in allComments" v-bind:key="comments">
            <div class="info-post">
            <p>{{ comments.content }}</p>
            <p>Commenté par {{ comments.lname }} {{ comments.fname }}</p>
            </div>
            <div class="btn-post-choice">
              <button class="btn-warning" v-if="userGet.admin === 1" @click="delComAdmin(comments.id)">Supprimer</button>
              <button class="btn-warning" v-if="comments.userId === userGet.id" @click="delCom(comments.id)">Supprimer</button>
            <button class="btn-show-com" v-if="comments.userId === userGet.id" @click="comPut(comments.content, comments.id, comments.userId)">Modifier</button>
            </div>
            <form v-if="formPutCom">
              <button class="btn-close" @click="endPutCom()">X</button>
              <label for="contentPut"></label><input class="input-add-com" id="contentPut" v-model="dataPutCom.content"><br>
              <button class="btn-add-com" @click="putCom(comments.id)">Valider</button>
            </form>
          </div>
        </div>
        <div v-if="postId === post.id">
        <button v-if="seeCom" class="btn-add-com" @click="addComment(post.id)">Ajouter un commentaire</button>
        <form v-if="addCom">
          <button class="btn-close" @click="endComment()">X</button>
          <label for="newContent"></label><input class="input-add-com" id="newContent" v-model="dataNewComment.content" type="text"><br>
          <button class="btn-add-com" @click="sendComment(post.id)">Envoyer</button>
        </form>
        </div>
          </div>
      </div>
    </div>
</template>

<script>

import axios from "axios";
import navhome from "@/components/NavHome";
import post from '@/components/Post';

export default {
  components : {
    post : post,
    navhome : navhome,
  },
  data() {
    return {
      addCom : false,
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
      dataPutCom : {
        id : '',
        content : '',
        userId : '',
      },
      dataCommentSend : '',
      dataComPut : '',
      allPosts : [],
      allComments : [],
    }
  },
  methods : {
    //Fonction voir les commentaires
    getComment(postId) {
      this.postId = postId;
      axios.get('http://localhost:3000/posts/' + postId + '/comments', {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let comments = JSON.parse(response.data);
        this.allComments = comments;
        this.seeCom = true;
      })
    },
    //Fonction afficher formulaire
    addComment() {
      this.addCom = true;
    },
    //Fonctions fermer formulaires
    endCom() {
      this.seeCom = false;
    },
    endComment() {
      this.addCom = false;
    },
    endPutCom() {
      this.formPutCom = false;
    },
    //Fonction récupération information
    comPut(comContent, comId, comUserId) {
      this.dataPutCom.content = comContent;
      this.dataPutCom.id = comId;
      this.dataPutCom.userId = comUserId;
      this.formPutCom = true;
    },
    //Fonction crée un commentaire
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
    //Fonction modifié commentaire
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
    //Fonction suppression post
    delPost(postId) {
      this.postId = postId;
      axios.delete('http://localhost:3000/posts/' + postId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delData = JSON.parse(response.data);
        console.log(delData);
        window.location.reload();
      })
    },
    //Fonction suppression post administrateur
    delPostAdmin(postId) {
      axios.delete('http://localhost:3000/posts/admin/' + postId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delDataAdmin = JSON.parse(response.data);
        console.log(delDataAdmin);
        window.location.reload();
      })
    },
    //Fonction suppression commentaire
    delCom(comId) {
      this.dataNewComment.id = comId;
      axios.delete('http://localhost:3000/posts/comments/' + comId, {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delComData = JSON.parse(response.data);
        console.log(delComData);
        window.location.reload();
      })
    },
    //Fonction suppression commentaire administrateur
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
    //Voir tous les posts
    this.userId = localStorage.userId;
    axios.get('http://localhost:3000/posts', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let posts = JSON.parse(response.data);
      this.allPosts = posts;
    })
    .catch(err => {
      console.log(err)
    })
    //Voir les information utilisateurs
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
@media screen and (min-width: 1300px){

  .style-post{
    border: 1px solid black;
    box-shadow: 5px 5px 5px black;
    background-color: #EEEEEE;
    border-radius: 20px;
    margin: 100px auto;
    width: 60%;
  }

  .img-post {
    display: block;
    border-radius: 30px;
    width: 70%;
    margin: 20px auto;
  }

  .info-post {
    display: block;
    margin: 10px auto;
    width: 50%;
    text-align: center;
    font-size: large;
  }

  .btn-warning {
    justify-content: flex-start;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: red;
    margin-right: 150px;
  }

  .btn-show-com {
    justify-content: flex-end;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: royalblue;
  }

  .btn-post-choice {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px;
  }

  .style-comment {
    padding: 20px;
  }

  .btn-close {
    color: #EEEEEE;
    background-color: red;
    border-radius: 50%;
  }

  .btn-add-com {
    display: block;
    margin: 10px auto;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: royalblue;
  }

  .input-add-com {
    display: block;
    border-radius: 20px;
    width: 60%;
    height: 20px;
    margin: 10px auto;
  }

}

@media screen and (max-width: 1300px){

  .style-post{
    border: 1px solid black;
    box-shadow: 5px 5px 5px black;
    background-color: #EEEEEE;
    border-radius: 20px;
    margin: 100px auto;
    width: 80%;
  }

  .img-post {
    display: block;
    border-radius: 30px;
    width: 90%;
    margin: 20px auto;
  }

  .info-post {
    display: block;
    margin: 10px auto;
    width: 50%;
    text-align: center;
    font-size: large;
  }

  .btn-warning {
    display: block;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    margin: 10px auto;
    font-size: large;
    color: white;
    background-color: red;
  }

  .btn-show-com {
    display: block;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    margin: 10px auto;
    font-size: large;
    color: white;
    background-color: royalblue;
  }

  .btn-post-choice {
    display: block;
    flex-direction: column;
  }

  .style-comment {
    padding: 20px;
  }

  .btn-close {
    color: #EEEEEE;
    background-color: red;
    border-radius: 50%;
  }

  .btn-add-com {
    display: block;
    margin: 10px auto;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: royalblue;
  }

  .input-add-com {
    display: block;
    border-radius: 20px;
    width: 80%;
    height: 20px;
    margin: 10px auto;
  }

}


</style>