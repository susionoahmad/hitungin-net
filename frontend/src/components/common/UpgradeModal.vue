<script setup lang="ts">
import { trackConversionEvent } from '@/utils/tracking';
import { useAuth } from '@/composables/useAuth';
import { computed } from 'vue';

const { user } = useAuth();
const emit = defineEmits(['close']);

const whatsappUrl = computed(() => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';
  const email = user.value?.email || 'Guest';
  const message = `Halo Admin, saya ingin upgrade ke paket PRO di ToolKeuangan. \n\nEmail saya: ${email}\n\nMohon informasi langkah selanjutnya. Terima kasih!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
});

function handleUpgrade() {
  trackConversionEvent('upgrade_click', { plan: 'pro' });
  window.open(whatsappUrl.value, '_blank');
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
    <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-slate-900">
      <div class="text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-brand-500 dark:text-brand-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Upgrade ke PRO</h3>
        <p class="mt-2 text-slate-600 dark:text-slate-400">Anda telah mencapai limit harian. Upgrade untuk akses tak terbatas, tanpa watermark, branding logo, dan history invoice yang siap dipakai ulang.</p>
      </div>

      <div class="mt-6 grid gap-3 text-sm">
        <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">Unlimited invoice export</div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">Tanpa watermark di PDF</div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">Branding logo untuk invoice</div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">Save, edit, dan export ulang kapan saja</div>
      </div>
      
      <div class="mt-8 space-y-4">
        <button @click="handleUpgrade" class="w-full rounded-xl bg-brand-500 py-4 font-bold text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20">
          Upgrade Sekarang - Rp 49rb
        </button>
        <button @click="emit('close')" class="w-full py-2 text-sm text-slate-500 hover:text-slate-400">
          Mungkin Nanti
        </button>
      </div>
    </div>
  </div>
</template>
