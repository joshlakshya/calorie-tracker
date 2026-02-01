# Lakshya - Calorie Tracker Web App

**Stick to Your Goal** 🎯

A modern, premium web-based calorie tracking application built with React, TypeScript, and Tailwind CSS. Lakshya helps you track your daily nutrition, set goals, and visualize your progress with a beautiful glassmorphism UI.

![Dashboard](https://raw.githubusercontent.com/joshlakshya/calorie-tracker/main/.github/screenshots/dashboard.png)

## ✨ Features

- 📊 **Dashboard** - Visual calorie progress ring and weekly trend charts
- 📝 **Food Diary** - Log meals by category (Breakfast, Lunch, Dinner, Snacks)
- 🍽️ **Custom Meals** - Save frequently eaten meals for quick logging
- 📈 **Weekly Analytics** - Track your calorie consumption over time
- ⚙️ **Goal Setting** - Customize daily calorie and macronutrient targets
- 💾 **Local Storage** - All data persists in your browser
- 🎨 **Premium UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/joshlakshya/calorie-tracker.git
cd calorie-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser Local Storage

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.tsx
│   ├── ProgressRing.tsx
│   └── MealCard.tsx
├── pages/           # Application pages
│   ├── Dashboard.tsx
│   ├── Diary.tsx
│   ├── AddMeal.tsx
│   ├── Meals.tsx
│   └── Profile.tsx
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (storage, calculations)
├── App.tsx          # Main app component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles and design system
```

## 🎨 Design System

- **Color Palette**: Purple-blue gradients with dark theme
- **Typography**: Inter font family
- **Effects**: Glassmorphism cards with backdrop blur
- **Animations**: Smooth transitions and micro-interactions

## 📱 Pages

### Dashboard
- Calorie progress visualization
- Macronutrient breakdown (Protein, Carbs, Fats)
- Quick stats (meals logged, weekly average)
- 7-day calorie trend chart

### Diary
- Date navigation
- Meal categorization
- Daily nutrition summary
- Quick meal logging

### Meals Library
- Saved custom meals
- Search functionality
- Quick add to diary

### Profile & Settings
- Daily goal configuration
- Macronutrient targets
- Unit preferences (Metric/Imperial)
- Theme settings

## 🔧 Configuration

### TypeScript
The project uses TypeScript with strict mode enabled. Key configurations:
- Module resolution: bundler
- JSX: react-jsx
- Target: ES2022

### Tailwind CSS
Using Tailwind CSS v4 with custom design tokens and glassmorphism utilities.

## 🐛 Troubleshooting

### Blank Page
If you see a blank page:
1. Clear browser cache (Cmd/Ctrl + Shift + R)
2. Ensure dev server is running
3. Check browser console for errors

### Development Server
Make sure you're in the correct directory:
```bash
cd calorie-tracker
npm run dev
```

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- Based on the OpenNutriTracker Flutter app
- Built with modern web technologies
- Designed with user experience in mind

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Repository**: https://github.com/joshlakshya/calorie-tracker
- **Issues**: https://github.com/joshlakshya/calorie-tracker/issues

---

Made with ❤️ by Lakshya Joshi
