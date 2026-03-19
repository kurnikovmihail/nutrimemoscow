<script setup>
import { ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['open-quiz'])

const expertInfo = {
  name: 'Анна Смирнова',
  role: 'нутрициолог NutriMe',
  photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80',
  quote:
    'Каждый организм уникален, поэтому универсальные диеты редко дают стабильный результат.\n\nВ NutriMe мы создаём питание, которое учитывает цели, образ жизни и особенности организма.\n\nКогда питание сбалансировано по калориям и нутриентам, результат достигается намного комфортнее и безопаснее.',
}

const expertPrinciples = [
  'Индивидуальный расчет калорий',
  'Баланс белков, жиров и углеводов',
  'Учет образа жизни',
  'Разнообразное и полноценное меню',
]

const isExpertVideoOpen = ref(false)

const openQuiz = () => {
  emit('open-quiz')
}

const openExpertVideo = () => {
  isExpertVideoOpen.value = true
}

const closeExpertVideo = () => {
  isExpertVideoOpen.value = false
}
</script>

<template>
  <section id="expert-opinion" class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-2 md:items-center md:gap-20">
      <article class="relative mx-auto w-full max-w-[420px]">
        <button
          type="button"
          class="group block w-full text-left"
          @click="openExpertVideo"
        >
          <div class="overflow-hidden rounded-[16px] border border-brand-line bg-white p-2 md:rounded-[18px]">
            <img
              :src="expertInfo.photo"
              :alt="`Нутрициолог ${expertInfo.name}`"
              class="expert-photo-drift w-full rounded-[14px] object-cover md:rounded-[16px]"
              loading="lazy"
            />
          </div>
          <span class="mt-3 inline-flex rounded-[10px] border border-brand-line bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-text md:hidden">
            Смотреть комментарий
          </span>
        </button>

        <article class="animate-float absolute -bottom-5 left-4 w-[170px] rounded-xl border border-brand-line bg-white p-3.5 shadow-soft md:left-6 md:w-[190px]">
          <p class="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Эксперт</p>
          <p class="mt-1 text-sm font-semibold text-brand-text">Сертифицированный нутрициолог</p>
          <p class="mt-1 text-xs text-brand-muted">7 лет практики</p>
          <p class="text-xs text-brand-muted">500+ клиентов</p>
        </article>
      </article>

      <article class="mx-auto w-full max-w-[520px]">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[36px]">
          Комментарий нутрициолога
        </h2>
        <p class="mt-2.5 text-base text-brand-muted">
          {{ expertInfo.name }}<br />{{ expertInfo.role }}
        </p>

        <p class="mt-6 whitespace-pre-line text-base leading-relaxed text-brand-text md:text-[18px]">
          {{ expertInfo.quote }}
        </p>

        <ul class="mt-8 space-y-4">
          <li
            v-for="principle in expertPrinciples"
            :key="principle"
            class="group flex items-start gap-3"
          >
            <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center text-secondary transition-colors duration-300 group-hover:text-primary">
              <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <span class="text-base text-brand-text">{{ principle }}</span>
          </li>
        </ul>

        <button
          type="button"
          class="mt-10 w-full rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary md:w-auto"
          @click="openQuiz"
        >
          Получить персональный расчёт
        </button>
      </article>
    </div>
  </section>

  <transition name="accordion">
    <div
      v-if="isExpertVideoOpen"
      class="fixed inset-0 z-[44] flex items-center justify-center bg-black/55 p-4"
      @click.self="closeExpertVideo"
    >
      <div class="w-full max-w-3xl rounded-2xl border border-brand-line bg-white p-3 shadow-soft sm:p-4">
        <div class="mb-3 flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            Комментарий нутрициолога
          </p>
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-line text-brand-muted transition hover:text-brand-text"
            aria-label="Закрыть видео эксперта"
            @click="closeExpertVideo"
          >
            ✕
          </button>
        </div>
        <div class="overflow-hidden rounded-xl">
          <video
            :src="props.videoSrc"
            class="h-full w-full object-cover"
            autoplay
            muted
            loop
            playsinline
            controls
            preload="metadata"
          ></video>
        </div>
      </div>
    </div>
  </transition>
</template>
