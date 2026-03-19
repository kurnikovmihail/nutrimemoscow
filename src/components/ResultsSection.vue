<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits(['open-quiz'])

const resultCards = [
  {
    name: 'Алексей, 34',
    result: '−8 кг за 3 месяца',
    comment: 'Больше всего понравилось, что не нужно готовить и считать калории.',
    beforeImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Марина, 29',
    result: '−6 кг за 2 месяца',
    comment: 'Меню разнообразное, а питание оказалось намного вкуснее, чем я ожидала.',
    beforeImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Дмитрий, 38',
    result: '−10 кг за 4 месяца',
    comment: 'Самое удобное — еда уже готова и идеально рассчитана.',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
  },
]

const resultStory = {
  title: 'Как Алексей изменил питание и похудел на 8 кг',
  text:
    'Алексей хотел снизить вес, но не хотел сидеть на диетах.\n\nНутрициолог рассчитал персональное питание, а команда NutriMe готовила и доставляла блюда каждую неделю.\n\nЧерез 3 месяца вес снизился на 8 кг, при этом питание оставалось разнообразным и комфортным.',
  image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=1200&q=80',
}

const resultCardRefs = ref([])
const visibleResultCards = ref([])
const comparisonValues = ref(Array.from({ length: resultCards.length }, () => 50))

const setResultCardRef = (element, index) => {
  if (element) {
    resultCardRefs.value[index] = element
  }
}

const setComparisonValue = (index, event) => {
  comparisonValues.value[index] = Number(event.target.value)
}

const openQuiz = () => {
  emit('open-quiz')
}

let resultCardsObserver = null

const observeResultCards = () => {
  if (typeof window === 'undefined') return

  resultCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.resultIndex)
        if (!visibleResultCards.value.includes(index)) {
          visibleResultCards.value.push(index)
        }
        resultCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  resultCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.resultIndex = String(index)
    resultCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeResultCards()
})

onBeforeUnmount(() => {
  resultCardsObserver?.disconnect()
})
</script>

<template>
  <section id="results-clients" class="bg-brand-section px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Результаты наших клиентов
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Персональное питание помогает достигать стабильных результатов без строгих диет и ограничений.
        </p>
      </header>

      <div class="mt-12 grid gap-[18px] md:mt-[60px] md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        <article
          v-for="(item, index) in resultCards"
          :key="item.name"
          :ref="(element) => setResultCardRef(element, index)"
          class="group overflow-hidden rounded-[16px] border border-brand-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
          :class="visibleResultCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="item.beforeImage"
              :alt="`До — ${item.name}`"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <img
              :src="item.afterImage"
              :alt="`После — ${item.name}`"
              class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              :style="{ clipPath: `inset(0 ${100 - comparisonValues[index]}% 0 0)` }"
              loading="lazy"
            />

            <span class="absolute left-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-white">
              До
            </span>
            <span class="absolute right-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-white">
              После
            </span>
            <div
              class="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-white/80"
              :style="{ left: `${comparisonValues[index]}%` }"
            ></div>

            <div class="absolute bottom-3 left-3 right-3 md:hidden">
              <input
                type="range"
                min="0"
                max="100"
                :value="comparisonValues[index]"
                class="comparison-slider w-full"
                @input="setComparisonValue(index, $event)"
              />
            </div>
          </div>

          <div class="p-5">
            <p class="text-base font-semibold text-brand-text">{{ item.name }}</p>
            <p class="mt-1 text-sm font-semibold text-primary">{{ item.result }}</p>
            <p class="mt-2 text-[15px] leading-relaxed text-brand-muted">{{ item.comment }}</p>
          </div>
        </article>
      </div>

      <div class="mt-16 grid gap-8 md:mt-20 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <figure class="mx-auto w-full max-w-[420px] overflow-hidden rounded-[14px] border border-brand-line md:rounded-[16px]">
          <img
            :src="resultStory.image"
            alt="История клиента NutriMe"
            class="w-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        </figure>

        <article>
          <h3 class="text-2xl font-bold leading-tight text-brand-text md:text-[28px]">
            {{ resultStory.title }}
          </h3>
          <p class="mt-4 whitespace-pre-line text-base leading-relaxed text-brand-muted">
            {{ resultStory.text }}
          </p>
          <button
            type="button"
            class="mt-7 rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary"
            @click="openQuiz"
          >
            Получить персональный расчет
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
