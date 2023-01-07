<template>
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content modal-bg-color">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              class="form-control"
              type="text"
              placeholder="Search..."
              v-model="inputValue"
              @keyup="filterCoin"
            />
            <p class="small text-white mt-2"> Minimum 3 characters</p>
          </div>
          <div class="mx-2" v-for="coin in filteredCoins" :key="coin.symbol">
            <search-exist-item
              v-if="isCoinExistInMyPortfolio(coin)"
              :coin="coin"
              @remove-item="removeItem"
              @update-item="updateItem"
            ></search-exist-item>
            <search-new-item
              v-else
              :coin="coin"
              @add-item="addItem"
            ></search-new-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SearchExistItem from './SearchExistItem.vue'
import SearchNewItem from './SearchNewItem.vue'
export default {
  components: { SearchExistItem, SearchNewItem },
  name: 'SearchModal',
  data() {
    return {
      inputValue: '',
      filteredCoins: []
    }
  },
  computed: {
    ...mapState(['coinList', 'myPortfolio'])
  },
  methods: {
    ...mapActions([
      'fetchAllCoin',
      'addMyPortfolio',
      'removeMyPortfolio',
      'updateMyPortfolio'
    ]),
    filterCoin() {
      if (this.inputValue.length >= 3) {
        this.filteredCoins = this.coinList.filter((coin) =>
          coin.symbol.includes(this.inputValue.toUpperCase())
        )
      }
    },
    isCoinExistInMyPortfolio(coin) {
      return (
        this.myPortfolio.filter((item) => item.symbol == coin.symbol).length > 0
      )
    },
    addItem(coinSymbol, inputNumberValue) {
      this.addMyPortfolio({ coinSymbol, inputNumberValue })
    },
    removeItem(coinSymbol) {
      this.removeMyPortfolio(coinSymbol)
    },
    updateItem({ coinSymbol, inputNumberValue }) {
      this.updateMyPortfolio({ coinSymbol, inputNumberValue })
    }
  },
  created() {
    this.fetchAllCoin()
  },
  mounted() {
    const searchModalElement = document.getElementById('staticBackdrop')
    searchModalElement.addEventListener('hidden.bs.modal', () => {
      this.inputValue = null
      this.filteredCoins = []
    })
  }
}
</script>

<style scoped>
.modal-bg-color {
  background: #4a0583 !important;
}

.btn-close:focus {
  box-shadow: none !important;
}
</style>
