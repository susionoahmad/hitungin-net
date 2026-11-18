<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteBrand, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const CONTACT_EMAIL = 'hello@kalkulatorin.com';

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/contact', locale.value);
  const title = isEn ? `Contact Us | ${siteBrand}` : `Hubungi Kami | ${siteBrand}`;
  const description = isEn
    ? `Contact ${siteBrand} for formula corrections, calculator suggestions, or collaboration inquiries.`
    : `Hubungi tim ${siteBrand} untuk laporan koreksi rumus, usulan kalkulator baru, atau kerja sama.`;

  applySeo({
    title,
    description,
    canonical: `${siteUrl}${path}`,
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      createWebPageSchema({ name: title, description, url: `${siteUrl}${path}` }),
      createBreadcrumbSchema([
        { name: isEn ? 'Home' : 'Beranda', url: isEn ? `${siteUrl}/en` : siteUrl },
        { name: isEn ? 'Contact' : 'Kontak', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});

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

const submittedMailtoUrl = ref('');
const copiedEmail = ref(false);

const ui = computed(() => {
  const isEn = locale.value === 'en';
  return {
    heading: isEn ? 'Contact Us' : 'Hubungi Kami',
    intro: isEn
      ? 'We welcome calculation bug reports, regulatory update notes, new calculator suggestions, and editorial inquiries. Fill out the form below to open a pre-filled email to our team, or email us directly.'
      : 'Kami terbuka untuk laporan koreksi rumus, pembaruan regulasi, usulan kalkulator baru, maupun pertanyaan umum. Isi formulir di bawah ini untuk menyiapkan email langsung ke tim kami, atau kirim email secara manual.',
    nameLabel: isEn ? 'Your Name' : 'Nama Lengkap',
    namePlaceholder: isEn ? 'Your full name' : 'Nama lengkap Anda',
    emailLabel: isEn ? 'Email Address' : 'Alamat Email',
    emailPlaceholder: isEn ? 'name@company.com' : 'nama@perusahaan.com',
    subjectLabel: isEn ? 'Subject' : 'Subjek',
    subjectPlaceholder: isEn ? 'e.g. Formula correction for PPh 21' : 'Contoh: Koreksi rumus atau usulan kalkulator',
    messageLabel: isEn ? 'Message' : 'Isi Pesan',
    messagePlaceholder: isEn ? 'Describe your question, input values, or suggestion...' : 'Tuliskan pertanyaan, detail input kalkulator, atau masukan Anda...',
    submitBtn: isEn ? 'Prepare & Open Email' : 'Siapkan & Buka Aplikasi Email',
    readyTitle: isEn ? 'Your Email Draft Is Ready' : 'Draf Email Siap Dikirim',
    readyDesc: isEn
      ? `Your default email application should open with your message addressed to ${CONTACT_EMAIL}. If it did not open automatically, click the button below or copy our email address.`
      : `Aplikasi email Anda akan terbuka otomatis dengan tujuan ${CONTACT_EMAIL}. Jika tidak terbuka otomatis, klik tombol di bawah ini atau salin alamat email kami.`,
    openAgain: isEn ? 'Open Email Client' : 'Buka Aplikasi Email',
    resetForm: isEn ? 'Compose Another Message' : 'Tulis Pesan Lain',
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

function handleFormSubmit() {
  if (!validateForm()) return;

  const subject = encodeURIComponent(`[Kalkulatorin] ${form.subject.trim()}`);
  const body = encodeURIComponent(
    `Nama: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nPesan:\n${form.message.trim()}`,
  );
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  submittedMailtoUrl.value = mailtoUrl;

  if (typeof window !== 'undefined') {
    window.location.href = mailtoUrl;
  }
}

async function copyContactEmail() {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    copiedEmail.value = true;
    setTimeout(() => {
      copiedEmail.value = false;
    }, 2500);
  } catch {
    copiedEmail.value = false;
  }
}

function resetStatus() {
  submittedMailtoUrl.value = '';
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
}
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading :eyebrow="locale === 'en' ? 'Contact' : 'Kontak'">{{ ui.heading }}</SectionHeading>

    <div class="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div class="glass-panel p-6 sm:p-8">
        <div v-if="!submittedMailtoUrl">
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
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                  :placeholder="ui.namePlaceholder"
                />
                <span v-if="formErrors.name" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.name }}</span>
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.emailLabel }}</span>
                <input
                  v-model="form.email"
                  type="email"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                  :placeholder="ui.emailPlaceholder"
                />
                <span v-if="formErrors.email" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.email }}</span>
              </label>
            </div>

            <label class="block">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.subjectLabel }}</span>
              <input
                v-model="form.subject"
                type="text"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                :placeholder="ui.subjectPlaceholder"
              />
              <span v-if="formErrors.subject" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.subject }}</span>
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ ui.messageLabel }}</span>
              <textarea
                v-model="form.message"
                rows="5"
                class="mt-2 w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400"
                :placeholder="ui.messagePlaceholder"
              ></textarea>
              <span v-if="formErrors.message" class="mt-1 block text-xs font-medium text-red-500 dark:text-red-400">{{ formErrors.message }}</span>
            </label>

            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-500/15 transition-colors hover:bg-brand-400"
            >
              {{ ui.submitBtn }}
            </button>
          </form>
        </div>

        <div v-else class="flex flex-col items-center py-8 text-center">
          <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.readyTitle }}</h2>
          <p class="mt-3 max-w-md text-sm leading-7 text-slate-700 dark:text-slate-300">
            {{ ui.readyDesc }}
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <a
              :href="submittedMailtoUrl"
              class="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
            >
              {{ ui.openAgain }}
            </a>
            <button
              type="button"
              @click="resetStatus"
              class="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {{ ui.resetForm }}
            </button>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="glass-panel p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Direct Contact' : 'Hubungi Langsung' }}
          </p>
          <div class="mt-4 space-y-5 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
              <a :href="`mailto:${CONTACT_EMAIL}`" class="mt-1 block font-semibold text-slate-950 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">
                {{ CONTACT_EMAIL }}
              </a>
              <button
                type="button"
                @click="copyContactEmail"
                class="mt-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {{ copiedEmail ? (locale === 'en' ? 'Copied!' : 'Email Disalin!') : (locale === 'en' ? 'Copy Email' : 'Salin Alamat Email') }}
              </button>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ locale === 'en' ? 'Response Hours' : 'Jam Tanggapan' }}
              </p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                {{ locale === 'en' ? 'Monday – Friday, 09:00 – 17:00 WIB' : 'Senin – Jumat, 09.00 – 17.00 WIB' }}
              </p>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ locale === 'en' ? 'Formula Correction Reports' : 'Laporan Koreksi Rumus' }}
              </p>
              <p class="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">
                {{
                  locale === 'en'
                    ? 'When reporting a calculation issue, please include the calculator URL, input values used, and the expected reference figure so we can verify and fix it quickly.'
                    : 'Saat melaporkan ketidaksesuaian hasil hitung, mohon cantumkan nama kalkulator, angka input yang dimasukkan, serta referensi pembanding agar kami dapat segera meninjau dan memperbaikinya.'
                }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
