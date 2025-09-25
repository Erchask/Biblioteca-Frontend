<template>
  <div class="container-tabelle">

    <!-- Libri -->
    <div class="sezione-tabella">
      <h2> Libri</h2>
      <DataTable :value="[]" class="biblioteca-table">
        <Column field="autore" header="Autore"></Column>
        <Column field="nome" header="Titolo"></Column>
        <Column field="genere" header="Genere"></Column>
        <Column field="disponibile" header="Disponibile"></Column>
      </DataTable>
    </div>

    <!-- Utenti -->
    <div class="sezione-tabella">
      <h2> Utenti</h2>
      <DataTable :value="[]" class="biblioteca-table">
        <Column field="nome" header="Nome"></Column>
        <Column field="cognome" header="Cognome"></Column>
        <Column field="email" header="Email"></Column>
      </DataTable>
    </div>

    <!-- Prestiti -->
    <div class="sezione-tabella">
      <h2> Prestiti</h2>
      <DataTable :value="[]" class="biblioteca-table">
        <Column field="utente" header="Utente"></Column>
        <Column field="nomeLibro" header="Libro"></Column>
        <Column field="dataPrestito" header="Prestito"></Column>
        <Column field="dataRestituzione" header="Restituzione"></Column>
        <Column field="dataScadenza" header="Scadenza"></Column>
      </DataTable>
    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>
.container-tabelle {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: #fdfcf7;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
  font-family: "Georgia", "Times New Roman", serif;
}

.sezione-tabella h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #3e2f1c;
  border-bottom: 2px solid #c9b79c;
  padding-bottom: 0.3rem;
}

.biblioteca-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fffefa;
}

.biblioteca-table .p-datatable-thead > tr > th {
  background: #e8dcc6 !important;
  color: #3e2f1c !important;
  font-weight: bold;
  font-size: 0.95rem;
}

.biblioteca-table .p-datatable-tbody > tr {
  transition: background 0.2s;
}

.biblioteca-table .p-datatable-tbody > tr:hover {
  background: #f5f1e6 !important;
}
</style>
