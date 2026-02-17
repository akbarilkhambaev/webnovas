# WebNova - Digital Agency Landing Page

Modern landing page for a digital agency built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- ✨ Modern, animated UI with smooth scroll effects
- 🌐 Multilingual support (Russian/Uzbek)
- 📱 Fully responsive design
- 📬 Contact form with Telegram integration
- 💰 Interactive pricing calculator
- 🎨 Testimonials, FAQ, Tech Stack sections
- 🎯 Built with shadcn/ui components

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router DOM
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
├── api/                    # Vercel serverless functions
│   └── send-telegram.ts    # Telegram notification handler
├── src/
│   ├── components/         # React components
│   ├── contexts/          # Language context
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Route pages
│   └── lib/               # Utilities
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

---

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
