<script setup lang="ts">
import clsx from "clsx";
import { computed } from "vue";
import Input from '../Input.vue';
import Label from "../Label.vue";
import Helper from "../Helper.vue";
import Button from '../Button.vue';
import { TaigaLoginSchema } from "@/schemas/taiga-login";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from "@vee-validate/valibot"
import { browserClient } from "@/core/BrowserClient";
import { useSnackbar } from "@/composables/useSnackbar";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";


const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(TaigaLoginSchema),
    initialValues: {
        email: '',
        password: ''
    }
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const { notify } = useSnackbar();

const onSubmit = handleSubmit(async values => {
    try {
        await browserClient.sendMessage({
            type: HandlerMapEnum.TAIGA_SIGN_IN,
            data: {
                email: values.email,
                password: values.password
            }
        })

    } catch (error) {
        notify('Sign in failed, try again.', 'error');
    }
});


const hasEmailError = computed(() => !!errors?.value.email);
const hasPasswordError = computed(() => !!errors?.value.password);
</script>


<template>
    <form @submit="onSubmit" :class="clsx('qtk:space-y-4 qtk:max-w-2xs qtk:flex qtk:flex-col qtk:items-stretch qtk:w-full', {
        'qtk:opacity-75 qtk:pointer-events-none': isSubmitting
    })">
        <div>
            <Label for="taiga-email" required>Email</Label>
            <Input id="taiga-email" :error="hasEmailError" v-model="email" type="email"
                placeholder="e.g. user@example.com" />
            <Helper :error="hasEmailError" v-if="hasEmailError">{{ errors.email }}</Helper>
        </div>

        <div>
            <Label for="taiga-password" required>Password</Label>
            <Input id="taiga-password" :error="hasPasswordError" v-model="password" type="password"
                placeholder="e.g. your password" />
            <Helper :error="hasEmailError" v-if="hasPasswordError">{{ errors.password }}</Helper>
        </div>

        <Button :loading="isSubmitting" type="submit">
            Connect to Taiga
        </Button>
    </form>
</template>