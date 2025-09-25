<template>
  <div class="welcome-container">
    <h1>📚Benvenuto nella Biblioteca📚</h1>
    <p class="subtitle">Scegli un libro dallo scaffale</p>

    <div class="scaffale-container">
      <div class="Libri">
        <div class="book book-libri" @click="goTo('libri')">Libri</div>
        <div class="book book-utenti" @click="goTo('utenti')">Utenti</div>
        <div class="book book-prestiti" @click="goTo('prestiti')">Prestiti</div>
        <div class="book book-statistiche" @click="goTo('statistiche')">Statistiche</div>
      </div>
      <div class="scaffale"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goTo = (pagina) => router.push(`/${pagina}`)
</script>

<style scoped>
.welcome-container {
  padding: 3rem 1.5rem;
  text-align: center;
  background-color: #6e4f3d;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fdf3e6;
  font-family: Georgia, serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-style: italic;
  color: #ddc5af;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.scaffale-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.Libri {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: -10px;
  z-index: 2;
  position: relative;
}

.book {
  width: 120px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  border-radius: 6px 6px 0 0;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.book:hover {
  transform: translateY(-10px);
}

.book-libri { background-color: #d63031; }
.book-utenti { background-color: #00b894; }
.book-prestiti { background-color: #0984e3; }
.book-statistiche { background-color: #fdcb6e; }

.scaffale {
  height: 20px;
  background-color: #5b3a29;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>
