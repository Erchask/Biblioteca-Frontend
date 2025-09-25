// types/primevue.d.ts
import type { PrimeVueConfiguration } from '@primevue/nuxt-module'

declare module '@nuxt/schema' {
    interface NuxtConfig {
        primevue?: PrimeVueConfiguration
    }
    interface NuxtOptions {
        primevue?: PrimeVueConfiguration
    }
}
