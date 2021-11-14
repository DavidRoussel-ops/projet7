<template>
  <div id="conteneur">
    <Nav/>
    <img class="img-home" src="../assets/icon-left-font-monochrome-white.png" alt="fond acceuil"/>
  </div>
</template>

<script>
import Nav from "../components/Nav"
export default {
components : {
  'Nav' : Nav,
}
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
  background-color: #222831;
}

.img-home {
  position: absolute;
  left: 30%;
  top: 10%;
  width: 40%;
}

</style>