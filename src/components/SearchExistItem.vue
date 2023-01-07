<template>
  <div>
    <div class="card rounded-2">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <span>{{ coin.symbol }}</span>
          </div>
          <div class="col-auto">
            <button class="btn btn-warning" @click="updateItem">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger ms-2" @click="removeItem">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-text">
          <div class="row align-items-center">
            <div class="col">
              <span>Last Price: </span>
              <span>{{ coin.lastPrice }}</span>
            </div>
            <div class="col-auto">
              <input
                class="text-center input-bg-color"
                type="number"
                min="1"
                max="9999"
                v-model="inputNumberValue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchExistItem',
  props: {
    coin: {
      type: Object
    }
  },
  created() {
    this.inputNumberValue = this.getMyPorfolioQuantityOfCoin() ?? 1
  },
  data() {
    return {
      inputNumberValue: 1
    }
  },
  computed: {
    ...mapState(['myPortfolio'])
  },
  methods: {
    getMyPorfolioQuantityOfCoin() {
      var index = this.myPortfolio.findIndex(
        (item) => item.symbol == this.coin.symbol
      )
      return this.myPortfolio[index].quantity
    },
    updateItem() {
      this.$emit('update-item', {
        coinSymbol: this.coin.symbol,
        inputNumberValue: this.inputNumberValue
      })
    },
    removeItem() {
      this.$emit('remove-item', this.coin.symbol)
    }
  }
}
</script>

<style scoped>
.input-bg-color {
  background: #e1c7ec;
}
</style>
