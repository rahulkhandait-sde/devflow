<div align="center">
    <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Google_AI-black?style=for-the-badge&logoColor=white&logo=google&color=4285F4" alt="google-ai" />
  </div>

  <h3 align="center">DevFlow - Developer Community Platform</h3>

   <div align="center">
     A community-driven platform for developers to ask questions, share knowledge, and grow together. Built with Next.js, MongoDB, and AI-powered features.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)

## <a name="introduction">Introduction</a>

DevFlow is a modern, full-stack developer community platform inspired by StackOverflow, enhanced with cutting-edge AI capabilities powered by **Google's Gemini AI**, gamification features, and personalized recommendations. Built using the latest Next.js features, this platform demonstrates advanced rendering strategies including SSG, ISR, SSR, PPR, Server Functions, Caching, and Revalidation to deliver a production-ready application.

The platform leverages MongoDB for robust data management, NextAuth (Auth.js) for versatile authentication (Email/Password, GitHub, Google), and features beautiful styling with TailwindCSS and ShadCN UI components. DevFlow empowers developers to ask questions, share knowledge, utilize AI-powered responses through Google's Gemini AI, engage through voting systems, organize content effectively, and discover opportunities—all while enjoying gamified elements like badges and community rewards.

## <a name="tech-stack">Tech Stack</a>

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **UI Components**: ShadCN UI, Radix UI
- **Authentication**: NextAuth (Auth.js)
- **Database**: MongoDB with Mongoose
- **AI Integration**: Google Gemini AI
- **Form Handling**: React Hook Form with Zod validation
- **Editor**: MDX Editor for rich text content
- **Deployment**: Vercel
- **Job API**: RapidAPI
- **Rich Text Editor**: TinyMCE

## <a name="features">Features</a>

### 🔐 **Authentication & User Management**

- Secure sign-in with NextAuth supporting Email/Password, Google, and GitHub
- User profiles with badges and engagement history
- Community browsing with search and filters

### 📝 **Question & Answer System**

- Rich question posting with MDX editor (light/dark modes)
- AI-powered answer generation using Google Gemini
- Advanced answer filtering (newest, most-voted) with pagination
- Comprehensive voting system for questions and answers

### 🎯 **Smart Features**

- Personalized recommendations on the home page
- Global search across questions, users, and tags
- Bookmark system for saving questions
- View counter for tracking question popularity

### 🏷️ **Content Organization**

- Tag-based question categorization
- Collections for organized saved content
- Tag pages with question counts and search

### 💼 **Job Discovery**

- Job finder with location-based filtering
- Search and filter capabilities for opportunities

### 🎮 **Gamification**

- Badge system for user achievements
- Community rewards and engagement tracking
- User statistics and progress visualization

### 📱 **User Experience**

- Fully responsive design (desktop, tablet, mobile)
- High-performance loading and smooth interactions
- Dark/light theme support
- Edit & delete functionality with proper authorization

## <a name="quick-start"> Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/rahulkhandait-sde/devflow.git
cd devflow
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Google AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# RapidAPI for Jobs
NEXT_PUBLIC_RAPID_API_KEY=your_rapid_api_key

# Authentication
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_GITHUB_ID=your_github_oauth_app_id
AUTH_GITHUB_SECRET=your_github_oauth_app_secret
AUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3001

# Rich Text Editor
NEXT_PUBLIC_TINY_EDITOR_API_KEY=your_tiny_editor_api_key

# Application URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

4. **Get Your API Keys**

- **MongoDB**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Google AI**: Get your API key from [Google AI Studio](https://aistudio.google.com/)
- **RapidAPI**: Sign up at [RapidAPI](https://rapidapi.com/) for job search functionality
- **Google OAuth**: Create credentials at [Google Cloud Console](https://console.cloud.google.com/)
- **GitHub OAuth**: Create an OAuth app in your [GitHub Settings](https://github.com/settings/developers)
- **TinyMCE**: Get your API key from [TinyMCE](https://www.tiny.cloud/)

5. **Run the Development Server**

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to view the project.

### Deployment Commands

```bash
# Build the project
npm run build

# Start production server
npm start

# Deploy with Vercel CLI
npx vercel --prod
```

## <a name="project-structure">🏗️ Project Structure</a>

```
devflow/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── cards/            # Card components
│   ├── forms/            # Form components
│   ├── navigation/       # Navigation components
│   └── ui/               # ShadCN UI components
├── database/             # MongoDB models and schemas
├── lib/                  # Utility functions and configurations
│   ├── actions/          # Server actions
│   └── validations.ts    # Zod schemas
├── constants/            # Application constants
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## <a name="contributing">🤝 Contributing</a>

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
