# 💰 SmartFinance AI

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.76.9-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Expo-52.0-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>A modern, AI-powered personal finance management app</strong>
</p>

---

## ✨ Overview

**SmartFinance AI** is a cutting-edge personal finance application that combines the power of artificial intelligence with beautiful, intuitive design. Built with React Native and TypeScript, it helps users take control of their finances through intelligent insights, automated categorization, and interactive visualizations.

### 🎯 Key Features

- 🤖 **AI-Powered Insights** - Automatic transaction categorization using OpenAI GPT
- 📊 **Interactive Analytics** - Beautiful charts with Victory Native and smooth Reanimated animations
- 💰 **Smart Budgeting** - Track spending, set budgets, and achieve financial goals
- 📈 **Portfolio Tracking** - Monitor cryptocurrency and stock investments in real-time
- 🌙 **Dark Mode** - Elegant light and dark themes
- ⚡ **Offline First** - Works seamlessly without internet using MMKV storage
- 🔒 **Secure** - Encrypted storage for sensitive financial data
- 🎨 **Modern UI** - Clean, minimal design using Tailwind CSS (NativeWind)

---

## 🚀 Getting Started

### Prerequisites

- Node.js ^18.18.0 or >=20.0.0
- npm or yarn
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/priyanshusaini105/smart-finance.git
cd smart-finance

# Install dependencies
npm install

# Start the development server
npm run start
```

### Running on Devices

#### iOS
```bash
npm run build:ios:sim    # Build for iOS simulator
npm run build:ios:dev    # Build for iOS device
npm run ios              # Run on iOS
```

#### Android
```bash
npm run build:android:sim    # Build for Android emulator
npm run build:android:dev    # Build for Android device
npm run android              # Run on Android
```

#### Web
```bash
npm run web              # Run on web browser
```

---

## 📱 Features in Detail

### 🤖 AI-Powered Intelligence

- **Smart Categorization**: Automatically categorize transactions using OpenAI's GPT models
- **Spending Insights**: Get personalized insights like "You're spending 18% more on dining this month"
- **Budget Predictions**: Forecast monthly spending and predict budget overruns
- **Savings Suggestions**: Receive AI-generated recommendations to optimize your finances

### 📊 Interactive Analytics

- **Dynamic Charts**: Beautiful, animated visualizations using Victory Native
- **Multiple Views**: Daily, weekly, and monthly spending breakdowns
- **Category Analysis**: Understand where your money goes with pie and bar charts
- **Trend Tracking**: Line charts showing spending patterns over time
- **Smooth Animations**: 60fps animations powered by Reanimated 3

### 💼 Financial Management

- **Transaction Tracking**: Quick entry with smart categorization
- **Budget Management**: Set monthly budgets per category with visual progress indicators
- **Goal Setting**: Create savings goals and track progress with milestone notifications
- **Portfolio Tracking**: Monitor cryptocurrency and stock investments with real-time prices

### 🔐 Privacy & Security

- **Offline First**: All data stored locally using ultra-fast MMKV
- **Encrypted Storage**: Sensitive data secured with Expo SecureStore
- **No Tracking**: Your financial data stays on your device
- **Data Control**: Export or delete your data anytime

---

## 🏗️ Tech Stack

### Core Technologies
- **React Native 0.76.9** - Cross-platform mobile framework
- **TypeScript 5.3.3** - Type-safe development
- **Expo SDK 52** - Development tools and services

### UI & Styling
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated 3** - Smooth, performant animations
- **Victory Native** - Beautiful, composable charts

### State & Data
- **Zustand** - Lightweight state management
- **MMKV** - Fast, encrypted local storage
- **Expo SecureStore** - Secure credential storage

### AI & APIs
- **OpenAI API** - GPT-based transaction insights
- **CoinGecko API** - Cryptocurrency market data
- **Apisauce** - HTTP client with response transformation

### Development
- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing
- **ESLint + Prettier** - Code quality and formatting
- **Reactotron** - Debugging and state inspection

---

## 📁 Project Structure

```
smart-finance/
├── app/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── stores/           # Zustand state stores
│   ├── services/         # API integrations (AI, market data)
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── navigators/       # Navigation configuration
│   ├── theme/            # Colors, typography, spacing
│   └── utils/            # Helper functions
├── assets/
│   ├── icons/            # App icons and category icons
│   └── images/           # Images and graphics
├── test/                 # Test files
├── docs/                 # Documentation
│   ├── context.md        # Project background and goals
│   ├── plan.md           # Development roadmap
│   └── checklist.md      # Feature completion tracker
└── ...config files
```

---

## 🎨 Design Philosophy

SmartFinance AI follows modern fintech design principles inspired by industry leaders like Revolut, Robinhood, and Notion:

- **Minimalism**: Clean, uncluttered interfaces focusing on essential information
- **Hierarchy**: Clear visual hierarchy guiding users through information
- **Consistency**: Uniform spacing, typography, and interaction patterns
- **Fluidity**: Smooth animations and transitions throughout the app
- **Accessibility**: High contrast, readable fonts, intuitive navigation

### Color Palette
- **Primary**: Financial blue/indigo for trust and professionalism
- **Success**: Green for positive numbers and achievements
- **Warning**: Amber for approaching budget limits
- **Danger**: Red for overspending and alerts
- **Dark Mode**: Deep blacks with subtle highlights

---

## 🧪 Testing

Run the test suite:

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

---

## 📖 Documentation

- [Project Context](./docs/context.md) - Background, goals, and technical foundation
- [Development Plan](./docs/plan.md) - Detailed roadmap and Git workflow
- [Feature Checklist](./docs/checklist.md) - Progress tracking

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all tests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Ignite CLI](https://github.com/infinitered/ignite) by Infinite Red
- UI inspired by modern fintech apps
- Powered by OpenAI's GPT models
- Market data from CoinGecko

---

## 📧 Contact

**Priyanshu Saini**
- GitHub: [@priyanshusaini105](https://github.com/priyanshusaini105)
- Project Link: [https://github.com/priyanshusaini105/smart-finance](https://github.com/priyanshusaini105/smart-finance)

---

<p align="center">
  <strong>Made with ❤️ and AI</strong>
</p>

**icons**
This is where your icon assets will live. These icons can be used for buttons, navigation elements, or any other UI components. The recommended format for icons is PNG, but other formats can be used as well.

Ignite comes with a built-in `Icon` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Icon.md).

**images**
This is where your images will live, such as background images, logos, or any other graphics. You can use various formats such as PNG, JPEG, or GIF for your images.

Another valuable built-in component within Ignite is the `AutoImage` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md).

How to use your `icon` or `image` assets:

```typescript
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <Image source={require('../assets/images/my_image.png')} />
  );
};
```

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe.

## Next Steps

### Ignite Cookbook

[Ignite Cookbook](https://ignitecookbook.com/) is an easy way for developers to browse and share code snippets (or “recipes”) that actually work.

### Upgrade Ignite boilerplate

Read our [Upgrade Guide](https://ignitecookbook.com/docs/recipes/UpdatingIgnite) to learn how to upgrade your Ignite project.

## Community

⭐️ Help us out by [starring on GitHub](https://github.com/infinitered/ignite), filing bug reports in [issues](https://github.com/infinitered/ignite/issues) or [ask questions](https://github.com/infinitered/ignite/discussions).

💬 Join us on [Slack](https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA) to discuss.

📰 Make our Editor-in-chief happy by [reading the React Native Newsletter](https://reactnativenewsletter.com/).
