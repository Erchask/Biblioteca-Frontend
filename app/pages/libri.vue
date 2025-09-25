<template>
  <div class="page-container">
    <h1>Libri</h1>

    <!-- Pulsante Aggiungi Libro con icona -->
    <Button @click="showForm = true" class="mb-3" severity="success">
      <i class="fa-solid fa-plus" style="margin-right: 0.5rem;"></i>
      Aggiungi Libro
    </Button>

    <DataTable :value="libri" class="biblioteca-table" :paginator="true" :rows="5">
      <Column field="id" header="ID" :sortable="true" />
      <Column field="autore" header="Autore" :sortable="true" />
      <Column field="titolo" header="Titolo" :sortable="true" />
      <Column field="disponibile" header="Disponibile">
        <template #body="slotProps">
          <span :class="slotProps.data.disponibile ? 'status-available' : 'status-unavailable'">
            {{ slotProps.data.disponibile ? 'Disponibile' : 'Non disponibile' }}
          </span>
        </template>
      </Column>
      <Column header="Azioni">
        <template #body="slotProps">
          <Button
              severity="danger"
              text
              @click="removeLibro(slotProps.data.id)"
              class="mr-2"
          >
            <i class="fa-solid fa-trash"></i>
          </Button>
        </template>
      </Column>
    </DataTable>

    <!-- Dialog Form -->
    <Dialog v-model:visible="showForm" header="Aggiungi Libro">
      <form @submit.prevent="saveLibro" class="form-grid">
        <div class="field">
          <label>Titolo *</label>
          <input v-model="form.titolo" placeholder="Titolo del libro" required />
        </div>
        <div class="field">
          <label>Autore *</label>
          <input v-model="form.autore" placeholder="Autore del libro" required />
        </div>
        <div class="field">
          <label>Disponibile</label>
          <select v-model="form.disponibile">
            <option :value="true">Sì</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="form-actions">
          <Button type="submit" severity="success">
            <i class="fa-solid fa-floppy-disk" style="margin-right: 0.3rem;"></i>
            Salva
          </Button>
          <Button label="Annulla" severity="secondary" outlined @click="resetForm" class="ml-2">
            <i class="fa-solid fa-xmark" style="margin-right: 0.3rem;"></i>
            Annulla
          </Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLibri, createLibro, deleteLibro as apiDeleteLibro } from '~/composables/api.js'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const libri = ref([])
const showForm = ref(false)
const form = ref({ titolo: '', autore: '', disponibile: true })

onMounted(async () => {
  await loadLibri()
})

const loadLibri = async () => {
  try {
    libri.value = await getLibri()
  } catch (err) {
    console.error('Errore caricamento libri:', err)
  }
}

const saveLibro = async () => {
  try {
    const nuovo = await createLibro(form.value)
    libri.value.push(nuovo)
    resetForm()
  } catch (err) {
    console.error('Errore salvataggio libro:', err)
  }
}

const removeLibro = async (id) => {
  if (!confirm('Confermi l’eliminazione di questo libro?')) return

  try {
    await apiDeleteLibro(id)
    libri.value = libri.value.filter(l => l.id !== id)
  } catch (err) {
    console.error('Errore eliminazione libro:', err)
  }
}

const resetForm = () => {
  showForm.value = false
  form.value = { titolo: '', autore: '', disponibile: true }
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
  background: #ffffff;
  margin-top: 1rem;
}

.biblioteca-table .p-datatable-thead > tr > th {
  background: #ffffff;
  color: #3e2f1c;
  font-weight: bold;
}

.biblioteca-table .p-datatable-tbody > tr:hover {
  background: #f9f9f9;
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

.status-available {
  color: #28a745;
  font-weight: 500;
}

.status-unavailable {
  color: #dc3545;
  font-weight: 500;
}
</style>
