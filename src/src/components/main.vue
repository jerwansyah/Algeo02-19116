<template>
  <div id='app'>
    <h1>Hallo!</h1>
    <form @submit.prevent>
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
      <Uploader @addfile='addFile'/>
      <input type=button value='Upload!' @click='uploadFiles'>
      <input type=text v-model='searchQuery'>
      <input type=submit value='Search!' @click='search'>
    </form>
    <div v-if='uploadSuccess'>
      <h2>Upload Success</h2>
    </div>
    <div v-if='querySuccess'>
      <h2>Query Result</h2>
      <ol>
        <li v-for='doc of queryResult.documents' :key='doc.name'>
          <h3><a :href='doc.link'>{{ doc.title }}</a></h3>
          <span>Jumlah Kata: {{ doc.wordCount }}</span>
          <span>Kemiripan: {{ doc.similarity }}</span>
          <p>{{ doc.excerpt }}</p>
        </li>
      </ol>
      <table>
        <thead>
          <th>Term</th>
          <th v-for='doc in queryResult.terms[0].docs' :key='doc.name'>
            {{ doc.name }}
          </th>
        </thead>
        <tbody>
          <tr v-for='term in queryResult.terms' :key='term.term'>
            <td>{{ term.term }}</td>
            <td v-for='doc in term.docs' :key='doc.name'>
              {{ doc.count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Uploader from './uploader.vue';
export default {
  data() {
    return {
      files: [],
      searchQuery: '',
      result: {},
      uploadSuccess: false,
      querySuccess: false,
      queryResult: {},
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
    search(e){
      e.preventDefault();
      fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: this.searchQuery,
          files: this.files.map(file => file.name)
        }),
      })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) this.querySuccess = true;
        this.queryResult = res.data;
      });
    },
    addFile(files){
      this.files.push(...files.filter(
        file => !this.files.find(
          f => f.name == file.name)));
    },
    deleteFile(n){
      this.files = this.files.filter((e) => e.name != n);
    }
  },
  components: {
    Uploader
  }
}
</script>
