<script setup>
import { ref } from 'vue'

const quickBenefits = [
  { icon: '🥗', label: 'Индивидуальный рацион' },
  { icon: '👨‍⚕️', label: 'Консультация нутрициолога' },
  { icon: '🚚', label: 'Доставка по Москве' },
]

const steps = [
  {
    id: '01',
    title: 'Заполняете короткую анкету',
    text: 'Рассказываете о целях, предпочтениях и особенностях организма.',
  },
  {
    id: '02',
    title: 'Нутрициолог рассчитывает рацион',
    text: 'Определяем нужное КБЖУ и подходящий тип питания.',
  },
  {
    id: '03',
    title: 'Шеф-повар создаёт меню',
    text: 'Блюда разрабатываются индивидуально под ваши задачи.',
  },
  {
    id: '04',
    title: 'Мы готовим и доставляем',
    text: 'Готовые блюда приезжают к вам каждые два дня.',
  },
]

const programs = [
  {
    title: 'Похудение',
    short: 'Безопасный дефицит калорий без стресса и срывов.',
    description: 'Рацион выстраивается так, чтобы вес снижался плавно и без потери энергии.',
    ribbon: 'linear-gradient(90deg, #2E7D32 0%, #66BB6A 100%)',
  },
  {
    title: 'Кето питание',
    short: 'Низкоуглеводное меню для кетогенной диеты.',
    description: 'Контроль углеводов, баланс жиров и белка, стабильная сытость в течение дня.',
    ribbon: 'linear-gradient(90deg, #66BB6A 0%, #2E7D32 100%)',
  },
  {
    title: 'Спортивное питание',
    short: 'Энергия, восстановление и поддержка тренировок.',
    description: 'Учитываем нагрузку, время тренировок и цель: масса, рельеф или выносливость.',
    ribbon: 'linear-gradient(90deg, #2E7D32 0%, #FFB74D 100%)',
  },
  {
    title: 'Лечебное питание',
    short: 'Питание с учётом медицинских рекомендаций.',
    description: 'Делаем рацион комфортным и понятным даже при пищевых ограничениях.',
    ribbon: 'linear-gradient(90deg, #FFB74D 0%, #66BB6A 100%)',
  },
  {
    title: 'Веган / вегетарианство',
    short: 'Сбалансированное растительное меню.',
    description: 'Контролируем белок, витамины и микроэлементы для устойчивого результата.',
    ribbon: 'linear-gradient(90deg, #2E7D32 0%, #66BB6A 100%)',
  },
  {
    title: 'Детское питание',
    short: 'Рационы с учётом возраста ребёнка.',
    description: 'Безопасное меню с мягкой адаптацией под вкусовые предпочтения ребёнка.',
    ribbon: 'linear-gradient(90deg, #66BB6A 0%, #FFB74D 100%)',
  },
  {
    title: 'Питание для беременных',
    short: 'Поддержка организма в важный период.',
    description: 'Соблюдаем нутриентный баланс для самочувствия мамы и развития малыша.',
    ribbon: 'linear-gradient(90deg, #FFB74D 0%, #2E7D32 100%)',
  },
  {
    title: 'Индивидуальный рацион',
    short: 'Персональная программа питания под ваш ритм.',
    description: 'Полная кастомизация: цели, график, бюджет и пищевые ограничения.',
    ribbon: 'linear-gradient(90deg, #2E7D32 0%, #66BB6A 100%)',
  },
]

const advantages = [
  {
    icon: '🧬',
    title: 'Индивидуальный подход',
    text: 'Рацион создаётся по целям, анализам и особенностям организма.',
  },
  {
    icon: '👨‍🍳',
    title: 'Ресторанное качество',
    text: 'Блюда готовят профессиональные шеф-повара из свежих ингредиентов.',
  },
  {
    icon: '🩺',
    title: 'Поддержка специалистов',
    text: 'Нутрициолог сопровождает вас на каждом этапе программы.',
  },
  {
    icon: '⏱️',
    title: 'Удобная доставка',
    text: 'Рационы доставляются каждые два дня по Москве без лишней логистики.',
  },
  {
    icon: '🌿',
    title: 'Свежие продукты',
    text: 'Только качественные ингредиенты и контроль на каждом этапе.',
  },
  {
    icon: '🔁',
    title: 'Гибкое меню',
    text: 'Рацион можно корректировать по вкусу, целям и режиму.',
  },
]

const ingredients = [
  {
    name: 'Мраморная говядина',
    category: 'Премиум белок',
    note: 'Контроль качества и свежести при каждой поставке.',
  },
  {
    name: 'Дикий лосось',
    category: 'Омега-3',
    note: 'Поддержка нервной системы и обмена веществ.',
  },
  {
    name: 'Дорадо и тунец',
    category: 'Морская линия',
    note: 'Лёгкий белок и деликатный вкус в сбалансированных блюдах.',
  },
  {
    name: 'Фермерская курица',
    category: 'Базовый рацион',
    note: 'Проверенные поставщики и нежная технология приготовления.',
  },
  {
    name: 'Морепродукты',
    category: 'Микроэлементы',
    note: 'Рационы с акцентом на разнообразие и плотность нутриентов.',
  },
]

const superfoods = ['Киноа', 'Чиа', 'Ягоды годжи', 'Асаи', 'Спирулина', 'Матча']

const testimonials = [
  {
    name: 'Анна',
    text: 'Индивидуальный рацион помог снизить вес и улучшить самочувствие уже в первый месяц.',
  },
  {
    name: 'Иван',
    text: 'Лечебное питание упростило контроль сахара. Всё чётко: вкусно, удобно и без срывов.',
  },
  {
    name: 'Мария',
    text: 'Спортивное меню идеально легло в график тренировок. Восстановление стало заметно быстрее.',
  },
]

const faqItems = [
  {
    q: 'Какие продукты используются?',
    a: 'Используем свежие продукты от проверенных поставщиков, включая премиальные источники белка и суперфуды.',
  },
  {
    q: 'Как работает доставка?',
    a: 'Доставляем по Москве каждые два дня в заранее согласованные интервалы, чтобы рацион всегда был свежим.',
  },
  {
    q: 'Можно ли изменить заказ?',
    a: 'Да. Меню и параметры программы можно корректировать через менеджера или нутрициолога.',
  },
  {
    q: 'Как оплатить?',
    a: 'Оплата доступна онлайн картой, по ссылке или банковским переводом для корпоративных клиентов.',
  },
  {
    q: 'Есть ли консультация специалиста?',
    a: 'Да. Перед стартом и в процессе вы получаете сопровождение нутрициолога.',
  },
]

const openProgram = ref(0)
const openFaq = ref(0)
const currentReview = ref(0)

const toggleProgram = (index) => {
  openProgram.value = openProgram.value === index ? null : index
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const nextReview = () => {
  currentReview.value = (currentReview.value + 1) % testimonials.length
}

const prevReview = () => {
  currentReview.value = (currentReview.value - 1 + testimonials.length) % testimonials.length
}
</script>

<template>
  <main class="relative overflow-x-hidden pb-28 md:pb-0">
    <div class="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-brand-accent/25 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-12 top-[32rem] h-52 w-52 rounded-full bg-secondary/30 blur-3xl"></div>

    <section class="px-4 pt-4 sm:px-6">
      <div class="section-shell">
        <header class="glass-card flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-display text-lg font-semibold text-white"
            >
              N
            </span>
            <p class="font-semibold tracking-wide">NutriMe</p>
          </div>
          <a
            href="#final-cta"
            class="rounded-xl border border-primary/40 bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-text transition hover:-translate-y-0.5 hover:border-secondary"
          >
            Подобрать рацион
          </a>
        </header>

        <div class="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article class="glass-card p-6 sm:p-8">
            <p class="inline-flex rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
              Персональное питание в Москве
            </p>
            <h1
              class="mt-5 max-w-2xl font-display text-4xl leading-[0.92] text-brand-text sm:text-5xl lg:text-6xl"
            >
              Персональное питание, созданное для вашего организма
            </h1>
            <p class="mt-5 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
              Нутрициолог рассчитывает КБЖУ, шеф-повар готовит меню, а мы доставляем готовые блюда прямо к вам домой.
            </p>

            <ul class="mt-6 grid gap-3 sm:grid-cols-3">
              <li
                v-for="item in quickBenefits"
                :key="item.label"
                class="rounded-2xl border border-primary/25 bg-brand-dark px-3 py-3 text-sm shadow-soft"
              >
                <p class="text-lg">{{ item.icon }}</p>
                <p class="mt-1 font-medium">{{ item.label }}</p>
              </li>
            </ul>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#final-cta"
                class="rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-center text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Получить персональный рацион
              </a>
              <a
                href="#offer"
                class="rounded-2xl border border-primary/30 bg-brand-surface px-5 py-3 text-center text-sm font-semibold text-brand-text transition hover:-translate-y-0.5 hover:border-primary/60"
              >
                Попробовать пробный день — 1500 ₽
              </a>
            </div>
          </article>

          <aside class="glass-card relative overflow-hidden p-6 sm:p-8">
            <div class="absolute -right-10 -top-14 h-36 w-36 rounded-full bg-brand-accent/35 blur-2xl"></div>
            <div class="absolute -bottom-16 -left-14 h-36 w-36 rounded-full bg-secondary/45 blur-2xl"></div>
            <div class="relative rounded-3xl bg-gradient-to-br from-brand-dark via-brand-surface to-primary/30 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Сегодня в рационе</p>
              <h3 class="mt-2 font-display text-3xl leading-none text-brand-text">Smart Menu</h3>
              <p class="mt-2 text-sm text-brand-muted">
                Индивидуальный набор блюд с расчётом КБЖУ и доставкой под ваш график.
              </p>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-brand-dark/80 p-3 shadow-soft">
                  <p class="text-xs uppercase tracking-wide text-brand-muted">Калории</p>
                  <p class="mt-1 text-lg font-bold text-brand-text">1650 ккал</p>
                </div>
                <div class="rounded-2xl bg-brand-dark/80 p-3 shadow-soft">
                  <p class="text-xs uppercase tracking-wide text-brand-muted">Белки</p>
                  <p class="mt-1 text-lg font-bold text-brand-text">118 г</p>
                </div>
                <div class="rounded-2xl bg-brand-dark/80 p-3 shadow-soft">
                  <p class="text-xs uppercase tracking-wide text-brand-muted">Жиры</p>
                  <p class="mt-1 text-lg font-bold text-brand-text">62 г</p>
                </div>
                <div class="rounded-2xl bg-brand-dark/80 p-3 shadow-soft">
                  <p class="text-xs uppercase tracking-wide text-brand-muted">Углеводы</p>
                  <p class="mt-1 text-lg font-bold text-brand-text">140 г</p>
                </div>
              </div>

              <div class="mt-5 flex items-center justify-between rounded-2xl bg-brand-dark px-4 py-3 text-white">
                <p class="text-sm">Консультация нутрициолога</p>
                <span class="rounded-full bg-primary/20 px-2 py-1 text-xs text-secondary">включена</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Как работает NutriMe</p>
        <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">
          От анкеты до готового рациона за 4 шага
        </h2>

        <div class="mt-7 rounded-full bg-primary/10 p-1">
          <div class="grid grid-cols-4 gap-1">
            <span
              v-for="step in steps"
              :key="`${step.id}-progress`"
              class="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
            ></span>
          </div>
        </div>

        <div class="mt-8 space-y-4">
          <article
            v-for="(step, index) in steps"
            :key="step.id"
            class="glass-card animate-rise p-4 sm:p-5"
            :style="{ animationDelay: `${index * 120}ms` }"
          >
            <div class="flex gap-4">
              <span
                class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white"
              >
                {{ step.id }}
              </span>
              <div>
                <h3 class="text-lg font-semibold">{{ step.title }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-brand-muted">{{ step.text }}</p>
              </div>
            </div>
          </article>
        </div>

        <a
          href="#programs"
          class="mt-8 inline-flex rounded-2xl border border-primary/30 bg-brand-surface px-5 py-3 text-sm font-semibold text-brand-text transition hover:-translate-y-0.5 hover:border-primary/60"
        >
          Перейти к программам питания
        </a>
      </div>
    </section>

    <section id="programs" class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Программы питания</p>
        <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">
          Выберите цель, а мы соберём рацион под неё
        </h2>

        <div class="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hidden sm:-mx-0 sm:px-0">
          <article
            v-for="(program, index) in programs"
            :key="program.title"
            class="min-w-[84%] snap-start rounded-3xl border border-white/10 bg-brand-surface p-5 shadow-soft sm:min-w-[50%] lg:min-w-[32%]"
          >
            <div class="h-1.5 rounded-full" :style="{ background: program.ribbon }"></div>
            <h3 class="mt-4 text-xl font-semibold">{{ program.title }}</h3>
            <p class="mt-2 text-sm text-brand-muted">{{ program.short }}</p>
            <button
              type="button"
              class="mt-4 text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
              @click="toggleProgram(index)"
            >
              {{ openProgram === index ? 'Скрыть детали' : 'Подробнее' }}
            </button>
            <transition name="accordion">
              <div v-if="openProgram === index" class="mt-4 space-y-3">
                <p class="text-sm leading-relaxed text-brand-muted">{{ program.description }}</p>
                <a
                  href="#final-cta"
                  class="inline-flex rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Подобрать рацион
                </a>
              </div>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Преимущества</p>
        <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">
          Экспертность и удобство в каждом заказе
        </h2>

        <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <article
            v-for="item in advantages"
            :key="item.title"
            class="glass-card flex h-full flex-col p-4 sm:p-5"
          >
            <span class="text-2xl">{{ item.icon }}</span>
            <h3 class="mt-3 text-base font-semibold sm:text-lg">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-brand-muted">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <div class="glass-card overflow-hidden p-6 sm:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Качество продуктов</p>
          <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">
            Премиальные ингредиенты в каждом рационе
          </h2>

          <div class="-mx-6 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 scrollbar-hidden">
            <article
              v-for="item in ingredients"
              :key="item.name"
              class="min-w-[75%] snap-start rounded-2xl border border-primary/20 bg-gradient-to-br from-brand-surface to-primary/25 p-4 sm:min-w-[42%] lg:min-w-[30%]"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">{{ item.category }}</p>
              <h3 class="mt-2 text-lg font-semibold">{{ item.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-brand-muted">{{ item.note }}</p>
            </article>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="food in superfoods"
              :key="food"
              class="rounded-full border border-brand-accent/50 bg-brand-accent/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-text"
            >
              {{ food }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="offer" class="px-4 py-4 sm:px-6">
      <div class="section-shell">
        <div class="relative overflow-hidden rounded-3xl border border-primary/30 bg-brand-surface p-6 shadow-soft sm:p-8">
          <div class="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary/30 blur-2xl"></div>
          <div class="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-brand-accent/20 blur-2xl"></div>
          <p
            class="inline-flex rounded-full border border-brand-accent/50 bg-brand-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark"
          >
            Акция
          </p>
          <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.95] text-brand-text sm:text-5xl">
            Скидка 15% на первый заказ
          </h2>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
            Попробуйте сервис с пробного дня. Стоимость пробного дня —
            <strong class="text-brand-text">1500 ₽</strong>.
          </p>
          <a
            href="#final-cta"
            class="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Получить скидку
          </a>
        </div>
      </div>
    </section>

    <section id="reviews" class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Отзывы клиентов</p>
        <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">Нам доверяют результат</h2>

        <div class="glass-card mt-8 overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentReview * 100}%)` }"
          >
            <article
              v-for="item in testimonials"
              :key="item.name"
              class="w-full shrink-0 p-6 sm:p-8"
            >
              <p class="font-display text-3xl text-primary">“</p>
              <p class="mt-2 text-base leading-relaxed text-brand-muted sm:text-lg">{{ item.text }}</p>
              <p class="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{{ item.name }}</p>
            </article>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <button
            type="button"
            class="rounded-xl border border-primary/30 bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-text transition hover:border-primary/60"
            @click="prevReview"
          >
            Назад
          </button>
          <div class="flex items-center gap-2">
            <button
              v-for="(_, index) in testimonials"
              :key="`dot-${index}`"
              type="button"
              class="h-2.5 rounded-full transition-all"
              :class="currentReview === index ? 'w-6 bg-primary' : 'w-2.5 bg-primary/35'"
              @click="currentReview = index"
            ></button>
          </div>
          <button
            type="button"
            class="rounded-xl border border-primary/30 bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-text transition hover:border-primary/60"
            @click="nextReview"
          >
            Вперёд
          </button>
        </div>
      </div>
    </section>

    <section id="faq" class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
        <h2 class="mt-3 max-w-2xl font-display text-4xl leading-[0.96] sm:text-5xl">
          Ответы на частые вопросы
        </h2>

        <div class="mt-8 space-y-3">
          <article
            v-for="(item, index) in faqItems"
            :key="item.q"
            class="glass-card overflow-hidden"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              @click="toggleFaq(index)"
            >
              <span class="text-sm font-semibold sm:text-base">{{ item.q }}</span>
              <span class="text-2xl leading-none text-primary">{{ openFaq === index ? '−' : '+' }}</span>
            </button>
            <transition name="accordion">
              <p v-if="openFaq === index" class="px-5 pb-5 text-sm leading-relaxed text-brand-muted">
                {{ item.a }}
              </p>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section id="final-cta" class="px-4 py-16 sm:px-6">
      <div class="section-shell">
        <div class="rounded-[2rem] bg-gradient-to-br from-primary via-brand-dark to-secondary p-[1px] shadow-soft">
          <div
            class="rounded-[calc(2rem-1px)] bg-gradient-to-b from-[#151515] to-[#1f1f1f] p-6 sm:p-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Финальный шаг</p>
              <h2 class="mt-3 font-display text-4xl leading-[0.95] sm:text-5xl">
                Начните персональное питание уже сегодня
              </h2>
              <p class="mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
                Заполните короткую анкету и получите индивидуальный рацион от нутрициолога.
              </p>
            </div>

            <form class="mt-6 space-y-3 lg:mt-0">
              <label class="block">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">Имя</span>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  class="w-full rounded-xl border border-primary/25 bg-brand-surface px-4 py-3 text-sm text-brand-text placeholder:text-brand-muted outline-none transition focus:border-primary/60"
                />
              </label>
              <label class="block">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">Телефон</span>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  class="w-full rounded-xl border border-primary/25 bg-brand-surface px-4 py-3 text-sm text-brand-text placeholder:text-brand-muted outline-none transition focus:border-primary/60"
                />
              </label>
              <label class="block">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">Цель питания</span>
                <select
                  class="w-full rounded-xl border border-primary/25 bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none transition focus:border-primary/60"
                >
                  <option>Похудение</option>
                  <option>Поддержание формы</option>
                  <option>Набор массы</option>
                  <option>Лечебное питание</option>
                  <option>Индивидуальная цель</option>
                </select>
              </label>
              <button
                type="submit"
                class="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Получить консультацию нутрициолога
              </button>
              <p class="text-xs leading-relaxed text-brand-muted">
                Нажимая на кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer class="px-4 pb-20 pt-10 sm:px-6 md:pb-12">
      <div class="section-shell">
        <div class="rounded-3xl border border-primary/15 bg-brand-surface px-5 py-6 shadow-soft">
          <div class="flex flex-col gap-5 sm:flex-row sm:justify-between">
            <div>
              <p class="font-display text-3xl">NutriMe</p>
              <p class="mt-1 text-sm text-brand-muted">Персональное питание с доставкой по Москве</p>
            </div>
            <div class="space-y-1 text-sm">
              <a href="tel:+74951234567" class="block font-medium transition hover:text-primary">+7 (495) 123-45-67</a>
              <a href="mailto:hello@nutrime.ru" class="block font-medium transition hover:text-primary">hello@nutrime.ru</a>
              <p>Москва, Пресненская набережная, 10</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <a
        href="#final-cta"
        class="block rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-4 text-center text-sm font-semibold text-white shadow-soft"
      >
        Получить рацион
      </a>
    </div>
  </main>
</template>
