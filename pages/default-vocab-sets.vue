<template>
  <div class='px-5 w-100'>
    <div class='d-flex justify-content-end mb-3' v-if='$auth.user.role === "admin"'>
      <nuxt-link to='create-default-vocab-set'><b-button variant='warning' class='font-weight-bold btn-create'>+     Thêm bộ từ</b-button></nuxt-link>
    </div>
    <b-row style='margin-top: -4%;'>
      <template v-for="set in $store.state.vocabulary_sets.default_sets">
        <DefaultVocabSetsDetail :key="set.id" :data="set" />
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
export default {
  name: 'Default vocab sets',
  components: { DefaultVocabSetsDetail, InfiniteLoading },
  data() {
    return {

    }
  },
  methods: {
    infiniteHandler($state) {
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
  },
  mounted() {
    this.$store.commit('vocabulary_sets/RESET_DEFAULT_SETS')
  }
}
</script>
