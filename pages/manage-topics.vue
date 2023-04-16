<template>
  <div class='px-5 w-100'>
    <div class='d-flex justify-content-end mb-3'>
      <b-button variant='warning' @click='addTopic' class='font-weight-bold btn-create'>+     Thêm chủ đề</b-button>
    </div>
    <b-row style='margin-top: -4%;'>
      <template v-for="topic in $store.state.vocabulary_sets.default_topics">
        <DefaultTopics :key="topic.id" :data="topic" />
      </template>
    </b-row>

    <infinite-loading
      @infinite="infiniteHandler"
    >
      <span slot="spinner"></span>
      <div slot="no-more">
        <div class="mt-3">Hết</div>
      </div>
    </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import DefaultVocabSetsDetail from '~/components/DefaultVocabSetsDetail'
import DefaultTopics from '~/components/DefaultTopics'
export default {
  name: 'manage topics',
  components: { DefaultTopics, DefaultVocabSetsDetail, InfiniteLoading },
  data() {
    return {

    }
  },
  methods: {
    infiniteHandler($state) {
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
    addTopic() {
      this.$router.push('/add-topic')
    }
  },
  mounted() {
    this.$store.commit('vocabulary_sets/RESET_DEFAULT_TOPICS')
  }
}
</script>
