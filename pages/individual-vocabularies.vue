<template>
  <div class='px-5 w-100'>
    <div class='d-flex justify-content-between'>
      <div>
        <h3>{{$store.state.vocabulary_sets.currentVocabSet.title}}</h3>
      </div>
      <div>
        <b-button variant='warning' @click='addVocab' class='font-weight-bold btn-create'>+     Thêm từ vựng</b-button>
      </div>
    </div>
    <div class='mt-4' v-for='vocab in $store.state.vocabulary_sets.learningVocabSet' v-bind:key='vocab.id'>
      <b-card class='border-0 bg-white shadow mb-5'>
        <template #header>
          <div class='d-flex justify-content-end'>
            <b-button class='border-0' v-if='banEdit || currentVocabId !== vocab.id' style='background-color: #F7F7F7;' @click='editVocab(vocab.id, vocab.word, vocab.definition, vocab.definition_image)'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </b-button>
            <b-button v-else class='border-0' style='background-color: #F7F7F7;' @click='submitEditVocab'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            </b-button>
            <b-button class='border-0' style='background-color: #F7F7F7; margin-left: 1%;' @click='deleteVocab(vocab.id, vocab.word, vocab.definition, vocab.definition_image)'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </b-button>
          </div>
        </template>
        <div class='d-flex' v-if='banEdit || currentVocabId !== vocab.id'>
          <div style='width: 80%; margin-right: 5%;'>
            <b-card-text class='d-flex custom-card w-100'>
              <div style='width: 48%; margin-right: 4%;'>
                <h5>Từ</h5>
                <b-input @change='saveEditInfo(vocab.id, vocab.word, vocab.definition, vocab.definition_image)' :disabled='banEdit || currentVocabId !== vocab.id' v-model='vocab.word' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
              <div style='width: 48%;'>
                <h5>Nghĩa</h5>
                <b-input :disabled='banEdit || currentVocabId !== vocab.id' v-model='vocab.definition' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
            </b-card-text>
            <b-card-text class='mt-2'>
              <h5>Ảnh minh họa</h5>
              <b-input :disabled='banEdit || currentVocabId !== vocab.id' v-model='vocab.definition_image' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
            </b-card-text>
          </div>
          <div style='width: 15%;'>
            <b-button class='w-100 h-100 bg-white p-0' style='border: 2px dashed gray;'>
              <img :src='vocab.definition_image' style='max-width: 146px; max-height: 156px;' alt='Anh minh hoa' />
            </b-button>
          </div>
        </div>
        <div class='d-flex' v-else>
          <div style='width: 80%; margin-right: 5%;'>
            <b-card-text class='d-flex custom-card w-100'>
              <div style='width: 48%; margin-right: 4%;'>
                <h5>Từ</h5>
                <b-input v-model='currentVocabWord' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
              <div style='width: 48%;'>
                <h5>Nghĩa</h5>
                <b-input v-model='currentVocabDefinition' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
            </b-card-text>
            <b-card-text class='mt-2'>
              <h5>Ảnh minh họa</h5>
              <b-input v-model='currentVocabImage' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
            </b-card-text>
          </div>
          <div style='width: 15%;'>
            <b-button class='w-100 h-100 bg-white p-0' style='border: 2px dashed gray;'>
              <img :src='currentVocabImage' style='max-width: 146px; max-height: 156px;' alt='Anh minh hoa' />
            </b-button>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: "IndividualVocabulary",
  data() {
    return {
      vocabularies: [],
      banEdit: true,
      currentVocabId: 0,
      currentVocabWord: '',
      currentVocabDefinition: '',
      currentVocabImage: '',
    }
  },
  methods: {
    addVocab() {
      this.$router.push('/add-vocabularies');
    },
    deleteVocab(id) {
      this.$store.dispatch('vocabulary_sets/deleteVocab', {vocabularies_id: id}).then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.$store.commit('vocabulary_sets/RESET_LEARNING_VOCAB_SET')
          this.$store.dispatch('vocabulary_sets/showVocabularies', this.$store.state.vocabulary_sets.currentVocabSet.id).then((response) => {
            if (response.data.success) {
              this.$store.commit('vocabulary_sets/ADD_LEARNING_VOCAB_SET', response.data.data.vocabularies)
            } else {
              Swal.fire({
                title: 'Thông báo',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500,
                icon: 'error',
              })
            }
          })
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: "Có lỗi xảy ra!",
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    },

    editVocab(id, word, definition, image) {
      this.banEdit = false
      this.currentVocabId = id
      this.currentVocabWord = word
      this.currentVocabDefinition = definition
      this.currentVocabImage = image
    },

    submitEditVocab() {
      const vocabParam = {
        id: this.currentVocabId,
        word: this.currentVocabWord,
        word_lang: 'en',
        def_lang: 'vi',
        definition: this.currentVocabDefinition,
        definition_image: this.currentVocabImage
      }
      this.$store.dispatch('vocabulary_sets/updateVocab', vocabParam).then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.$store.commit('vocabulary_sets/RESET_LEARNING_VOCAB_SET')
          this.$store.dispatch('vocabulary_sets/showVocabularies', this.$store.state.vocabulary_sets.currentVocabSet.id).then((response) => {
            if (response.data.success) {
              this.$store.commit('vocabulary_sets/ADD_LEARNING_VOCAB_SET', response.data.data.vocabularies)
            } else {
              Swal.fire({
                title: 'Thông báo',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500,
                icon: 'error',
              })
            }
          })
          this.banEdit = true
          this.currentVocabId = 0
          this.currentVocabWord = ''
          this.currentVocabDefinition = ''
          this.currentVocabImage = ''
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: "Có lỗi xảy ra!",
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    },
    saveEditInfo(id, word, definition, image) {
      this.$store.commit('vocabulary_sets/UPDATE_LEARNING_VOCAB_INFO', {id, word, definition, image})
    },
  },
}
</script>
<style>
button:checked {
  border: 0;
}
</style>
