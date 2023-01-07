import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    coinList: [],
    myPortfolio: []
  }),

  mutations: {
    SET_COIN_LIST(state, coinList) {
      state.coinList = coinList
    },
    SET_MY_PORTFOLIO(state, myPortfolio) {
      state.myPortfolio = myPortfolio
    },
    ADD_MY_PORTFOLIO(state, { coinSymbol, inputNumberValue }) {
      state.myPortfolio.push({
        symbol: coinSymbol,
        quantity: inputNumberValue
      })
      localStorage.setItem('registeredData', JSON.stringify(state.myPortfolio))
    },
    REMOVE_MY_PORTFOLIO(state, coinSymbol) {
      const index = state.myPortfolio.findIndex(
        (item) => item.symbol == coinSymbol
      )
      state.myPortfolio.splice(index, 1)
      localStorage.setItem('registeredData', JSON.stringify(state.myPortfolio))
    },
    UPDATE_MY_PORTFOLIO(state, { coinSymbol, inputNumberValue }) {
      const updateItemIndex = state.myPortfolio.findIndex(
        (item) => item.symbol == coinSymbol
      )
      state.myPortfolio[updateItemIndex].quantity = inputNumberValue
      localStorage.setItem('registeredData', JSON.stringify(state.myPortfolio))
    }
  },

  actions: {
    fetchAllCoin({ commit }) {
      return fetch('https://api2.binance.com/api/v3/ticker/24hr')
        .then((response) => response.json())
        .then((data) => {
          commit('SET_COIN_LIST', data)
        })
        .catch((err) => console.error(err))
    },
    addMyPortfolio({ commit }, { coinSymbol, inputNumberValue }) {
      commit('ADD_MY_PORTFOLIO', { coinSymbol, inputNumberValue })
    },
    setMyPortfolio({ commit }, myPortfolio) {
      commit('SET_MY_PORTFOLIO', myPortfolio)
    },
    removeMyPortfolio({ commit }, coinSymbol) {
      commit('REMOVE_MY_PORTFOLIO', coinSymbol)
    },
    updateMyPortfolio({ commit }, { coinSymbol, inputNumberValue }) {
      commit('UPDATE_MY_PORTFOLIO', { coinSymbol, inputNumberValue })
    }
  }
})
