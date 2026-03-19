<script setup>
import { computed, ref } from 'vue'

const menuFilters = [
  { id: 'weight-loss', label: 'Похудение' },
  { id: 'balance', label: 'Баланс' },
  { id: 'maintenance', label: 'Поддержание формы' },
  { id: 'mass-gain', label: 'Набор массы' },
]

const menuDishes = [
  {
    name: 'Куриная грудка с киноа и овощами',
    calories: 420,
    protein: '35г',
    fat: '12г',
    carbs: '45г',
    composition: 'Куриная грудка, киноа, брокколи, морковь, оливковое масло, лимонный соус.',
    ingredients: ['Куриная грудка', 'Киноа', 'Брокколи', 'Морковь', 'Оливковое масло'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    programs: ['weight-loss', 'balance', 'maintenance'],
  },
  {
    name: 'Лосось с булгуром и брокколи',
    calories: 480,
    protein: '38г',
    fat: '20г',
    carbs: '40г',
    composition: 'Филе лосося, булгур, брокколи, зелень, соус на основе йогурта.',
    ingredients: ['Лосось', 'Булгур', 'Брокколи', 'Йогуртовый соус', 'Зелень'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
    programs: ['balance', 'maintenance', 'mass-gain'],
  },
  {
    name: 'Омлет со шпинатом и авокадо',
    calories: 350,
    protein: '25г',
    fat: '22г',
    carbs: '12г',
    composition: 'Яичный омлет, шпинат, авокадо, томаты черри, семена кунжута.',
    ingredients: ['Яйца', 'Шпинат', 'Авокадо', 'Томаты черри', 'Кунжут'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1200&q=80',
    programs: ['weight-loss', 'balance'],
  },
  {
    name: 'Индейка с печёными овощами',
    calories: 410,
    protein: '34г',
    fat: '14г',
    carbs: '36г',
    composition: 'Филе индейки, печёный перец, цукини, батат, травы и специи.',
    ingredients: ['Индейка', 'Батат', 'Цукини', 'Болгарский перец', 'Тимьян'],
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=80',
    programs: ['weight-loss', 'balance', 'mass-gain'],
  },
  {
    name: 'Греческий салат с курицей',
    calories: 390,
    protein: '30г',
    fat: '18г',
    carbs: '24г',
    composition: 'Куриное филе, свежие овощи, фета, оливки, легкая заправка.',
    ingredients: ['Курица', 'Огурец', 'Томаты', 'Фета', 'Оливки'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
    programs: ['weight-loss', 'balance', 'maintenance'],
  },
  {
    name: 'Творожный десерт с ягодами',
    calories: 280,
    protein: '22г',
    fat: '8г',
    carbs: '30г',
    composition: 'Нежный творожный крем, сезонные ягоды, немного меда и семена чиа.',
    ingredients: ['Творог', 'Йогурт', 'Ягоды', 'Мёд', 'Семена чиа'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    programs: ['balance', 'maintenance', 'mass-gain'],
  },
]

const activeMenuFilter = ref('weight-loss')
const isDishModalOpen = ref(false)
const activeDish = ref(null)

const filteredMenuDishes = computed(() =>
  menuDishes.filter((dish) => dish.programs.includes(activeMenuFilter.value))
)

const setMenuFilter = (filterId) => {
  activeMenuFilter.value = filterId
}

const openDishModal = (dish) => {
  activeDish.value = dish
  isDishModalOpen.value = true
}

const closeDishModal = () => {
  isDishModalOpen.value = false
  activeDish.value = null
}
</script>

<template>
  <section id="menu" class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Примеры блюд из нашего меню
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Каждое блюдо готовится по рассчитанному балансу КБЖУ и создаётся шеф-поваром, чтобы питание было не только
          полезным, но и вкусным.
        </p>
      </header>

      <div class="mt-10 flex gap-[10px] overflow-x-auto pb-1 scrollbar-hidden md:justify-center md:gap-[14px]">
        <button
          v-for="filter in menuFilters"
          :key="filter.id"
          type="button"
          class="whitespace-nowrap rounded-[24px] border px-[18px] py-[10px] text-sm font-medium transition"
          :class="
            activeMenuFilter === filter.id
              ? 'border-transparent bg-primary text-white'
              : 'border-brand-line bg-white text-brand-text hover:bg-primary/10'
          "
          @click="setMenuFilter(filter.id)"
        >
          {{ filter.label }}
        </button>
      </div>

      <transition-group
        name="menu-card"
        tag="div"
        class="mt-12 grid gap-4 md:mt-[60px] md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
      >
        <article
          v-for="dish in filteredMenuDishes"
          :key="`${activeMenuFilter}-${dish.name}`"
          class="group cursor-pointer overflow-hidden rounded-[14px] border border-brand-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft md:rounded-[16px]"
          @click="openDishModal(dish)"
        >
          <div class="overflow-hidden">
            <img
              :src="dish.image"
              :alt="dish.name"
              class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="p-[18px] md:p-5">
            <h3 class="text-xl font-semibold leading-snug text-brand-text">{{ dish.name }}</h3>
            <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <div>
                <p class="text-[12px] text-brand-muted">Калории</p>
                <p class="text-sm font-semibold text-brand-text">{{ dish.calories }}</p>
              </div>
              <div>
                <p class="text-[12px] text-brand-muted">Б</p>
                <p class="text-sm font-semibold text-brand-text">{{ dish.protein }}</p>
              </div>
              <div>
                <p class="text-[12px] text-brand-muted">Ж</p>
                <p class="text-sm font-semibold text-brand-text">{{ dish.fat }}</p>
              </div>
              <div>
                <p class="text-[12px] text-brand-muted">У</p>
                <p class="text-sm font-semibold text-brand-text">{{ dish.carbs }}</p>
              </div>
            </div>
          </div>
        </article>
      </transition-group>

      <div class="mt-12 text-center md:mt-[60px]">
        <p class="text-base font-medium text-brand-text md:text-[18px]">Каждую неделю меню обновляется.</p>
        <a
          href="#menu"
          class="mt-6 inline-flex rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary-hover active:bg-secondary"
        >
          Посмотреть все блюда
        </a>
      </div>
    </div>
  </section>

  <transition name="accordion">
    <div
      v-if="isDishModalOpen && activeDish"
      class="fixed inset-0 z-[45] flex items-end bg-black/55 p-0 sm:items-center sm:justify-center sm:p-4"
      @click.self="closeDishModal"
    >
      <div class="w-full rounded-t-3xl border border-brand-line bg-white p-4 shadow-soft sm:max-w-4xl sm:rounded-2xl sm:p-5">
        <div class="mb-3 flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">Блюдо из меню NutriMe</p>
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-line text-brand-muted transition hover:text-brand-text"
            aria-label="Закрыть блюдо"
            @click="closeDishModal"
          >
            ✕
          </button>
        </div>

        <div class="grid gap-4 sm:gap-5 md:grid-cols-[1fr_0.9fr]">
          <div class="overflow-hidden rounded-xl border border-brand-line">
            <img :src="activeDish.image" :alt="activeDish.name" class="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <h3 class="text-2xl font-bold leading-tight text-brand-text">{{ activeDish.name }}</h3>
            <p class="mt-2 text-base leading-relaxed text-brand-muted">{{ activeDish.composition }}</p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span class="rounded-full bg-brand-section px-3 py-1.5 text-xs font-semibold text-brand-text">
                Калории: {{ activeDish.calories }}
              </span>
              <span class="rounded-full bg-brand-section px-3 py-1.5 text-xs font-semibold text-brand-text">
                Б: {{ activeDish.protein }}
              </span>
              <span class="rounded-full bg-brand-section px-3 py-1.5 text-xs font-semibold text-brand-text">
                Ж: {{ activeDish.fat }}
              </span>
              <span class="rounded-full bg-brand-section px-3 py-1.5 text-xs font-semibold text-brand-text">
                У: {{ activeDish.carbs }}
              </span>
            </div>

            <p class="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Ингредиенты</p>
            <ul class="mt-2 grid gap-1.5">
              <li
                v-for="ingredient in activeDish.ingredients"
                :key="ingredient"
                class="text-sm text-brand-muted"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
