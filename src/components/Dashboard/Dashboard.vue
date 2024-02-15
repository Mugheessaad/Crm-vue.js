<template >
  <side-bar />
  <div class="bg-blue-lighten-4 h-100">
    <div class="topBanner d-flex justify-space-between align-center pt-16">
      <h1 class="ml-5">Company</h1>
      <div>
        <v-btn class="bg-blue" prepend-icon="mdi-plus">
          Add Company

          <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card class="mx-auto" max-width="500" elevation="16">
              <h1 class="w-100 d-flex justify-center text-blue">
                Company Details
              </h1>
              <v-form  @submit.prevent>
                <v-sheet width="500" class="mx-auto pa-4 ma-4">
                  <v-text-field
                    v-model="userName"
                    label="Username"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                  ></v-text-field
                  ><v-text-field
                    v-model="companyName"
                    label="Company Name"
                    :rules="companyNameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :rules="passwordRules"
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    @click="setLocalStorageValues"
                    block
                    class="mt-8 bg-blue"
                    prepend-icon="mdi-plus"
                    >Add Company</v-btn
                  >
                  
                </v-sheet>
                <v-card-actions>
                  <v-btn color="primary" block @click="dialog = false" prepend-icon="mdi-cancel"
                    >Cancel</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
    </div>
    <v-card class="bg-grey d-flex justify-center">Nothing to show</v-card>
    <img :src="image" alt="">
  </div>
</template>

<script>
export default {
  mounted() {
    const data = localStorage.getItem("image");
    console.log(data)
  },
  data() {
    return {
      dialog: false,
      userName:"",
      email: "",
      companyName : "",
      password : "",
      image : "",
    
      nameRules: [
        (v) => !!v || 'Email is required'
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      companyNameRules: [
        (v) => !!v || 'Company Name is required',
      ],
      passwordRules: [
        (v) => !!v <= 8 || 'Password is required',
      ],
    };
  },
     methods : {
            setLocalStorageValues(){
              this.dialog = false;
                const data = {
                    userName : this.userName,
                    email : this.email,
                    companyName : this.companyName,
                    password : this.password,
                }
          localStorage.setItem(`${this.companyName}`,JSON.stringify(data))
            console.log(JSON.stringify(data))
        }
    },
};
</script>

<style >
</style>

