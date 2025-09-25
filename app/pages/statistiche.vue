<template>
  <div class="page-container">
    <h1>Statistiche Prestiti</h1>

    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import { getPrestiti } from '~/composables/api.js'


Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const chartCanvas = ref(null)
let myChart = null

const loadData = async () => {
  try {
    const prestiti = await getPrestiti()


    const countByLibro = {}
    prestiti.forEach(p => {
      const titolo = p.libro.titolo
      if (countByLibro[titolo]) {
        countByLibro[titolo] += 1
      } else {
        countByLibro[titolo] = 1
      }
    })

    const labels = Object.keys(countByLibro)
    const data = Object.values(countByLibro)


    if (myChart) myChart.destroy()
    myChart = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Numero di Prestiti',
            data,
            backgroundColor: '#28a745',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Prestiti per Libro'
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  } catch (err) {
    console.error('Errore caricamento prestiti per statistiche:', err)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  padding: 2rem;
}

.chart-container {
  max-width: 800px;
  margin: 2rem auto;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
