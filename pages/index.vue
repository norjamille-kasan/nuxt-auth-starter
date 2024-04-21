<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
</script>

<template>
    <div class="p-10 flex space-x-2">
        <NuxtLink
            to="/auth/login"
            :class="
                buttonVariants({
                    variant: 'outline',
                })
            "
            >Login</NuxtLink
        >
        <NuxtLink
            to="/auth/register"
            :class="
                buttonVariants({
                    variant: 'default',
                })
            "
            >Register</NuxtLink
        >
    </div>
</template>
