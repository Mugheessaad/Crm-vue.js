<template class="h-100">
  <div class="main bg-blue h-100 pt-16">
    <div class="form">
      <v-card class="mx-auto" max-width="500" elevation="16">
        <h1 class="w-100 d-flex justify-center text-blue">Signin</h1>
        <v-sheet width="500" class="mx-auto pa-4 ma-4">
          <v-form fast-fail @submit.prevent>
            <v-text-field
              v-model="userName"
              label="Username"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>
            <v-expand-x-transition>
              <v-card
                class="mx-auto mx-auto bg-secondary"
                max-width="470"
                max-height="450"
                elevation="16"
                v-show="visible"
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
              class="mt-8 color-blue text-blue"
              >Open Camera</v-btn
            >
            <v-btn
              v-if="visible"
              id="closeCamera"
              @click="closeCamera"
              block
              hidden
              class="mt-8"
              >Close Camera</v-btn
            >
            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
                    {{ snackbarMessage }}
                    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
              </v-snackbar>
            <v-btn
                type="submit"
                @click="captureImage"
                block
                class="mt-8 bg-blue"
                >Capture and Submit</v-btn >
                <!-- </router-link > -->
          </v-form>
        </v-sheet>
      </v-card>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      expand: false,
      expand2: false,
      userName: "",
      password: "",
      image : "",
      image1 : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAGQCAYAAAA+89ElAAAAAXNSR0IArs4c6QAAFIdJREFUeF7t1sENADAMAjG6/9Ct1DXO2QCTB2fbnSNAgAABAgQIEMgIHAMw07WgBAgQIECAAIEvYAB6BAIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQMAD9AAECBAgQIEAgJmAAxgoXlwABAgQIECBgAPoBAgQIECBAgEBMwACMFS4uAQIECBAgQMAA9AMECBAgQIAAgZiAARgrXFwCBAgQIECAgAHoBwgQIECAAAECMQEDMFa4uAQIECBAgAABA9APECBAgAABAgRiAgZgrHBxCRAgQIAAAQIGoB8gQIAAAQIECMQEDMBY4eISIECAAAECBAxAP0CAAAECBAgQiAkYgLHCxSVAgAABAgQIGIB+gAABAgQIECAQEzAAY4WLS4AAAQIECBAwAP0AAQIECBAgQCAmYADGCheXAAECBAgQIGAA+gECBAgQIECAQEzAAIwVLi4BAgQIECBAwAD0AwQIECBAgACBmIABGCtcXAIECBAgQICAAegHCBAgQIAAAQIxAQMwVri4BAgQIECAAAED0A8QIECAAAECBGICBmCscHEJECBAgAABAgagHyBAgAABAgQIxAQMwFjh4hIgQIAAAQIEDEA/QIAAAQIECBCICRiAscLFJUCAAAECBAgYgH6AAAECBAgQIBATMABjhYtLgAABAgQIEDAA/QABAgQIECBAICZgAMYKF5cAAQIECBAgYAD6AQIECBAgQIBATMAAjBUuLgECBAgQIEDAAPQDBAgQIECAAIGYgAEYK1xcAgQIECBAgIAB6AcIECBAgAABAjEBAzBWuLgECBAgQIAAAQPQDxAgQIAAAQIEYgIGYKxwcQkQIECAAAECBqAfIECAAAECBAjEBAzAWOHiEiBAgAABAgQMQD9AgAABAgQIEIgJGICxwsUlQIAAAQIECBiAfoAAAQIECBAgEBMwAGOFi0uAAAECBAgQeF2mkBDu0hUyAAAAAElFTkSuQmCC",
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      snackbarTimeout: 4000 ,
      nameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      visible: false,
    };
  },
  methods: {
    authenticate() {
      if (this.userName === "mughees" && this.password === "12341234" && this.image != this.image1) {
        this.authenticated = true;
        // const imageData = {
        //   image:this.image
        // }
        // console.log("--------/>",this.image)
        // localStorage.setItem("image",JSON.stringify(imageData));
         this.snackbarMessage = 'Login successful!';
        this.snackbarColor = 'success';
        this.snackbar = true;
        this.$router.push("/dashboard");
      } else {
        if(this.image == this.image1 || this.image == null){
          this.snackbarMessage = 'plz retake the pic';
        this.snackbarColor = 'error';
        this.snackbar = true;
        }else{
        this.snackbarMessage = 'Invalid username or password';
        this.snackbarColor = 'error';
        this.snackbar = true;
        }
      }
    },
    openCamera() {
      this.snackbar = false;
      const camera = document.getElementById("webcam-video");
      camera.style.display = "block";
      console.log(camera.style.display);
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
    closeCamera() {
      const video = document.getElementById("webcam-video");
      video.style.display = "none";
      console.log(video.style.display);
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        console.log(track);
        track.stop();
      });
      this.visible = false;
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
      console.log(imageDataUrl);
      this.image = imageDataUrl;
      image.src = imageDataUrl;
      image.style.display = "block";
      video.style.display = "none";
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        console.log(track);
        track.stop();
      });
      this.authenticate();
    },
  },
  mounted() {
  
  },
};
</script>

<style scoped>
#webcam-video {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>
