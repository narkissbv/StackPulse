import { shallowMount } from '@vue/test-utils'
import IPLookup from '@/components/IPLookup'

describe('IPLookup.vue', () => {
  it('renders a text field on create', () => {
    const wrapper = shallowMount(IPLookup, {})
    expect(wrapper.addresses).length.toEqual(1)
  })
})
