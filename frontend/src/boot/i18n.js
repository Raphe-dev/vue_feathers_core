import { createI18n } from "vue-i18n";
const messages = {
  fr: {},
  en: {},
};

export const i18n = createI18n({
  locale: "en-US",
  legacy: false,
  messages,
});

export default ({ app }) => {
  app.use(i18n);
};
