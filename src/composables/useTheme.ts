import { computed, onMounted, ref, watch } from 'vue';

const storageKey = 'tbki-theme';

export function useTheme() {
  const isDark = ref(true);

  onMounted(() => {
    const saved = window.localStorage.getItem(storageKey);
    isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  watch(isDark, (value) => {
    document.documentElement.classList.toggle('dark', value);
    window.localStorage.setItem(storageKey, value ? 'dark' : 'light');
  }, { immediate: true });

  return {
    isDark: computed(() => isDark.value),
    toggleTheme: () => {
      isDark.value = !isDark.value;
    },
  };
}
