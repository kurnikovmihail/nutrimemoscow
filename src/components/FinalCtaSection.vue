<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['open-quiz'])

const finalCtaBenefits = [
  {
    text: '1 минута на заполнение',
    icon: ['M12 8v5l3 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  },
  {
    text: 'Персональный расчет КБЖУ',
    icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'],
  },
  {
    text: 'Доставка по Москве',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
]

const finalCtaVideo = ref(null)
const finalCtaRef = ref(null)
const isFinalCtaVisible = ref(false)

let finalCtaObserver = null

const openQuiz = () => {
  emit('open-quiz')
}

const observeFinalCta = () => {
  if (typeof window === 'undefined') return
  if (!finalCtaRef.value) return

  finalCtaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        isFinalCtaVisible.value = true
        finalCtaObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  finalCtaObserver.observe(finalCtaRef.value)
}

onMounted(() => {
  const videos = [finalCtaVideo.value].filter(Boolean)
  videos.forEach((video) => {
    video.playbackRate = 0.92
  })
  nextTick(() => {
    observeFinalCta()
  })
})

onBeforeUnmount(() => {
  finalCtaObserver?.disconnect()
})
</script>

<template>
  <section
    id="final-cta"
    ref="finalCtaRef"
    class="relative overflow-hidden bg-primary px-4 py-[100px] sm:px-6 md:py-[140px]"
  >
    <video
      ref="finalCtaVideo"
      :src="props.videoSrc"
      class="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-[3px]"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    ></video>
    <div class="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>

    <div
      class="relative mx-auto w-full max-w-[800px] text-center transition-all duration-700"
      :class="isFinalCtaVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <h2 class="text-[30px] font-bold leading-[1.12] text-white md:text-[44px]">
        Начните персональное питание уже сегодня
      </h2>
      <p class="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/85 md:text-[18px]">
        Пройдите короткий опрос, и мы рассчитаем питание, подходящее именно вашему организму.
      </p>

      <button
        type="button"
        class="final-cta-pulse mt-9 w-full rounded-[12px] bg-white px-6 py-4 text-[17px] font-semibold text-primary transition hover:bg-primary/10 active:scale-[0.98] md:w-auto md:px-9 md:py-[18px] md:text-[18px]"
        @click="openQuiz"
      >
        Получить персональный расчёт
      </button>

      <div class="mt-10 flex flex-col items-center gap-[14px] md:flex-row md:justify-center md:gap-7">
        <div
          v-for="item in finalCtaBenefits"
          :key="item.text"
          class="group inline-flex items-center gap-2.5 text-left"
        >
          <span class="inline-flex h-[22px] w-[22px] items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-[22px] w-[22px]"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                v-for="(path, pathIndex) in item.icon"
                :key="`final-cta-benefit-${item.text}-${pathIndex}`"
                :d="path"
              />
            </svg>
          </span>
          <span class="text-[15px] text-white/90">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
