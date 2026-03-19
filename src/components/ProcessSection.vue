<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const processSteps = [
  {
    title: 'Анкета и цели',
    text: 'Вы заполняете короткую анкету: цель, вес, образ жизни, особенности организма.',
    icon: ['M8 3h8', 'M7 5h10a2 2 0 0 1 2 2v14H5V7a2 2 0 0 1 2-2Z', 'M8 11h8', 'M8 15h6'],
  },
  {
    title: 'Расчёт КБЖУ',
    text: 'Нутрициолог рассчитывает калории и баланс белков, жиров и углеводов.',
    icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'],
  },
  {
    title: 'Создание меню',
    text: 'На основе расчётов формируется меню на несколько дней.',
    icon: ['M7 4h10', 'M6 7h12v13H6z', 'M9 11h6', 'M9 15h6'],
  },
  {
    title: 'Приготовление',
    text: 'Шеф-повар готовит блюда из свежих продуктов каждый день.',
    icon: ['M5 11h14v8H5z', 'M8 11V9a4 4 0 1 1 8 0v2', 'M7 19h10'],
  },
  {
    title: 'Доставка',
    text: 'Готовые блюда доставляются прямо к вам домой в удобное время.',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
]

const processSectionRef = ref(null)
const processCardRefs = ref([])
const visibleProcessSteps = ref([])
const activeProcessStep = ref(0)
const isProcessLineVisible = ref(false)

const setProcessCardRef = (element, index) => {
  if (element) {
    processCardRefs.value[index] = element
  }
}

let processCardsObserver = null
let processActiveObserver = null
let processLineObserver = null

const observeProcessCards = () => {
  if (typeof window === 'undefined') return

  processCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.processIndex)
        if (!visibleProcessSteps.value.includes(index)) {
          visibleProcessSteps.value.push(index)
        }
        processCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.22 }
  )

  processCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.processIndex = String(index)
    processCardsObserver?.observe(element)
  })
}

const observeProcessMobileActive = () => {
  if (typeof window === 'undefined') return

  processActiveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.processIndex)
        activeProcessStep.value = index
      })
    },
    {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0,
    }
  )

  processCardRefs.value.forEach((element) => {
    if (!element) return
    processActiveObserver?.observe(element)
  })
}

const observeProcessLine = () => {
  if (typeof window === 'undefined') return
  if (!processSectionRef.value) return

  processLineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        isProcessLineVisible.value = true
        processLineObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.16 }
  )

  processLineObserver.observe(processSectionRef.value)
}

onMounted(() => {
  observeProcessCards()
  observeProcessMobileActive()
  observeProcessLine()
})

onBeforeUnmount(() => {
  processCardsObserver?.disconnect()
  processActiveObserver?.disconnect()
  processLineObserver?.disconnect()
})
</script>

<template>
  <section
    id="how-it-works"
    ref="processSectionRef"
    class="bg-brand-section px-4 py-20 sm:px-6 md:py-[120px]"
  >
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Как создаётся ваше персональное питание
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Над вашим питанием работает команда нутрициолога и шеф-повара. Мы рассчитываем, готовим и доставляем
          уже готовые блюда.
        </p>
      </header>

      <div class="relative mt-12 md:mt-16">
        <div class="absolute bottom-0 left-[17px] top-0 w-[2px] bg-brand-line md:hidden"></div>

        <div class="absolute left-0 right-0 top-[18px] hidden h-[2px] bg-brand-line md:block"></div>
        <div
          class="absolute left-0 top-[18px] hidden h-[2px] w-full origin-left bg-primary transition-transform duration-1000 ease-out md:block"
          :style="{ transform: isProcessLineVisible ? 'scaleX(1)' : 'scaleX(0)' }"
        ></div>

        <div class="grid gap-5 md:grid-cols-5 md:gap-8">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            :ref="(element) => setProcessCardRef(element, index)"
            class="relative pl-14 md:pl-0"
          >
            <div class="absolute left-0 top-4 md:static md:mb-5 md:flex md:justify-center">
              <span
                class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <div
              class="group rounded-[14px] border bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-7"
              :class="[
                visibleProcessSteps.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0',
                activeProcessStep === index ? 'border-primary md:border-brand-line' : 'border-brand-line',
              ]"
              :style="{ transitionDelay: `${index * 80}ms` }"
            >
              <span
                class="inline-flex text-[28px] transition duration-300 md:text-[32px]"
                :class="activeProcessStep === index ? 'text-primary md:text-secondary' : 'text-secondary'"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  class="h-7 w-7 transition-transform duration-300 group-hover:scale-[1.05] md:h-8 md:w-8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    v-for="(path, pathIndex) in step.icon"
                    :key="`process-${step.title}-${pathIndex}`"
                    :d="path"
                  />
                </svg>
              </span>
              <h3 class="mt-3.5 text-xl font-semibold text-brand-text">{{ step.title }}</h3>
              <p class="mt-2 text-base leading-relaxed text-brand-muted">{{ step.text }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="mt-16 text-center md:mt-20">
        <p class="mx-auto max-w-[760px] text-lg font-semibold leading-relaxed text-brand-text md:text-[20px]">
          Так создаётся питание, которое действительно работает.
        </p>
        <a
          href="#menu"
          class="mt-7 inline-flex rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:scale-[1.03] hover:bg-primary-hover active:bg-secondary"
        >
          Посмотреть примеры меню
        </a>
      </div>
    </div>
  </section>
</template>
