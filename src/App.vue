<template>
    <body class="flex flex-col-reverse lg:flex-row h-full overflow-y-auto">
        <div class="flex-1 lg:overflow-y-hidden">
            <PostLayout v-if="route.meta.template === 'PostLayout'" />
            <RouterView v-else />
        </div>
        <SideBar />
    </body>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import PostLayout from '@/components/PostLayout.vue'
import SideBar from '@/components/SideBar.vue'

const route = useRoute()
</script>
