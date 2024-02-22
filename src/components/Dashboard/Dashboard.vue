<template >
  <side-bar />
  <div class="bg-blue-lighten-4 h-100 maindash">
    <div class="bg-orange-lighten-3 text-white text-h5 d-flex justify-center mb-6">User Details</div>
     <v-card
      variant="tonal"
      class="mx-auto"
      max-width="400"
  >
    <v-img
      class="align-end text-white"
      height="500"
      :src="data.image"
      cover
    >
      <v-card-title>{{this.data.userName}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 w-100">
      Type : <h3>{{this.data.userType}} </h3> 
    </v-card-subtitle>

    <v-card-text>
      <div>Company : {{this.data.companyName}} </div>
    </v-card-text>
     <v-card-actions>
      <v-btn color="white"
      class="bg-orange"
      block
      append-icon="mdi-window-close">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.data = JSON.parse(localStorage.getItem("isLoggedIn"));
    console.log(this.data.isLoggedIn)
    console.log("on mount",this.$store.state.isLoggedIn)
    
  },
  data() {
    return {
      dialog: false,
      userName:"",
      email: "",
      companyName : "",
      password : "",
      image : "",
      data : [],
    
    };
  },
};
</script>

<style >
.maindash{
  background-image: url('C:\Users\Haier\Desktop\Programmer force Tasks\Vue.js\crm\src\assets\images\office1.png');
  background-size: contain;
  background-size: 1200px;
  background-position-x: center;
  background-position-y: 80px;
}
 
</style>

