<template>
  <v-container class="lookup-container">
    <v-card class="wrapper-card">
      <v-card-title>
        <v-row align="center" justify="space-between">
          <div class="ml-4">
            IP Lookup
          </div>
          <div>
            <v-switch v-model="$vuetify.theme.dark"
                      label="Dark theme"
            ></v-switch>
          </div>
        </v-row>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <div class="mb-4">
          <label>Enter one or more IP addresses and get their country</label>
        </div>
        <div>
          <v-btn @click="addAddress"
                 color="primary">
            <v-icon>mdi-plus</v-icon>
            Add
          </v-btn>
        </div>
      </v-card-text>
      <v-divider/>
      <v-card-text>
        <div v-for="address in addresses"
              :key="address.id"
        >
          <v-form v-model="address.isValid">
            <v-row class="address-container">
              <v-col class="shrink">
                <v-chip class="address-index">{{ address.id }}</v-chip>
              </v-col>
              <v-col>
                <div class="address-input">
                  <v-text-field v-model="address.address"
                                label="IP Address"
                                @blur="lookup(address)"
                                :disabled="address.loading"
                                :rules="[validations.required,
                                        validations.ip]"
                                :ref="`input${address.id}`"
                                autofocus
                  >
                  </v-text-field>
                </div>
              </v-col>
              <v-col v-if="address.error"
                     class="warning"
              >
                <v-icon color="primary">mdi-alert</v-icon>
                Error resolving IP
              </v-col>
              <v-col v-else-if="address.loading"
                     class="loading">
                <img :src="loadingSpinner"/>
              </v-col>
              <v-col v-if="address.country.length === 2" class="flag">
                <img :src="getFlag(address.country)"/>
                <span>{{ address.time }}</span>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import * as moment from 'moment-timezone'
import { LOOKUP_URL, getFlag, loadingSpinner } from '@/utils/utils'
import validationMixin from '@/mixins/validations'
export default {
  mixins: [validationMixin],
  data () {
    return {
      index: 0,
      addresses: [],
      interval: null,
      ipLookupFormValid: false
    }
  },
  methods: {
    addAddress () {
      this.addresses.push({
        id: ++this.index,
        address: '',
        country: '',
        isValid: false,
        loading: false,
        error: false,
        time: ''
      })
    },
    lookup (item) {
      if (item.isValid) {
        item.error = false
        item.loading = true
        axios.get(`${LOOKUP_URL}${item.address}`).then(resp => {
          item.country = resp.data.countryCode.toLowerCase()
          if (resp.data.countryCode === '') {
            item.error = true
          } else {
            item.error = false
          }
          console.log(resp)
          item.loading = false
        })
      }
    },
    getFlag (flag) {
      return getFlag(flag)
    },
    timeLoop () {
      this.addresses.forEach(address => {
        if (address.country) {
          const zones = moment.tz.zonesForCountry(address.country, true)
          if (zones.length > 0) {
            address.time = moment.tz(zones[0].name).format('H:mm:ss')
          }
        }
      })
    }
  },
  computed: {
    loadingSpinner () {
      return loadingSpinner()
    }
  },
  created () {
    this.addAddress()
    this.interval = setInterval(this.timeLoop, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped lang="scss">
  .lookup-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper-card {
    width: 100%;
    max-width: 500px;
  }
  .address-container {
    display: flex;
    align-items: center;
    .loading {
      max-width: 60px;
      img {
        width: 100%;
      }
    }
    .flag {
      max-width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 50px;
      }
    }
    .warning {
      text-align: center;
    }
  }
</style>
