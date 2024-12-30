<template>
    <body
        :class="`dark:bg-gray-800 flex flex-col-reverse lg:flex-row h-full overflow-y-auto ${theme} transition-colors`"
    >
        <div class="flex-1 lg:overflow-y-hidden">
            <PostLayout v-if="route.meta.template === 'PostLayout'" />
            <RouterView v-else />
        </div>
        <SideBar />
    </body>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { RouterView, useRoute } from 'vue-router'
import PostLayout from '@/components/PostLayout.vue'
import SideBar from '@/components/SideBar.vue'

const route = useRoute()

const theme = useStorage(
    'theme',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    localStorage
)
</script>
