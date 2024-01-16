<template>
    <div class="flex flex-col-reverse lg:flex-row h-full overflow-y-auto">
        <div class="flex-1 lg:overflow-y-hidden">
            <main class="divide-y p-10 md:px-28 lg:py-36 h-full lg:overflow-y-auto">
                <IntroSection />
                <section v-if="route.meta.isPost">
                    <h1>What I'm learning</h1>
                    <div
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
                </section>
                <RouterView v-else />
            </main>
        </div>
        <nav
            class="bg-gray-100 p-10 md:px-28 md:py-20 lg:p-20 w-full lg:w-2/6 h-fit lg:h-full flex flex-col justify-center space-y-5 items-center lg:items-start"
        >
            <img
                alt="Profile picture"
                class="rounded-full object-cover h-[100px] w-[100px]"
                src="@/assets/images/profile.jpg"
                width="100"
                height="100"
            />
            <div class="text-center lg:text-left">
                <h5>Hi, I'm Madeleine!</h5>
                <p>
                    I'm a part time software engineer and full time cat person who likes problem
                    solving and puzzles. Follow me on my journey to learn!
                </p>
            </div>
            <a href="mailto: madeleinetee@hotmail.com">madeleinetee@hotmail.com</a>
            <div class="flex space-x-5">
                <a href="https://github.com/fattynomnom">
                    <GithubIcon class="w-5 h-5 text-indigo-500" />
                </a>
                <a href="www.linkedin.com/in/madeleine-tee">
                    <LinkedinIcon class="w-5 h-5 text-indigo-500" />
                </a>
            </div>
            <!-- <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink> -->
        </nav>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import GithubIcon from '@/assets/icons/github.svg?component'
import LinkedinIcon from '@/assets/icons/linkedin.svg?component'
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
