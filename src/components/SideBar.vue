<template>
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
                I'm a part time software engineer and full time cat person who likes problem solving
                and puzzles. Follow me on my journey to learn!
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
    </nav>
</template>

<script setup lang="ts">
import GithubIcon from '@/assets/icons/github.svg?component'
import LinkedinIcon from '@/assets/icons/linkedin.svg?component'
</script>
