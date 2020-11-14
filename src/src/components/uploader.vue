<template>
  <div class='m-auto uploader'>
    <div class='file-zone' @drop.prevent='getFile'
    @dragenter.self='dragStart'
    @dragleave.self='dragEnd'
    @dragover.prevent
    @click='clickDrop'
    :class='{hovered: isDragging}'>
      <span class='zone-text'>Drag files here</span>
      <small class='zone-text'>or click here</small>
      <input type='file' hidden @change='getFile' multiple>
    </div>
  </div>
</template>

<style lang="scss">
.file-zone{
  margin: auto;
  --size: 10em;
  border-radius: 20px;
  width: var(--size);
  height: var(--size);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: #f9c4d2;
  transition: 0.5s;
}

.file-zone:hover {
  background-color: #b18597;
  color:white;
}

.zone-text{
  pointer-events: none;
}

.hovered{
  background: purple;
}
</style>

<script>
export default {
  data(){
    return {
      isDragging: false,
    }
  },
  methods: {
    clickDrop(e){
      document.querySelector('input[type="file"]').click();
    },
    getFile(e){
    this.isDragging = false;
      const files = (e.dataTransfer || e.target).files;
      if(files)
        this.$emit('addfile', [...files]);
    },
    dragStart(e){
      this.isDragging = true;
    },
    dragEnd(e){
      this.isDragging = false;
    }
  }
}
</script>
