const LOOKUP_URL = 'https://api.ip2country.info/ip?'

const getFlag = (flag) => {
  if (flag.length) {
    return require(`@/assets/flags/${flag}.svg`)
  }
}

const loadingSpinner = () => {
  return require('@/assets/loading.svg')
}

export default {
  LOOKUP_URL,
  getFlag,
  loadingSpinner
}

export {
  LOOKUP_URL,
  getFlag,
  loadingSpinner
}
