<template>
  <div>
    <v-container class="pa-0">
      <v-app-bar class="bg-blue" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <div class="d-flex align-center w-100 justify-end">
            <img
              src="../../assets/images/image.png"
              alt="image"
              width="90"
              class="mr-2"
            />
          </div>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn class="logout" append-icon="mdi-logout" @click="logout"
          >Logout</v-btn
        >
      </v-app-bar>
      <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-blue h-100"
        v-model="drawer"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="data.image"
            :title="data.userName"
            :subtitle="data.userName +`@gmailcom`"
          >
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <router-link to="/dashboard" style="text-decoration: none;">
            <v-list-item
              class="font-weight-bold text-white sidelist"
              prepend-icon="mdi-view-dashboard-variant"
              title=""
              value="Home"
              style="font-size: x-large;"
              ><p class="font-weight-bold" style="font-size: large;">
                Home
              </p></v-list-item
            >
          </router-link>
          <router-link to="/dataDisplay" style="text-decoration: none;">
            <v-list-item
              prepend-icon="mdi-office-building-plus"
              title=""
              value="Companies"
              style="font-size: x-large;"
              class="font-weight-bold text-white sidelist"
              ><p class="font-weight-bold" style="font-size: large;">
                Add Companies
              </p></v-list-item
            >
          </router-link>
          <router-link to="/addDepartment" style="text-decoration: none;">
            <v-list-item
              class="font-weight-bold text-white sidelist"
              prepend-icon="mdi-domain"
              title=""
              value="Add Department"
              style="font-size: x-large;"
              ><p class="font-weight-bold" style="font-size: large;">
                Add Department
              </p></v-list-item
            >
          </router-link>
          <router-link to="/addUser" style="text-decoration: none;">
            <v-list-item
              class="font-weight-bold text-white sidelist"
              prepend-icon="mdi-account-plus-outline"
              title=""
              value="Add User"
              style="font-size: x-large;"
              ><p class="font-weight-bold" style="font-size: large;">
                Add Users
              </p></v-list-item
            >
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
// import image from "../../assets/images/image.png";
export default {
  data() {
    return {
      data  : [],
      drawer: false,
      group: null,
      watch: {
        group() {
          this.drawer = false;
        },
      },
    };
  },
  mounted() {
     this.data = JSON.parse(localStorage.getItem("isLoggedIn"));
     console.log(this.data.userName);
  },
  methods: {
    logout() {
      const obj = {
        img: "",
        company: "",
        username: "",
        type: "",
        isLoggedIn: false,
      };
      console.log("value added +");
      this.$store.commit("setLoginDataToDashboard", obj);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.sidelist {
  color: white;
}
.sidelist :hover {
  color: orange;
}
.logout {
  color: white;
  background-color: orange;
}
.logout:hover {
  color: orange;
  background-color: white;
  border: 1px solid orange;
}
</style>
