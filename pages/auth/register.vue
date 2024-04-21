<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});

const form = ref({
    username: "",
    email: "",
    password: "",
});

const register = async () => {
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: form.value,
        });
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div
        class="h-screen flex justify-center max-w-md mx-auto items-center w-full"
    >
        <div class="mx-auto w-full">
            <Card>
                <CardHeader>
                    <CardTitle class="text-xl"> Sign Up </CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="register" class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="username">Username</Label>
                            <Input
                                v-model="form.username"
                                id="username"
                                required
                            />
                        </div>
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
                            <Label for="password">Password</Label>
                            <Input
                                v-model="form.password"
                                id="password"
                                type="password"
                            />
                        </div>
                        <Button type="submit" class="w-full">
                            Create an account
                        </Button>
                        <Button variant="outline" type="button" class="w-full">
                            Sign up with Google
                        </Button>
                    </form>
                    <div class="mt-4 text-center text-sm">
                        Already have an account?
                        <NuxtLink to="/auth/login" class="underline">
                            Sign in
                        </NuxtLink>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
