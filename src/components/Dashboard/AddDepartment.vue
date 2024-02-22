<template>
  <sideBar />
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
          Add Department
          <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card class="mx-auto" max-width="500" elevation="16">
              <h1 class="w-100 d-flex justify-center text-orange">
                Add Department
              </h1>
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
                    v-model="companyDescription"
                    label="Description"
                    :rules="descriptionRules"
                  ></v-text-field>
                  <v-combobox
                    v-model="companyDepartment"
                    chips
                    label="Select Department"
                    :items="['Finance', 'HR', 'Dev Ops', 'Frontend Development', 'Backend Development']"
                    variant="solo-inverted"
                    :rules="selectDepartmentRules"
                  ></v-combobox>
                  <v-btn
                    type="submit"
                    @click="setLocalStorageValues"
                    block
                    class="mt-8 bg-blue"
                    prepend-icon="mdi-plus"
                    text="Add Department"
                  ></v-btn>
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
      <h1 class="text-orange mb-16">Company Registered Departments</h1>
      <v-data-table-server :items="localStorageData" item-key="id" hide-default-footer>
        <thead>
          <tr class="bg-blue">
            <th class="text-left">Company Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Department</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in localStorageData"
            :key="data.companyName"
            :class="{ 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }"
          >
            <td style="font-size : 15px">{{ data.companyName }}</td>
            <td style="font-size : 15px">{{ data.descripton }}</td>
            <td style="font-size : 15px">{{ data.department }}</td>
            <td class="td">
              <v-btn
                v-if="
                  this.isSuperUser ||
                  (this.isNormalUser &&
                    this.data.companyName == data.companyName)
                "
                class="ma-2 edit"
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
          <h1 class="w-100 d-flex justify-center text-orange">Edit Company</h1>
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
      editDialog: false,
      editedItem: {},
      localStorageData: [],
      item: [],
      data : [],
      dialog: false,
      companyName: "",
      companyDescription: "",
      companyDepartment: "",
      image: "",
      localStorageDataForCompany: "",
      descriptionRules: [(v) => !!v || "Description is required"],
      selectCompanyRules: [(v) => !!v || "Company is required"],
      selectDepartmentRules: [(v) => !!v || "Department is required"],
    };
  },
  mounted() {
     this.data = JSON.parse(localStorage.getItem("isLoggedIn"));
    this.getLocalStorageData();
    if(this.data.userType == 'Super User'){
      this.isSuperUser = true;
      this.userTypeCheck = false;
      console.log("super user")
    }else{
      this.isNormalUser = true;
      this.userTypeCheck = true;
      console.log(this.data.companyName)
    }
  },
  methods: {
    setLocalStorageValues() {
      const newData = {
        companyName: this.companyName,
        descripton: this.companyDescription,
        department: this.companyDepartment,
      };
      if (
        this.userName == "" ||
        this.email == "" ||
        this.companyName == "" ||
        this.password == ""
      ) {
      } else {
        let data = JSON.parse(localStorage.getItem("department")) || [];
        data.push(newData);
        localStorage.setItem("department", JSON.stringify(data));
      }
      this.companyName = "";
      this.companyDescription = "";
      this.companyDepartment = "";
      this.dialog = false;
      this.getLocalStorageData();
      this.$forceUpdate();
    },
    getLocalStorageData() {
      for (let i = 0; i < localStorage.length; i++) {
        this.localStorageData = JSON.parse(localStorage.getItem("department"));
        console.log(this.localStorageData);
      }
      this.localStorageDataForCompany = JSON.parse(
        localStorage.getItem("company")
      );
      for (const data of this.localStorageDataForCompany) {
        if(this.data.userType == "Super User"){
          this.item.push(data.companyName);
        }else{
          if(this.data.companyName == data.companyName){
            this.item.push(data.companyName);
          }
        }
      }
    },
    deleteList(id) {
      const index = this.localStorageData.findIndex((item) => item.id === id);
      console.log("anda", index);
      this.localStorageData.splice(index, 1);
      localStorage.setItem("department", JSON.stringify(this.localStorageData));
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
      localStorage.setItem("department", JSON.stringify(this.localStorageData));
      this.editDialog = false;
    },
  },
};
</script>

<style>
.custom-label-color .v-label {
  color: green;
}
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
.td{
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