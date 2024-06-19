<template>
  <div class="container">
    <!-- BEGIN: Terms Page -->
    <div class="error-page flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
      <div class="text-white mt-10 lg:mt-0 justify-center">
        <div class="flex mt-8 text-center">
          <img
            alt=""
            class="rounded-full"
            :src="require(`@/assets/images/logo.png`)"
            style="width: 100px; height: 100px;"
          />
          <a href="javascript:;" class="text-lg font-medium ml-auto flex items-center px-5" @click="goto()" style="color: #3f51b5;">
            <img
              alt="ZENOS"
              class="rounded-full mr-1"
              :src="require(`@/assets/images/left.png`)"
              style="width: 25px; height: 25px;"
            />
            Go To Home
          </a>
        </div>


        <div class="content">
          <h2 class="page-title">Privacy Policy</h2>
          <div class="intro-text">
            <p>
              At Zelda, we prioritize the privacy and security of our users. Our dedicated and experienced team is committed to providing a secure and reliable Nostale private server that continually improves.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Data Collection</h3>
            <p>
              When you use our services, we may gather certain information such as your email address, username, IP address, and other technical details. We use this information solely to enhance our services and offer a better user experience.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Security</h3>
            <p>
              We take comprehensive measures to protect user information and maintain its security. Our security practices include physical, electronic, and administrative safeguards to ensure the safety of user data.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Use of Cookies</h3>
            <p>
              We utilize cookies to improve the user experience, personalize content, and display relevant advertisements. Cookies are small text files stored on your device that allow us to recognize you when you revisit our website.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">User Rights</h3>
            <p>
              Users have the right to access the information we collect about them and request corrections or deletions if any inaccuracies are found. Users can also choose to opt-out of promotional emails and disable cookies in their browsers.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Sharing</h3>
            <p>
              We do not share user information with third parties without explicit consent, except in cases where it is required by law.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Changes to Privacy Policies</h3>
            <p>
              We may update our privacy policies periodically to reflect changes in our practices or the law. Users will be notified of any significant changes to our privacy policies.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Retention of Information</h3>
            <p>
              We retain user information for as long as necessary to provide our services and for other essential purposes such as legal compliance and dispute resolution.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      goto(){
          history.back();
      },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 250px;
  height: 100px;
  border-radius: 50%;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

.content {
  text-align: left;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  color: #2990e2;
  margin-bottom: 20px;
}

.intro-text {
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #2990e2;
  margin-bottom: 10px;
}

.terms-section {
  margin-bottom: 30px;
}

p {
  line-height: 1.5;
}
</style>
