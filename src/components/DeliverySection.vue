<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const deliveryCards = [
  {
    title: 'Регулярная доставка',
    text: 'Мы доставляем питание 2–3 раза в неделю, чтобы блюда всегда были свежими.',
    icon: ['M1 3h11v13H1z', 'M12 8h5l4 4v4h-9z', 'M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z', 'M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z'],
  },
  {
    title: 'Удобное время',
    text: 'Вы можете выбрать удобный временной интервал доставки.',
    icon: ['M12 8v5l3 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  },
  {
    title: 'Удобная упаковка',
    text: 'Блюда упакованы в герметичные контейнеры, которые удобно хранить.',
    icon: ['M3 7h18v13H3z', 'M7 7V4h10v3', 'M8 12h8'],
  },
]

const deliveryMapMarkers = [
  { name: 'ЦАО', positionClass: 'left-[38%] top-[40%]' },
  { name: 'САО', positionClass: 'left-[47%] top-[25%]' },
  { name: 'ЮАО', positionClass: 'left-[47%] top-[61%]' },
  { name: 'ЗАО', positionClass: 'left-[24%] top-[50%]' },
  { name: 'ВАО', positionClass: 'left-[62%] top-[48%]' },
]

const deliveryAreaHints = [
  'москва',
  'moscow',
  'цао',
  'сзао',
  'сао',
  'свао',
  'вао',
  'ювао',
  'юао',
  'юзао',
  'зао',
  'зеленоград',
  'химки',
  'мытищи',
  'красногорск',
  'реутов',
  'люберцы',
]

const deliveryCardRefs = ref([])
const visibleDeliveryCards = ref([])
const deliveryAddress = ref('')

const deliveryAvailability = computed(() => {
  const value = deliveryAddress.value.trim().toLowerCase()
  if (!value) return null
  return deliveryAreaHints.some((hint) => value.includes(hint))
})

const setDeliveryCardRef = (element, index) => {
  if (element) {
    deliveryCardRefs.value[index] = element
  }
}

let deliveryCardsObserver = null

const observeDeliveryCards = () => {
  if (typeof window === 'undefined') return

  deliveryCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.deliveryIndex)
        if (!visibleDeliveryCards.value.includes(index)) {
          visibleDeliveryCards.value.push(index)
        }
        deliveryCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  deliveryCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.deliveryIndex = String(index)
    deliveryCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeDeliveryCards()
})

onBeforeUnmount(() => {
  deliveryCardsObserver?.disconnect()
})
</script>

<template>
  <section id="delivery" class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Доставка по Москве
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Мы доставляем готовые блюда по Москве и ближайшим районам в удобные временные интервалы.
        </p>
      </header>

      <div class="mt-12 md:mt-[60px]">
        <article class="delivery-map-drift relative h-[320px] overflow-hidden rounded-[14px] border border-[#E6E1D8] bg-white md:h-[420px] md:rounded-[18px]">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(111,138,99,0.12),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(217,108,74,0.16),transparent_46%),linear-gradient(160deg,#F4EFE5_0%,#F1EBDD_100%)]"></div>
          <div class="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(214,206,191,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(214,206,191,0.45)_1px,transparent_1px)] [background-size:52px_52px]"></div>

          <div class="absolute left-[18%] top-[18%] h-[50%] w-[44%] rounded-[46%] bg-[rgba(217,108,74,0.18)]"></div>
          <div class="absolute left-[51%] top-[38%] h-[36%] w-[33%] rounded-[44%] bg-[rgba(111,138,99,0.15)]"></div>

          <p class="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-brand-text md:left-6 md:top-6">
            Москва и ближайшие районы
          </p>

          <span class="absolute right-4 top-4 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white md:right-6 md:top-6">
            Основная зона
          </span>
          <span class="absolute right-4 top-[52px] rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-white md:right-6 md:top-[62px]">
            Расширенная зона
          </span>

          <div
            v-for="marker in deliveryMapMarkers"
            :key="marker.name"
            class="absolute -translate-x-1/2 -translate-y-1/2"
            :class="marker.positionClass"
          >
            <span class="delivery-marker-pulse absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35"></span>
            <span class="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E6E1D8] bg-white text-primary shadow-soft">
              <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M1 3h11v13H1z" />
                <path d="M12 8h5l4 4v4h-9z" />
                <path d="M5.5 20A1.5 1.5 0 1 1 5.5 17a1.5 1.5 0 0 1 0 3Z" />
                <path d="M17.5 20A1.5 1.5 0 1 1 17.5 17a1.5 1.5 0 0 1 0 3Z" />
              </svg>
            </span>
            <span class="mt-1 block rounded-md bg-white/95 px-1.5 py-0.5 text-center text-[10px] font-semibold tracking-[0.05em] text-brand-text md:text-xs">
              {{ marker.name }}
            </span>
          </div>
        </article>

        <div class="mt-5 rounded-[14px] border border-[#E6E1D8] bg-white p-4 md:mt-6 md:rounded-[16px] md:p-5">
          <label for="delivery-address" class="block text-sm font-semibold text-brand-text">
            Проверка адреса доставки
          </label>
          <div class="mt-2 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              id="delivery-address"
              v-model="deliveryAddress"
              type="text"
              placeholder="Введите адрес доставки"
              class="w-full rounded-[10px] border border-brand-input bg-white px-4 py-3 text-sm text-brand-text outline-none transition placeholder:text-brand-placeholder focus:border-primary"
            />
            <span
              v-if="deliveryAvailability !== null"
              class="inline-flex shrink-0 rounded-[10px] px-3 py-2 text-sm font-semibold"
              :class="deliveryAvailability ? 'bg-secondary/15 text-secondary' : 'bg-primary/12 text-primary'"
            >
              {{ deliveryAvailability ? 'Доставка доступна' : 'Пока не доставляем в этот район' }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-[18px] md:mt-[70px] md:grid-cols-3 md:gap-8">
        <article
          v-for="(item, index) in deliveryCards"
          :key="item.title"
          :ref="(element) => setDeliveryCardRef(element, index)"
          class="group rounded-[16px] border border-[#E6E1D8] bg-white p-[22px] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-[26px]"
          :class="visibleDeliveryCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <span class="inline-flex h-[30px] w-[30px] items-center justify-center text-secondary transition-colors duration-300 group-hover:text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-[30px] w-[30px]"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                v-for="(path, pathIndex) in item.icon"
                :key="`delivery-card-${item.title}-${pathIndex}`"
                :d="path"
              />
            </svg>
          </span>
          <h3 class="mt-3 text-[18px] font-semibold leading-snug text-brand-text">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-base leading-relaxed text-brand-muted">
            {{ item.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
