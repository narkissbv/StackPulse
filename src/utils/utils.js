const LOOKUP_URL = 'https://api.ip2country.info/ip?'

function getFlag (flag) {
  if (flag.length) {
    return require(`@/assets/flags/${flag}.svg`)
  }
}

export default {
  LOOKUP_URL,
  getFlag  
}

export {
  LOOKUP_URL,
  getFlag
}
