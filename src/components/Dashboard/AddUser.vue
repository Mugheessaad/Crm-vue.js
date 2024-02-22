<template>
  <side-bar />
  <div
    class="bg-blue-lighten-4 h-100 d-flex justify-space-around align-center flex-column maindash"
  >
    <div class="topBanner d-flex justify-end align-center w-100">
      <div>
        <v-btn
          :disabled="userTypeCheck"
          class="mr-4 addDepartment"
          prepend-icon="mdi-plus"
        >
          Add User
          <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card class="mx-auto" max-width="500" elevation="16">
              <h1 class="w-100 d-flex justify-center text-orange">Add User</h1>
              <v-form @submit.prevent>
                <v-sheet width="500" class="mx-auto pa-4 ma-4">
                  <v-combobox
                    v-model="companyName"
                    chips
                    label="Company Name"
                    :items="item"
                    variant="solo-inverted"
                    :rules="selectCompanyRules"
                  ></v-combobox>
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
                    v-model="phoneNumber"
                    label="Phone Number"
                    :rules="phoneNumberRules"
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
                    >Add User</v-btn
                  >
                </v-sheet>
                <v-card-actions>
                  <v-btn
                  class="cancel"
                    block
                    @click="dialog = false"
                    prepend-icon="mdi-cancel"
                    >Cancel</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
    </div>
    <v-container>
      <h1 class="text-orange mb-16"> Registered Company Users List</h1>
      <v-data-table-server
        :headers="headers"
        :items="localStorageData"
        item-key="id"
        hide-default-footer
      >
        <thead>
          <tr class="bg-blue">
            <th class="text-left">ID</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Company Name</th>
            <th class="text-left">phone Number</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in localStorageData"
            :key="data.userName"
            :class="{ 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }"
          >
            <td style="font-size : 15px">{{ data.id }}</td>
            <td style="font-size : 15px">{{ data.userName }}</td>
            <td style="font-size : 15px">{{ data.email }}</td>
            <td style="font-size : 15px">{{ data.companyName }}</td>
            <td style="font-size : 15px">{{ data.phoneNumber }}</td>
            <td class="td">
              <v-btn
                v-if="
                  this.isSuperUser ||
                  (this.isNormalUser &&
                    this.data.companyName == data.companyName)
                "
                class="edit"
                icon="mdi-lead-pencil"
                @click="editList(data)"
              ></v-btn>
              <v-btn
                v-if="
                  this.isSuperUser ||
                  (this.isNormalUser &&
                    this.data.companyName == data.companyName)
                "
                class="ma-2 delete"
                icon="mdi-delete"
                @click="deleteList(data.id)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-data-table-server>
      <v-dialog v-model="editDialog" width="auto">
        <v-card class="mx-auto" max-width="500" elevation="16">
          <h1 class="w-100 d-flex justify-center text-orange">Edit User</h1>
          <v-form @submit.prevent>
            <v-sheet width="500" class="mx-auto pa-4 ma-4">
              <v-text-field
                v-model="editedItem.userName"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.companyName"
                label="Company Name"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.password"
                label="Password"
              ></v-text-field>
              <v-btn
                type="submit"
                @click="updateLocalStorage"
                block
                class="mt-8 bg-blue"
                prepend-icon="mdi-pencil"
                >Save Changes</v-btn
              >
            </v-sheet>
          </v-form>
          <v-card-actions>
            <v-btn
              class="cancel"
              block
              @click="editDialog = false"
              prepend-icon="mdi-cancel"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [],
      companyName: "",
      phoneNumber: "",
      editDialog: false,
      editedItem: {},
      localStorageData: [],
      dialog: false,
      userName: "",
      email: "",
      companyName: "",
      password: "",
      image: "",
      nameRules: [(v) => !!v || "Email is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      companyNameRules: [(v) => !!v || "Company Name is required"],
      passwordRules: [(v) => !!v <= 8 || "Password is required"],
    };
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("isLoggedIn"));
    this.getLocalStorageData();
    if (this.data.userType == "Super User") {
      this.isSuperUser = true;
      this.userTypeCheck = false;
      console.log("super user");
    } else {
      this.isNormalUser = true;
      this.userTypeCheck = true;
      console.log(this.data.companyName);
    }
  },
  methods: {
    setLocalStorageValues() {
      const newData = {
        id: Date.now(),
        companyName: this.companyName,
        userName: this.userName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
      };
      if (
        this.userName == "" ||
        this.email == "" ||
        this.companyName == "" ||
        this.password == "" ||
        this.phoneNumber == ""
      ) {
        console.log("hello");
      } else {
        let data = JSON.parse(localStorage.getItem("Users")) || [];
        data.push(newData);
        localStorage.setItem("Users", JSON.stringify(data));

        console.log(JSON.stringify(data));
        this.userName = "";
        this.email = "";
        this.companyName = "";
        this.password = "";
        this.phoneNumber = "";
        this.dialog = false;
      }
      this.getLocalStorageData();
      this.$forceUpdate();
    },
    getLocalStorageData() {
      for (let i = 0; i < localStorage.length; i++) {
        this.localStorageData = JSON.parse(localStorage.getItem("Users"));
        console.log(this.localStorageData);
      }
      this.localStorageDataForCompany = JSON.parse(
        localStorage.getItem("company")
      );
      for (const data of this.localStorageDataForCompany) {
        if (this.data.userType == "Super User") {
          this.item.push(data.companyName);
        } else {
          if (this.data.companyName == data.companyName) {
            this.item.push(data.companyName);
          }
        }
      }
    },
    deleteList(id) {
      const index = this.localStorageData.findIndex((item) => item.id === id);
      console.log("anda", index);
      this.localStorageData.splice(index, 1);
      localStorage.setItem("Users", JSON.stringify(this.localStorageData));
    },
    editList(item) {
      this.editedItem = { ...item };
      this.editDialog = true;
    },
    updateLocalStorage() {
      const index = this.localStorageData.findIndex(
        (item) => item.id === this.editedItem.id
      );
      this.localStorageData[index] = this.editedItem;
      localStorage.setItem("Users", JSON.stringify(this.localStorageData));
      this.editDialog = false;
    },
  },
};
</script>

<style scoped>
.odd-row {
  background-color: rgb(250, 221, 168);
}
.edit {
  background-color: #324ad1;
  color: white;
}
.edit:hover {
  background-color: white;
  color: #324ad1;
  border: 1px solid #324ad1;
}
.delete {
  background-color: red;
  color: white;
}
.delete:hover {
  background-color: white;
  color: red;
  border: 1px solid red;
}
.td {
  width: 15%;
}

.addDepartment{
      background-color: orange;
      color: white;
}
.addDepartment:hover{
       background-color: white;
      color: orange;
      border: 1px solid orange;
}
.maindash{
  background-image: url('C:\Users\Haier\Desktop\Programmer force Tasks\Vue.js\crm\src\assets\images\office1.png');
  background-size: contain;
  background-size: 1200px;
  background-position-x: center;
  background-position-y: 80px;
}
.cancel {
  background-color: white;
  color: orange;
  border: 2px solid orange;
}
.cancel:hover {
  background-color: orange;
  color: white;
  border: 1px solid orange;
}
</style>
