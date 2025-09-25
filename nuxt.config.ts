import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080'
        }
    },

    vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    },

    modules: [
        '@primevue/nuxt-module'
    ],

    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    },

    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
                    crossorigin: 'anonymous',
                    referrerpolicy: 'no-referrer'
                }
            ]
        }
    }
})
