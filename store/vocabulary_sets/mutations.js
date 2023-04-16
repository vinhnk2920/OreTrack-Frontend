import {
  ADD_DEFAULT_SETS,
  ADD_PAGE,
  ADD_VOCAB_SETS,
  RESET_VOCAB_SETS,
  SET_DATA,
  RESET_DEFAULT_SETS,
  SET_UPDATE_SET,
  RESET_PAGE,
  SET_DEFAULT_TOPICS,
  RESET_DEFAULT_TOPICS,
  ADD_TOPIC_ID,
  ADD_CURRENT_VOCAB_SET,
  ADD_LEARNING_VOCAB_SET,
  RESET_LEARNING_VOCAB_SET,
  UPDATE_LEARNING_VOCAB_INFO,
  ADD_COUNT_LEVEL,
  ADD_REVIEW_LIST, ADD_REVIEW_SETS, SET_UPDATE_TOPIC, SET_EDITED_TOPIC, SET_USERS, RESET_USERS
} from './mutation-types'
export default {
  /**
   *
   * @param state
   * @param { string } data
   */
  [SET_DATA](state, { data }) {
    state.data = data
  },

  [ADD_VOCAB_SETS](state, sets) {
    state.vocabulary_sets.push(...sets)
  },

  [ADD_PAGE](state){
    ++state.query.page
  },

  [RESET_VOCAB_SETS](state){
    state.query.page = 1
    state.vocabulary_sets = []
  },

  [RESET_DEFAULT_SETS](state) {
    state.default_sets = []
    state.query.page = 1
  },

  [ADD_DEFAULT_SETS](state, sets){
    state.default_sets.push(...sets)
  },

  [SET_UPDATE_SET](state, id) {
    state.currentId = id
  },

  [SET_UPDATE_TOPIC](state, id) {
    state.currentTopic = id
  },

  [SET_EDITED_TOPIC](state, topic) {
    state.pickedTopic = topic
  },

  [RESET_PAGE](state) {
    state.query.page = 1
  },

  [SET_DEFAULT_TOPICS](state, topics){
    state.default_topics.push(...topics)
  },

  [RESET_DEFAULT_TOPICS](state) {
    state.default_topics = []
    state.query.page = 1
  },

  [ADD_TOPIC_ID](state, id) {
    state.topic_id = id
  },

  [ADD_CURRENT_VOCAB_SET](state, set) {
    state.currentVocabSet = set
  },

  [ADD_LEARNING_VOCAB_SET](state,set) {
    state.learningVocabSet = set
  },

  [RESET_LEARNING_VOCAB_SET](state) {
    state.query.page = 1
    state.learningVocabSet = []
  },

  [UPDATE_LEARNING_VOCAB_INFO](state, {id, word, definition, image}) {
    const index = state.learningVocabSet.findIndex(vocab => vocab.id === id);
    state.learningVocabSet[index].word = word
    state.learningVocabSet[index].definition = definition
    state.learningVocabSet[index].definition_image = image
  },

  [ADD_COUNT_LEVEL](state, level) {
    state.vocabLevel = level
  },

  [ADD_REVIEW_LIST](state, {reviewList, count}) {
    state.reviewList = reviewList
    state.reviewCount = count
  },

  [ADD_REVIEW_SETS] (state, sets) {
    state.reviewSets = sets
  },

  [SET_USERS](state, users) {
  state.users = users
  },

  [RESET_USERS](state) {
    state.users = []
  },
}
