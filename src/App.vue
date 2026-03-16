<script setup>
import { ref } from 'vue'
import ambianceVideo from '../video_2026-03-16_17-07-35.mp4'
import HeroSection from './components/HeroSection.vue'
import ProblemSection from './components/ProblemSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import KitchenSection from './components/KitchenSection.vue'
import PersonalizationSection from './components/PersonalizationSection.vue'
import MenuSection from './components/MenuSection.vue'
import ProgramsSection from './components/ProgramsSection.vue'
import WeeklyFlowSection from './components/WeeklyFlowSection.vue'
import ResultsSection from './components/ResultsSection.vue'
import ExpertOpinionSection from './components/ExpertOpinionSection.vue'
import WhyNutriMeSection from './components/WhyNutriMeSection.vue'
import DeliverySection from './components/DeliverySection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import FaqSection from './components/FaqSection.vue'
import FinalCtaSection from './components/FinalCtaSection.vue'
import QuizModal from './components/QuizModal.vue'

const programGoalById = {
  'weight-loss': 'Снижение веса',
  maintenance: 'Поддержание формы',
  'mass-gain': 'Набор массы',
}

const programIdByGoal = {
  'Снижение веса': 'weight-loss',
  'Поддержание формы': 'maintenance',
  'Набор массы': 'mass-gain',
}

const isQuizOpen = ref(false)
const quizPresetGoal = ref('')
const activeProgramId = ref(null)

const openQuiz = (presetGoal = '') => {
  quizPresetGoal.value = presetGoal
  isQuizOpen.value = true
  if (presetGoal) {
    activeProgramId.value = programIdByGoal[presetGoal] ?? activeProgramId.value
  }
}

const closeQuiz = () => {
  isQuizOpen.value = false
}

const chooseProgram = (programId) => {
  activeProgramId.value = programId
  openQuiz(programGoalById[programId] ?? '')
}

const setQuizGoal = (goal) => {
  activeProgramId.value = programIdByGoal[goal] ?? activeProgramId.value
}
</script>

<template>
  <main class="bg-brand-dark text-brand-text">
    <HeroSection :video-src="ambianceVideo" @open-quiz="openQuiz" />
    <ProblemSection :video-src="ambianceVideo" />
    <ProcessSection />
    <KitchenSection :video-src="ambianceVideo" />
    <PersonalizationSection :video-src="ambianceVideo" @open-quiz="openQuiz" />
    <MenuSection />
    <ProgramsSection :active-program-id="activeProgramId" @choose-program="chooseProgram" />
    <WeeklyFlowSection />
    <ResultsSection @open-quiz="openQuiz" />
    <ExpertOpinionSection :video-src="ambianceVideo" @open-quiz="openQuiz" />
    <WhyNutriMeSection @open-quiz="openQuiz" />
    <DeliverySection />
    <ReviewsSection :video-src="ambianceVideo" />
    <FaqSection />
    <FinalCtaSection :video-src="ambianceVideo" @open-quiz="openQuiz" />
    <QuizModal
      :is-open="isQuizOpen"
      :preset-goal="quizPresetGoal"
      @close="closeQuiz"
      @goal-selected="setQuizGoal"
    />
  </main>
</template>
