<template>
    <div
        v-for="post in Posts"
        ref="postRefs"
        :key="post.date"
        class="space-y-5 p-5 md:px-10 md:py-5 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer"
        @click="router.push(`/${post.slug}`)"
    >
        <div class="flex items-center justify-between cursor-pointer space-x-5">
            <div>
                <p class="text-sm text-gray-400">{{ post.date }}</p>
                <h2>{{ post.title }}</h2>
            </div>
            <ChevronDownIcon class="w-5 h-5 text-gray-500 -rotate-90" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Posts from '@/docs/generated.json'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?component'

const router = useRouter()
</script>
