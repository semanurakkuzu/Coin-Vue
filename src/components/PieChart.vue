<template>
  <g-chart :type="type" :data="chartData" :options="options" />
</template>

<script>
import { GChart } from 'vue-google-charts/legacy'
import { mapState } from 'vuex'
export default {
  name: 'PieChart',
  components: {
    GChart
  },
  data() {
    return {
      type: 'PieChart',
      options: {
        maxwidth: 800,
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
        
      }
    }
  },
  computed: {
    ...mapState(['myPortfolio']),
    chartData() {
      let mapChart = this.myPortfolio.map(({ symbol, quantity }) => {
        return [symbol, Number(quantity)]
      })

      return [
        ['Task', 'Coin'],
        ...mapChart
      ]
    }
  },
 
}
</script>
