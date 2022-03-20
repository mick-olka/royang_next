const global_data = require("./utils/global_data");
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [ global_data.backURL, '192.168.1.164', '178.54.240.228', 'static-sl.insales.ru'],
  },
  i18n: {
    locales: ["ua", "ru"],
    defaultLocale: "ua",
    localeDetection: false
  },
}
