<template class="h-100">
  <div class="maindash bg-blue-lighten-4 h-100 pt-16">
    <v-app-bar class="bg-blue" prominent>
      <v-toolbar-title>
        <img
          src="../../assets/images/image.png"
          alt="image"
          width="90"
          class="mt-4"
        />
        </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn class="logout" append-icon="mdi-login">Signup</v-btn>
    </v-app-bar>
    <div class="form">
      <v-card
        class="mx-auto"
        max-width="500"
        elevation="16"
        :loading="loading"
        :disabled="cardDisabled"
      >
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="light-green-accent-3"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
        <h1 class="w-100 d-flex justify-center text-orange">Signin</h1>
        <v-sheet width="500" class="mx-auto pa-4 ma-4">
          <v-form fast-fail @submit.prevent>
            <v-text-field
              v-model="userName"
              label="Username"
              :rules="nameRules"
            ></v-text-field>
            <p class="text-disabled">hint: 'kminchelle'</p>
            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>
            <p class="text-disabled">hint: '0lelplR'</p>
            <v-expand-x-transition>
              <v-card
                class="mx-auto mx-auto bg-secondary"
                max-width="470"
                max-height="450"
                elevation="16"
              >
                <div id="webcam-container" class="d-flex justify-center">
                  <video
                    id="webcam-video"
                    style="display: none"
                    autoplay
                  ></video>
                  <img id="captured-image" style="display: block" />
                </div>
              </v-card>
            </v-expand-x-transition>
            <v-btn
              v-if="visible == false"
              id="camera"
              @click="openCamera"
              block
              border="3px solid blue"
              class="mt-8 camera"
              >Open Camera</v-btn
            >
            <v-btn
              v-if="visible"
              :disabled="disabledCaptured"
              id="closeCamera"
              @click="captureImage"
              block
              hidden
              class="mt-8 camera"
              >Capture image</v-btn
            >
            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              :timeout="snackbarTimeout"
            >
              {{ snackbarMessage }}
              <v-btn color="white" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-btn
              :loading="loading"
              type="submit"
              @click="submitForm"
              block
              class="mt-8 submit"
              :disabled="disabled"
              >Login</v-btn
            >
            <!-- </router-link > -->
          </v-form>
        </v-sheet>
      </v-card>
    </div>
  </div>
</template>
    
<script>
import axios from "axios";
async function fetchData(userName, password) {
  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      {
        // username: "kminchelle",
        // password: "0lelplR",
        username: userName,
        password: password,
        // expiresInMins: 60, // optional
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // Optionally return the data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optionally re-throw the error
  }
}
export default {
  data() {
    return {
      Logger : {
        isLoggedIn : false,
        userType : '',
        companyName : '',
        userName : '',
        image : '',
      },
      companyName : "",
      userType : "",
      disabledCaptured: false,
      disabled: true,
      cardDisabled: false,
      loading: false,
      selection: 1,
      expand: false,
      expand2: false,
      userName: "",
      password: "",
      image: "",
      image1:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAGQCAYAAAA+89ElAAAAAXNSR0IArs4c6QAAFIdJREFUeF7t1sENADAMAjG6/9Ct1DXO2QCTB2fbnSNAgAABAgQIEMgIHAMw07WgBAgQIECAAIEvYAB6BAIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQeF2mkBDu0hUyAAAAAElFTkSuQmCC",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      snackbarTimeout: 4000,
      nameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      visible: false,
      userData: [],
    };
  },

  methods: {
    setLoginDataToDashboardToStore() {
      // Call the mutation with parameters
      const obj = {
        img: this.image,
        company: this.companyName,
        username: this.userName,
        type: this.userType,
        isLoggedIn: true,
      };
      this.$store.commit("setLoginDataToDashboard", obj);
      console.log("value added +");
    },
    authenticate() {
      fetchData(this.userName, this.password)
        .then((data) => {
          this.Logger.image = this.image;
          this.Logger.userName = this.userName;
          this.Logger.isLoggedIn = true;
          this.Logger.userType = "Super User";
          this.Logger.companyName = "Super User";
          localStorage.setItem("isLoggedIn",JSON.stringify(this.Logger))
          console.log("-->", data);
          this.snackbarMessage = "Login successful!";
          this.snackbarColor = "success";
          this.snackbar = true;
          this.$router.push("/dashboard");
          this.loading = false;
          this.cardDisabled = false;
          this.userType = "Super User";
          this.companyName = "Super User";
          this.setLoginDataToDashboardToStore();
        })
        .catch((error) => {
          if (error.response.status == 400 ||  error.response.status == 0) {
            for (const data of this.userData) {
              if (
                this.userName == data.userName &&
                this.password == data.password
              ) {
                this.Logger.image = this.image;
                this.Logger.userName = data.userName;
                this.Logger.companyName = data.companyName;
                this.Logger.isLoggedIn = true;
                this.Logger.userType = "Normal User";
                localStorage.setItem("isLoggedIn",JSON.stringify(this.Logger))
                this.snackbarMessage = "Login successful!";
                this.snackbarColor = "success";
                this.snackbar = true;
                this.$router.push("/dashboard");
                // this.loading = false;
                // this.cardDisabled = false;
                this.userType = "Normal User";
                this.companyName = data.companyName;
                this.setLoginDataToDashboardToStore();
              }
            }
          } else {
            this.snackbarMessage = "Invalid username or password";
            this.snackbarColor = "error";
            this.snackbar = true;
            console.log("error", error);
            this.loading = false;
            this.cardDisabled = false;
          }
        });
    },
    openCamera() {
      this.snackbar = false;
      const camera = document.getElementById("webcam-video");
      camera.style.display = "block";
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.getElementById("webcam-video");
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
      this.visible = true;
    },
    captureImage() {
      const video = document.getElementById("webcam-video");
      const image = document.getElementById("captured-image");
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = 400;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, 400);
      const imageDataUrl = canvas.toDataURL("image/png");
      this.image = imageDataUrl;
      image.src = imageDataUrl;
      image.style.display = "block";
      video.style.display = "none";
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.disabledCaptured = true;
      this.disabled = false;
    },
    submitForm() {
      this.cardDisabled = true;
      this.loading = true;
      this.authenticate();
      
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("Users"));
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn",this.isLoggedIn)
  },
};
</script>

<style scoped>
.maindash{
  background-image: url('C:\Users\Haier\Desktop\Programmer force Tasks\Vue.js\crm\src\assets\images\office1.png');
  background-size: contain;
  background-size: 1200px;
  background-position-x: center;
  background-position-y: 80px;
}
#webcam-video {
  width: 100%;
  max-width: 500px;
  height: auto;
}
.camera {
  border: 3px solid orange;
  color: orange;
}
.camera:hover {
  background-color: orange;
  color: white;
}
.submit {
  background-color: #2196f3;
  color: white;
}
.submit:hover {
  background-color: white;
  border: 3px solid #2196f3;
  color: #2196f3;
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
