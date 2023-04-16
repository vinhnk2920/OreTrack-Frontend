<template>
  <div class='px-5 w-100'>
    <h3 class='ml-3 mb-3'>{{$store.state.vocabulary_sets.currentVocabSet.title}}</h3>
    <div v-for='(vocab, index) in $store.state.vocabulary_sets.learningVocabSet'>
      <div :class='index === currentIndex ? "" : "d-none"'>
        <vue-flashcard
          :headerFront='index+1 + " / " + $store.state.vocabulary_sets.learningVocabSet.length'
          :front="vocab.word"
          :back="vocab.definition"
          :img-front='vocab.definition_image'
          :img-back='vocab.definition_image'
          footer-front=''
          header-back=''
          footer-back=''
          color-back='white'
          color-text-back='black'>
        </vue-flashcard>
      </div>
    </div>
    <div class='mt-5 d-flex justify-content-center'>
      <b-button v-if='currentIndex === $store.state.vocabulary_sets.learningVocabSet.length-1' @click='endLearning' variant='warning' class='font-weight-bold btn-create'>Trở về</b-button>
      <b-button v-else @click='addCurrentIndex' variant='warning' class='font-weight-bold btn-create'>Tiếp tục</b-button>
    </div>
  </div>
</template>
<script>
import vueFlashcard from 'vue-flashcard';
export default {
  name: 'LearnIndividualSets',
  components : { vueFlashcard },
  data() {
    return {
      vocab: [],
      currentIndex: 0
    }
  },
  methods: {
    addCurrentIndex() {
      this.currentIndex++
      console.log(this.currentIndex)
    },
    endLearning() {
      this.$router.push("/individual-vocab-sets")
    }
  }
}
</script>
<style>
.card-header, .card-footer {
  background-color: white;
  border: 0;
}

.flashcard {
  height: 330px;
}

.card-content img {
  max-width: 200px;
  max-height: 160px;
}
</style>
