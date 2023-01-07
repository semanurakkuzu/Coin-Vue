<template>
  <div class="container-fluid bg-color">
    <div class="container p-50">
      <div class="rounded-2 bg-container box-shadow">
        <div class="row mx-3 pt-3 align-items-center">
          <div class="col-md-12 col-lg p-0 mb-3">
            <div>
              <img src="@/img/coin_logo.png" class="logo-size" />
            </div>
          </div>
          <div class="col-md-12 col-lg-auto p-0 mb-3">
            <button
              class="btn btn-primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Stock
            </button>
            <button class="btn btn-primary" @click="fetchAllCoin">
              Refresh
            </button>
          </div>
          <div v-if="myPortfolio.length === 0" class="alert alert-warning" role="alert">
            <h4 class="alert-heading">My Portfolio</h4>
            <p>
              You don't have any coin in your portfolio. You can click the add
              button to list and add symbols.
            </p>
          </div>
        </div>
        <div v-if="newCoinList.length > 0" class="row align-items-center mx-3">
          <div class="col-md-12 col-lg p-0">
            <portfolio-item
              v-for="coin in newCoinList"
              :key="coin.symbol"
              :coin="coin"
              @remove-item="removeItem"
              @update-item="updateItem"
            ></portfolio-item>
          </div>
          <div class="col-md-12 col-lg p-0">
            <pie-chart></pie-chart>
          </div>
        </div>
      </div>
    </div>
    <search-modal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PieChart from './PieChart.vue'
import PortfolioItem from './PortfolioItem.vue'
import SearchModal from './SearchModal.vue'

export default {
  components: { PieChart, PortfolioItem, SearchModal },
  name: 'HomePage',
  created() {
    let registeredData = JSON.parse(localStorage.getItem('registeredData'))

    if (registeredData) {
      this.setMyPortfolio(registeredData)
    }

    setInterval(() => {
      this.fetchAllCoin()
    }, 1000 * 60 * 20) // every 20 min.
  },
  computed: {
    ...mapState(['coinList', 'myPortfolio']),
    newCoinList() {
      if (this.coinList.length === 0) {
        return []
      }

      return this.myPortfolio.map((myPortfolioCoin) => {
        let { lastPrice, weightedAvgPrice } = this.coinList.find(
          (coinListCoin) => coinListCoin.symbol === myPortfolioCoin.symbol
        )

        return {
          ...myPortfolioCoin,
          lastPrice,
          weightedAvgPrice
        }
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchAllCoin',
      'removeMyPortfolio',
      'updateMyPortfolio',
      'setMyPortfolio'
    ]),
    removeItem(coinSymbol) {
      this.removeMyPortfolio(coinSymbol)
    },
    updateItem({ coinSymbol, inputNumberValue }) {
      this.updateMyPortfolio({ coinSymbol, inputNumberValue })
    }
  }
}
</script>

<style scoped>
.bg-color {
  background: rgb(91, 15, 97);
  background: radial-gradient(
    circle,
    rgba(91, 15, 97, 1) 0%,
    rgba(41, 13, 83, 1) 94%
  );
  min-height: 100vh;
  background-attachment: scroll;
}

.p-50 {
  padding-top: 50px;
}

.logo-size {
  width: 80px;
  height: 30px;
}

.bg-container {
  background: rgb(7 3 28 / 56%);
}

.box-shadow {
  box-shadow: 11px 12px 17px -7px rgba(0, 0, 0, 0.41);
}
</style>
