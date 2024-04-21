<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});

const form = ref({
    email: "",
    password: "",
});

const login = async () => {
    await $fetch("/api/auth/login", {
        method: "POST",
        body: form.value,
    });
    await navigateTo("/dashboard");
};
</script>

<template>
    <div
        class="h-screen flex justify-center max-w-md mx-auto items-center w-full"
    >
        <div class="mx-auto w-full">
            <Card class="w-full">
                <CardHeader>
                    <CardTitle class="text-2xl"> Login </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="login" class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="email">Email</Label>
                            <Input
                                v-model="form.email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div class="grid gap-2">
                            <div class="flex items-center">
                                <Label for="password">Password</Label>
                                <a
                                    href="#"
                                    class="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                v-model="form.password"
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" class="w-full"> Login </Button>
                        <Button variant="outline" class="w-full">
                            Login with Google
                        </Button>
                    </form>
                    <div class="mt-4 text-center text-sm">
                        Don't have an account?
                        <NuxtLink to="/auth/register" class="underline">
                            Sign up
                        </NuxtLink>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
