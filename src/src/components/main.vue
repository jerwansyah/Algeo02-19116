<template>
  <div id='app'>
    <h1>Hallo!</h1>
    <form @submit='uploadFiles'>
      <div v-if="files.length > 0">
        <h3>File yang diupload:</h3>
        <ol id='file-list'>
          <li v-for='file of files' :key='file.name'>
            {{ file.name }}
            <input type='button' class='button delete'
            @click='deleteFile(file.name)' value='X'>
          </li>
        </ol>
      </div>
      <input type=file @change='filesChanged' multiple>
      <input type=text v-bind='searchQuery'>
      <input type=submit value='Search!'>
    </form>
    <div v-if='success'>
      <h2>Success</h2>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  data() {
    return {
      files: [],
      searchQuery: '',
      result: {},
      success: false,
    }
  },
  methods: {
    uploadFiles(e){
      e.preventDefault();
      const formData = new FormData();
      this.files.forEach( file => {
        formData.append('docs', file);
      });
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) this.success = true;
      })
      .catch(err => {
        console.log(err);
      })
    },
    filesChanged(e){
      this.files = Array.from(e.target.files);
      console.log(this.files);
    },
    deleteFile(n){
      this.files = this.files.filter((e) => e.name != n);
    }
  }
}
</script>
