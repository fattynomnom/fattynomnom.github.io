<template>
    <main class="divide-y py-10 px-5 md:px-28 lg:py-36 h-full lg:overflow-y-auto">
        <IntroSection />
        <section>
            <h1>What I'm learning</h1>
            <div
                v-if="route.meta.isPost"
                ref="postRefs"
                class="space-y-5 p-5 md:px-10 md:py-5 rounded-lg bg-gray-50 overflow-hidden"
            >
                <RouterLink to="/">&lt; Back</RouterLink>
                <div class="flex items-center justify-between space-x-5">
                    <h2>{{ route.meta.title }}</h2>
                    <p class="text-sm text-gray-400">{{ route.meta.date }}</p>
                </div>
                <RouterView />
            </div>
            <RouterView v-else />
        </section>
    </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import IntroSection from '@/components/IntroSection.vue'

const route = useRoute()
</script>

<style lang="pcss" scoped>
section {
    @apply pb-10 lg:pb-20 space-y-5;
}

section:not(:first-child) {
    @apply pt-10 lg:pt-20;
}
</style>
