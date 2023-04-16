<template>
  <div class='px-5 w-100'>
    <div v-for='(vocab, index) in $store.state.vocabulary_sets.reviewList'>
      <div :class='index === currentIndex ? "" : "d-none"'>
        <div class='card'>
          <div class='card-body shadow-lg py-5 text-center' style='padding-left: 15%; padding-right: 15%;'>
            <h4>{{vocab.test}}</h4>
            <b-textarea v-model='answer' class='mt-5' @keydown.enter='learnVocab(vocab.vocabulary_id, vocab.word)' />
            <b-button @click='learnVocab(vocab.vocabulary_id, vocab.word)'  variant='warning' class='font-weight-bold btn-create mt-5'>Kiểm tra đáp án</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class='mt-5 text-center'>
      <div class='card mb-5' v-if='currentIndex === $store.state.vocabulary_sets.reviewList.length'>
        <div class='card-body shadow-lg py-5 text-center' style='padding-left: 15%; padding-right: 15%;'>
          <h1>Bạn đã trả lời đúng {{countTrueAnswer}}/{{$store.state.vocabulary_sets.learningVocabSet.length}}</h1>
          <img v-if='countTrueAnswer >=5' src='https://c.tenor.com/qmOrGDaaMlwAAAAC/cheer-up-cheering.gif' alt='cheer up'/>
          <img v-else src='https://1.bp.blogspot.com/-6oB00hdTzzs/YAjs5nn161I/AAAAAAAAB74/ViTuhf2mNP0Z98L6Mdo3lwH_jkqiBdh5wCLcBGAsYHQ/s0/tenor.gif' alt='its okay' />
        </div>
      </div>
      <b-button @click='endLearning' variant='warning' class='font-weight-bold btn-create'>Dừng học</b-button>
    </div>
  </div>
</template>
<script>
import vueFlashcard from 'vue-flashcard';
import Swal from 'sweetalert2'
export default {
  name: 'ReviewVocabularies',
  components : { vueFlashcard },
  data() {
    return {
      vocab: [],
      currentIndex: 0,
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
      this.$router.push("/")
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
