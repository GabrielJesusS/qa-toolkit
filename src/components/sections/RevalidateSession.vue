<script setup lang="ts">
import { useConfig } from '@/composables/useConfig';
import TaigaAuthForm from '../forms/TaigaAuthForm.vue';


const { setConfig } = useConfig();

const handleSuccess = () => {
    setConfig((old) => ({
        ...old,
        validSession: true,
    }))
}

</script>


<template>
    <section class="qtk:py-20 qtk:px-5 md:qtk:px-20 lg:qtk:px-40 qtk:max-w-xl qtk:w-full qtk:mx-auto" id="home">

        <div class="qtk:text-gray-700 qtk:space-y-4 qtk:flex qtk:flex-col qtk:items-center">
            <h2 class="qtk:text-center md:qtk:text-xl qtk:text-lg">
                Your session has expired :(
            </h2>
            <p>
                Please re-authenticate to continue.
            </p>
            <TaigaAuthForm @success="handleSuccess" />
        </div>
    </section>
</template>