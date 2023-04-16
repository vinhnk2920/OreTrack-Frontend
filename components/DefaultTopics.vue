<template>
  <b-col class='col-4 mt-5'>
    <button class='h-100 w-100 border-0 bg-white'>
      <b-card class='shadow-lg border-0 cursor-pointer h-100'>
        <b-card-text v-if='data.created_user_id === $auth.user.id' class='d-flex justify-content-end bg-white text-warning'>
          <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content @click='updateTopicId(data.id)'>
              <svg @click='updateTopicId(data.id)' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              </svg>
            </template>
            <b-dropdown-item><nuxt-link to='/edit-default-topics'  style='color: black;'>Sửa thông tin</nuxt-link></b-dropdown-item>
            <b-dropdown-item @click='deleteDefaultTopic(data.id)'>Xóa</b-dropdown-item>
          </b-dropdown>
        </b-card-text>
        <b-card-text @click='openListVocabSet(data.id)' class='d-flex justify-content-center'>
          <img :src='data.image' style='width: 50%; min-height: 145px; max-height: 146px;' class='rounded-circle' alt='ava' />
        </b-card-text>
        <b-card-text @click='openListVocabSet(data.id)' class='border-top pt-2'>
          <h4 class='my-2'>{{data.name}}</h4>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-bullseye" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg> <span class='ml-2'>{{data.target}}</span></p>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E0A800" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
          </svg><span class='ml-2'>{{data.description}}</span></p>
        </b-card-text>
      </b-card>
    </button>
  </b-col>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'DefaultTopics',
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  methods: {
    updateTopicId(id) {
      this.$store.commit('vocabulary_sets/SET_UPDATE_TOPIC', id)
    },
    deleteDefaultTopic(id) {
      this.$store.dispatch('vocabulary_sets/deleteDefaultTopic', {default_topics_id: id}).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.$store.commit('vocabulary_sets/RESET_DEFAULT_TOPICS')
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
        .dispatch('vocabulary_sets/getDefaultTopics', {page: self.$store.state.vocabulary_sets.query.page})
        .then((response) => {
          if(response.data.success){
            self.$store.state.loading = false
          }
          if (response.data.data.topics.data.length) {
            self.$store.commit('vocabulary_sets/ADD_PAGE')
            self.$store.commit(
              'vocabulary_sets/SET_DEFAULT_TOPICS',
              response.data.data.topics.data
            )
            $state.loaded()
          }
        })
        .catch((err) => {
          this.$store.state.loading = false
        })
    },
    openListVocabSet(topic_id) {
      this.$store.commit('vocabulary_sets/ADD_TOPIC_ID', topic_id)
          this.$router.push('/default-vocab-sets')
    }
  },
}
</script>
