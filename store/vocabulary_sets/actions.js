import axios from 'axios'

/**
 *
 * @param { function } commit
 * @param params
 * @param { string } data
 */

export function getVocabSets({ commit, state }, params) {
  return axios.get(`/vocabulary_sets`, { params })
}

export function getDefaultSets({ commit, state }, params) {
  return axios.get(`/vocabulary_sets/default`, { params })
}

export function getDefaultTopics({ commit, state }, params) {
  return axios.get(`/topics`, { params })
}

export function createDefaultTopic({ commit, state }, params) {
  return axios.post(`/topics/create`, params)
}

export function findTopicById({ commit, state }, id) {
  return axios.get(`/topics/` + id)
}

export function updateDefaultTopic({ commit, state }, params) {
  return axios.post(`/topics/update`, params)
}

export function deleteDefaultTopic({ commit, state }, params) {
  return axios.post(`/topics/delete`, params)
}

export function getSet({ commit, state }, id) {
  return axios.get(`/vocabulary_sets/` + id)
}

export function findSetByTopic({ commit, state }, {id, page}) {
  return axios.get(`/vocabulary_sets/findByTopicId/` + id + '?page=' + page)
}

export function createVocabSet({ commit, state }, params) {
  return axios.post(`/vocabulary_sets/create`, params)
}

export function updateVocabSet({ commit, state }, params) {
  return axios.post(`/vocabulary_sets/update`, params)
}

export function deleteVocabSet({ commit, state }, params) {
  return axios.post(`/vocabulary_sets/delete`, params)
}

export function deleteVocab({ commit, state }, params) {
  return axios.post(`/vocabs/delete`, params)
}

export function updateVocab({ commit, state }, params) {
  return axios.post(`/vocabs/update`, params)
}

export function createVocabularies({ commit, state }, params) {
  return axios.post(`/vocabs/create`, params)
}

export function showVocabularies({ commit, state }, id) {
  return axios.get(`/vocabs/` + id)
}

export function reviewVocabularies({ commit, state }, params) {
  return axios.post(`/vocabs/review`, params)
}

export function countVocab({ commit, state }, id) {
  return axios.get(`/review/count-level?user_id=` + id)
}

export function showreviewList({ commit, state }, id) {
  return axios.get(`/review/vocabs?user_id=` + id)
}

export function showReviewSet({ commit, state }, id) {
  return axios.get(`/review/lately-review-sets?user_id=` + id)
}

export function findFriend({ commit, state }, params) {
  return axios.post(`/friend/findByPhoneOrEmail`, params)
}

export function addFriend({ commit, state }, params) {
  return axios.post(`/friend/addFriendRequest`, params)
}

export function deleteFriend({ commit, state }, params) {
  return axios.post(`/friend/deleteFriendRequest`, params)
}

export function showFriend({ commit, state }, params) {
  return axios.post(`/friend`, params)
}

export function updateFriendStatus({ commit, state }, params) {
  return axios.post(`/friend/updateFriendStatus`, params)
}

export function showUsers({ commit, state }, params) {
  return axios.post(`/users`, params)
}

export function deleteUser({ commit, state }, params) {
  return axios.post(`/users/delete`, params)
}




