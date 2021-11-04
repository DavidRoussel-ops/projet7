<template>
  <div>
  <Nav/>
  <form>
    <input v-model="dataSign.mail" placeholder="e-mail"><br>
    <input v-model="dataSign.pass" placeholder="mots de passe"><br>
    <input v-model="dataSign.lname" placeholder="Nom"><br>
    <input v-model="dataSign.fname" placeholder="Prénom"><br>
    <button @click="sendSign()">Inscription</button>
    <p v-if="goodSign">{{ message }}</p>
  </form>
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
      dataSign : {
        mail : '',
        pass : '',
        lname: '',
        fname: '',
      },
      dataSignGood : '',
      goodSign : false,
      message : '',
    }
  },
  methods : {
    sendSign() {
      this.dataSignGood = JSON.stringify(this.dataSign)
      axios.post('http://localhost:3000/users/create', this.dataSignGood, {headers : {'Content-Type' : 'application/json'}})
      .then(response => {
        let sign = JSON.parse(response.data);
        this.goodSign = true;
        this.message = sign.message;
      })
      .catch(error => {
        console.log(error);
        this.goodSign = true;
        this.message = error;
      })
    }
  }
}
</script>