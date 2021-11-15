<template>
  <div>
  <Nav/>
    <img class="img-home" src="../assets/icon-left-font-monochrome-white.png" alt="fond acceuil"/>
    <div class="form-sign-log">
  <form class="form-log">
    <label><input class="input" v-model="dataLog.mail" placeholder="e-mail"></label><br>
    <label><input class="input" v-model="dataLog.pass" placeholder="mots de passe"></label><br>
    <button class="btn-sign-log" @click="sendLog()">Connexion</button>
    <p v-if="goodLog">{{ message }}</p>
  </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from "@/components/Nav";

export default {
  components : {
    Nav : Nav,
  },
  data(){
    return{
      dataLog : {
        mail : '',
        pass : '',
      },
      dataLogGood : '',
      goodLog : false,
      message : '',
    }
  },
  methods : {
    sendLog() {
      this.dataLogGood = JSON.stringify(this.dataLog)
      axios.post('http://localhost:3000/users/login', this.dataLogGood, {headers : {'Content-Type' : 'application/json'}})
          .then(response => {
            let log = JSON.parse(response.data);
            localStorage.userId = log.userId;
            localStorage.token = log.token;
            localStorage.admin = log.admin;
            this.$router.push('/groupomania');
          })
          .catch(error => {
            console.log(error);
            this.goodLog = true;
            this.message = error;
          })
    }
  }
}
</script>

<style>
@media screen and (min-width: 1300px) {

  .form-log {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
  }

}

@media screen and (max-width: 1300px) {

  .form-log {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 20%;
    left: 10%;
  }

}

</style>