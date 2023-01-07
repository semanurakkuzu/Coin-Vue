<template>
  <GChart :type="type" :data="chartData" :options="options" />
</template>

<script>
import { GChart } from 'vue-google-charts/legacy'
import { mapState } from 'vuex'
export default {
  name: 'pieChart',
  components: {
    GChart
  },
  data() {
    return {
      type: 'PieChart',
      options: {
        width: 800,
        height: 600,
        colors: [
          '#af7af5',
          '#e1c7ec',
          '#b254be',
          '#db92d5',
          '#be4eb5',
          '#8b3896'
        ],
        backgroundColor: 'transparent',
        legend: {
          position: 'bottom',
          color: 'white',
          textStyle: { color: 'white', fontSize: 12 }
        },
        pieSliceBorderColor: 'transparent',
        chartArea: { right: 0, width: '80%', height: '80%' }
      }
    }
  },
  computed: {
    ...mapState(['myPortfolio']),
    chartData() {
      let mapChart = this.myPortfolio.map(({ symbol, quantity }) => {
        return [symbol, Number(quantity)]
      })
      mapChart.splice(0, 0, ['Task', 'Coin'])
      return mapChart
    }
  }
}
</script>
