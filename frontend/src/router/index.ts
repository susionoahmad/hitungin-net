import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import SeoLandingPage from '@/pages/SeoLandingPage.vue';
import ToolsIndexPage from '@/pages/ToolsIndexPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import SitemapPage from '@/pages/SitemapPage.vue';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.vue';
import TermsOfServicePage from '@/pages/TermsOfServicePage.vue';
import DisclaimerPage from '@/pages/DisclaimerPage.vue';
import CheckEmailPage from '@/pages/CheckEmailPage.vue';
import AuthCallbackPage from '@/pages/AuthCallbackPage.vue';
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue';
import ToolDetailPage from '@/pages/ToolDetailPage.vue';
import AdminPage from '@/pages/AdminPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import { tools } from '@/data/tools';
import { supportedLocales } from '@/utils/locale';

type StaticRouteDef = {
  path: string;
  name: string;
  component: RouteRecordRaw['component'];
};

const staticRoutes: StaticRouteDef[] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/kalkulator-bisnis-keuangan-online', name: 'seo-landing', component: SeoLandingPage },
  { path: '/tools', name: 'tools', component: ToolsIndexPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/sitemap', name: 'sitemap', component: SitemapPage },
  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyPage },
  { path: '/terms-of-service', name: 'terms-of-service', component: TermsOfServicePage },
  { path: '/disclaimer', name: 'disclaimer', component: DisclaimerPage },
  { path: '/check-email', name: 'check-email', component: CheckEmailPage },
  { path: '/auth/callback', name: 'auth-callback', component: AuthCallbackPage },
  { path: '/reset-password', name: 'reset-password', component: ResetPasswordPage },
  { path: '/admin', name: 'admin', component: AdminPage },
];

function withLocalePrefix(path: string, locale: string) {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

const localizedStaticRoutes: RouteRecordRaw[] = staticRoutes.flatMap((route) =>
  supportedLocales.map((locale) => ({
    path: withLocalePrefix(route.path, locale),
    name: `${route.name}-${locale}`,
    component: route.component,
  })) as RouteRecordRaw[],
);

const localizedToolRoutes: RouteRecordRaw[] = tools.flatMap((tool) =>
  supportedLocales.map((locale) => ({
    path: `/${locale}/${tool.slug}`,
    name: `${tool.slug}-${locale}`,
    component: ToolDetailPage,
    props: { slug: tool.slug, locale },
  })) as RouteRecordRaw[],
);

const routes: RouteRecordRaw[] = [
  ...(staticRoutes as RouteRecordRaw[]),
  ...localizedStaticRoutes,
  ...tools.map((tool) => ({
    path: `/${tool.slug}`,
    name: tool.slug,
    component: ToolDetailPage,
    props: { slug: tool.slug, locale: 'id' },
  })) as RouteRecordRaw[],
  ...localizedToolRoutes,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
];

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});
