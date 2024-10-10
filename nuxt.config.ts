export default {
  runtimeConfig: {
    public: {
      prod: process.env.PROD,
    }
  },
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/styles.css",
    "flowbite/dist/flowbite.css",
  ],
  ssr: false,
  mode: "spa",
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  router: {
    mode: "history",
  },
  compatibilityDate: "2024-10-06",
  modules: ["@nuxtjs/tailwindcss"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  devServer: {
    port: 4200,
  },
  app: {
    head: {
      title: 'Eduqui'
    }
  }
};
