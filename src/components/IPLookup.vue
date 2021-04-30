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
                     class="flag">
                <img :src="loadingSpinner"/>
              </v-col>
              <v-col v-else class="flag">
                <img :src="getFlag(address.country)"/>
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
import { LOOKUP_URL, getFlag, loadingSpinner } from '@/utils/utils'
import validationMixin from '@/mixins/validations'
export default {
  mixins: [validationMixin],
  data () {
    return {
      index: 1,
      addresses: [],
      ipLookupFormValid: false
    }
  },
  methods: {
    addAddress () {
      this.addresses.push({
        id: this.index++,
        address: '',
        country: '',
        isValid: false,
        loading: false,
        error: false
      })
    },
    lookup (item) {
      if (item.isValid) {
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
    }
  },
  computed: {
    loadingSpinner () {
      return loadingSpinner()
    }
  },
  created () {
    this.addAddress()
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
    .flag {
      max-width: 60px;
      img {
        width: 100%;
      }
    }
    .warning {
      text-align: center;
    }
  }
</style>
