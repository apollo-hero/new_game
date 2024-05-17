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
            style="width: 250px; height: 100px;"
          />
          <a href="javascript:;" class="text-lg font-medium ml-auto flex items-center px-5" @click="goto()" style="color: #3f51b5;">
            <img
              alt=""
              class="rounded-full mr-1"
              :src="require(`@/assets/images/left.png`)"
              style="width: 25px; height: 25px;"
            />
            Go To Home
          </a>
        </div>

        <div class="content">
          <h2 class="page-title">Terms of Service</h2>
          <div class="intro-text">
            <p>
              Welcome to Zennos. Please read these terms and conditions carefully before using our services.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Acceptance of Terms and Conditions</h3>
            <p>
              By using our services, you agree to comply with and be bound by these terms and conditions. If you do not agree with any of these terms, do not use our services.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Donations</h3>
            <p>
              If you choose to donate to the server, please note that the Zennos Points will be credited to your account and are non-refundable. We reserve the right to modify the values and prices of Zennos Points without prior notice.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Modifications</h3>
            <p>
              We reserve the right to modify these terms and conditions at any time. Players are responsible for periodically reviewing the terms and conditions for any changes.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Responsibilities</h3>
            <p>
              We are not responsible for the actions of players who have accepted these terms and conditions. Players are responsible for their actions within the server and must comply with the established rules.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Privacy</h3>
            <p>
              We respect the privacy of our players. Please refer to our privacy policy for more information.
            </p>
          </div>


          <div class="terms-section">
            <h3 class="section-title">Prohibitions</h3>
            <p>
              The use of hacks, cheats, or any other form of cheating within the server is prohibited. Offensive, racist, sexist, or discriminatory language is also prohibited.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Player Conduct</h3>
            <p>
              Players must maintain respectful and friendly behavior within the server. Inappropriate or abusive behavior will result in immediate removal from the server. We are not responsible for resolving personal rivalries; the server provides mechanisms for resolving conflicts.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Responsibility</h3>
            <p>
              We are committed to protecting the server and its services. In the event of any server damage or errors affecting players, we take responsibility and will compensate affected players for the damages caused.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Account Protection</h3>
            <p>
              Players are responsible for protecting their accounts from theft or unauthorized access. Suspected compromised accounts must be immediately reported to the support team.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Player Accountability for Accounts and Characters</h3>
            <p>
              Players must understand that they have sole responsibility for protecting their accounts and characters. While we host the data, we do not have control over individual accounts or characters. Players must take necessary measures to ensure their security.
            </p>
          </div>

          <div class="terms-section">
            <h3 class="section-title">Resolving Disputes</h3>
            <p>
              Any conflicts between players and our server will be resolved through mutual agreement via tickets.
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
