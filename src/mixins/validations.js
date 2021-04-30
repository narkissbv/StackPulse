const IPADDRESS = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/

const validationMixin = {
  methods: {
    // add methods
  },
  data: () => ({
    validations: {
      required: value => !!value || 'Required.',
      ip: value => IPADDRESS.test(value) || 'Invalid IP Address'
    }
  })
}

export default validationMixin
