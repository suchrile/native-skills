const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/functions.scss";
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/fonts.css";
          @import "@/assets/styles/reset.scss";
        `
      }
    }
  }
})
