
export const title = 'Vue Admin Zonst'
export const logo = 'component'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
