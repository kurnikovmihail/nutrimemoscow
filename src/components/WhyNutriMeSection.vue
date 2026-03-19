<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits(['open-quiz'])

const whyNutrimeBenefits = [
  {
    title: 'Свежие продукты',
    text: 'Мы используем свежие ингредиенты и готовим блюда каждый день.',
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
  {
    title: 'Точный расчет КБЖУ',
    text: 'Нутрициолог рассчитывает калории и баланс нутриентов для вашего организма.',
    icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'],
  },
  {
    title: 'Меню от шеф-повара',
    text: 'Блюда создаются шеф-поваром, поэтому питание остаётся вкусным и разнообразным.',
    icon: ['M5 11h14v8H5z', 'M8 11V9a4 4 0 1 1 8 0v2', 'M7 19h10'],
  },
  {
    title: 'Удобная доставка',
    text: 'Готовые блюда доставляются прямо к вам домой в удобное время.',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
  {
    title: 'Персональный подход',
    text: 'Рацион формируется с учетом целей и особенностей организма.',
    icon: ['M6 3c6 0 6 18 12 18', 'M18 3c-6 0-6 18-12 18', 'M8 7h8', 'M8 17h8'],
  },
  {
    title: 'Ресторанное качество',
    text: 'Питание выглядит и ощущается как блюда из хорошего ресторана.',
    icon: ['M4 6h16l-1 12H5L4 6Z', 'M8 6V4h8v2', 'M9 12h6'],
  },
]

const whyCardRefs = ref([])
const visibleWhyCards = ref([])

const setWhyCardRef = (element, index) => {
  if (element) {
    whyCardRefs.value[index] = element
  }
}

const openQuiz = () => {
  emit('open-quiz')
}

let whyCardsObserver = null

const observeWhyCards = () => {
  if (typeof window === 'undefined') return

  whyCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.whyIndex)
        if (!visibleWhyCards.value.includes(index)) {
          visibleWhyCards.value.push(index)
        }
        whyCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  whyCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.whyIndex = String(index)
    whyCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeWhyCards()
})

onBeforeUnmount(() => {
  whyCardsObserver?.disconnect()
})
</script>

<template>
  <section id="why-nutrime" class="bg-brand-section px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Почему выбирают NutriMe
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Мы объединяем нутрициологию, кухню шеф-повара и удобную доставку, чтобы питание стало простым и
          эффективным.
        </p>
      </header>

      <div class="mt-12 grid gap-[18px] md:mt-[70px] md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        <article
          v-for="(item, index) in whyNutrimeBenefits"
          :key="item.title"
          :ref="(element) => setWhyCardRef(element, index)"
          class="group rounded-[16px] border border-brand-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-7"
          :class="visibleWhyCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <span class="mb-3.5 inline-flex h-[34px] w-[34px] items-center justify-center text-primary transition-colors duration-300 group-hover:text-secondary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-[34px] w-[34px]"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                v-for="(path, pathIndex) in item.icon"
                :key="`why-${item.title}-${pathIndex}`"
                :d="path"
              />
            </svg>
          </span>

          <h3 class="text-xl font-semibold text-brand-text">{{ item.title }}</h3>
          <p class="mt-2 text-base leading-relaxed text-brand-muted">{{ item.text }}</p>
        </article>
      </div>

      <div class="mt-12 text-center md:mt-[60px]">
        <p class="text-lg font-semibold text-brand-text md:text-[20px]">
          Начните персональное питание уже сегодня
        </p>
        <button
          type="button"
          class="mt-6 w-full rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary md:w-auto"
          @click="openQuiz"
        >
          Получить персональный расчёт
        </button>
      </div>
    </div>
  </section>
</template>
