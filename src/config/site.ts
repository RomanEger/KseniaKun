export const siteConfig = {
  title: "Привет! Я Ксения Кун",
  subtitle: "Subtitle",
  description: "Портфолио и блог Ксении Кун",
  author: "Ксения Кун",

  email: "ksenia.kun02@gmail.com",
  telegram: "https://t.me/ksnkun",
  vk: "https://vk.com/ksnkun",

  contactsTitle: "Контакты",
  contactsDescription: "Свяжитесь со мной с помощью Email, Telegram или VK",
  mailto: "Или напишите прямо на почту",
  mailtoButton: "Написать Email",

  baseUrl: "https://romaneger.github.io",
};

export const socialLinks = [
  {
    name: "Email",
    url: `mailto:${siteConfig.email}`,
    icon: "/mail.svg",
    alt: "Email Icon",
  },
  {
    name: "Telegram",
    url: siteConfig.telegram,
    icon: "/telegram.svg",
    alt: "Telegram Icon",
  },
  {
    name: "VK",
    url: siteConfig.vk,
    icon: "/vk.svg",
    alt: "VK Icon",
  },
];
