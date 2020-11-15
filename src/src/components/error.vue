<template>
<div class='error messagebox'>
  <h4>Error!</h4>
  <p>{{ message }}</p>
</div>
</template>

<style lang="scss">
</style>

<script>
export default {
  data(){
    return {
    }
  },
  props: ['message']
}
</script>
