<template>
  <div class='px-5 w-100'>
    <h3 class='ml-3 mb-3'>{{$store.state.vocabulary_sets.currentVocabSet.title}}</h3>
    <div v-for='(vocab, index) in $store.state.vocabulary_sets.learningVocabSet'>
      <div v-if='!isShowQuestion' class='position-relative' :class='index === currentIndex ? "" : "d-none"'>
        <vue-flashcard
          :headerFront='index+1 + " / " + $store.state.vocabulary_sets.learningVocabSet.length'
          :front="vocab.word"
          :back="vocab.definition"
          :img-front='vocab.definition_image'
          :img-back='vocab.definition_image'
          :footer-front='vocab.phonetic'
          header-back=''
          footer-back=''
          color-back='white'
          color-text-back='black'>
        </vue-flashcard>
        <div class='position-absolute btn-sound'>
          <button class='btn btn-warning' @click='playSound(vocab.audio)'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
            <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
          </svg></button>
        </div>
      </div>
      <div v-if='isShowQuestion' :class='index === currentIndex ? "" : "d-none"'>
        <div class='card'>
          <div class='card-body shadow-lg py-5 text-center' style='padding-left: 15%; padding-right: 15%;'>
            <h4>{{vocab.test}}</h4>
            <b-textarea v-model='answer' class='mt-5' @keydown.enter='learnVocab(vocab.id, vocab.word)' />
            <b-button @click='learnVocab(vocab.id, vocab.word)' v-if='isShowQuestion'  variant='warning' class='font-weight-bold btn-create mt-5'>Kiểm tra đáp án</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class='mt-5 text-center'>
      <div class='card mb-5' v-if='currentIndex === $store.state.vocabulary_sets.learningVocabSet.length && !isShowQuestion'>
        <div class='card-body shadow-lg py-5 text-center' style='padding-left: 15%; padding-right: 15%;'>
          <h1>Bạn đã trả lời đúng {{countTrueAnswer}}/{{$store.state.vocabulary_sets.learningVocabSet.length}}</h1>
          <img v-if='countTrueAnswer >=5' src='https://c.tenor.com/qmOrGDaaMlwAAAAC/cheer-up-cheering.gif' alt='cheer up'/>
          <img v-else src='https://1.bp.blogspot.com/-6oB00hdTzzs/YAjs5nn161I/AAAAAAAAB74/ViTuhf2mNP0Z98L6Mdo3lwH_jkqiBdh5wCLcBGAsYHQ/s0/tenor.gif' alt='its okay' />
        </div>
      </div>
      <b-button v-if='currentIndex === $store.state.vocabulary_sets.learningVocabSet.length && !isShowQuestion' @click='endLearning' variant='warning' class='font-weight-bold btn-create'>Trở về</b-button>
      <b-button @click='showQuestion' v-if='!isShowQuestion && currentIndex < $store.state.vocabulary_sets.learningVocabSet.length' variant='warning' class='font-weight-bold btn-create'>Tôi đã hiểu từ này</b-button>
<!--      <b-button @click='addCurrentIndex' v-if='isShowQuestion' variant='warning' class='font-weight-bold btn-create'>Tiếp tục</b-button>-->
    </div>
  </div>
</template>
<script>
import vueFlashcard from 'vue-flashcard';
import Swal from 'sweetalert2'
export default {
  name: 'LearnDefaultSets',
  components : { vueFlashcard },
  data() {
    return {
      vocab: [],
      currentIndex: 0,
      isShowQuestion: false,
      answer: '',
      countTrueAnswer: 0,
    }
  },
  methods: {
    addCurrentIndex() {
      this.currentIndex++
      this.isShowQuestion = false
    },
    endLearning() {
      this.$router.push("/default-topics")
    },
    showQuestion() {
      this.isShowQuestion = true
    },
    learnVocab(id, word) {
      if(this.answer === word) {
        Swal.fire({
          title: 'Yeah quá giỏi',
          text: "Bạn đã trả lời đúng rồi",
          showConfirmButton: false,
          timer: 1500,
          icon: 'success',
        })
        this.$store.dispatch('vocabulary_sets/reviewVocabularies', {vocab_id: id, answer: '0', user_id: this.$auth.user.id})
        this.countTrueAnswer++;
        this.addCurrentIndex();
        this.answer = ''
      } else {
        Swal.fire({
          title: 'Oh no bạn đã sai rồi',
          text: "Đáp án phải là " + word,
          showConfirmButton: false,
          icon: 'warning',
          timer: 2500,
        })
        this.$store.dispatch('vocabulary_sets/reviewVocabularies', {vocab_id: id, answer: '1', user_id: this.$auth.user.id})
        this.addCurrentIndex();
        this.answer = ''
      }
    },
    playSound(sound) {
      console.log(sound)
      const snd = new Audio(sound)
      console.log(snd)
      snd.play();
    }
  }
}
</script>
<style scoped>
.btn-sound {
  margin-top: -310px;
  margin-left: 920px;
}
</style>
<style>
.card-header, .card-footer {
  background-color: white;
  border: 0;
  padding: 5px;
}

.flashcard {
  height: 330px;
}

.card-content img {
  max-width: 200px;
  max-height: 160px;
}

.card-header {
  padding-bottom: 0 !important;
}
</style>
