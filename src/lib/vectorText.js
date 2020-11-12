/* Class Vector */
class Vector {
  constructor(){
    /* Inisialisasi Vektor Kosong di ruang database */
    this.vals = [];
  }

  /* Getter dan setter untuk komponen ke-i vektor */
  getComponent(i){ return this.vals[i] || 0; }
  setComponent(i, val){ this.vals[i] = val; }

  /* Getter panjang vektor */
  get length(){
    const l = this.vals.reduce((ax, cx) => ax + Math.pow(cx, 2), 0);
    return Math.sqrt(l);
  }

  /* Implementasi fungsi dot vektor */
  dot(v2){
    let res = 0;
    this.vals.forEach((e, i) => {
      res += e*v2.getComponent(i);
    });
    return res;
  }

  cosineSimilarity(v2){
    return this.dot(v2) / (this.length * v2.length);
  }
}

/* Bagian database dan mengubah teks ke vektor */
class Database {
  constructor(documents){
    this.database = [];
  }

  /* Jumlah term yang ada di database */
  get termCount(){ return this.database.length; }

  /* Predikat: Apakah kata ada dalam database? */
  wordExists(word){
    return this.database.find(x => x === word);
  }
  /* mencari indeks kata dalam database */
  searchWord(word){
    return this.database.findIndex(x => x === word);
  }
  /* mengembalikan kata pada indeks ke-index */
  getWordAt(index){
    if(index >= 0)
      return this.database[index]
  }
  /* menambahkan kata ke database */
  addToDatabase(word){
    let index = -1;
    if(!this.wordExists(word)){
      index = this.termCount;
      this.database.push(word);
    }
    return index;
  }

  /* Membuat teks menjadi vektor di ruang database
   * text bisa dalam bentuk string atau array of strings (kata-per-kata))
   * Mengembalikan vektor. */
  vectorizeText(text){
    if(!Array.isArray(text)) text = text.split(' ');
    let v = new Vector();
    text.forEach( word => {
      // deleting marks
      if (word.includes(',')) {
        word = word.replace(',', '');
      }

      if (word.includes('.')) {
        word = word.replace('.', '');
      }
      
      let i = this.searchWord(word);
      if(i === -1)
        i = this.addToDatabase(word);
      v.setComponent(i, v.getComponent(i)+1);
    } );
    return v;
  }
}

const CurrentDatabase = new Database();

module.exports = { CurrentDatabase, Vector };
module.exports.default = CurrentDatabase;
