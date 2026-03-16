<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['open-quiz'])

const navLinks = [
  { label: 'Как это работает', href: '#how-it-works' },
  { label: 'Меню', href: '#menu' },
  { label: 'Программы', href: '#programs' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Отзывы', href: '#reviews' },
]

const benefits = [
  {
    title: 'Персональный расчет КБЖУ',
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
  {
    title: 'Готовим каждый день',
    icon: ['M9 12a3 3 0 0 1 6 0', 'M8 16a4 4 0 1 0 8 0', 'M12 3v6'],
  },
  {
    title: 'Доставка по Москве',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
]

const isMobileMenuOpen = ref(false)
const desktopVideo = ref(null)
const mobileVideo = ref(null)

const openQuiz = () => {
  isMobileMenuOpen.value = false
  emit('open-quiz')
}

onMounted(() => {
  const videos = [desktopVideo.value, mobileVideo.value].filter(Boolean)
  videos.forEach((video) => {
    video.playbackRate = 0.92
  })
})
</script>

<template>
  <section class="relative overflow-hidden md:min-h-[100svh]">
    <div class="absolute inset-0 hidden md:block">
      <video
        ref="desktopVideo"
        :src="props.videoSrc"
        class="video-soft-in h-full w-full scale-105 object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      ></video>
      <div class="absolute inset-0 bg-[rgba(246,244,239,0.78)]"></div>
    </div>

    <div class="relative md:hidden">
      <div class="relative aspect-video overflow-hidden">
        <video
          ref="mobileVideo"
          :src="props.videoSrc"
          class="video-soft-in h-full w-full scale-110 object-cover"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
        <div class="absolute inset-0 bg-[rgba(246,244,239,0.78)]"></div>
      </div>
    </div>

    <div class="relative z-20">
      <header class="sticky top-0 z-30 h-20 border-b border-brand-line bg-[rgba(246,244,239,0.8)] backdrop-blur">
        <div class="section-shell flex h-full items-center justify-between px-4 sm:px-6">
          <a href="#" class="text-xl font-extrabold tracking-tight text-brand-text">
            NutriMe
          </a>

          <nav class="hidden items-center gap-7 text-sm font-medium md:flex">
            <a
              v-for="item in navLinks"
              :key="item.label"
              :href="item.href"
              class="transition hover:text-primary"
            >
              {{ item.label }}
            </a>
          </nav>

          <button
            type="button"
            class="hidden rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-[#C25E40] active:bg-[#A94F35] md:inline-flex"
            @click="openQuiz"
          >
            Рассчитать питание
          </button>

          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line bg-brand-surface md:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Открыть меню"
          >
            <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <transition name="accordion">
        <div
          v-if="isMobileMenuOpen"
          class="border-b border-brand-line bg-brand-surface px-4 pb-4 pt-3 md:hidden"
        >
          <nav class="flex flex-col gap-2">
            <a
              v-for="item in navLinks"
              :key="`mobile-${item.label}`"
              :href="item.href"
              class="rounded-lg px-2 py-2 text-sm font-medium transition hover:bg-brand-section hover:text-primary"
              @click="isMobileMenuOpen = false"
            >
              {{ item.label }}
            </a>
          </nav>
          <button
            type="button"
            class="mt-3 w-full rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-[#C25E40] active:bg-[#A94F35]"
            @click="openQuiz"
          >
            Рассчитать питание
          </button>
        </div>
      </transition>

      <div class="section-shell px-4 pb-14 pt-10 sm:px-6 md:flex md:min-h-[calc(100svh-80px)] md:items-center md:pb-20 md:pt-12">
        <article class="mx-auto w-full max-w-[720px] md:mx-0">
          <h1
            class="hero-reveal text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-text md:text-[56px]"
            style="--delay: 220ms"
          >
            <span class="hidden md:inline">Персональное питание,<br />созданное для вашего организма</span>
            <span class="md:hidden">Персональное питание<br />для вашего организма</span>
          </h1>

          <p
            class="hero-reveal mt-5 max-w-[520px] text-base leading-relaxed text-brand-muted md:text-xl"
            style="--delay: 380ms"
          >
            Нутрициолог рассчитывает КБЖУ, шеф-повар готовит меню, а мы доставляем готовые блюда прямо к вам домой.
          </p>

          <div class="hero-reveal mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" style="--delay: 540ms">
            <button
              type="button"
              class="w-full rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:scale-[1.03] hover:bg-[#C25E40] active:bg-[#A94F35] sm:w-auto"
              @click="openQuiz"
            >
              Получить персональный расчет
            </button>
            <span class="text-sm text-brand-muted">занимает 1 минуту</span>
          </div>

          <ul class="hero-reveal mt-8 grid gap-3 text-sm text-brand-text md:grid-cols-3" style="--delay: 700ms">
            <li
              v-for="item in benefits"
              :key="item.title"
              class="flex items-center gap-3 rounded-xl border border-brand-line bg-brand-surface px-3 py-3"
            >
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-section text-secondary">
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path v-for="(path, idx) in item.icon" :key="`icon-${item.title}-${idx}`" :d="path" />
                </svg>
              </span>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-secondary md:flex">
        <span class="text-xs uppercase tracking-[0.14em]">Скролл</span>
        <svg viewBox="0 0 24 24" fill="none" class="slow-bounce h-5 w-5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
          <path d="m6 10 6 6 6-6" />
        </svg>
      </div>
    </div>
  </section>
</template>
