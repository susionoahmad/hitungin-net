<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { applySeo } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteName, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

applySeo({
  title: locale.value === 'en' ? `Contact | ${siteName}` : `Kontak | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Contact Tools Bisnis & Keuangan Indonesia for partnerships, feedback, or general questions.'
      : 'Hubungi tim Tools Bisnis & Keuangan Indonesia untuk kerja sama, masukan, atau pertanyaan.',
  canonical: `${siteUrl}${buildLocalePath('/contact', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/contact', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/contact', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/contact` },
  ],
});

// Interactive Form States
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const formErrors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const submitStatus = ref<'idle' | 'sending' | 'success'>('idle');
const generalError = ref('');

const ui = computed(() => {
  const isEn = locale.value === 'en';
  return {
    heading: isEn ? 'Contact Us' : 'Hubungi Kami',
    intro: isEn
      ? 'We welcome feedback, content corrections, collaboration inquiries, monetization partnerships, and requests for new tools.'
      : 'Kami terbuka untuk masukan, koreksi konten, kerja sama konten, kolaborasi monetisasi, maupun permintaan penambahan tool baru.',
    nameLabel: isEn ? 'Your Name' : 'Nama Lengkap',
    namePlaceholder: isEn ? 'John Doe' : 'Nama lengkap Anda',
    emailLabel: isEn ? 'Email Address' : 'Alamat Email',
    emailPlaceholder: isEn ? 'john@company.com' : 'email@perusahaan.com',
    subjectLabel: isEn ? 'Subject' : 'Subjek',
    subjectPlaceholder: isEn ? 'e.g. Partnership Opportunity' : 'Contoh: Penawaran Kerja Sama',
    messageLabel: isEn ? 'Message' : 'Isi Pesan',
    messagePlaceholder: isEn ? 'How can we help you?' : 'Tuliskan pesan Anda di sini...',
    submitBtn: isEn ? 'Send Message' : 'Kirim Pesan',
    sendingBtn: isEn ? 'Sending...' : 'Mengirim...',
    successTitle: isEn ? 'Message Sent Successfully!' : 'Pesan Berhasil Dikirim!',
    successDesc: isEn
      ? 'Thank you for reaching out. Our team will review your message and get back to you shortly at the email address provided.'
      : 'Terima kasih telah menghubungi kami. Tim kami akan meninjau pesan Anda dan segera menghubungi Anda kembali melalui email.',
    sendAnother: isEn ? 'Send Another Message' : 'Kirim Pesan Lain',
    nameErr: isEn ? 'Name is required' : 'Nama lengkap wajib diisi',
    emailErr: isEn ? 'Please enter a valid email address' : 'Gunakan format email yang valid',
    subjectErr: isEn ? 'Subject is required' : 'Subjek pesan wajib diisi',
    messageErr: isEn ? 'Message must be at least 15 characters long' : 'Pesan minimal terdiri dari 15 karakter',
  };
});

function validateForm() {
  let isValid = true;
  formErrors.name = '';
  formErrors.email = '';
  formErrors.subject = '';
  formErrors.message = '';
  generalError.value = '';

  if (!form.name.trim()) {
    formErrors.name = ui.value.nameErr;
    isValid = false;
  }

  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    formErrors.email = ui.value.emailErr;
    isValid = false;
  }

  if (!form.subject.trim()) {
    formErrors.subject = ui.value.subjectErr;
    isValid = false;
  }

  if (!form.message.trim() || form.message.trim().length < 15) {
    formErrors.message = ui.value.messageErr;
    isValid = false;
  }

  return isValid;
}

async function handleFormSubmit() {
  if (!validateForm()) return;

  submitStatus.value = 'sending';

  try {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulate successful message dispatch
    submitStatus.value = 'success';
    
    // Reset Form
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch (err) {
    generalError.value = locale.value === 'en' 
      ? 'Something went wrong. Please try again later.'
      : 'Terjadi kesalahan. Silakan coba kembali nanti.';
    submitStatus.value = 'idle';
  }
}

function resetStatus() {
  submitStatus.value = 'idle';
}
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Contact">{{ ui.heading }}</SectionHeading>
    
    <div class="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      
      <!-- Interactive Form Container -->
      <div class="glass-panel p-6 sm:p-8">
        
        <div v-if="submitStatus !== 'success'">
          <p class="text-base leading-7 text-slate-700 dark:text-slate-300">
            {{ ui.intro }}
          </p>

          <form @submit.prevent="handleFormSubmit" class="mt-8 space-y-6">
            <div class="grid gap-6 sm:grid-cols-2">
              <label class="block">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.nameLabel }}</span>
                <input
                  v-model="form.name"
                  type="text"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors duration-200 focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                  :placeholder="ui.namePlaceholder"
                  :disabled="submitStatus === 'sending'"
                />
                <span v-if="formErrors.name" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.name }}</span>
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.emailLabel }}</span>
                <input
                  v-model="form.email"
                  type="email"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors duration-200 focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                  :placeholder="ui.emailPlaceholder"
                  :disabled="submitStatus === 'sending'"
                />
                <span v-if="formErrors.email" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.email }}</span>
              </label>
            </div>

            <label class="block">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.subjectLabel }}</span>
              <input
                v-model="form.subject"
                type="text"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors duration-200 focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                :placeholder="ui.subjectPlaceholder"
                :disabled="submitStatus === 'sending'"
              />
              <span v-if="formErrors.subject" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.subject }}</span>
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.messageLabel }}</span>
              <textarea
                v-model="form.message"
                rows="5"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors duration-200 focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                :placeholder="ui.messagePlaceholder"
                :disabled="submitStatus === 'sending'"
              ></textarea>
              <span v-if="formErrors.message" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.message }}</span>
            </label>

            <div v-if="generalError" class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500 dark:text-red-400">
              {{ generalError }}
            </div>

            <button
              type="submit"
              class="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 font-bold text-white shadow-md shadow-brand-500/15 hover:bg-brand-400 disabled:opacity-60 transition-all duration-200"
              :disabled="submitStatus === 'sending'"
            >
              <span v-if="submitStatus === 'sending'" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              {{ submitStatus === 'sending' ? ui.sendingBtn : ui.submitBtn }}
            </button>
          </form>
        </div>

        <!-- Success Animation & Screen -->
        <div v-else class="py-10 text-center flex flex-col items-center">
          <div class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 class="mt-6 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.successTitle }}</h2>
          <p class="mt-3 max-w-md text-base leading-7 text-slate-700 dark:text-slate-300">
            {{ ui.successDesc }}
          </p>
          <button
            type="button"
            @click="resetStatus"
            class="mt-8 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {{ ui.sendAnother }}
          </button>
        </div>

      </div>

      <!-- Sidebar Contact Info -->
      <aside class="space-y-6">
        <div class="glass-panel p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Direct Contact' : 'Hubungi Langsung' }}
          </p>
          <div class="mt-4 space-y-5 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Email Support</p>
              <a href="mailto:hello@kalkulatorin.com" class="mt-1 block font-semibold text-slate-950 dark:text-white hover:text-brand-500 dark:hover:text-brand-400">
                hello@kalkulatorin.com
              </a>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ locale === 'en' ? 'Operational Hours' : 'Jam Operasional' }}
              </p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                {{ locale === 'en' ? 'Monday - Friday, 09:00 - 17:00 WIB' : 'Senin - Jumat, 09:00 - 17:00 WIB' }}
              </p>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ locale === 'en' ? 'Calculation Review' : 'Tinjauan Perhitungan' }}
              </p>
              <p class="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                {{
                  locale === 'en'
                    ? 'Feel free to send us calculation bug reports. Please state the inputs you entered and the formula discrepancy.'
                    : 'Laporkan ketidaksesuaian angka kalkulasi dengan mencantumkan input yang dimasukkan beserta referensi regulasi pembanding.'
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="glass-panel p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Editorial Trust' : 'Kepercayaan Editorial' }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {{
              locale === 'en'
                ? 'All calculation tools are modeled based on public legislation (such as UU HPP in Indonesia) and standard business rules. Feedback is reviewed by certified professionals.'
                : 'Seluruh formula perhitungan kami susun berdasarkan ketentuan resmi perundang-undangan (misalnya UU HPP) dan standar akuntansi bisnis. Masukan teknis ditinjau berkala.'
            }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>
