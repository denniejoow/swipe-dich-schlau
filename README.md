# 🌿 Swipe dich schlau!

> Gamified AI learning app — swipe cards, evolve creatures, beat bosses.

## ✨ Features
- 🃏 **AI-generated cards** via Groq (LLaMA 3.3 70B)
- 👆 **4-way swipe** — Right=Learned · Left=Repeat · Up=Challenge · Down=Skip  
- 🐉 **Creature evolution** — 3 phases (Baby→Teen→Adult)
- 👹 **Boss battles** — turn-based quiz combat
- 🛡️ **Shield system** — earn shields via challenges
- ⚠️ **Trance-Break** — 5 consecutive fails triggers review overlay
- 🌿 **Wood/nature UI** — dark brown panels, golden borders
- ☁️ **Cloud sync** — Supabase auth + PostgreSQL
- 🏆 **Global leaderboard**

## 🛠️ Tech Stack
| Layer | Tech |
|-------|------|
| Framework | Expo SDK 54 + expo-router v6 |
| Language | TypeScript |
| State | Zustand |
| AI | Groq API (llama-3.3-70b-versatile) |
| Backend | Supabase (PostgreSQL + Auth) |
| Gestures | React Native PanResponder |

## 🚀 Setup
```bash
git clone https://github.com/denniejoow/swipe-dich-schlau
cd swipe-dich-schlau
npm install

# Create .env file:
EXPO_PUBLIC_GROQ_API_KEY=your_groq_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

npx expo start --web
```

## 🗄️ Database
Run `supabase/schema.sql` in your Supabase SQL Editor.

---
Built with ❤️ and Claude AI
