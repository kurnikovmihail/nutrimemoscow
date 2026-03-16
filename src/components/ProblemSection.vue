<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const problemCards = [
  {
    title: 'Одинаковые меню для всех',
    text: 'Большинство диет не учитывают метаболизм, образ жизни и состояние организма.',
    icon: ['M3 12c4-6 14-6 18 0', 'M6 15h12', 'M8 18h8'],
  },
  {
    title: 'Неправильный баланс КБЖУ',
    text: 'Без точного расчёта калорий и нутриентов результат либо отсутствует, либо нестабилен.',
    icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'],
  },
  {
    title: 'Сложно соблюдать',
    text: 'Готовка, подсчёт калорий и поиск продуктов требуют слишком много времени.',
    icon: ['M12 8v5l3 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  },
  {
    title: 'Результат временный',
    text: 'После диеты вес часто возвращается, потому что питание не персонализировано.',
    icon: ['M3 4v16h18', 'M7 12l3 3 7-7'],
  },
]

const problemCardRefs = ref([])
const visibleProblemCards = ref([])

const setProblemCardRef = (element, index) => {
  if (element) {
    problemCardRefs.value[index] = element
  }
}

let problemCardsObserver = null

const observeProblemCards = () => {
  if (typeof window === 'undefined') return

  problemCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const index = Number(entry.target.dataset.problemIndex)
        if (!visibleProblemCards.value.includes(index)) {
          visibleProblemCards.value.push(index)
        }
        problemCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  problemCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.problemIndex = String(index)
    problemCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeProblemCards()
})

onBeforeUnmount(() => {
  problemCardsObserver?.disconnect()
})
</script>

<template>
  <section class="bg-brand-dark px-4 py-20 sm:px-6 md:py-[120px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[620px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Почему обычные диеты не работают
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Большинство программ питания одинаковые для всех. Но каждый организм работает по-разному.
        </p>
      </header>

      <div class="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
        <template v-for="(card, index) in problemCards" :key="card.title">
          <article
            :ref="(element) => setProblemCardRef(element, index)"
            class="group rounded-[14px] border border-[#E6E1D8] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-8"
            :class="visibleProblemCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="relative mb-5 aspect-video overflow-hidden rounded-xl border border-brand-line/80">
              <video
                :src="props.videoSrc"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
              ></video>
              <div class="absolute inset-0 bg-[rgba(246,244,239,0.48)]"></div>
            </div>

            <span class="inline-flex h-10 w-10 items-center justify-center text-primary transition-colors duration-300 group-hover:text-secondary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                class="h-7 w-7 md:h-8 md:w-8"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  v-for="(path, pathIndex) in card.icon"
                  :key="`problem-${card.title}-${pathIndex}`"
                  :d="path"
                />
              </svg>
            </span>
            <h3 class="mt-4 text-xl font-semibold text-brand-text">{{ card.title }}</h3>
            <p class="mt-2.5 text-base leading-relaxed text-brand-muted">{{ card.text }}</p>
          </article>
        </template>
      </div>

      <div class="mt-16 text-center md:mt-20">
        <h3 class="text-2xl font-bold leading-tight text-brand-text md:text-[26px]">
          NutriMe решает эту проблему
        </h3>
        <p class="mx-auto mt-3 max-w-[640px] text-base leading-relaxed text-brand-muted md:text-[18px]">
          Мы создаём питание, которое подходит именно вашему организму.
        </p>
        <a
          href="#how-it-works"
          class="mt-7 inline-flex rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:scale-[1.03] hover:bg-[#C25E40] active:bg-[#A94F35]"
        >
          Посмотреть как это работает
        </a>
      </div>
    </div>
  </section>
</template>
