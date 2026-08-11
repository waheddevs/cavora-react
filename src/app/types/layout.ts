export interface Crumb {
  label: string
  to?: string
}

export interface PageHeroProps {
  navbarClass: string
  heroClass?: string
  tagline: string
  title: string
  crumbs: Crumb[]
}
