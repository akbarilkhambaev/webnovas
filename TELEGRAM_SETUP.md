# 📱 Настройка Telegram Bot для приема заявок

## Шаг 1: Создание Telegram бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Введите имя бота (например: "WebNova Contact Bot")
4. Введите username бота (например: "webnova_contact_bot")
5. **Сохраните токен**, который вы получите (формат: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Шаг 2: Получение Chat ID

### Вариант А: Личные сообщения
1. Найдите созданного бота и отправьте ему любое сообщение (например: `/start`)
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
3. Найдите значение `"chat":{"id":123456789}` - это ваш Chat ID

### Вариант Б: Группа/Канал
1. Создайте группу или канал в Telegram
2. Добавьте бота в группу/канал как администратора
3. Отправьте любое сообщение в группу/канал
4. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
5. Найдите значение `"chat":{"id":-1001234567890}` (для групп ID начинается с минуса)

## Шаг 3: Настройка переменных окружения в Vercel

1. Перейдите на [vercel.com](https://vercel.com)
2. Откройте ваш проект
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте следующие переменные:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `TELEGRAM_BOT_TOKEN` | Ваш токен из Шага 1 | Production, Preview, Development |
   | `TELEGRAM_CHAT_ID` | Ваш Chat ID из Шага 2 | Production, Preview, Development |

5. Нажмите **Save**

## Шаг 4: Деплой на Vercel

### Через GitHub:
1. Создайте репозиторий на GitHub и запушьте код:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/webnova.git
   git push -u origin main
   ```

2. Импортируйте проект в Vercel:
   - Перейдите на [vercel.com/new](https://vercel.com/new)
   - Выберите ваш GitHub репозиторий
   - Нажмите **Deploy**

### Через Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel
```

## Шаг 5: Проверка работы

1. После деплоя откройте ваш сайт
2. Заполните форму обратной связи
3. Проверьте Telegram - должно прийти сообщение с данными заявки

## 🔧 Локальная разработка

Для тестирования локально:

1. Создайте файл `.env.local`:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

2. Установите Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Запустите dev сервер с Vercel:
   ```bash
   vercel dev
   ```

## 📝 Формат сообщения в Telegram

Заявки будут приходить в формате:

```
🆕 Новая заявка с сайта WebNova

👤 Имя: Иван Иванов
📧 Email: ivan@example.com
📱 Телефон: +998 90 123 45 67
🎯 Услуга: Веб-сайт под ключ

💬 Сообщение:
Нужен корпоративный сайт для строительной компании

⏰ Время: 17.02.2026, 15:30:45
```

## ⚠️ Важно

- **Не коммитьте файл `.env.local`** в git (он уже добавлен в `.gitignore`)
- Храните токен бота в секрете
- Для production используйте переменные окружения в Vercel
- После первого деплоя проверьте работу формы на продакшене

## 🆘 Troubleshooting

**Проблема:** "Failed to send message to Telegram"
- Проверьте правильность токена и Chat ID
- Убедитесь, что бот добавлен в группу как администратор (если используете группу)
- Проверьте переменные окружения в Vercel

**Проблема:** "Method not allowed"
- Убедитесь, что форма отправляет POST запрос
- Проверьте, что API endpoint доступен по `/api/send-telegram`

**Проблема:** Бот не получает сообщения
- Отправьте боту команду `/start`
- Проверьте права администратора в группе/канале
- Проверьте логи в Vercel: Deployments → Function Logs
