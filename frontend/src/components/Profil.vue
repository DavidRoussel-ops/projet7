<template>
  <div>
    <navhome/>
    <div>
      <p>Mon profil</p>
      <ul>
      <li>Mail : {{ userGet.mail }}</li>
      <li>Nom : {{ userGet.lname }}</li>
      <li>Prénom : {{ userGet.fname }}</li>
      </ul>
    </div>
    <div>
      <p>Modifier mon profil</p>
      <form>
        <input v-model="userPut.mail" placeholder="Modifier E-mail"><br>
        <input v-model="userPut.lname" placeholder="Modifier Nom"><br>
        <input v-model="userPut.fname" placeholder="Modifier Prénom"><br>
        <button @click="putUser()">Modifié</button>
      </form>
    </div>
    <div>
      <p>Supprimer mon profil</p>
      <button @click="delUser">Supprimer</button>
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