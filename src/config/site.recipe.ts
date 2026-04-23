import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'curation-warm',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'editorial-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'sbm',
  enabledTasks: ['sbm', 'profile'],
  taskTemplates: {
    sbm: 'sbm-library',
    profile: 'profile-business',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
