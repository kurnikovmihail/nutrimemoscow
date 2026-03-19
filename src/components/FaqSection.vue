<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const faqItems = [
  {
    question: 'Как часто происходит доставка?',
    answer: 'Мы доставляем питание 2–3 раза в неделю, чтобы блюда всегда оставались свежими.',
  },
  {
    question: 'Можно ли изменить меню?',
    answer: 'Меню формируется нутрициологом, но мы учитываем пищевые ограничения и предпочтения клиента.',
  },
  {
    question: 'Как хранить блюда?',
    answer: 'Блюда поставляются в герметичных контейнерах и хранятся в холодильнике.',
  },
  {
    question: 'Можно ли приостановить доставку?',
    answer: 'Да, вы можете временно приостановить доставку через поддержку.',
  },
  {
    question: 'Можно ли заказать пробный день?',
    answer: 'Да, вы можете начать с пробного меню, чтобы познакомиться с сервисом.',
  },
]

const faqCardRefs = ref([])
const visibleFaqCards = ref([])
const activeFaqIndex = ref(0)
const isFaqSupportOpen = ref(false)
const faqSupportSubmitted = ref(false)
const faqSupport = ref({
  name: '',
  contact: '',
  question: '',
})

const toggleFaq = (index) => {
  activeFaqIndex.value = activeFaqIndex.value === index ? null : index
}

const toggleFaqSupportForm = () => {
  isFaqSupportOpen.value = !isFaqSupportOpen.value
  if (isFaqSupportOpen.value) {
    faqSupportSubmitted.value = false
  }
}

const submitFaqSupport = () => {
  if (!faqSupport.value.question.trim()) return
  faqSupportSubmitted.value = true
}

const setFaqCardRef = (element, index) => {
  if (element) {
    faqCardRefs.value[index] = element
  }
}

let faqCardsObserver = null

const observeFaqCards = () => {
  if (typeof window === 'undefined') return

  faqCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.faqIndex)
        if (!visibleFaqCards.value.includes(index)) {
          visibleFaqCards.value.push(index)
        }
        faqCardsObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  faqCardRefs.value.forEach((element, index) => {
    if (!element) return
    element.dataset.faqIndex = String(index)
    faqCardsObserver?.observe(element)
  })
}

onMounted(() => {
  observeFaqCards()
})

onBeforeUnmount(() => {
  faqCardsObserver?.disconnect()
})
</script>

<template>
  <section id="faq" class="bg-brand-dark px-4 py-[90px] sm:px-6 md:py-[140px]">
    <div class="mx-auto w-full max-w-[900px]">
      <header class="text-center">
        <h2 class="text-[28px] font-bold leading-[1.15] text-brand-text md:text-[42px]">
          Часто задаваемые вопросы
        </h2>
        <p class="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-brand-muted md:text-[18px]">
          Если у вас остались вопросы, мы собрали ответы на самые популярные.
        </p>
      </header>

      <div class="mt-12 space-y-3 md:mt-[60px] md:space-y-4">
        <article
          v-for="(item, index) in faqItems"
          :key="item.question"
          :ref="(element) => setFaqCardRef(element, index)"
          class="rounded-[14px] border bg-white px-5 py-[18px] transition-all duration-500 md:px-6 md:py-5"
          :class="[
            visibleFaqCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            activeFaqIndex === index ? 'border-primary' : 'border-brand-line hover:border-primary',
          ]"
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 text-left"
            :aria-expanded="activeFaqIndex === index"
            @click="toggleFaq(index)"
          >
            <span class="text-base font-medium text-brand-text md:text-[18px]">
              {{ item.question }}
            </span>
            <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                class="h-5 w-5 transition-transform duration-300"
                :class="activeFaqIndex === index ? 'rotate-180' : 'rotate-0'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path
                  d="M12 5v14"
                  class="origin-center transition-all duration-300"
                  :class="activeFaqIndex === index ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'"
                />
              </svg>
            </span>
          </button>

          <div
            class="grid transition-all duration-300 ease-out"
            :class="activeFaqIndex === index ? 'mt-3.5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <p class="text-[15px] leading-relaxed text-brand-muted md:text-base">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-8 text-center">
        <button
          type="button"
          class="text-sm font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:text-primary-hover"
          @click="toggleFaqSupportForm"
        >
          Не нашли ответ? Напишите нам
        </button>
      </div>

      <transition name="accordion">
        <article
          v-if="isFaqSupportOpen"
          class="mt-5 rounded-[14px] border border-brand-line bg-white p-5 md:p-6"
        >
          <div v-if="!faqSupportSubmitted">
            <p class="text-base font-semibold text-brand-text">Форма вопроса</p>
            <p class="mt-1 text-sm text-brand-muted">Оставьте контакт, и мы ответим в рабочее время.</p>

            <div class="mt-4 grid gap-3 md:grid-cols-2">
              <input
                v-model="faqSupport.name"
                type="text"
                placeholder="Ваше имя"
                class="w-full rounded-[10px] border border-brand-input bg-white px-4 py-3 text-sm text-brand-text outline-none transition placeholder:text-brand-placeholder focus:border-primary"
              />
              <input
                v-model="faqSupport.contact"
                type="text"
                placeholder="Телефон или email"
                class="w-full rounded-[10px] border border-brand-input bg-white px-4 py-3 text-sm text-brand-text outline-none transition placeholder:text-brand-placeholder focus:border-primary"
              />
            </div>
            <textarea
              v-model="faqSupport.question"
              rows="4"
              placeholder="Ваш вопрос"
              class="mt-3 w-full rounded-[10px] border border-brand-input bg-white px-4 py-3 text-sm text-brand-text outline-none transition placeholder:text-brand-placeholder focus:border-primary"
            ></textarea>

            <button
              type="button"
              class="mt-4 rounded-[10px] bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:bg-secondary"
              @click="submitFaqSupport"
            >
              Отправить вопрос
            </button>
          </div>

          <div v-else>
            <p class="text-base font-semibold text-brand-text">Вопрос отправлен</p>
            <p class="mt-1 text-sm text-brand-muted">
              Спасибо, мы получили ваш вопрос и свяжемся с вами в ближайшее время.
            </p>
          </div>
        </article>
      </transition>
    </div>
  </section>
</template>
