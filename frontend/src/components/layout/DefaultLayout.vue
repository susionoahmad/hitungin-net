<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AdTopBanner from '@/components/ads/AdTopBanner.vue';
import AuthModal from '@/components/common/AuthModal.vue';
import { useAuth } from '@/composables/useAuth';
import { detectLocaleFromPath } from '@/utils/locale';
import { useRoute } from 'vue-router';

const { 
  isPro, 
  showAuthModal, 
  authModalMode, 
  authInitialEmail, 
  authInitialResetToken,
  closeAuthModal,
  openAuthModal,
  signInWithCredentials,
  registerWithCredentials,
  requestPasswordReset,
  resetPassword,
  signInWithGoogle
} = useAuth();

const route = useRoute();
const isEn = computed(() => detectLocaleFromPath(route.path) === 'en');
const isSubmitting = ref(false);
const authError = ref<string | null>(null);
const authHelperMessage = ref<string | null>(null);

async function handleAuthSubmit(payload: any) {
  isSubmitting.value = true;
  authError.value = null;
  authHelperMessage.value = null;

  try {
    if (authModalMode.value === 'login') {
      await signInWithCredentials(payload);
      closeAuthModal();
    } else if (authModalMode.value === 'register') {
      await registerWithCredentials(payload);
      closeAuthModal();
    } else if (authModalMode.value === 'forgot') {
      const res = await requestPasswordReset(payload.email);
      authHelperMessage.value = res.message;
    } else if (authModalMode.value === 'reset') {
      const res = await resetPassword(payload);
      authHelperMessage.value = res.message;
      setTimeout(() => openAuthModal('login'), 2000);
    }
  } catch (err: any) {
    authError.value = err.message || 'Authentication failed';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_38%),linear-gradient(to_bottom,_#f8fafc,_#e2e8f0)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
    <AppHeader />
    <main>
      <div class="section-shell pt-6">
        <AdTopBanner v-if="!isPro()" />
      </div>
      <RouterView />
    </main>
    <AppFooter />

    <!-- Global Auth Modal -->
    <AuthModal
      v-if="showAuthModal"
      :mode="authModalMode"
      :is-en="isEn"
      :is-submitting="isSubmitting"
      :error-message="authError"
      :helper-message="authHelperMessage"
      :initial-email="authInitialEmail"
      :initial-reset-token="authInitialResetToken"
      show-google-button
      @close="closeAuthModal"
      @switch-mode="openAuthModal"
      @submit="handleAuthSubmit"
      @google="signInWithGoogle"
    />
  </div>
</template>
