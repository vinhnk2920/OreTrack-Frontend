<template>
  <b-col class='col-4 mt-5'>
    <b-card class='shadow border-0 h-100'>
      <b-card-text v-if='data.created_user_id === $auth.user.id' class='d-flex justify-content-end bg-white text-warning'>
        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content @click='updateSetId(data.id)'>
            <svg @click='updateSetId(data.id)' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </template>
          <b-dropdown-item><nuxt-link to='/vocab-set/edit-vocab-set'  style='color: black;'>Sửa</nuxt-link></b-dropdown-item>
          <b-dropdown-item @click='addVocab(data)'>Thêm từ vựng</b-dropdown-item>
          <b-dropdown-item @click='deleteSet(data.id)'>Xóa</b-dropdown-item>
        </b-dropdown>
      </b-card-text>
      <b-card-text class='d-flex justify-content-center'>
        <img :src='data.avatar_image' style='width: 50%; min-height: 145px; max-height: 146px;' class='rounded-circle' />
      </b-card-text>
      <b-card-text class='text-center border-top pt-2'>
        <h5>{{data.title}}</h5>
        <p>{{data.description}}</p>
      </b-card-text>
      <template #footer v-if='$auth.user.role !== "admin"'>
        <div class='d-flex justify-content-center mt-0'>
          <button @click='learnVocabSet(data)' class='border border-warning bg-warning rounded-lg px-4 py-1' style='font-size: 18px;'>Học bộ từ</button>
        </div>
      </template>
    </b-card>
  </b-col>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'DefaultVocabSetsDetail',
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  methods: {
    updateSetId(id) {
      this.$store.commit('vocabulary_sets/SET_UPDATE_SET', id)
    },
    deleteSet(id) {
      this.$store.dispatch('vocabulary_sets/deleteVocabSet', {vocabulary_sets_id: id}).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.$store.commit('vocabulary_sets/RESET_DEFAULT_SETS')
          this.loadData()
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
    },
    loadData($state) {
      const self = this
      this.$store.state.loading = true
      this.$store
        .dispatch('vocabulary_sets/findSetByTopic', {id: self.$store.state.vocabulary_sets.topic_id, page: self.$store.state.vocabulary_sets.query.page})
        .then((response) => {
          self.$store.state.loading = false
          if (response.data.data.vocabulary_sets.data.length) {
            self.$store.commit('vocabulary_sets/ADD_PAGE')
            self.$store.commit(
              'vocabulary_sets/ADD_DEFAULT_SETS',
              response.data.data.vocabulary_sets.data
            )
            $state.loaded()
          }
        })
        .catch((err) => {
          this.$store.state.loading = false
        })
    },
    learnVocabSet(vocab_set) {
      this.$store.commit('vocabulary_sets/ADD_CURRENT_VOCAB_SET', vocab_set)
      this.$store.dispatch('vocabulary_sets/showVocabularies', vocab_set.id).then((response) => {
        if (response.data.success) {
          if (response.data.data.vocabularies.length > 0) {
            this.$store.commit('vocabulary_sets/ADD_LEARNING_VOCAB_SET', response.data.data.vocabularies)
            this.$router.push('/learn-default-sets')
          } else {
            Swal.fire({
              title: 'Thông báo',
              text: "Bộ từ chưa có từ vựng!",
              showConfirmButton: false,
              timer: 1500,
              icon: 'error',
            })
          }
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
    },
    addVocab(vocab_set){
      this.$store.commit('vocabulary_sets/ADD_CURRENT_VOCAB_SET', vocab_set)
      this.$store.dispatch('vocabulary_sets/showVocabularies', vocab_set.id).then((response) => {
        if (response.data.success) {
          this.$store.commit('vocabulary_sets/ADD_LEARNING_VOCAB_SET', response.data.data.vocabularies)
          this.$router.push('/individual-vocabularies')
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
    },
  },
}
</script>
