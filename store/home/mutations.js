import { ADD_DATA, SET_DATA, SET_TODAY } from './mutation-types'
export default {
  /**
   *
   * @param state
   * @param { string } data
   */
  [SET_DATA](state, { data }) {
    state.data = data
  },

  [ADD_DATA](state, tags) {
    state.data.push(...tags)
  },

  [SET_TODAY](state, date) {
    state.today = date
  }
}
