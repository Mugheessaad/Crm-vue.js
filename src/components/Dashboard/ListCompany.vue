<template>
  <side-bar />
  <div class="bg-blue-lighten-4 h-100 d-flex justify-space-around align-center  flex-column">
    <div class="h-90 w-70">
      <h1 class="text-blue mb-16">Company Registered List</h1>
      <v-table
        :headers="headers"
        :items="localStorageData"
        item-key="id"
        hide-default-footer
        class="font-size-34"
        >
        <thead>
          <tr class="bg-blue">
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Company Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in localStorageData" :key="data.userName" :class="{ 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }">
            <td>{{ data.userName }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.companyName }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localStorageData: []
    }
  },
  mounted() {
    this.getLocalStorageData();
  },
  methods: {
    getLocalStorageData() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        this.localStorageData.push(value);
      }
    }
  }
}
</script>

<style scoped>
.odd-row {
  background-color: hsl(194, 67%, 80%); 
}
</style>
