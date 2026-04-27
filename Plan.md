# План разработки: Сайт-визитка на Astro + Github Pages

## TL;DR

Создаем быстрый, SEO-оптимизированный сайт-визитку с использованием **Astro** (идеален для статических сайтов). Astro требует минимума JavaScript, обеспечивает отличную SEO и готов к публикации на Github Pages. Проект будет включать четыре основные секции с минимальной анимацией, полной адаптивностью и расширенной SEO оптимизацией (Schema.org, sitemap, robots.txt, Google Analytics).

---

## Фазы разработки

### Фаза 1: Инициализация проекта

**Цель:** Подготовить структуру проекта и конфигурацию

1. **Создать Astro проект**
   - Инициализировать `npm create astro@latest`
   - Выбрать TypeScript режим
   - Настроить интеграцию с Github Pages (`astro.config.mjs` с `export { github: true }`)

2. **Установить необходимые пакеты**
   - `@astrojs/sitemap` — для автоматического sitemap.xml
   - `@astrojs/partytown` — для загрузки GA скриптов (не блокирует основной поток)
   - `sharp` — для оптимизации изображений

3. **Инициализировать структуру папок**

   src/

   ├── components/ # Переиспользуемые компоненты

   ├── layouts/ # Layout вспомогательные

   ├── pages/ # Основные страницы

   ├── styles/ # Глобальные стили (с color variables)

   ├── utils/ # Утилиты (SEO функции, etc)

   ├── config/ # Конфигурация (сайт метаданные)

   ├── data/ #Контент в JSON

   └── assets/ # Изображения, шрифты

---

### Фаза 2: Дизайн и стили

**Цель:** Настроить визуальную базу с палитрой цветов

1. **Создать глобальный CSS с переменными**

- Определить CSS переменные для палитры:
  - `--color-primary: #d4ce94` (светлый)
  - `--color-dark: #39411a` (темный)
  - `--color-accent: #fbf7ae` (сверхсветлый)
  - `--color-accent-dark: #9f3645` (вторичный)
- Установить типографию, spacing scale
- Добавить media queries переменные

2. **Создать компонент "base layout"**

- Header с fixed/sticky позиционированием
- Navigation логика (smooth scroll, активная ссылка)
- Footer с контактами
- Main контейнер с правильными отступами

3. **Создать utility классы**

- `.container` — max-width, centered
- `.section` — spacing между секциями
- `.text-section` — типографика для текстовых блоков
- Responsive утилиты

---

### Фаза 3: Компоненты и структура страниц

**Цель:** Реализовать четыре основные секции

1. **Компонент: Header с навигацией**

- Logo/Название
- Navigation menu (на desktope горизонталь, на мобилке hamburger)
- Smooth scroll to section links
- Минимальный JS для toggle меню на мобилке

2. **Компонент: Hero/About секция**

- Краткая информация о себе
- Background с цветом палитры
- Кнопка с CTA (напр. "Посмотреть работы")

3. **Компонент: Portfolio Grid**

- Карточки проектов с изображениями
- Hover эффекты (scale, shadow)
- Компактный layout на мобилке (1 колонна), 2-3 колонны на desktop
- Optional: фильтры категорий (JS минимум)

4. **Компонент: Contacts**

- Email ссылка (mailto:)
- Social media ссылки (GitHub, LinkedIn, Twitter)
- Может быть форма (опционально: Formspree или EmailJS для отправки)

5. **Pages/Layout структура**

- `src/pages/index.astro` — основная страница (все секции)
- `src/layouts/BaseLayout.astro` — обертка для SEO, head тегов

---

### Фаза 4: SEO оптимизация

**Цель:** Обеспечить максимальную поисковую видимость

1. **Конфигурация Astro для sitemap и robots.txt**

- `astro.config.mjs`: добавить sitemap интеграцию с site URL
- Автогенерация `sitemap.xml`
- Создать `robots.txt` в `public/`

2. **Meta теги и Astro SEO компонент**

- Создать `SEO.astro` компонент:
  - `<title>`
  - `<meta name="description">`
  - Open Graph теги (`og:title`, `og:description`, `og:image`)
  - Twitter Card теги
- Использовать компонент во всех страницах

3. **Schema.org Structured Data (JSON-LD)**

- Добавить schema для `Person` (в About секции)
- Добавить schema для `LocalBusiness` (если применимо)
- Добавить schema для `ContactPoint` (контакты)
- Внедрить как `<script type="application/ld+json">` в layout

4. **Google Analytics**

- Установить `@astrojs/partytown`
- Инициализировать GA4 тег (non-blocking)
- Проверить в DevTools что скрипт загружается асинхронно

---

### Фаза 5: Производительность и оптимизация

**Цель:** Обеспечить быструю загрузку и высокие Lighthouse scores

1. **Image оптимизация**

- Использовать Astro `<Image />` компонент (автоматическая оптимизация)
- Добавить srcset и sizes для responsive images
- Использовать WebP формат с fallback на JPG/PNG

2. **Минимизация CSS/JS**

- Astro по умолчанию минимизирует CSS и JS (build)
- Убедиться что нет неиспользуемого CSS

3. **Быстрая прокрутка и навигация**

- Smooth scroll реализовать через CSS `scroll-behavior: smooth`
- Минимум JavaScript для интерактивности (hamburger меню)

4. **Preload критических ресурсов**

- Preload шрифты, если используются
- Preload главное изображение hero секции

---

### Фаза 6: Github Pages конфигурация и деплой

**Цель:** Подготовить проект для публикации

1. **Настроить `astro.config.mjs` для Github Pages**

- Set `site: "https://<username>.github.io"` (или custom domain)
- Использовать `output: "static"` (по умолчанию в Astro)

2. **Создать workflow для автодеплоя**

- `.github/workflows/deploy.yml`:
  - На push в main ветку → build → deploy на gh-pages ветку
- Использовать действие типа `peaceiris/actions-gh-pages`

3. **Настроить Github Pages в репозитории**

- Settings → Pages → Source: Deploy from a branch
- Branch: `gh-pages` (или `main` если используется)

4. **Проверить миграцию на custom domain (если есть)**

- Добавить CNAME файл в `public/CNAME`
- Настроить DNS если необходимо

---

## Структура файлов (полные пути)

- `astro.config.mjs` — конфигурация Astro + Github Pages + sitemap
- `src/config/site.ts` — метаданные сайта, контакты, проекты
- `src/components/Header.astro` — шапка с навигацией
- `src/components/Hero.astro` — hero/about секция
- `src/components/Portfolio.astro` — grid проектов
- `src/components/Contacts.astro` — контакты секция
- `src/components/SEO.astro` — SEO meta компонент
- `src/layouts/BaseLayout.astro` — главный layout с SEO
- `src/pages/index.astro` — главная страница
- `src/styles/global.css` — глобальные стили, переменные палитры
- `src/utils/seo.ts` — утилиты для Schema.org генерации
- `public/robots.txt` — robots.txt
- `public/favicon.ico` — favicon
- `.github/workflows/deploy.yml` — автодеплой на Github Pages

---

## Верификация (Тестирование)

1. **Функциональная проверка**

- [ ] Header навигация: клики ведут на правильные секции (smooth scroll)
- [ ] Hamburger меню работает на мобилке
- [ ] Все ссылки контактов рабочие (mailto, social links)
- [ ] Изображения загружаются корректно на всех устройствах

2. **SEO проверка**

- [ ] `sitemap.xml` генерируется и доступен
- [ ] Meta description видна в DevTools
- [ ] Open Graph теги корректны (особенно og:image)
- [ ] Schema.org JSON-LD валиден (проверить через Google Schema.org validator)
- [ ] `robots.txt` доступен и корректен

3. **Производительность (Lighthouse)**

- [ ] Performance > 90
- [ ] SEO > 95
- [ ] Best Practices > 90
- [ ] Accessibility > 85
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

4. **Адаптивность**

- [ ] Тестирование на 320px (мобиль), 768px (планшет), 1920px (desktop)
- [ ] Проверка в Chrome DevTools Device Mode
- [ ] Реальное тестирование на мобильном устройстве

5. **Github Pages**

- [ ] Репозиторий в статусе "deployed" на Github Pages
- [ ] Сайт доступен по URL
- [ ] Обновления deploying автоматически при push

---

## Решения и Допущения

- **Astro выбран** как оптимальный выбор для статического сайта-визитки: ноль JS по умолчанию, встроенная поддержка SEO, быстрая генерация, ready for Github Pages
- **Статический контент** означает, что контент хранится в `.astro` файлах / markdown, но может быть легко переделано на CMS позже
- **Минимальная анимация** = CSS transitions (hover, smooth scroll), минимум JS
- **Responsive-first** подход: mobile-first CSS, затем desktop улучшения
- **Analytics** будут загружаться non-blocking благодаря Partytown (не влияет на LCP)

---

## Из чего начать (Приоритет)

1. ✅ Инициализировать Astro проект + базовая конфигурация
2. ✅ Настроить глобальные стили с цветовой палитрой
3. ✅ Создать компоненты (Header, Hero, Portfolio, Contacts)
4. ✅ Разметить главную страницу
5. ✅ Добавить SEO оптимизацию (meta, schema)
6. ✅ Оптимизировать изображения и производительность
7. ✅ Настроить деплой на Github Pages
8. ✅ Финальное тестирование и Lighthouse проверка
