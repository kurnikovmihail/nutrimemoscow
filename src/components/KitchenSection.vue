<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const kitchenFeatures = [
  {
    title: 'Свежие продукты',
    text: 'Используем свежие ингредиенты от проверенных поставщиков. Без полуфабрикатов.',
    icon: ['M7 20c5 0 9-4 9-9V4c-5 0-9 4-9 9v7Z', 'M7 20l10-10'],
  },
  {
    title: 'Шеф-повар готовит меню',
    text: 'Меню разрабатывает шеф-повар, чтобы блюда были не только полезными, но и вкусными.',
    icon: ['M5 11h14v8H5z', 'M8 11V9a4 4 0 1 1 8 0v2', 'M7 19h10'],
  },
  {
    title: 'Готовим каждый день',
    text: 'Еда не хранится неделями. Мы готовим блюда ежедневно, чтобы сохранить вкус и свежесть.',
    icon: ['M12 2s4 4.2 4 7.3c0 2.5-1.8 4.7-4 5.7-2.2-1-4-3.2-4-5.7C8 6.2 12 2 12 2Z', 'M12 15c3.2 0 5.8 2.6 5.8 5.8H6.2C6.2 17.6 8.8 15 12 15Z'],
  },
]

const isKitchenModalOpen = ref(false)
const kitchenPreviewVideo = ref(null)
const kitchenCardRefs = ref([])
const visibleKitchenCards = ref([])

const openKitchenModal = () => {
  isKitchenModalOpen.value = true
}

const closeKitchenModal = () => {
  isKitchenModalOpen.value = false
}

const setKitchenCardRef = (element, index) => {
  if (element) {
    kitchenCardRefs.value[index] = element
  }
}

let kitchenCardsObserver = null

const observeKitchenCards = () => {
  if (typeof window === 'undefined') return

  kitchenCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.kitchenIndex)
        if (!visibleKitchenCards.value.includes(index)) {
          visibleKitchenCards.value.push(index)
        }
        kitchenCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.22 }
  )

  kitchenCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.kitchenIndex = String(index)
    kitchenCardsObserver?.observe(element)
  })
}

onMounted(() => {
  if (kitchenPreviewVideo.value) {
    kitchenPreviewVideo.value.playbackRate = 0.92
  }
  observeKitchenCards()
})

onBeforeUnmount(() => {
  kitchenCardsObserver?.disconnect()
})
</script>

<template>
  <section id="kitchen" class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Живая кухня NutriMe
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Мы готовим каждый день из свежих продуктов. Без заморозки, без фабричного производства — только живая
          кухня и настоящая еда.
        </p>
      </header>

      <article class="mx-auto mt-10 w-full max-w-[1000px] md:mt-14">
        <button
          type="button"
          class="group relative block w-full overflow-hidden rounded-[14px] border border-[#E6E1D8] bg-white p-2 text-left md:rounded-[18px]"
          @click="openKitchenModal"
        >
          <div class="relative aspect-video overflow-hidden rounded-[12px] md:rounded-[14px]">
            <video
              ref="kitchenPreviewVideo"
              :src="props.videoSrc"
              class="kitchen-video-drift h-full w-full object-cover"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/25"></div>
          </div>

          <span
            class="absolute bottom-6 left-6 inline-flex rounded-[10px] border border-[#E6E1D8] bg-white/90 px-4 py-2.5 text-sm font-semibold text-brand-text transition group-hover:bg-white"
          >
            Смотреть кухню
          </span>
        </button>
      </article>

      <div class="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
        <article
          v-for="(item, index) in kitchenFeatures"
          :key="item.title"
          :ref="(element) => setKitchenCardRef(element, index)"
          class="group rounded-[14px] border border-[#E6E1D8] bg-white p-[22px] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-7"
          :class="visibleKitchenCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <span class="inline-flex h-8 w-8 items-center justify-center text-primary transition-colors duration-300 group-hover:text-secondary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-8 w-8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                v-for="(path, pathIndex) in item.icon"
                :key="`kitchen-${item.title}-${pathIndex}`"
                :d="path"
              />
            </svg>
          </span>
          <h3 class="mt-3.5 text-xl font-semibold text-brand-text">{{ item.title }}</h3>
          <p class="mt-2 text-base leading-relaxed text-brand-muted">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <transition name="accordion">
    <div
      v-if="isKitchenModalOpen"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/55 p-4"
      @click.self="closeKitchenModal"
    >
      <div class="w-full max-w-[1080px] rounded-2xl border border-[#E6E1D8] bg-white p-3 shadow-soft sm:p-4">
        <div class="mb-3 flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">Живая кухня NutriMe</p>
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-line text-brand-muted transition hover:text-brand-text"
            aria-label="Закрыть видео"
            @click="closeKitchenModal"
          >
            ✕
          </button>
        </div>
        <div class="relative overflow-hidden rounded-xl">
          <video
            :src="props.videoSrc"
            class="h-full w-full object-cover"
            autoplay
            muted
            loop
            playsinline
            controls
            preload="metadata"
          ></video>
        </div>
      </div>
    </div>
  </transition>
</template>
