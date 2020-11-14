<template>
  <div id='app'>
    <div class="my-5">
      <div class="h1">Welcome to</div>
      <div class='bonk'>
        <a href='/about' class='bonk_about b_bonk'>BONK</a>
      </div>
    </div>
    <form @submit.prevent class="content">
      <div class="upper-part w-100 d-flex justify-content-center mb-5">
        <div class="col-3 py-3 mr-3 uploader-box">
          <div>
            <Uploader class="mb-2" @addfile='addFile'/>
            <input class="mt-2 butt" type=button value='Upload!' @click='uploadFiles'>
          </div>
        </div>
        <div class="col-7 file-upload-box py-3">
          <div class="file-upload-title mb-1">File Uploads</div>
          <ol id='file-list' v-if="files.length > 0">
            <li class="text-left ml-3 m-1" v-for='file of files' :key='file.name'>
              {{ file.name }}
              <button type='button' class='button delete btn-danger' style="outline:none"
              @click='deleteFile(file.name)'><i class="mb-2 fa fa-trash-o fa-xs" aria-hidden="true"></i></button>
            </li>
          </ol>
        </div>
      </div>
      <div>
        <div class="search">
          <div class="row align-items-center">
            <div class="col">
              <input class="mr-2 float-left query-box" type=text v-model='searchQuery' placeholder="Type something here...">
            </div>
            <div class="col">
              <input class="butt" type=submit value='Search!' @click='search'>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div v-if='uploadSuccess'>
      <h2>Upload Success</h2>
    </div>
    <div v-if='querySuccess'>
      <div class='spacer'>
      </div>
      <h2>Query Result</h2>
      <ol>
        <li v-for='doc of queryResult.documents' :key='doc.name'>
          <h3><a :href='doc.link'>{{ doc.title }}</a></h3>
          <span class='wordcount'>Jumlah Kata: {{ doc.wordCount }}</span>
          <span class='similarity'>Kemiripan: {{ doc.similarity }}%</span>
          <p class='excerpt'>{{ doc.excerpt }}...</p>
        </li>
      </ol>
      <div class='spacer'>
      </div>
      <table v-if='queryResult.terms[0]' class='term-display'>
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
#app {
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.b_bonk:active {
  border:none;
  outline:none;
}

.query-box{
  padding: 0.3em 0.6em;
}

.term-display{
  margin: 1em auto;
  padding: 0.5em;
  border: 0.1em solid pink;
  font-size: 1em;
  th{
    background: lightpink;
  }
  th, td{
    border: 0.1em solid pink;
    padding: 0.5rem 0.7rem;
  }
}

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
