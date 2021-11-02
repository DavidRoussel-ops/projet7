<template>
  <form>
    <input v-model="dataLog.mail" placeholder="e-mail"><br>
    <input v-model="dataLog.pass" placeholder="mots de passe"><br>
    <button @click="sendLog()">Connexion</button>
    <p v-if="goodLog">{{ message }}</p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
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