# LinkLens 🔗✨

**A modern, intelligent URL shortening service with AI-powered security scanning and comprehensive admin management.**

LinkLens is a full-stack Next.js application that provides URL shortening services with built-in security features. It leverages Google's Gemini AI to automatically scan and flag suspicious links, ensuring user safety while providing a seamless link management experience.

## 🚀 Features

### User Features
- **URL Shortening**: Convert long URLs into short, shareable links
- **QR Code Generation**: Generate QR codes for shortened URLs
- **AI Security Scanning**: Automatic link analysis using Google Gemini API
- **Link Management**: View and manage your shortened links
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Optimized for desktop and mobile devices

### Admin Features
- **Admin Dashboard**: Comprehensive overview of all system URLs
- **User Management**: Monitor and manage user accounts
- **Flagged URL Management**: Review and handle AI-flagged suspicious links
- **Database Seeding**: Development tools for populating test data
- **Analytics & Monitoring**: Track link usage and security metrics

### Security Features
- **AI-Powered Scanning**: Automatic detection of malicious or suspicious URLs
- **Link Flagging System**: Mark and review potentially dangerous links
- **Secure Authentication**: JWT-based authentication with Next-Auth
- **Input Validation**: Comprehensive validation using Zod schemas

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and optimizations
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern, accessible UI components

### Backend
- **Next.js Server Actions** - Server-side logic and API routes
- **Next-Auth** - Authentication and session management
- **JWT Strategy** - Secure token-based authentication

### Database & ORM
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Type-safe database operations

### AI & Validation
- **Google Gemini API** - AI-powered link analysis and security scanning
- **Zod** - Runtime type validation and schema parsing

### Deployment
- **Vercel Ready** - Optimized for seamless Vercel deployment

## 📋 Prerequisites

Before running LinkLens, ensure you have:

- Node.js 18+ installed
- PostgreSQL database setup
- Google Gemini API key
- Environment variables configured

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Hassam-Ata/linklens.git
cd linklens
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=

# NextAuth
AUTH_SECRET=

## When using github OAuth
GITHUB_CLIENT_ID="your github client_id"
GITHUB_CLIENT_SECRET="your github client secret"
## When using google OAuth
GOOGLE_CLIENT_ID="your google client_id"
GOOGLE_CLIENT_SECRET="your google client secret"


# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate database migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (development only)
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see LinkLens in action!

## 📁 Project Structure

```
linklens/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (admin)/          # Admin panel routes
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (user)/           # User dashboard & redirects
│   │   └── api/              # API routes
│   ├── components/           # UI Components
│   │   ├── admin/            # Admin-specific components
│   │   ├── auth/             # Auth forms
│   │   ├── ui/               # Shadcn UI components
│   │   └── urls/             # URL management components
│   ├── lib/                  # Utilities & configurations
│   └── server/               # Server-side logic
│       ├── actions/          # Server actions
│       ├── auth.ts           # NextAuth configuration
│       └── db/               # Database schema & connection
├── drizzle/                  # Database migrations
└── public/                   # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx drizzle-kit generate  #Generate migrations:
npx drizzle-kit migrate   #Apply migrations


# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**: 
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **Configure Environment Variables**:
   Add all environment variables from `.env` to Vercel's environment settings

4. **Database Setup**:
   - Set up PostgreSQL database (Vercel Postgres, Supabase, or similar)
   - Update `DATABASE_URL` in Vercel environment variables

5. **Deploy**: Vercel will automatically deploy your application

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔐 Authentication

LinkLens uses Next-Auth with JWT strategy for secure authentication:

- # User Registration
  Create new accounts with email/password
- # User Login
  Secure login with session management
- # Admin Access
  Special admin roles for management features
- # Session Persistence
  Automatic session handling and refresh

## 🤖 AI Integration

### Gemini API Integration
LinkLens leverages Google's Gemini AI for:

- **URL Analysis**: Automatic scanning of submitted URLs
- **Threat Detection**: Identification of malicious or suspicious content
- **Security Scoring**: Risk assessment and flagging system
- **Content Classification**: Categorization of link types and purposes

### Security Workflow
1. User submits URL for shortening
2. Gemini AI analyzes the target URL
3. AI determines safety score and potential threats
4. Suspicious URLs are automatically flagged
5. Admin can review and manage flagged content

## 📊 Database Schema

### Core Tables
- **Users**: User accounts and authentication data
- **URLs**: Shortened URLs and metadata
- **Analytics**: Click tracking and usage statistics
- **Flags**: AI-generated security flags and admin reviews

### Relationships
- Users have many URLs
- URLs have many Analytics entries
- URLs can have security Flags

## 🛡️ Security Features

- **Input Validation**: All inputs validated with Zod schemas
- **AI Scanning**: Automatic threat detection with Gemini AI
- **Secure Authentication**: JWT-based auth with Next-Auth
- **SQL Injection Protection**: Drizzle ORM prevents SQL injection
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

## 📈 Performance Optimizations

- **Server-Side Rendering**: Next.js SSR for optimal performance
- **Code Splitting**: Automatic code splitting and lazy loading
- **Image Optimization**: Next.js Image component optimization
- **Caching**: Intelligent caching strategies for database queries
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🤝 Contributing

We welcome contributions to LinkLens! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support & Issues

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

### Common Issues
- **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
- **Gemini API**: Verify your API key is valid and has sufficient quota
- **Build Errors**: Clear node_modules and reinstall dependencies

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Google** - For Gemini AI API
- **Shadcn** - For the beautiful UI component library
- **Drizzle Team** - For the excellent ORM solution

## 📞 Contact

- **Project Repository**: [https://github.com/yourusername/linklens](https://github.com/Hassam-Ata/linklens)
- **Issues & Bugs**: [GitHub Issues](https://github.com/Hassam-Ata/linklens/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/Hassam-Ata/linklens/discussions)

---

**Made with ❤️ using Next.js and AI** | LinkLens © 2024
