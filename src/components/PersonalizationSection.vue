<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['open-quiz'])

const personalizationDataCards = [
  {
    label: 'Цель',
    value: 'Снижение веса',
    lines: [],
    positionClass: 'left-2 top-3 md:-left-8 md:top-8',
    delay: '0ms',
  },
  {
    label: 'Калории',
    value: '1850 kcal',
    lines: [],
    positionClass: 'right-2 top-20 md:-right-10 md:top-24',
    delay: '900ms',
  },
  {
    label: 'Баланс КБЖУ',
    value: '',
    lines: ['Б: 120г', 'Ж: 60г', 'У: 190г'],
    positionClass: 'left-4 bottom-2 md:-left-6 md:bottom-10',
    delay: '1600ms',
  },
]

const personalizationPoints = [
  {
    title: 'Цели',
    text: 'Похудение, поддержание формы или набор массы.',
    icon: ['M12 20c4.4-2 7-5.3 7-9.6A7 7 0 1 0 5 10.4C5 14.7 7.6 18 12 20Z', 'M12 10v3', 'M12 5v1'],
  },
  {
    title: 'Образ жизни',
    text: 'Активность, график работы и уровень физических нагрузок.',
    icon: ['M13 2 4 14h7l-1 8 10-13h-7l1-7Z'],
  },
  {
    title: 'Особенности организма',
    text: 'Метаболизм, пищевые ограничения и рекомендации нутрициолога.',
    icon: ['M6 3c6 0 6 18 12 18', 'M18 3c-6 0-6 18-12 18', 'M8 7h8', 'M8 17h8'],
  },
  {
    title: 'Баланс нутриентов',
    text: 'Оптимальное соотношение белков, жиров и углеводов.',
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
]

const personalizationVisualVideo = ref(null)
const personalizationItemRefs = ref([])
const visiblePersonalizationItems = ref([])

const setPersonalizationItemRef = (element, index) => {
  if (element) {
    personalizationItemRefs.value[index] = element
  }
}

let personalizationItemsObserver = null

const observePersonalizationItems = () => {
  if (typeof window === 'undefined') return

  personalizationItemsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.personalizationIndex)
        if (!visiblePersonalizationItems.value.includes(index)) {
          visiblePersonalizationItems.value.push(index)
        }
        personalizationItemsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.24 }
  )

  personalizationItemRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.personalizationIndex = String(index)
    personalizationItemsObserver?.observe(element)
  })
}

const openQuiz = () => {
  emit('open-quiz')
}

onMounted(() => {
  if (personalizationVisualVideo.value) {
    personalizationVisualVideo.value.playbackRate = 0.92
  }
  observePersonalizationItems()
})

onBeforeUnmount(() => {
  personalizationItemsObserver?.disconnect()
})
</script>

<template>
  <section id="personalization" class="bg-brand-section px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto grid w-full max-w-[1200px] gap-10 md:grid-cols-2 md:items-center md:gap-20">
      <article class="relative mx-auto w-full max-w-[520px]">
        <div class="overflow-hidden rounded-[14px] border border-[#E6E1D8] bg-white p-2 md:rounded-[18px]">
          <div class="relative aspect-[5/6] overflow-hidden rounded-xl md:aspect-[10/11]">
            <video
              ref="personalizationVisualVideo"
              :src="props.videoSrc"
              class="h-full w-full object-cover"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>
          </div>
        </div>

        <article
          v-for="card in personalizationDataCards"
          :key="card.label"
          class="animate-float absolute w-[132px] rounded-xl border border-[#E6E1D8] bg-white p-3 shadow-soft md:w-40 md:p-3.5"
          :class="card.positionClass"
          :style="{ animationDelay: card.delay }"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-muted">{{ card.label }}</p>
          <p v-if="card.value" class="mt-1.5 text-sm font-semibold text-brand-text md:text-base">{{ card.value }}</p>
          <div v-else class="mt-1.5 space-y-0.5 text-sm font-medium text-brand-text">
            <p v-for="line in card.lines" :key="line">{{ line }}</p>
          </div>
        </article>
      </article>

      <article class="mx-auto w-full max-w-[520px]">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[40px]">
          Питание, созданное под ваш организм
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Каждый организм работает по-разному. Поэтому мы создаём питание, учитывая ваши цели, образ жизни и
          особенности метаболизма.
        </p>

        <ul class="mt-10 space-y-[18px] md:space-y-6">
          <li
            v-for="(item, index) in personalizationPoints"
            :key="item.title"
            :ref="(element) => setPersonalizationItemRef(element, index)"
            class="group flex gap-4 transition-all duration-500"
            :class="visiblePersonalizationItems.includes(index) ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center text-secondary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                class="h-7 w-7 transition-transform duration-300 group-hover:scale-[1.05]"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  v-for="(path, pathIndex) in item.icon"
                  :key="`person-${item.title}-${pathIndex}`"
                  :d="path"
                />
              </svg>
            </span>
            <div>
              <h3 class="text-[18px] font-semibold text-brand-text">{{ item.title }}</h3>
              <p class="mt-1.5 text-base leading-relaxed text-brand-muted">{{ item.text }}</p>
            </div>
          </li>
        </ul>

        <button
          type="button"
          class="mt-10 w-full rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:scale-[1.03] hover:bg-[#C25E40] active:bg-[#A94F35] md:w-auto"
          @click="openQuiz"
        >
          Получить персональный расчёт
        </button>
      </article>
    </div>
  </section>
</template>
