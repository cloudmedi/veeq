module.exports = {
  locales: ["en", "tr"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "header", "library", "settings", "upload"],
    "/": ["home"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
  defaultNs: "common",
  localeDetection: false,
};
