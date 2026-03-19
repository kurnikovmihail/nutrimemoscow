<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  presetGoal: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'goal-selected'])

const stepOrder = [
  'intro',
  'goal',
  'gender',
  'age',
  'height',
  'weight',
  'activity',
  'restrictions',
  'calculating',
  'result',
]

const goalOptions = [
  { value: 'Снижение веса', label: 'Похудение', icon: ['M12 3v17', 'M5 7h14', 'M4 7l-3 5h6l-3-5', 'M20 7l-3 5h6l-3-5'] },
  { value: 'Поддержание формы', label: 'Поддержание формы', icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'] },
  { value: 'Набор массы', label: 'Набор массы', icon: ['M5 13h14', 'M7 9h10', 'M8 9v4', 'M16 9v4', 'M9 13v4', 'M15 13v4'] },
  { value: 'Здоровое питание', label: 'Здоровое питание', icon: ['M4 6h16l-1 12H5L4 6Z', 'M8 6V4h8v2', 'M9 12h6'] },
]

const genderOptions = ['Мужчина', 'Женщина']

const activityOptions = [
  {
    value: 'low',
    title: 'Минимальная активность',
    description: 'Пешие прогулки и в основном сидячий режим.',
    icon: ['M5 20V10', 'M19 20V10', 'M8 10h8', 'M12 10V5'],
  },
  {
    value: 'light',
    title: '1–2 тренировки в неделю',
    description: 'Лёгкие тренировки и умеренная активность.',
    icon: ['M4 12h16', 'M5 12a7 7 0 0 1 14 0v3H5z'],
  },
  {
    value: 'medium',
    title: '3–4 тренировки',
    description: 'Регулярная нагрузка и активный ритм.',
    icon: ['M5 11h14v8H5z', 'M8 11V9a4 4 0 1 1 8 0v2', 'M7 19h10'],
  },
  {
    value: 'high',
    title: 'Активный образ жизни',
    description: 'Много движения, спорт и высокая нагрузка.',
    icon: ['M13 2 4 14h7l-1 8 10-13h-7l1-7Z'],
  },
]

const restrictionOptions = [
  'Без ограничений',
  'Не ем рыбу',
  'Не ем мясо',
  'Непереносимость лактозы',
]

const stepIndex = ref(0)
const isSubmitted = ref(false)
const calcTimerId = ref(null)
const placesLeft = ref(7)

const form = ref({
  goal: '',
  gender: '',
  age: null,
  height: null,
  weight: null,
  activity: '',
  restrictions: [],
  name: '',
  phone: '',
})

const currentStep = computed(() => stepOrder[stepIndex.value])
const totalQuestionSteps = 7

const questionStep = computed(() => {
  if (stepIndex.value < 1) return 0
  if (stepIndex.value > 7) return 7
  return stepIndex.value
})

const progressPercent = computed(() => (questionStep.value / totalQuestionSteps) * 100)

const canContinue = computed(() => {
  if (currentStep.value === 'intro') return true
  if (currentStep.value === 'goal') return Boolean(form.value.goal)
  if (currentStep.value === 'gender') return Boolean(form.value.gender)
  if (currentStep.value === 'age') return Number(form.value.age) >= 14
  if (currentStep.value === 'height') return Number(form.value.height) >= 120
  if (currentStep.value === 'weight') return Number(form.value.weight) >= 35
  if (currentStep.value === 'activity') return Boolean(form.value.activity)
  if (currentStep.value === 'restrictions') return form.value.restrictions.length > 0
  if (currentStep.value === 'result') return Boolean(form.value.name.trim()) && Boolean(form.value.phone.trim())
  return false
})

const caloriePlan = computed(() => {
  const weight = Number(form.value.weight) || 70
  const height = Number(form.value.height) || 170
  const age = Number(form.value.age) || 28
  const gender = form.value.gender === 'Женщина' ? 'female' : 'male'
  const activityFactorById = {
    low: 1.2,
    light: 1.375,
    medium: 1.55,
    high: 1.725,
  }
  const activityFactor = activityFactorById[form.value.activity] ?? 1.2

  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161

  const targetByGoal = {
    'Снижение веса': 0.85,
    'Поддержание формы': 1,
    'Набор массы': 1.12,
    'Здоровое питание': 0.97,
  }
  const goalFactor = targetByGoal[form.value.goal] ?? 1
  const calories = Math.round((bmr * activityFactor) * goalFactor)

  const proteinByGoal = {
    'Снижение веса': 1.8,
    'Поддержание формы': 1.6,
    'Набор массы': 2,
    'Здоровое питание': 1.5,
  }
  const fatByGoal = {
    'Снижение веса': 0.8,
    'Поддержание формы': 0.9,
    'Набор массы': 1,
    'Здоровое питание': 0.9,
  }

  const protein = Math.round((proteinByGoal[form.value.goal] ?? 1.6) * weight)
  const fat = Math.round((fatByGoal[form.value.goal] ?? 0.9) * weight)
  const carbs = Math.max(0, Math.round((calories - (protein * 4 + fat * 9)) / 4))

  return { calories, protein, fat, carbs }
})

const resetQuiz = () => {
  clearCalcTimer()
  stepIndex.value = 0
  isSubmitted.value = false
  form.value = {
    goal: props.presetGoal || '',
    gender: '',
    age: null,
    height: null,
    weight: null,
    activity: '',
    restrictions: [],
    name: '',
    phone: '',
  }
  placesLeft.value = 7
  if (props.presetGoal) {
    emit('goal-selected', props.presetGoal)
  }
}

const clearCalcTimer = () => {
  if (!calcTimerId.value) return
  clearTimeout(calcTimerId.value)
  calcTimerId.value = null
}

const closeQuiz = () => {
  clearCalcTimer()
  emit('close')
}

const selectGoal = (goal) => {
  form.value.goal = goal
  emit('goal-selected', goal)
}

const selectRestriction = (value) => {
  if (value === 'Без ограничений') {
    form.value.restrictions = ['Без ограничений']
    return
  }

  form.value.restrictions = form.value.restrictions.filter((item) => item !== 'Без ограничений')

  if (form.value.restrictions.includes(value)) {
    form.value.restrictions = form.value.restrictions.filter((item) => item !== value)
    return
  }

  form.value.restrictions = [...form.value.restrictions, value]
}

const nextStep = () => {
  if (!canContinue.value) return

  if (currentStep.value === 'result') {
    isSubmitted.value = true
    return
  }

  stepIndex.value += 1
}

const previousStep = () => {
  if (stepIndex.value <= 0) return

  if (currentStep.value === 'result') {
    stepIndex.value = 7
    return
  }

  stepIndex.value -= 1
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      resetQuiz()
      return
    }
    clearCalcTimer()
  }
)

watch(
  () => props.presetGoal,
  (goal) => {
    if (!props.isOpen) return
    if (!goal) return
    form.value.goal = goal
    emit('goal-selected', goal)
  }
)

watch(
  () => currentStep.value,
  (step) => {
    if (step !== 'calculating') return
    clearCalcTimer()
    calcTimerId.value = setTimeout(() => {
      stepIndex.value = 9
    }, 2200)
  }
)

onBeforeUnmount(() => {
  clearCalcTimer()
})
</script>

<template>
  <transition name="accordion">
    <div
      v-if="props.isOpen"
      class="fixed inset-0 z-50 flex items-end bg-black/35 p-0 sm:items-center sm:justify-center sm:p-4"
      @click.self="closeQuiz"
    >
      <div class="w-full max-h-[100dvh] overflow-y-auto rounded-t-3xl border border-brand-line bg-brand-surface p-5 shadow-soft sm:max-w-[640px] sm:rounded-2xl sm:p-6">
        <div class="mb-4 flex items-center justify-between">
          <p v-if="currentStep !== 'intro'" class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            Шаг {{ questionStep }} из {{ totalQuestionSteps }}
          </p>
          <p v-else class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            Персональный расчет
          </p>

          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-line text-brand-muted"
            aria-label="Закрыть квиз"
            @click="closeQuiz"
          >
            ✕
          </button>
        </div>

        <div v-if="currentStep !== 'intro'" class="mb-5">
          <div class="h-1.5 overflow-hidden rounded-full bg-brand-line">
            <div
              class="h-full rounded-full bg-primary transition-all duration-300"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>
        </div>

        <div v-if="isSubmitted" class="py-3">
          <h3 class="text-2xl font-bold tracking-tight text-brand-text">Заявка отправлена</h3>
          <p class="mt-2 text-sm leading-relaxed text-brand-muted">
            Нутрициолог получил ваши данные и подготовит персональное меню с консультацией.
          </p>
          <button
            type="button"
            class="mt-5 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:bg-secondary"
            @click="closeQuiz"
          >
            Закрыть
          </button>
        </div>

        <template v-else>
          <div v-if="currentStep === 'intro'" class="space-y-5">
            <h3 class="text-[30px] font-bold leading-[1.12] text-brand-text">
              Рассчитаем питание<br />для вашего организма
            </h3>
            <p class="text-base leading-relaxed text-brand-muted">
              Ответьте на несколько вопросов. Это займет меньше минуты.
            </p>

            <ul class="space-y-2.5">
              <li class="flex items-center gap-2.5 text-sm text-brand-text">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <svg viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                Персональный расчет КБЖУ
              </li>
              <li class="flex items-center gap-2.5 text-sm text-brand-text">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <svg viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                Меню от шеф-повара
              </li>
              <li class="flex items-center gap-2.5 text-sm text-brand-text">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <svg viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                Доставка по Москве
              </li>
            </ul>

            <button
              type="button"
              class="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary"
              @click="nextStep"
            >
              Начать расчет
            </button>
          </div>

          <template v-else-if="currentStep === 'goal'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Какая ваша цель?</h3>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                v-for="option in goalOptions"
                :key="option.value"
                type="button"
                class="w-full rounded-xl border bg-white px-4 py-4 text-left transition"
                :class="form.goal === option.value ? 'border-primary shadow-soft' : 'border-brand-line hover:border-primary/60'"
                @click="selectGoal(option.value)"
              >
                <span class="inline-flex h-8 w-8 items-center justify-center text-secondary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="h-6 w-6"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path
                      v-for="(path, index) in option.icon"
                      :key="`goal-${option.value}-${index}`"
                      :d="path"
                    />
                  </svg>
                </span>
                <p class="mt-2 text-sm font-semibold text-brand-text">{{ option.label }}</p>
              </button>
            </div>
          </template>

          <template v-else-if="currentStep === 'gender'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш пол</h3>
            <div class="mt-5 grid gap-3">
              <button
                v-for="option in genderOptions"
                :key="option"
                type="button"
                class="w-full rounded-xl border bg-white px-4 py-4 text-left text-base font-semibold transition"
                :class="form.gender === option ? 'border-primary shadow-soft' : 'border-brand-line hover:border-primary/60'"
                @click="form.gender = option"
              >
                {{ option }}
              </button>
            </div>
          </template>

          <template v-else-if="currentStep === 'age'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш возраст</h3>
            <p class="mt-2 text-sm text-brand-muted">например: 28</p>
            <div class="mt-5">
              <input
                v-model.number="form.age"
                type="number"
                min="14"
                max="90"
                placeholder="Введите возраст"
                class="w-full rounded-xl border border-brand-input bg-white px-4 py-4 text-base text-brand-text placeholder:text-brand-placeholder outline-none focus:border-primary"
              />
            </div>
          </template>

          <template v-else-if="currentStep === 'height'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш рост</h3>
            <div class="mt-5">
              <label class="relative block">
                <input
                  v-model.number="form.height"
                  type="number"
                  min="120"
                  max="230"
                  placeholder="Введите рост"
                  class="w-full rounded-xl border border-brand-input bg-white px-4 py-4 pr-12 text-base text-brand-text placeholder:text-brand-placeholder outline-none focus:border-primary"
                />
                <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted">см</span>
              </label>
            </div>
          </template>

          <template v-else-if="currentStep === 'weight'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш вес</h3>
            <div class="mt-5 space-y-4">
              <label class="relative block">
                <input
                  v-model.number="form.weight"
                  type="number"
                  min="35"
                  max="250"
                  placeholder="Введите вес"
                  class="w-full rounded-xl border border-brand-input bg-white px-4 py-4 pr-12 text-base text-brand-text placeholder:text-brand-placeholder outline-none focus:border-primary"
                />
                <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted">кг</span>
              </label>
              <input
                :value="form.weight ?? 70"
                type="range"
                min="35"
                max="150"
                class="w-full accent-primary"
                @input="form.weight = Number($event.target.value)"
              />
            </div>
          </template>

          <template v-else-if="currentStep === 'activity'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш уровень активности</h3>
            <div class="mt-5 grid gap-3">
              <button
                v-for="option in activityOptions"
                :key="option.value"
                type="button"
                class="w-full rounded-xl border bg-white px-4 py-4 text-left transition"
                :class="form.activity === option.value ? 'border-primary shadow-soft' : 'border-brand-line hover:border-primary/60'"
                @click="form.activity = option.value"
              >
                <span class="inline-flex h-7 w-7 items-center justify-center text-secondary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="h-5 w-5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path
                      v-for="(path, index) in option.icon"
                      :key="`activity-${option.value}-${index}`"
                      :d="path"
                    />
                  </svg>
                </span>
                <p class="mt-1 text-sm font-semibold text-brand-text">{{ option.title }}</p>
                <p class="mt-1 text-xs text-brand-muted">{{ option.description }}</p>
              </button>
            </div>
          </template>

          <template v-else-if="currentStep === 'restrictions'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Есть ли ограничения в питании?</h3>
            <div class="mt-5 grid gap-3">
              <button
                v-for="option in restrictionOptions"
                :key="option"
                type="button"
                class="w-full rounded-xl border bg-white px-4 py-4 text-left text-sm font-semibold transition"
                :class="form.restrictions.includes(option) ? 'border-primary shadow-soft' : 'border-brand-line hover:border-primary/60'"
                @click="selectRestriction(option)"
              >
                {{ option }}
              </button>
            </div>
          </template>

          <template v-else-if="currentStep === 'calculating'">
            <div class="py-6 text-center">
              <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Рассчитываем ваше питание</h3>
              <p class="mt-3 text-sm text-brand-muted">Подбираем баланс нутриентов под ваши данные.</p>
              <div class="mx-auto mt-6 h-2 w-full max-w-[360px] overflow-hidden rounded-full bg-brand-line">
                <div class="quiz-progress-bar h-full rounded-full bg-primary"></div>
              </div>
            </div>
          </template>

          <template v-else-if="currentStep === 'result'">
            <h3 class="text-[28px] font-bold leading-[1.15] text-brand-text">Ваш персональный рацион</h3>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <article class="rounded-xl border border-brand-line bg-white p-3">
                <p class="text-xs text-brand-muted">Калории</p>
                <p class="mt-1 text-lg font-bold text-brand-text">{{ caloriePlan.calories }} kcal</p>
              </article>
              <article class="rounded-xl border border-brand-line bg-white p-3">
                <p class="text-xs text-brand-muted">Белки</p>
                <p class="mt-1 text-lg font-bold text-brand-text">{{ caloriePlan.protein }} г</p>
              </article>
              <article class="rounded-xl border border-brand-line bg-white p-3">
                <p class="text-xs text-brand-muted">Жиры</p>
                <p class="mt-1 text-lg font-bold text-brand-text">{{ caloriePlan.fat }} г</p>
              </article>
              <article class="rounded-xl border border-brand-line bg-white p-3">
                <p class="text-xs text-brand-muted">Углеводы</p>
                <p class="mt-1 text-lg font-bold text-brand-text">{{ caloriePlan.carbs }} г</p>
              </article>
            </div>

            <p class="mt-4 text-sm leading-relaxed text-brand-muted">
              На основе ваших данных нутрициолог подготовит меню с таким балансом нутриентов.
            </p>

            <h4 class="mt-6 text-xl font-bold text-brand-text">Получите меню и консультацию</h4>

            <div class="mt-4 space-y-3">
              <input
                v-model="form.name"
                type="text"
                placeholder="Имя"
                class="w-full rounded-xl border border-brand-input bg-white px-4 py-4 text-base text-brand-text placeholder:text-brand-placeholder outline-none focus:border-primary"
              />
              <input
                v-model="form.phone"
                type="tel"
                placeholder="Телефон"
                class="w-full rounded-xl border border-brand-input bg-white px-4 py-4 text-base text-brand-text placeholder:text-brand-placeholder outline-none focus:border-primary"
              />
            </div>

            <div class="mt-5 space-y-1.5 rounded-xl border border-brand-line bg-white p-3">
              <p class="text-xs text-brand-muted">Более 2000 клиентов уже используют NutriMe</p>
              <p class="text-xs font-semibold text-primary">Сегодня осталось {{ placesLeft }} мест на консультацию</p>
              <p class="text-xs text-brand-muted">Заполнение занимает 1 минуту</p>
            </div>

            <button
              type="button"
              class="mt-5 w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!canContinue"
              @click="nextStep"
            >
              Получить меню
            </button>
          </template>

          <div
            v-if="['goal', 'gender', 'age', 'height', 'weight', 'activity', 'restrictions'].includes(currentStep)"
            class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <button
              type="button"
              class="w-full rounded-xl border border-brand-line px-4 py-3 text-sm font-semibold text-brand-text transition sm:w-auto"
              :disabled="stepIndex === 0"
              @click="previousStep"
            >
              Назад
            </button>
            <button
              type="button"
              class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              :disabled="!canContinue"
              @click="nextStep"
            >
              {{ currentStep === 'restrictions' ? 'Рассчитать' : 'Далее' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.quiz-progress-bar {
  width: 100%;
  animation: quiz-calc 2.2s ease-out forwards;
  transform-origin: left;
  transform: scaleX(0);
}

@keyframes quiz-calc {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}
</style>
