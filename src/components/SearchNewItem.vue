<template>
  <div>
    <div class="card rounded-2">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <span>{{ coin.symbol }}</span>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary px ms-4" @click="addItem">
              <i class="bi bi-plus-square"></i>
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
export default {
  name: 'SearchNewAItem',
  props: {
    coin: {
      type: Object
    }
  },
  data() {
    return {
      inputNumberValue: 1
    }
  },
  methods: {
    addItem() {
      this.$emit('add-item', this.coin.symbol, this.inputNumberValue)
    }
  }
}
</script>

<style scoped>
.input-bg-color {
  background: #e1c7ec;
}

.px {
  padding-right: 36px;
  padding-left: 36px;
}
</style>
