<template>
  <div id="conteneur">
    <Nav/>
    <img class="img-home" src="../assets/icon-left-font-monochrome-white.png" alt="fond acceuil"/>
  </div>
</template>

<script>
import Nav from "../components/Nav"

export default {
  components: {
    'Nav': Nav,
  }
}
</script>

<style>
@media screen and (min-width: 1300px) {

  body {
    margin: 0;
    padding: 0;
    background-color: #222831;
    font-family: "Times New Roman", Calibri, serif;
  }

  .img-home {
    display: block;
    margin: 50px auto;
  }

}

@media screen and (max-width: 1300px) {

  body {
    margin: 0;
    padding: 0;
    background-color: #222831;
    font-family: "Times New Roman", Calibri, serif;
  }

  .img-home {
    display: block;
    margin: 50px auto;
    width: 50%;
  }

}

</style>