<template>
  <div>
    <navhome/>
    <div class="profil">
      <div class="my-profil">
      <h2>Mon profil</h2>
      <p>Mail : {{ userGet.mail }}</p>
      <p>Nom : {{ userGet.lname }}</p>
      <p>Prénom : {{ userGet.fname }}</p>
    </div>
    <div>
      <h2>Modifier mon profil</h2>
      <form>
        <label><input class="input-put-com" v-model="userPut.mail" placeholder="Modifier E-mail"></label><br>
        <label><input class="input-put-com" v-model="userPut.lname" placeholder="Modifier Nom"></label><br>
        <label><input class="input-put-com" v-model="userPut.fname" placeholder="Modifier Prénom"></label><br>
        <button class="btn-show-com" @click="putUser()">Modifié</button>
      </form>
    </div>
    <div>
      <h2>Supprimer mon profil</h2>
      <button class="btn-put-warning" @click="delUser">Supprimer</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navhome from '../components/NavHome';

export default {
  components : {
    navhome : navhome,
  },
  data () {
    return {
      userId : '',
      userGet : {
        mail : '',
        lname : '',
        fname : '',
      },
      userPut : {
        mail : '',
        lname : '',
        fname : '',
      },
      userPutIn : '',
    }
  },
  methods : {
    putUser() {
      this.userPutIn = JSON.stringify(this.userPut)
      axios.put('http://localhost:3000/users/', this.userPutIn, {headers : {'Content-Type' : 'application/json', Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let userPut = JSON.parse(response.data);
        console.log(userPut);
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    },
    delUser() {
      axios.delete('http://localhost:3000/users/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
      .then(response => {
        let delUsers = JSON.parse(response.data);
        console.log(delUsers);
        localStorage.clear();
        this.$router.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    },
  },
  mounted() {
    this.userId = localStorage.userId;
    axios.get('http://localhost:3000/users/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let user = JSON.parse(response.data);
      this.userGet.mail = user[0].mail;
      this.userGet.lname = user[0].lname;
      this.userGet.fname = user[0].fname;
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style>
@media screen and (min-width: 1300px){

  .profil {
    border: 1px solid black;
    box-shadow: 5px 5px 5px black;
    background-color: #EEEEEE;
    border-radius: 20px;
    margin: 100px auto;
    width: 70%;
    text-align: center;
    font-size: large;
  }

  .input-put-com {
    display: block;
    border-radius: 20px;
    width: 60%;
    height: 20px;
    margin: 1px auto;
  }

  .btn-put-warning {
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: red;
    margin-bottom: 50px;
  }

}
@media screen and (max-width: 1300px) {

  .profil {
    border: 1px solid black;
    box-shadow: 5px 5px 5px black;
    background-color: #EEEEEE;
    border-radius: 20px;
    margin: 50px auto;
    width: 80%;
    height: 600px;
    text-align: center;
    font-size: large;
  }

  .input-put-com {
    display: block;
    border-radius: 20px;
    width: 80%;
    height: 20px;
    margin: 1px auto;
  }

  .btn-put-warning {
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: large;
    color: white;
    background-color: red;
    margin-bottom: 50px;
  }

}
</style>