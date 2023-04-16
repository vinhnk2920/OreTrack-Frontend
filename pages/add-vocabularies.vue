<template>
  <div class='px-5 w-100'>
    <h3 class='mb-3'>{{$store.state.vocabulary_sets.currentVocabSet.title}}</h3>
    <div v-for='vocab in added_vocabularies' v-bind:key='vocab.key'>
      <b-card class='border-0 bg-white shadow mb-5'>
        <template #header>
          <b-button @click='deleteVocab(vocab.key)' class='border-0' style='background-color: #F7F7F7; margin-left: 97%;'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </b-button>
        </template>
        <div class='d-flex'>
          <div style='width: 80%; margin-right: 5%;'>
            <b-card-text class='d-flex custom-card w-100'>
              <div style='width: 48%; margin-right: 4%;'>
                <h5>Từ</h5>
                <b-input v-model='vocab.word' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
              <div style='width: 48%;'>
                <h5>Nghĩa</h5>
                <b-input v-model='vocab.definition' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
              </div>
            </b-card-text>
            <b-card-text class='mt-2'>
              <h5>Ảnh minh họa</h5>
              <b-input v-model='vocab.definition_image' class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0' />
            </b-card-text>
          </div>
          <div style='width: 15%;'>
            <b-button class='w-100 h-100 bg-white p-0' style='border: 2px dashed gray;'>
              <img :src='vocab.definition_image' style='max-width: 145px; max-height: 156px;' alt='Hinh minh hoa' />
            </b-button>
          </div>
        </div>
      </b-card>
    </div>
    <div class='mt-5 w-100'>
      <b-button variant='warning' @click='addVocab' class='font-weight-bold rounded w-100 py-2'>THÊM THẺ TỪ VỰNG
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-plus mb-2" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </b-button>
    </div>
    <div class='mt-5 d-flex justify-content-end'>
      <b-button @click='saveVocabularies' variant='warning' class='font-weight-bold btn-create'>Cập nhật bộ từ vựng</b-button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'AddVocabularies',
  data() {
    return {
      isShowImage: false,
      added_vocabularies: [
        {
          key: 1,
          word: '',
          definition: '',
          word_lang: 'english',
          def_lang: 'vietnamese',
          definition_image: '',
        }
      ]
    }
  },
  methods: {
    addVocab() {
      const blankVocab = {
        key: this.added_vocabularies.length+1,
        word: '',
        definition: '',
        word_lang: 'english',
        def_lang: 'vietnamese',
        definition_image: '',
      }
      this.added_vocabularies.push(blankVocab)
    },
    deleteVocab(key) {
      this.added_vocabularies.splice(key-1, 1);
    },
    saveVocabularies() {
      let vocab = {
        added_vocabularies: this.added_vocabularies,
        def_lang: "vietnamese",
        word_lang: "english",
        vocabulary_set_id: this.$store.state.vocabulary_sets.currentVocabSet.id,
        created_user_id: this.$store.state.vocabulary_sets.currentVocabSet.created_user_id,
      }
      this.$store.dispatch('vocabulary_sets/createVocabularies', vocab).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.added_vocabularies = [
            {
              key: 1,
              word: '',
              definition: '',
              word_lang: 'english',
              def_lang: 'vietnamese',
              definition_image: '',
            }
          ]
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
          this.$router.push('/individual-vocabularies')
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: "Hãy nhập đủ các trường cần thiết!",
            showConfirmButton: false,
            icon: 'error',
          })
        }
      })
    }
  }
}
</script>
