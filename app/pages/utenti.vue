<template>
  <div class="page-container">
    <h1>Utenti</h1>

    <Button class="mb-3" @click="showForm = true">
      <i class="fa-solid fa-plus" style="margin-right: 0.5rem;"></i>
      Aggiungi Utente
    </Button>

    <DataTable :value="utenti" class="biblioteca-table" :paginator="true" :rows="5">
      <Column field="id" header="ID" :sortable="true" />
      <Column field="nome" header="Nome" :sortable="true" />
      <Column field="cognome" header="Cognome" />
      <Column field="email" header="Email" />
      <Column header="Azioni">
        <template #body="slotProps">
          <Button text @click="editUtente(slotProps.data)" class="mr-2">
            <i class="fa-solid fa-pen" style="margin-right: 0.3rem;"></i>
            Modifica
          </Button>
          <Button text severity="danger" @click="removeUtente(slotProps.data.id)">
            <i class="fa-solid fa-trash" style="margin-right: 0.3rem;"></i>
            Elimina
          </Button>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showForm" :header="editingId ? 'Modifica Utente' : 'Aggiungi Utente'">
      <form @submit.prevent="saveUtente" class="form-grid">
        <div class="field">
          <label>Nome *</label>
          <input v-model="form.nome" placeholder="Nome" required />
        </div>
        <div class="field">
          <label>Cognome *</label>
          <input v-model="form.cognome" placeholder="Cognome" required />
        </div>
        <div class="field">
          <label>Email *</label>
          <input v-model="form.email" type="email" placeholder="Email" required />
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
import { getUtenti, createUtente, updateUtente, deleteUtente } from '~/composables/api.js'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const utenti = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ nome: '', cognome: '', email: '' })

onMounted(async () => {
  try {
    utenti.value = await getUtenti()
  } catch (err) {
    console.error('Errore caricamento utenti:', err)
  }
})

const saveUtente = async () => {
  try {
    if (editingId.value) {
      const updated = await updateUtente(editingId.value, form.value)
      const i = utenti.value.findIndex(u => u.id === editingId.value)
      if (i !== -1) utenti.value[i] = updated
    } else {
      const nuovo = await createUtente(form.value)
      utenti.value.push(nuovo)
    }
    resetForm()
  } catch (err) {
    console.error('Errore salvataggio utente:', err)
  }
}

const editUtente = (utente) => {
  editingId.value = utente.id
  form.value = { ...utente }
  showForm.value = true
}

const removeUtente = async (id) => {
  if (!confirm('Confermi l’eliminazione di questo utente?')) return
  try {
    await deleteUtente(id)
    utenti.value = utenti.value.filter(u => u.id !== id)
  } catch (err) {
    console.error('Errore eliminazione utente:', err)
  }
}

const resetForm = () => {
  showForm.value = false
  editingId.value = null
  form.value = { nome: '', cognome: '', email: '' }
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

.field input {
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
</style>
