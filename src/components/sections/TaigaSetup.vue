<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import Button from '../Button.vue';
import Input from '../Input.vue';
import Label from "../Label.vue";
import Helper from "../Helper.vue";
import { TaigaLoginSchema } from "@/schemas/taiga-login";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from "@vee-validate/valibot"
import { computed } from "vue";
import { browserClient } from "@/core/BrowserClient";
import { useSetupWizard } from "@/composables/useSetupWizard";
import { useConfig } from "@/composables/useConfig";
import clsx from "clsx";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { useSnackbar } from "@/composables/useSnackbar";

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

const { wizardActions } = useSetupWizard();
const { setConfig } = useConfig();

const onSubmit = handleSubmit(async values => {
    try {
        await browserClient.sendMessage({
            type: HandlerMapEnum.TAIGA_SIGN_IN,
            data: {
                email: values.email,
                password: values.password
            }
        })

        setConfig((old) => ({
            ...old,
            provider: 'taiga',
            validSession: true,
        }))

        wizardActions?.nextStep();
    } catch (error) {
        notify('Sign in failed, try again.', 'error');
    }
});

const hasEmailError = computed(() => !!errors?.value.email);
const hasPasswordError = computed(() => !!errors?.value.password);

</script>

<template>
    <section class="qtk:py-20 qtk:px-5 md:qtk:px-20 lg:qtk:px-40 qtk:max-w-xl qtk:w-full qtk:mx-auto" id="home">
        <div class="qtk:text-center qtk:flex qtk:flex-col qtk:items-center qtk:mb-6 qtk:space-y-4">
            <Logo class="qtk:size-10 qtk:text-primary" />
        </div>
        <div class="qtk:text-lg md:qtk:text-xl qtk:text-gray-700 qtk:space-y-4 qtk:flex qtk:flex-col qtk:items-center">
            <h2 class="qtk:text-center">To setup taiga as your issue tracker, use your login credentials.</h2>
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
            <Button @click="wizardActions?.prevStep" :disabled="isSubmitting" type="button" variant="ghost" size="sm">
                Back to Provider Selection
            </Button>
        </div>
    </section>
</template>