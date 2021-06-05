import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin FF'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
