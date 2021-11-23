<template>
  <div>
    <Nav/>
    <img class="img-home" src="../assets/icon-left-font-monochrome-white.png" alt="fond acceuil"/>
    <div class="form-sign-log">
      <form class="form-sign">
        <label>E-mail<input class="input" v-model="dataSign.mail" type="text"></label><br>
        <label>Mots de passe<input class="input" v-model="dataSign.pass" type="password"></label><br>
        <label>Nom<input class="input" v-model="dataSign.lname" type="text"></label><br>
        <label>Prénom<input class="input" v-model="dataSign.fname" type="text"></label><br>
        <button class="btn-sign-log" @click="sendSign()">Inscription</button>
      </form>
      <p class="info">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from "@/components/Nav";

export default {
  components: {
    Nav: Nav,
  },
  data() {
    return {
      dataSign: {
        mail: '',
        pass: '',
        lname: '',
        fname: '',
      },
      dataSignGood: '',
      message: 'Veuillez renseigner un mots de passe contenant aux moins une majuscule, une minuscule, un chiffre, un symbole \'&$£%!§\' et aux moins 8 caractères.',
    }
  },
  methods: {
    //Fonction création utilisateur
    sendSign() {
      this.dataSignGood = JSON.stringify(this.dataSign)
      axios.post('http://localhost:3000/users/create', this.dataSignGood, {headers: {'Content-Type': 'application/json'}})
          .then(response => {
            let sign = JSON.parse(response.data);
            console.log(sign);
            this.$router.push('/log')
          })
          .catch(error => {
            console.log(error);
          })
    }
  }
}
</script>

<style>
@media screen and (min-width: 1300px) {

  .form-sign-log {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 50%;
  }

  .form-sign {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
  }

  .input {
    border-radius: 20px;
    width: 100%;
    height: 20px;
  }

  .btn-sign-log {
    position: absolute;
    border-radius: 20px;
    width: 80%;
    height: 50px;
    left: 10%;
    background-color: white;
  }

  .info {
    display: block;
    margin: 40px auto;
    text-align: center;
    width: 80%;
    color: #222831;
  }

}

@media (min-width: 701px) and (max-width: 1299px){

  .form-sign-log {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
  }

  .form-sign {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 20%;
    left: 10%;
  }

  .input {
    border-radius: 20px;
    width: 100%;
    height: 20px;
  }

  .btn-sign-log {
    position: absolute;
    border-radius: 20px;
    width: 80%;
    height: 30px;
    left: 10%;
    background-color: white;
  }

  .info {
    bottom: 0;
    display: block;
    margin: 450px auto 0;
    text-align: center;
    width: 80%;
    color: #222831;
  }

}

@media screen and (max-width: 700px) {

  .form-sign-log {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
  }

  .form-sign {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 20%;
    left: 10%;
  }

  .input {
    border-radius: 20px;
    width: 100%;
    height: 20px;
  }

  .btn-sign-log {
    position: absolute;
    border-radius: 20px;
    width: 80%;
    height: 30px;
    left: 10%;
    background-color: white;
  }

  .info {
    bottom: 0;
    display: block;
    margin: 410px auto 0;
    text-align: center;
    width: 80%;
    color: #222831;
  }

}

</style>