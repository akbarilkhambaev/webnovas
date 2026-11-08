# WebNova - Digital Agency Landing Page

Modern website for a digital agency built with Next.js, TypeScript and Tailwind CSS.

## 🚀 Features

- ✨ Modern, animated UI with smooth scroll effects
- 🌐 Multilingual support (Russian/Uzbek)
- 📱 Fully responsive design
- 📬 Contact form with Telegram integration
- 💰 Interactive pricing calculator
- 📰 Blog with Supabase-backed admin
- 🎯 Built with shadcn/ui components

## 🛠 Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Data:** Supabase (blog articles)
- **Tests:** Vitest
- **Deployment:** Vercel

## 📦 Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd webnova

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## 📬 Telegram Integration Setup

The contact form sends submissions to your Telegram bot/channel.

### Quick Setup:

1. **Create a Telegram bot:**
   - Message [@BotFather](https://t.me/BotFather)
   - Send `/newbot` and follow instructions
   - Save your bot token

2. **Get Chat ID:**
   - Send a message to your bot
   - Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   - Find the `chat.id` value

3. **Configure Vercel:**
   - Go to your project settings on [Vercel](https://vercel.com)
   - Add Environment Variables:
     - `TELEGRAM_BOT_TOKEN` = your bot token
     - `TELEGRAM_CHAT_ID` = your chat ID

📖 **Detailed instructions:** See [TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)

## 🌐 Deploy to Vercel

### Option 1: GitHub Integration

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/webnova.git
git push -u origin main
```

Then import on [vercel.com/new](https://vercel.com/new)

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## 📁 Project Structure

```
webnova/
├── src/
│   ├── app/                # Next.js routes (App Router)
│   │   └── api/send-telegram/route.ts  # Telegram notification handler
│   ├── components/         # React components
│   ├── contexts/           # Language context
│   ├── hooks/              # Custom hooks
│   ├── views/              # Page views
│   └── lib/                # Utilities
└── vercel.json            # Vercel configuration
```

## 🎨 Customization

- **Colors:** Edit `src/index.css`
- **Translations:** Edit `src/contexts/LanguageContext.tsx`
- **Contact Info:** Edit `src/components/ContactSection.tsx` and `Footer.tsx`

## 🔐 Environment Variables

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```
