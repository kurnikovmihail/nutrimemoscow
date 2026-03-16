<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  activeProgramId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['choose-program'])

const nutritionPrograms = [
  {
    id: 'weight-loss',
    title: 'Снижение веса',
    description: 'Питание с дефицитом калорий для постепенного и безопасного снижения веса.',
    features: ['дефицит калорий', 'высокий уровень белка', 'баланс нутриентов'],
    icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'],
  },
  {
    id: 'balance',
    title: 'Баланс',
    description: 'Сбалансированное питание для поддержания здоровья и хорошего самочувствия.',
    features: ['оптимальный баланс КБЖУ', 'разнообразное меню', 'ежедневное приготовление'],
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
  {
    id: 'mass-gain',
    title: 'Набор массы',
    description: 'Питание с увеличенной калорийностью для набора мышечной массы.',
    features: ['повышенная калорийность', 'высокий белок', 'энергия для тренировок'],
    icon: ['M5 13h14', 'M7 9h10', 'M8 9v4', 'M16 9v4', 'M9 13v4', 'M15 13v4'],
  },
  {
    id: 'maintenance',
    title: 'Поддержание формы',
    description: 'Рацион для тех, кто хочет сохранить текущий вес и форму.',
    features: ['стабильный баланс калорий', 'разнообразные блюда', 'поддержка энергии'],
    icon: ['M13 2 4 14h7l-1 8 10-13h-7l1-7Z'],
  },
]

const programCardRefs = ref([])
const visibleProgramCards = ref([])

const setProgramCardRef = (element, index) => {
  if (element) {
    programCardRefs.value[index] = element
  }
}

const chooseProgram = (programId) => {
  emit('choose-program', programId)
}

let programCardsObserver = null

const observeProgramCards = () => {
  if (typeof window === 'undefined') return

  programCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.programIndex)
        if (!visibleProgramCards.value.includes(index)) {
          visibleProgramCards.value.push(index)
        }
        programCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.22 }
  )

  programCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.programIndex = String(index)
    programCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeProgramCards()
})

onBeforeUnmount(() => {
  programCardsObserver?.disconnect()
})
</script>

<template>
  <section id="programs" class="bg-brand-section px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Программы питания NutriMe
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Выберите программу, которая соответствует вашей цели. Нутрициолог рассчитает питание и создаст
          индивидуальное меню.
        </p>
      </header>

      <div class="mt-12 grid gap-[18px] md:mt-[60px] md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
        <article
          v-for="(program, index) in nutritionPrograms"
          :key="program.id"
          :ref="(element) => setProgramCardRef(element, index)"
          class="group rounded-[18px] border bg-white p-[26px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft md:p-8"
          :class="[
            visibleProgramCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            props.activeProgramId === program.id ? 'border-primary' : 'border-[#E6E1D8]',
          ]"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <span class="mb-4 inline-flex h-10 w-10 items-center justify-center text-secondary transition-colors duration-300 group-hover:text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-10 w-10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                v-for="(path, pathIndex) in program.icon"
                :key="`program-${program.id}-${pathIndex}`"
                :d="path"
              />
            </svg>
          </span>

          <h3 class="text-[22px] font-semibold leading-tight text-brand-text">{{ program.title }}</h3>
          <p class="mt-2 text-base leading-relaxed text-brand-muted">{{ program.description }}</p>

          <ul class="mt-[18px] space-y-2.5">
            <li
              v-for="feature in program.features"
              :key="feature"
              class="flex items-start gap-2.5"
            >
              <svg viewBox="0 0 24 24" fill="none" class="mt-[2px] h-[14px] w-[14px] shrink-0 text-primary" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m5 13 4 4L19 7" />
              </svg>
              <span class="text-[15px] leading-relaxed text-brand-text">{{ feature }}</span>
            </li>
          </ul>

          <button
            type="button"
            class="mt-6 w-full rounded-[10px] border border-primary px-4 py-[14px] text-sm font-semibold text-primary transition hover:bg-[#F3E2DC] md:w-auto md:px-5"
            @click="chooseProgram(program.id)"
          >
            Выбрать программу
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
