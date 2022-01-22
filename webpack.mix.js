const mix = require("laravel-mix");
const path = require("path");
mix.setPublicPath("public");

mix
  .js("resources/scripts/main.js", path.resolve(__dirname, "public/scripts"))
  .webpackConfig({
    context: __dirname,
    node: {
      __filename: true,
      __dirname: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "resources/vue"),
        "~": path.resolve(__dirname, "resources/vue"),
        "@sass": path.resolve(__dirname, "resources/sass"),
      },
    },
  })
  .options({
    processCssUrls: true,
  })
  .vue()
  .version();
