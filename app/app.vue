<template>
  <div id="app">
    <NuxtPage />
    <footer>
      📖 Biblioteca Virtuale • Scegli il tuo libro
    </footer>
  </div>
</template>

<script setup></script>

<style>
body {
  margin: 0;
  font-family: Georgia, serif;
  background: #6e4f3d;
  color: #fdf3e6;
}

a {
  color: #e8d5c4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #e8d5c4;
  background: #5b3a29;
  margin-top: auto;
}
</style>