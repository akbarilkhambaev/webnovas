# 🚀 Быстрый старт для деплоя на Vercel

## ✅ Что уже сделано:

1. ✅ Создана serverless функция `/api/send-telegram.ts`
2. ✅ Обновлена форма ContactSection для отправки в Telegram
3. ✅ Создан `vercel.json` для конфигурации
4. ✅ Добавлен `.env.example` с примерами переменных
5. ✅ Обновлен `.gitignore` для безопасности

## 📋 Что нужно сделать перед деплоем:

### 1. Установить зависимость для Vercel (опционально):

```bash
npm install -D @vercel/node
```

Это добавит TypeScript типы для Vercel функций (необязательно, но рекомендуется).

### 2. Настроить Telegram бота:

**Создайте бота:**
1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. **Сохраните токен** (например: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

**Получите Chat ID:**
1. Отправьте сообщение вашему боту
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
3. Найдите значение `"id"` в разделе `"chat"`

### 3. Деплой на Vercel:

**Вариант A - Через GitHub (рекомендуется):**

```bash
# 1. Инициализируйте git репозиторий
git init
git add .
git commit -m "Initial commit with Telegram integration"

# 2. Создайте репозиторий на GitHub и запушьте
git remote add origin https://github.com/ваш-username/webnova.git
git branch -M main
git push -u origin main

# 3. Импортируйте на Vercel:
# - Откройте https://vercel.com/new
# - Выберите ваш GitHub репозиторий
# - Нажмите Deploy
```

**Вариант B - Через Vercel CLI:**

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Войдите
vercel login

# 3. Деплой
vercel --prod
```

### 4. Добавьте переменные окружения в Vercel:

После деплоя:
1. Откройте ваш проект на [vercel.com](https://vercel.com)
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте:
   - **Name:** `TELEGRAM_BOT_TOKEN` → **Value:** ваш токен
   - **Name:** `TELEGRAM_CHAT_ID` → **Value:** ваш chat ID
4. Выберите: **Production**, **Preview**, **Development**
5. Нажмите **Save**
6. **Redeploy** проект (Deployments → ... → Redeploy)

## 🎉 Готово!

После редеплоя:
1. Откройте ваш сайт
2. Заполните форму обратной связи
3. Проверьте Telegram - должно прийти сообщение!

## 📝 Формат сообщения:

```
🆕 Новая заявка с сайта WebNova

👤 Имя: Иван Иванов
📧 Email: ivan@example.com
📱 Телефон: +998 90 123 45 67
🎯 Услуга: Веб-сайт под ключ

💬 Сообщение:
Нужен корпоративный сайт

⏰ Время: 17.02.2026, 15:30:45
```

## 🔧 Локальное тестирование:

```bash
# 1. Создайте .env.local
echo "TELEGRAM_BOT_TOKEN=ваш_токен" > .env.local
echo "TELEGRAM_CHAT_ID=ваш_chat_id" >> .env.local

# 2. Установите Vercel CLI
npm i -g vercel

# 3. Запустите dev сервер
vercel dev
```

## ⚠️ Важно:

- Не коммитьте `.env.local` в git
- Храните токен в секрете
- Проверьте, что бот получил команду `/start` от вас

## 🆘 Проблемы?

Смотрите [TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md) для детальных инструкций.

---

**Удачи с деплоем! 🚀**
