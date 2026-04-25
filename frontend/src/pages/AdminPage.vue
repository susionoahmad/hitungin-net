<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { apiRequest } from '@/data/api';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { user, profile, isAdmin, isInitialized } = useAuth();
const router = useRouter();

const users = ref<any[]>([]);
const searchQuery = ref('');
const isLoading = ref(true);
const error = ref<string | null>(null);

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const q = searchQuery.value.toLowerCase();
  return users.value.filter(u => 
    (u.name && u.name.toLowerCase().includes(q)) || 
    (u.email && u.email.toLowerCase().includes(q))
  );
});

async function fetchUsers() {
  isLoading.value = true;
  try {
    const response = await apiRequest<any>('/api/admin/users', { auth: true });
    users.value = response.data;
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch users';
  } finally {
    isLoading.value = false;
  }
}

async function checkAndFetch() {
  if (!isInitialized.value) return;
  
  if (!isAdmin()) {
    router.push('/');
    return;
  }
  fetchUsers();
}

watch(isInitialized, (val) => {
  if (val) checkAndFetch();
}, { immediate: true });

async function togglePlan(targetUser: any) {
  const newPlan = targetUser.plan === 'pro' ? 'free' : 'pro';
  try {
    const response = await apiRequest<any>(`/api/admin/users/${targetUser.id}/plan`, {
      method: 'PUT',
      auth: true,
      body: { plan: newPlan }
    });
    
    // Update local user object with data from server
    targetUser.plan = response.user.plan;
    targetUser.plan_expires_at = response.user.plan_expires_at;
  } catch (err: any) {
    alert('Gagal mengupdate plan: ' + err.message);
  }
}

</script>

<template>
  <div class="min-h-screen pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="mb-12 mt-8 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Panel</h1>
          <p class="mt-2 text-slate-600 dark:text-slate-400">Kelola pengguna dan paket langganan ToolKeuangan.</p>
        </div>
        <div class="relative w-full md:w-80">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari nama atau email..." 
            class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 pl-12 text-sm text-slate-900 outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Responsive User List -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-brand-500/30 border-t-brand-500"></div>
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-500/10 p-6 text-red-200 border border-red-500/20">
        {{ error }}
      </div>

      <div v-else>
        <!-- Desktop Table (Hidden on Mobile) -->
        <div class="hidden md:block overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-2xl dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-2xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/[0.02]">
                  <th class="px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Identitas User</th>
                  <th class="px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 text-center">Aktivitas</th>
                  <th class="px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Status Paket</th>
                  <th class="px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 text-right">Kontrol</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-white/5">
                <tr v-for="u in filteredUsers" :key="u.id" class="group hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-all duration-300">
                  <td class="px-8 py-6">
                    <div class="flex items-center gap-4">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-500/20">
                        {{ (u.name || 'U').charAt(0).toUpperCase() }}
                      </div>
                      <div class="min-w-0">
                        <div class="font-bold text-slate-900 dark:text-white text-base leading-tight">{{ u.name || 'No Name' }}</div>
                        <div class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{{ u.email }}</div>
                        <div class="text-[10px] uppercase tracking-wider text-slate-400 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">Joined {{ new Date(u.created_at).toLocaleDateString('id-ID') }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-6">
                    <div class="flex items-center justify-center gap-3">
                      <div class="flex flex-col items-center px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 min-w-[70px]">
                        <span class="text-sm font-black text-slate-900 dark:text-white">{{ u.usage_logs_count || 0 }}</span>
                        <span class="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Gunakan</span>
                      </div>
                      <div class="flex flex-col items-center px-3 py-1.5 rounded-2xl bg-brand-50 dark:bg-brand-500/10 min-w-[70px]">
                        <span class="text-sm font-black text-brand-600 dark:text-brand-400">{{ u.invoices_count || 0 }}</span>
                        <span class="text-[9px] text-brand-400 uppercase font-bold tracking-tighter">Simpan</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-6">
                    <div class="flex flex-col gap-1.5">
                      <span 
                        class="inline-flex w-fit items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm"
                        :class="u.plan === 'pro' ? 'bg-amber-400 text-amber-950' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'"
                      >
                        {{ u.plan }}
                      </span>
                      <div v-if="u.plan === 'pro' && u.plan_expires_at" class="text-[10px] font-medium text-slate-400 italic">
                        Berakhir: {{ new Date(u.plan_expires_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-6 text-right">
                    <button 
                      @click="togglePlan(u)"
                      class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md"
                      :class="u.plan === 'pro' ? 'bg-white text-red-600 border border-red-100 hover:bg-red-50 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/20' : 'bg-brand-500 text-white hover:bg-brand-600 shadow-brand-500/20'"
                    >
                      <svg v-if="u.plan !== 'pro'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                      </svg>
                      {{ u.plan === 'pro' ? 'Downgrade' : 'Upgrade PRO' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mobile View (Hidden on Desktop) -->
        <div class="md:hidden space-y-6">
          <div v-for="u in filteredUsers" :key="u.id" class="relative group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-slate-900/60 overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div class="flex items-center gap-4 relative">
              <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {{ (u.name || 'U').charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-bold text-slate-900 dark:text-white truncate">{{ u.name || 'No Name' }}</div>
                <div class="text-sm text-slate-500 dark:text-slate-400 truncate">{{ u.email }}</div>
              </div>
              <span 
                class="shrink-0 rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-widest"
                :class="u.plan === 'pro' ? 'bg-amber-400 text-amber-950' : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'"
              >
                {{ u.plan }}
              </span>
            </div>

            <div class="mt-6 flex gap-3">
              <div class="flex-1 rounded-2xl bg-slate-50 p-3 dark:bg-white/5 text-center">
                <div class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Gunakan</div>
                <div class="text-xl font-black text-slate-900 dark:text-white">{{ u.usage_logs_count || 0 }}</div>
              </div>
              <div class="flex-1 rounded-2xl bg-brand-50 p-3 dark:bg-brand-500/5 text-center">
                <div class="text-[9px] text-brand-400 uppercase font-black tracking-widest mb-1">Simpan</div>
                <div class="text-xl font-black text-brand-600 dark:text-brand-400">{{ u.invoices_count || 0 }}</div>
              </div>
            </div>

            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div class="text-[10px] text-slate-400 font-medium">
                <div v-if="u.plan === 'pro' && u.plan_expires_at" class="text-amber-600 dark:text-amber-400">Sampai: {{ new Date(u.plan_expires_at).toLocaleDateString('id-ID') }}</div>
                <div>Joined: {{ new Date(u.created_at).toLocaleDateString('id-ID') }}</div>
              </div>
              <button 
                @click="togglePlan(u)"
                class="rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all"
                :class="u.plan === 'pro' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'"
              >
                {{ u.plan === 'pro' ? 'Downgrade' : 'PRO' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
