import { createI18n } from "vue-i18n";
const messages = {
  fr: {},
  en: {},
};

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: "en-US",
    legacy: false,
    messages,
  });

  app.use(i18n);
};
