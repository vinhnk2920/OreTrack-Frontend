<template>
  <div class='px-5 w-100'>
    <b-row style='margin-top: -4%;'>
      <template v-for="set in $store.state.vocabulary_sets.vocabulary_sets">
        <VocabSetsDetail :key="set.id" :data="set">
        </VocabSetsDetail>
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
import InfiniteLoading from 'vue-infinite-loading';
import VocabSetsDetail from '~/components/VocabSetsDetail'

export default {
  name: 'IndividualVocabSets',
  components: {
    VocabSetsDetail,
    InfiniteLoading,
  },
  methods: {
    infiniteHandler($state) {
      const self = this
      this.$store.state.loading = true
      this.$store
        .dispatch('vocabulary_sets/getVocabSets', {created_user_id: this.$auth.user.id, page: self.$store.state.vocabulary_sets.query.page})
        .then((response) => {
          self.$store.state.loading = false
          if (response.data.data.vocabulary.data.length) {
            self.$store.commit('vocabulary_sets/ADD_PAGE')
            self.$store.commit(
              'vocabulary_sets/ADD_VOCAB_SETS',
              response.data.data.vocabulary.data
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
    this.$store.commit('vocabulary_sets/RESET_VOCAB_SETS')
  }
}
</script>
