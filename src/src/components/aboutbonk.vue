<template>
  <div id='aboutbonk'>
    <div class="my-5">
      <div class="h1">Back to</div>
      <div class='bonk'>
        <a href='/' class='bonk_about b_bonk'>BONK</a>
      </div>
    </div>
    <div class="container1">
      <div class='mb-5'>
        <h3>About Us</h3>
        <h5>bonk - Kelompok 69 Kelas 4</h5>
        <h6>13519116 Jeane Mikha Erwansyah</h6>
        <h6>13519124 Fransiskus Febryan Suryawan</h6>
        <h6>13519188 Jeremia Axel Bachtera</h6>
      </div>
      <div class='mb-5'>
        <h3>About Bonk</h3>
        <!--
        <p class="paragraf">Bonk merupakan sebuah <i>information retrieval system</i> atau sistem temu balik informasi yang menggunakan <i>cosine similarity</i> untuk mencari tingkat kemiripan query (atau kata kunci yang ingin dicari) dengan dokumen. Semua kosakata dalam dokumen direpresentasikan sebagai sebuah komponen vektor.</p>
        <p class="paragraf">Bonk menggunakan teknologi NodeJS, Koa, Vue.js, dan Webpack</p>
        -->
        <p class="paragraf">Information retrieval (temu balik informasi) adalah proses mencari data tidak terstruktur yang memenuhi kebutuhan informasi dari koleksi yang besar. Data tidak terstruktur adalah data yang tidak memiliki struktur yang jelas. Sistem temu balik informasi dapat dibedakan menjadi tiga kelompok besar menurut skala operasi. Dalam web search, sistem harus mencari dari sangat banyak dokumen yang tersebar pada banyak komputer. Di sisi lain, personal information retrieval bekerja dalam komputer personal untuk memenuhi kebutuhan pengguna individual. Di antara keduanya, ada enterprise, institutional, and domain-specific search, dimana temu-balik diberikan oleh dokumen internal yang disimpan dalam sistem terpusat.</p>
        <p class="paragraf">Salah satu metode untuk melakukan temu-balik informasi adalah menggunakan vektor di ruang kosakata dokumen untuk menentukan kemiripan dokumen dengan pencarian yang diajukan. Kemiripan didefinisikan berdasarkan representasi bag of words yang berisi kata-kata independen, dan dikonversi ke suatu model ruang vektor yang memiliki dimensi sesuai dengan jumlah kata dalam bag of words.</p>
        <p class="paragraf">Vektor merupakan suatu kuantitas yang memiliki besar dan arah. Pada ruang dua dimensi, vektor memiliki dua komponen yaitu dalam arah i dan dalam arah j. Sedangkan, pada ruang n-dimensi, vektor memiliki n komponen. Pada temu balik informasi, vektor digunakan sebagai penyimpan banyak kemunculan kata dari dokumen dan query sehingga nilai kemiripannya dapat ditentukan dengan memanfaatkan dot product atau disebut juga cosine similarity. Jadi dokumen atau query dengan n kata disimpan dalam bentuk vektor berukuran n, dengan besarannya bergantung pada kemunculan kata tersebut dalam dokumen atau query.</p>
        <p class="paragraf">Istilah cosine similarity adalah tingkat kemiripan dengan dokumen. Besar dari cosine similarity dapat dicari dengan melakukan perkalian titik pada dua dokumen dalam model ruang vektor. Semakin besar nilainya, maka semakin mirip kedua dokumen yang diberikan. Namun, panjang vektor dokumen dapat mempengaruhi hasil akhir dari perhitungan. Untuk mengatasi panjang dokumen yang dapat mempengaruhi nilai kemiripan, maka hasil perkalian titik dibagi dengan panjang-panjang dokumen yang berkaitan.</p>
      </div>
      <div class='mb-5'>
        <h3>How to Use</h3>
        <h5>Backend</h5>
        <p> 1. Install semua dependencies dengan  <CODE>npm install package.json</CODE><br>
            2. Jalakan dengan menggunakan  <CODE>npm run dev</CODE>.<br>
            3. Buka localhost port 6969 di browser<br>
            4. bONK!<br></p>
        <h5>Frontend</h5>
        <p> 1. Upload files, klik tombol Upload!<br>
            2. Masukan query dan tekan enter atau klik tombol Search!<br>
            3. Hasil query sudah tampil terurut berdasarkan tingkat kemiripan.</p>
      </div>
    </div>
    <div class="spacer">
    </div>
  </div>
</template>

<style lang="scss">
  #aboutbonk {
    display: flex;
    flex-flow: column;
  }

  .paragraf {
      text-align: justify;
  }

  .container1 {
    text-align: left;
  }

  @media screen and (min-width: 500px) {
    .container1 {
      margin: 0 5%;
    }
  }

  @media screen and (min-width: 700px) {
    .container1 {
      margin: 0 12%;
    }
  }

  @media screen and (min-width: 1200px) {
    .container1 {
      margin: 0 25%;
    }
  }

  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

  CODE {
    color: rgb(255, 0, 162);
    font-family: 'IBM Plex Mono', monospace;
    background-color: rgb(250, 250, 250);
  }

</style>

<script>
export default {
  
}
</script>