<template>
  <div id='app'>
    <h1>Hallo, {{ nama }}!</h1>
  </div>
</template>

<style lang="sass">
$fg: green;
$bg: lime;
h1{
  color: $fg;
  background: $bg;
}
</style>
<script>
export default {
  data() {
    return {
      nama: 'Dunia'
    }
  }
}
</script>
