<template>
  <p>Bonjour et bienvenue {{ dataGet.fname }} {{ dataGet.lname }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataGet: {
        mail : '',
        lname : '',
        fname : '',
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3000/users/', {headers : {Authorization : 'Bearer ' + localStorage.token}})
    .then(response => {
      let user = JSON.parse(response.data);
      this.dataGet.mail = user[0].mail;
      this.dataGet.lname = user[0].lname;
      this.dataGet.fname = user[0].fname;
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>