<template>
  <div id="conteneur">
    <Nav/>
    <img class="img-home" src="../assets/icon-left-font-monochrome-black.png" alt="fond acceuil"/>
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
}

.img-home {
  position: relative;
  left: 30%;
  width: 40%;
}

</style>