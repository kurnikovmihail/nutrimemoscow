<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

const videoTestimonials = [
  {
    name: 'Марина',
    text: 'Очень удобно — еда уже готова, а меню оказалось вкуснее, чем я ожидала.',
    subtitle: 'Клиент NutriMe, 3 месяца',
    video: props.videoSrc,
  },
  {
    name: 'Игорь',
    text: 'Перестал считать калории и начал просто есть готовые блюда.',
    subtitle: 'Клиент NutriMe, 5 месяцев',
    video: props.videoSrc,
  },
  {
    name: 'Ольга',
    text: 'Больше всего нравится, что меню постоянно обновляется.',
    subtitle: 'Клиент NutriMe, 2 месяца',
    video: props.videoSrc,
  },
]

const textReviews = [
  {
    name: 'Анна',
    text: 'Сервис снял с меня ежедневную готовку. Питание стало регулярным и предсказуемым.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    rating: 5,
  },
  {
    name: 'Сергей',
    text: 'Удобно, что блюда привозят по расписанию. Для плотного графика это отличный формат.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80',
    rating: 5,
  },
  {
    name: 'Екатерина',
    text: 'Рацион выглядит аккуратно и вкусно. За месяц стало легче соблюдать режим питания.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80',
    rating: 5,
  },
]

const isReviewVideoOpen = ref(false)
const activeVideoReview = ref(null)
const videoReviewCardRefs = ref([])
const visibleVideoReviewCards = ref([])
const textReviewCardRefs = ref([])
const visibleTextReviewCards = ref([])

const openReviewVideo = (review) => {
  activeVideoReview.value = review
  isReviewVideoOpen.value = true
}

const closeReviewVideo = () => {
  isReviewVideoOpen.value = false
  activeVideoReview.value = null
}

const setVideoReviewCardRef = (element, index) => {
  if (element) {
    videoReviewCardRefs.value[index] = element
  }
}

const setTextReviewCardRef = (element, index) => {
  if (element) {
    textReviewCardRefs.value[index] = element
  }
}

let videoReviewCardsObserver = null
let textReviewCardsObserver = null

const observeVideoReviewCards = () => {
  if (typeof window === 'undefined') return

  videoReviewCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.videoReviewIndex)
        if (!visibleVideoReviewCards.value.includes(index)) {
          visibleVideoReviewCards.value.push(index)
        }
        videoReviewCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  videoReviewCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.videoReviewIndex = String(index)
    videoReviewCardsObserver?.observe(element)
  })
}

const observeTextReviewCards = () => {
  if (typeof window === 'undefined') return

  textReviewCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.textReviewIndex)
        if (!visibleTextReviewCards.value.includes(index)) {
          visibleTextReviewCards.value.push(index)
        }
        textReviewCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  textReviewCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.textReviewIndex = String(index)
    textReviewCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeVideoReviewCards()
  observeTextReviewCards()
})

onBeforeUnmount(() => {
  videoReviewCardsObserver?.disconnect()
  textReviewCardsObserver?.disconnect()
})
</script>

<template>
  <section id="reviews" class="bg-brand-section px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <header class="mx-auto max-w-[640px] text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Что говорят наши клиенты
        </h2>
        <p class="mt-5 text-base leading-relaxed text-brand-muted md:text-[18px]">
          Люди выбирают NutriMe, потому что питание становится простым, вкусным и удобным.
        </p>
      </header>

      <div class="mt-12 -mx-4 flex gap-4 overflow-x-auto px-4 scrollbar-hidden sm:-mx-6 sm:px-6 md:mt-[60px] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
        <article
          v-for="(review, index) in videoTestimonials"
          :key="`video-review-${review.name}`"
          :ref="(element) => setVideoReviewCardRef(element, index)"
          class="group min-w-[82%] overflow-hidden rounded-[16px] border border-brand-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft sm:min-w-[64%] md:min-w-0"
          :class="visibleVideoReviewCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <button type="button" class="block w-full text-left" @click="openReviewVideo(review)">
            <div class="relative aspect-video overflow-hidden">
              <video
                :src="review.video"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                muted
                loop
                playsinline
                preload="metadata"
              ></video>
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>
              <span
                class="video-review-play-pulse absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(20,125,108,0.9)] text-white transition duration-300 group-hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="ml-0.5 h-5 w-5" aria-hidden="true">
                  <path d="m9 7 8 5-8 5V7Z" />
                </svg>
              </span>
            </div>

            <div class="p-[18px]">
              <p class="text-base font-semibold text-brand-text">{{ review.name }}</p>
              <p class="mt-2 text-[15px] leading-relaxed text-brand-muted">{{ review.text }}</p>
            </div>
          </button>
        </article>
      </div>

      <div class="mt-12 grid gap-4 md:mt-[60px] md:grid-cols-3 md:gap-8">
        <article
          v-for="(review, index) in textReviews"
          :key="`text-review-${review.name}`"
          :ref="(element) => setTextReviewCardRef(element, index)"
          class="rounded-[16px] border border-brand-line bg-white p-[22px] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-[26px]"
          :class="visibleTextReviewCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <div class="flex items-center gap-3">
            <img
              :src="review.avatar"
              :alt="`Отзыв клиента ${review.name}`"
              class="h-[42px] w-[42px] rounded-full object-cover"
              loading="lazy"
            />
            <p class="text-base font-semibold text-brand-text">{{ review.name }}</p>
          </div>
          <p class="mt-2.5 text-[15px] leading-relaxed text-brand-muted">{{ review.text }}</p>
          <div class="mt-4 flex items-center gap-1 text-gold">
            <svg
              v-for="starIndex in 5"
              :key="`star-${review.name}-${starIndex}`"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-[14px] w-[14px]"
              :class="starIndex <= review.rating ? 'opacity-100' : 'opacity-30'"
              aria-hidden="true"
            >
              <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
            </svg>
          </div>
        </article>
      </div>
    </div>
  </section>

  <transition name="accordion">
    <div
      v-if="isReviewVideoOpen && activeVideoReview"
      class="fixed inset-0 z-[46] flex items-center justify-center bg-black/55 p-4"
      @click.self="closeReviewVideo"
    >
      <div class="w-full max-w-3xl rounded-2xl border border-brand-line bg-white p-3 shadow-soft sm:p-4">
        <div class="mb-3 flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Видео отзыв
            </p>
            <p class="mt-1 text-sm text-brand-muted">
              {{ activeVideoReview.name }} · {{ activeVideoReview.subtitle }}
            </p>
          </div>
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-line text-brand-muted transition hover:text-brand-text"
            aria-label="Закрыть видео отзыв"
            @click="closeReviewVideo"
          >
            ✕
          </button>
        </div>
        <div class="overflow-hidden rounded-xl">
          <video
            :src="activeVideoReview.video"
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
