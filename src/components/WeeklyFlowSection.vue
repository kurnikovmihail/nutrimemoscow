<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const weeklyFlowSteps = [
  {
    day: '1',
    title: 'Доставка питания',
    text: 'Вы получаете набор готовых блюд на несколько дней.',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
  {
    day: '2',
    title: 'Готовый завтрак',
    text: 'Начинаете день со сбалансированного завтрака.',
    icon: ['M4 12h16', 'M5 12a7 7 0 0 1 14 0v3H5z', 'M8 9c0-2 1.5-3 3.5-3', 'M12 9c0-2 1.5-3 3.5-3'],
  },
  {
    day: '3',
    title: 'Полный рацион',
    text: 'Все блюда уже рассчитаны по калориям и нутриентам.',
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
  {
    day: '4',
    title: 'Новая доставка',
    text: 'Вы получаете свежие блюда на следующие дни.',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
  {
    day: '5-7',
    title: 'Комфортное питание',
    text: 'Вы питаетесь правильно без готовки и подсчёта калорий.',
    icon: ['M4 6h16l-1 12H5L4 6Z', 'M8 6V4h8v2', 'M9 12h6'],
  },
]

const weekSectionRef = ref(null)
const weekCardRefs = ref([])
const visibleWeekCards = ref([])
const activeWeekStep = ref(0)
const isWeekLineVisible = ref(false)

const setWeekCardRef = (element, index) => {
  if (element) {
    weekCardRefs.value[index] = element
  }
}

let weekCardsObserver = null
let weekActiveObserver = null
let weekLineObserver = null

const observeWeekCards = () => {
  if (typeof window === 'undefined') return

  weekCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.weekIndex)
        if (!visibleWeekCards.value.includes(index)) {
          visibleWeekCards.value.push(index)
        }
        weekCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.22 }
  )

  weekCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.weekIndex = String(index)
    weekCardsObserver?.observe(element)
  })
}

const observeWeekActive = () => {
  if (typeof window === 'undefined') return

  weekActiveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.weekIndex)
        activeWeekStep.value = index
      })
    },
    { root: null, rootMargin: '-35% 0px -45% 0px', threshold: 0 }
  )

  weekCardRefs.value.forEach((element) => {
    if (!element) return
    weekActiveObserver?.observe(element)
  })
}

const observeWeekLine = () => {
  if (typeof window === 'undefined') return
  if (!weekSectionRef.value) return

  weekLineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        isWeekLineVisible.value = true
        weekLineObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.16 }
  )

  weekLineObserver.observe(weekSectionRef.value)
}

onMounted(() => {
  observeWeekCards()
  observeWeekActive()
  observeWeekLine()
})

onBeforeUnmount(() => {
  weekCardsObserver?.disconnect()
  weekActiveObserver?.disconnect()
  weekLineObserver?.disconnect()
})
</script>

<template>
  <section
    id="weekly-flow"
    ref="weekSectionRef"
    class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]"
  >
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Как проходит неделя с NutriMe
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Вы получаете готовые блюда, которые уже рассчитаны и приготовлены. Вам остаётся только наслаждаться едой.
        </p>
      </header>

      <div class="relative mt-12 md:mt-[70px]">
        <div class="absolute bottom-0 left-[17px] top-0 w-[2px] bg-[#E6E1D8] md:hidden"></div>

        <div class="absolute left-0 right-0 top-[18px] hidden h-[2px] bg-[#E6E1D8] md:block"></div>
        <div
          class="absolute left-0 top-[18px] hidden h-[2px] w-full origin-left bg-primary transition-transform duration-1000 ease-out md:block"
          :style="{ transform: isWeekLineVisible ? 'scaleX(1)' : 'scaleX(0)' }"
        ></div>

        <div class="grid gap-[18px] md:grid-cols-5 md:gap-8">
          <article
            v-for="(step, index) in weeklyFlowSteps"
            :key="step.title"
            :ref="(element) => setWeekCardRef(element, index)"
            class="relative pl-14 md:pl-0"
          >
            <div class="absolute left-0 top-4 md:static md:mb-4 md:flex md:justify-center">
              <span
                class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              >
                {{ step.day }}
              </span>
            </div>

            <div
              class="group rounded-[16px] border bg-white p-[22px] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-[26px]"
              :class="[
                visibleWeekCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
                activeWeekStep === index ? 'border-primary md:border-[#E6E1D8]' : 'border-[#E6E1D8]',
              ]"
              :style="{ transitionDelay: `${index * 90}ms` }"
            >
              <span
                class="mt-2 inline-flex h-[30px] w-[30px] items-center justify-center transition-colors duration-300 md:mt-0"
                :class="activeWeekStep === index ? 'text-primary md:text-secondary' : 'text-secondary'"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  class="h-[30px] w-[30px] transition-transform duration-300 group-hover:scale-[1.05]"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    v-for="(path, pathIndex) in step.icon"
                    :key="`week-${step.title}-${pathIndex}`"
                    :d="path"
                  />
                </svg>
              </span>

              <h3 class="mt-3 text-[18px] font-semibold leading-snug text-brand-text">{{ step.title }}</h3>
              <p class="mt-2 text-[15px] leading-relaxed text-brand-muted">{{ step.text }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="mt-12 md:mt-16">
        <figure class="mx-auto w-full max-w-[500px] overflow-hidden rounded-[14px] border border-[#E6E1D8] md:rounded-[16px]">
          <img
            src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80"
            alt="Доставка NutriMe: коробка с готовыми блюдами"
            class="w-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
</template>
