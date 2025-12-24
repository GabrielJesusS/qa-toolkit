<script setup lang="ts">
import { ref } from 'vue'
import Label from './Label.vue'
import Input from './Input.vue'
import Textarea from './Textarea.vue'
import Helper from './Helper.vue'
import Slider from './Slider.vue'
import Select from './Select.vue'
import Button from './Button.vue'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

// Form state
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const textareaValue = ref('')
const sliderValue = ref(false)
const selectValue = ref('')
const radioValue = ref('')
const loading = ref(false)

const selectOptions = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
    { value: 'option4', label: 'Opção 4 (Desabilitada)', disabled: true },
]

const handleSubmit = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        console.log('Form submitted:', {
            textInput: textInput.value,
            emailInput: emailInput.value,
            passwordInput: passwordInput.value,
            textareaValue: textareaValue.value,
            sliderValue: sliderValue.value,
            selectValue: selectValue.value,
            radioValue: radioValue.value,
        })
    }, 2000)
}
</script>

<template>
    <div class="qtk:min-h-screen qtk:bg-gray-50 qtk:p-8">
        <div class="qtk:max-w-4xl qtk:mx-auto">
            <h1 class="qtk:text-3xl qtk:font-bold qtk:text-gray-900 qtk:mb-8">
                Form Components Stylesheet
            </h1>

            <!-- Input Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Input</h2>

                <div class="qtk:space-y-6">
                    <!-- Text Input -->
                    <div>
                        <Label for="text-input" required>Nome completo</Label>
                        <Input id="text-input" v-model="textInput" type="text" placeholder="Digite seu nome" />
                        <Helper>Este é um texto de ajuda para o campo</Helper>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <Label for="email-input">E-mail</Label>
                        <Input id="email-input" v-model="emailInput" type="email" placeholder="seu@email.com" />
                    </div>

                    <!-- Password Input -->
                    <div>
                        <Label for="password-input">Senha</Label>
                        <Input id="password-input" v-model="passwordInput" type="password" placeholder="••••••••" />
                    </div>

                    <!-- Error State -->
                    <div>
                        <Label for="error-input">Input com erro</Label>
                        <Input id="error-input" type="text" placeholder="Campo com erro" :error="true" />
                        <Helper :error="true">Este campo é obrigatório</Helper>
                    </div>

                    <!-- Disabled State -->
                    <div>
                        <Label for="disabled-input">Input desabilitado</Label>
                        <Input id="disabled-input" type="text" placeholder="Campo desabilitado" :disabled="true"
                            model-value="Valor não editável" />
                    </div>
                </div>
            </section>

            <!-- Textarea Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Textarea</h2>

                <div class="qtk:space-y-6">
                    <div>
                        <Label for="textarea" required>Descrição</Label>
                        <Textarea id="textarea" v-model="textareaValue" placeholder="Digite uma descrição detalhada..."
                            :rows="6" />
                        <Helper>Mínimo de 100 caracteres</Helper>
                    </div>

                    <div>
                        <Label for="textarea-error">Textarea com erro</Label>
                        <Textarea id="textarea-error" placeholder="Campo com erro" :rows="4" :error="true" />
                        <Helper :error="true">A descrição não pode estar vazia</Helper>
                    </div>
                </div>
            </section>

            <!-- Slider Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Slider (Toggle)</h2>

                <div class="qtk:space-y-6">
                    <div class="qtk:flex qtk:items-center qtk:gap-3">
                        <Slider id="slider" v-model="sliderValue" />
                        <Label for="slider">Receber notificações</Label>
                    </div>
                    <Helper>Estado atual: {{ sliderValue ? 'Ativado' : 'Desativado' }}</Helper>

                    <div class="qtk:flex qtk:items-center qtk:gap-3">
                        <Slider id="slider-disabled" :disabled="true" />
                        <Label for="slider-disabled">Slider desabilitado</Label>
                    </div>

                    <div class="qtk:flex qtk:items-center qtk:gap-3">
                        <Slider id="slider-on" :model-value="true" :disabled="true" />
                        <Label for="slider-on">Slider desabilitado (ativado)</Label>
                    </div>
                </div>
            </section>

            <!-- Select Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Select</h2>

                <div class="qtk:space-y-6">
                    <div>
                        <Label for="select" required>Escolha uma opção</Label>
                        <Select id="select" v-model="selectValue" :options="selectOptions" placeholder="Selecione..." />
                        <Helper>Valor selecionado: {{ selectValue || 'Nenhum' }}</Helper>
                    </div>

                    <div>
                        <Label for="select-error">Select com erro</Label>
                        <Select id="select-error" :options="selectOptions" :error="true" />
                        <Helper :error="true">Por favor, selecione uma opção</Helper>
                    </div>

                    <div>
                        <Label for="select-disabled">Select desabilitado</Label>
                        <Select id="select-disabled" :options="selectOptions" :disabled="true" />
                    </div>
                </div>
            </section>

            <!-- Radio Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Radio & RadioGroup</h2>

                <div class="qtk:space-y-6">
                    <div>
                        <Label>Escolha uma opção (Vertical)</Label>
                        <RadioGroup v-model="radioValue" name="radio-vertical" direction="vertical">
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-1" value="option1" />
                                <Label for="radio-1">Opção 1</Label>
                            </div>
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-2" value="option2" />
                                <Label for="radio-2">Opção 2</Label>
                            </div>
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-3" value="option3" />
                                <Label for="radio-3">Opção 3</Label>
                            </div>
                        </RadioGroup>
                        <Helper>Valor selecionado: {{ radioValue || 'Nenhum' }}</Helper>
                    </div>

                    <div>
                        <Label>Escolha uma opção (Horizontal)</Label>
                        <RadioGroup v-model="radioValue" name="radio-horizontal" direction="horizontal">
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-4" value="option1" />
                                <Label for="radio-4">Opção 1</Label>
                            </div>
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-5" value="option2" />
                                <Label for="radio-5">Opção 2</Label>
                            </div>
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="radio-6" value="option3" />
                                <Label for="radio-6">Opção 3</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </section>

            <!-- Button Component -->
            <section class="qtk:mb-12 qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Button</h2>

                <div class="qtk:space-y-6">
                    <!-- Variants -->
                    <div>
                        <h3 class="qtk:text-sm qtk:font-medium qtk:text-gray-700 qtk:mb-3">Variantes</h3>
                        <div class="qtk:flex qtk:flex-wrap qtk:gap-3">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="danger">Danger</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                    </div>

                    <!-- Sizes -->
                    <div>
                        <h3 class="qtk:text-sm qtk:font-medium qtk:text-gray-700 qtk:mb-3">Tamanhos</h3>
                        <div class="qtk:flex qtk:flex-wrap qtk:items-center qtk:gap-3">
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>
                    </div>

                    <!-- States -->
                    <div>
                        <h3 class="qtk:text-sm qtk:font-medium qtk:text-gray-700 qtk:mb-3">Estados</h3>
                        <div class="qtk:flex qtk:flex-wrap qtk:gap-3">
                            <Button :disabled="true">Disabled</Button>
                            <Button :loading="loading" @click="handleSubmit">
                                {{ loading ? 'Carregando...' : 'Enviar' }}
                            </Button>
                        </div>
                    </div>

                    <!-- Types -->
                    <div>
                        <h3 class="qtk:text-sm qtk:font-medium qtk:text-gray-700 qtk:mb-3">Tipos</h3>
                        <div class="qtk:flex qtk:flex-wrap qtk:gap-3">
                            <Button type="button">Button</Button>
                            <Button type="submit">Submit</Button>
                            <Button type="reset">Reset</Button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Complete Form Example -->
            <section class="qtk:bg-white qtk:p-6 qtk:rounded-lg qtk:shadow">
                <h2 class="qtk:text-xl qtk:font-semibold qtk:text-gray-800 qtk:mb-4">Formulário Completo</h2>

                <form @submit.prevent="handleSubmit" class="qtk:space-y-6">
                    <div>
                        <Label for="form-name" required>Nome</Label>
                        <Input id="form-name" v-model="textInput" type="text" placeholder="Seu nome completo" />
                    </div>

                    <div>
                        <Label for="form-email" required>E-mail</Label>
                        <Input id="form-email" v-model="emailInput" type="email" placeholder="seu@email.com" />
                    </div>

                    <div>
                        <Label for="form-description">Descrição</Label>
                        <Textarea id="form-description" v-model="textareaValue"
                            placeholder="Conte-nos mais sobre você..." />
                    </div>

                    <div>
                        <Label for="form-select" required>Categoria</Label>
                        <Select id="form-select" v-model="selectValue" :options="selectOptions" />
                    </div>

                    <div>
                        <Label>Preferências</Label>
                        <RadioGroup v-model="radioValue" name="preferences">
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="pref-1" value="option1" />
                                <Label for="pref-1">Preferência 1</Label>
                            </div>
                            <div class="qtk:flex qtk:items-center qtk:gap-2">
                                <Radio id="pref-2" value="option2" />
                                <Label for="pref-2">Preferência 2</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div class="qtk:flex qtk:items-center qtk:gap-3">
                        <Slider id="form-notifications" v-model="sliderValue" />
                        <Label for="form-notifications">Aceito receber notificações</Label>
                    </div>

                    <div class="qtk:flex qtk:gap-3">
                        <Button type="submit" :loading="loading">
                            {{ loading ? 'Enviando...' : 'Enviar Formulário' }}
                        </Button>
                        <Button type="reset" variant="ghost">Limpar</Button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>
