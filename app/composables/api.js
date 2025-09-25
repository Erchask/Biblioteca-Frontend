import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

// LIBRI
export const getLibri = async () => (await api.get('/libri')).data
export const getLibriDisponibili = async () => (await api.get('/libri/disponibili')).data
export const createLibro = async (libro) => (await api.post('/libri', libro)).data
export const updateLibro = async (id, libro) => (await api.put(`/libri/${id}`, libro)).data
export const deleteLibro = async (id) => (await api.delete(`/libri/${id}`)).data

// UTENTI
export const getUtenti = async () => (await api.get('/utenti')).data
export const createUtente = async (utente) => (await api.post('/utenti', utente)).data
export const updateUtente = async (id, utente) => (await api.put(`/utenti/${id}`, utente)).data
export const deleteUtente = async (id) => (await api.delete(`/utenti/${id}`)).data

// PRESTITI
export const getPrestiti = async () => (await api.get('/prestiti')).data
export const createPrestito = async (prestito) => (await api.post('/prestiti', prestito)).data
export const restituisciPrestito = async (id) => (await api.put(`/prestiti/${id}/restituisci`)).data
export const getPrestitiAttivi = async () => (await api.get('/prestiti/attivi')).data
export const getPrestitiScaduti = async () => (await api.get('/prestiti/scaduti')).data
