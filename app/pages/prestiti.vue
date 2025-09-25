<template>
  <div class="page-container">
    <h1>Prestiti</h1>

    <Button class="mb-3" @click="showForm = true">
      <i class="fa-solid fa-plus" style="margin-right: 0.5rem;"></i>
      Nuovo Prestito
    </Button>

    <DataTable :value="prestiti" class="biblioteca-table" :paginator="true" :rows="5">
      <Column field="id" header="ID" :sortable="true" />
      <Column field="utente.nome" header="Utente" :sortable="true" />
      <Column field="libro.titolo" header="Libro" />
      <Column field="dataPrestito" header="Data Prestito" />
      <Column field="dataRestituzione" header="Restituito il">
        <template #body="slotProps">
          <span v-if="slotProps.data.dataRestituzione" class="status-returned">
            {{ slotProps.data.dataRestituzione }}
          </span>
          <span v-else class="status-pending">In corso</span>
        </template>
      </Column>
      <Column field="dataScadenza" header="Scadenza" />
      <Column header="Azioni">
        <template #body="slotProps">
          <Button
              v-if="!slotProps.data.dataRestituzione"
              text
              severity="success"
              @click="restituisci(slotProps.data.id)"
          >
            <i class="fa-solid fa-rotate-left" style="margin-right: 0.3rem;"></i>
            Restituisci
          </Button>
          <span v-else class="status-completed">Completato</span>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showForm" header="Nuovo Prestito">
      <form @submit.prevent="createPrestito" class="form-grid">
        <div class="field">
          <label>Utente *</label>
          <select v-model="form.utenteId" required>
            <option value="">Seleziona un utente</option>
            <option v-for="u in utenti" :key="u.id" :value="u.id">
              {{ u.nome }} {{ u.cognome }}
            </option>
          </select>
        </div>
        <div class="field">
          <label>Libro *</label>
          <select v-model="form.libroId" required>
            <option value="">Seleziona un libro</option>
            <option v-for="l in libriDisponibili" :key="l.id" :value="l.id">
              {{ l.titolo }} — {{ l.autore }}
            </option>
          </select>
        </div>
        <div class="field">
          <label>Data Prestito</label>
          <input v-model="form.dataPrestito" type="date" :max="oggi" />
        </div>
        <div class="field">
          <label>Data Scadenza</label>
          <input v-model="form.dataScadenza" type="date" :min="form.dataPrestito" />
        </div>
        <div class="form-actions">
          <Button type="submit" label="Crea Prestito" />
          <Button label="Annulla" severity="secondary" outlined @click="resetForm" class="ml-2" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getPrestiti,
  createPrestito as apiCreatePrestito,
  restituisciPrestito
} from '~/composables/api.js'
import { getUtenti } from '~/composables/api.js'
import { getLibriDisponibili } from '~/composables/api.js'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const prestiti = ref([])
const utenti = ref([])
const libriDisponibili = ref([])
const showForm = ref(false)
const oggi = new Date().toISOString().split('T')[0]

const form = ref({ utenteId: '', libroId: '', dataPrestito: oggi, dataScadenza: '' })

onMounted(async () => {
  await Promise.all([loadPrestiti(), loadUtenti(), loadLibriDisponibili()])
})

const loadPrestiti = async () => {
  try { prestiti.value = await getPrestiti() } catch (err) { console.error(err) }
}

const loadUtenti = async () => {
  try { utenti.value = await getUtenti() } catch (err) { console.error(err) }
}

const loadLibriDisponibili = async () => {
  try { libriDisponibili.value = await getLibriDisponibili() } catch (err) { console.error(err) }
}

const createPrestito = async () => {
  if (!form.value.utenteId || !form.value.libroId) return
  try {
    const nuovoPrestito = await apiCreatePrestito({
      utente: { id: parseInt(form.value.utenteId) },
      libro: { id: parseInt(form.value.libroId) },
      dataPrestito: form.value.dataPrestito,
      dataScadenza: form.value.dataScadenza
    })
    prestiti.value.unshift(nuovoPrestito)
    resetForm()
  } catch (err) { console.error(err) }
}

const restituisci = async (id) => {
  try {
    await restituisciPrestito(id)
    prestiti.value = prestiti.value.map(p =>
        p.id === id ? { ...p, dataRestituzione: new Date().toISOString().split('T')[0] } : p)
  } catch (err) { console.error(err) }
}

const resetForm = () => {
  showForm.value = false
  form.value = { utenteId: '', libroId: '', dataPrestito: oggi, dataScadenza: '' }
}
</script>

<style scoped>
.page-container {
  padding: 2rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.biblioteca-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fffefa;
  margin-top: 1rem;
}
.biblioteca-table .p-datatable-thead > tr > th {
  background: #e8dcc6 !important;
  color: #3e2f1c !important;
  font-weight: bold;
}
.biblioteca-table .p-datatable-tbody > tr:hover {
  background: #f5f1e6 !important;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
}
.field label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.field input,
.field select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.status-returned {
  color: #28a745;
  font-weight: 500;
}
.status-pending {
  color: #ffc107;
  font-weight: 500;
}
.status-completed {
  color: #6c757d;
  font-style: italic;
}
</style>
