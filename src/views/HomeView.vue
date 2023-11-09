<template>
    <main class="divide-y p-10 md:px-28 lg:py-36 h-full lg:overflow-y-auto">
        <section>
            <h1>Hey there!</h1>
            <p>
                I'm a part time software engineer and full time cat person who likes problem solving
                and puzzles.
            </p>
            <p>
                I don't have any fancy repositories for you to see (I'm sure you can understand as a
                software developer, most of our client works are proprietary), though you can still
                head over to my <a href="https://github.com/fattynomnom">Github</a> to view my
                personal projects I'm working on when I have the time!
            </p>
            <p>
                I'm a huge advocate for Typescript, object-oriented programming and clean coding
                practices (DRY, SOLID). I know writing it is a pain, but reading clean code is
                <i>*chefs kiss*</i>. Do I sit back sometimes and admire clean code structures? Yes, yes
                I do.
            </p>
            <p>
                My hobbies are gardening, reading mangas, watching movies and starting 1001 coding projects that I don't
                finish.
            </p>
            <p>
                I'm trying to hold myself accountable by creating this site to document my learning
                process. Hopefully I'll be able to learn and update this space as much as possible
                (when life, work and cats doesn't get in the way).
            </p>
            <p>
                Just in case you're curious, this site was made with VueJs and TailwindCss (both of
                which I <i>think</i> I'm a master at).
            </p>
        </section>
        <section>
            <h1>What I'm learning</h1>
            <div v-for="post in posts" :key="post.frontmatter.title" class="space-y-5 p-5 md:p-10 rounded-lg bg-gray-50 overflow-hidden">
                <div class="flex items-center justify-between cursor-pointer space-x-5" @click="post.displayed = !post.displayed">
                    <div>
                        <p class="text-sm text-gray-400">{{ post.frontmatter.date }}</p>
                        <h2>{{ post.frontmatter.title }}</h2>
                    </div>
                    <ChevronDownIcon class="w-5 h-5 text-gray-500" :class="{'rotate-180': displayed}" />
                </div>
                <Transition>
                    <component v-if="post.displayed" :is="post.component" />
                </Transition>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PostOne from '@/docs/7th_nov_23.md'
import PostTwo from '@/docs/8th_nov_23.md'

import ChevronDownIcon from '@/assets/icons/chevron-down.svg?component'
import { frontmatter as postOneFrontmatter } from '@/docs/7th_nov_23.md'
import { frontmatter as postTwoFrontmatter } from '@/docs/8th_nov_23.md'

const posts = ref([
    {
        frontmatter: postTwoFrontmatter,
        component: PostTwo,
        displayed: false
    },
    {
        frontmatter: postOneFrontmatter,
        component: PostOne,
        displayed: false
    }
])
</script>

<style lang="pcss" scoped>
section {
    @apply pb-10 lg:pb-20 space-y-5;
}

section:not(:first-child) {
    @apply pt-10 lg:pt-20;
}

.v-enter-active,
.v-leave-active {
  transition: max-height 1.5s ease;
  max-height: 1500px;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
