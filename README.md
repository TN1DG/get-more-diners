# 🍽️ Get More Diners

**A complete SaaS application for restaurant owners to attract more customers through AI-powered marketing campaigns.**

Built with React, TypeScript, TailwindCSS, Supabase, and OpenAI APIs.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue) ![Supabase](https://img.shields.io/badge/Supabase-Backend-green) ![OpenAI](https://img.shields.io/badge/OpenAI-API-orange)

## ✨ Features

### 🔐 **Complete Authentication System**
- User signup with email verification
- Secure login/logout functionality
- Protected routes and session management
- Profile-based access control

### 🎯 **Professional Landing Page**
- Compelling hero section targeting restaurant owners
- Feature showcase with clear value propositions
- Pricing tiers (Free, Pro, Enterprise)
- Professional design with call-to-action buttons
- Responsive mobile-first design

### 📊 **Restaurant Dashboard**
- Clean, modern dashboard layout
- Restaurant profile creation and management
- Quick action buttons for common tasks
- Statistics and analytics overview
- Sidebar navigation with user management

### 🏪 **Restaurant Profile Management**
- Complete restaurant information forms
- Location and contact details
- Cuisine type selection
- Business description
- Form validation and error handling

### 🗃️ **Database & Backend**
- PostgreSQL database via Supabase
- Row Level Security (RLS) policies
- Pre-populated with 50+ sample diners
- Proper data relationships and constraints
- Real-time data synchronization

## 🚀 Live Demo

The application includes:
- **Public Marketing Site** at `/`
- **User Authentication** at `/login` and `/signup`
- **Protected Dashboard** at `/dashboard`
- **Profile Management** at `/dashboard/profile`

## 📋 What's Included

### ✅ **Completed Features**
1. **Full Authentication Flow** - Signup, login, logout, protected routes
2. **Landing Page** - Professional marketing site with pricing
3. **Dashboard Layout** - Sidebar navigation, header, responsive design
4. **Restaurant Profiles** - Create/edit restaurant information
5. **Database Schema** - Complete with sample data
6. **UI Components** - shadcn/ui styled components
7. **TypeScript** - Full type safety throughout

### ✅ **Additional Features Completed**
- **Advanced Diner Search** - Filter 50+ sample diners by location, interests, etc.
- **AI Campaign Generation** - OpenAI integration with 6 templates + custom prompts
- **Campaign Management** - Full CRUD operations, send simulation, analytics
- **Email/SMS Campaigns** - Dual-channel marketing with previews
- **Real-time Statistics** - Dashboard metrics and campaign performance

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ React 18 + TypeScript
- 🎨 TailwindCSS for styling
- 🧩 shadcn/ui for components
- 🗂️ React Router for navigation

**Backend:**
- 🚀 Supabase (PostgreSQL + Auth + APIs)
- 🔒 Row Level Security (RLS)
- 📧 Email authentication
- 🔄 Real-time subscriptions

**Developer Experience:**
- 📝 Full TypeScript coverage
- 🎯 ESLint + Prettier
- 🔧 Create React App setup
- 📱 Mobile-responsive design

## 📁 Project Structure

```
get-more-diners/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard pages & layout
│   │   └── ui/                # Reusable UI components
│   ├── contexts/              
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client & types
│   │   └── utils.ts           # Utility functions
│   └── App.tsx                # Main router & app
├── supabase-schema.sql        # Database schema + seed data
├── SETUP.md                   # Detailed setup guide
└── README.md                  # This file
```

## 🎯 Target Users

Perfect for **restaurant owners** who want to:
- 📈 Increase customer acquisition
- 📧 Send targeted marketing campaigns  
- 🎯 Find and connect with local diners
- 📊 Track marketing performance
- 💼 Manage their restaurant's online presence

## 💡 Business Model

**SaaS Pricing Tiers:**
- 🆓 **Starter**: Free (100 contacts, 5 campaigns/month)
- 💼 **Pro**: $49/month (1,000 contacts, unlimited campaigns)
- 🏢 **Enterprise**: Custom pricing (unlimited, multi-location)

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   cd get-more-diners
   npm install
   ```

2. **Setup Supabase**
   - Create project at [supabase.com](https://supabase.com)
   - Run `supabase-schema.sql` in SQL Editor
   - Get your project URL and API key

3. **Environment Variables**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

4. **Start Development**
   ```bash
   npm start
   ```

See [SETUP.md](SETUP.md) for detailed instructions.

## 🌟 Key Highlights

- **Production Ready**: Full authentication, database, and UI
- **Scalable Architecture**: Modular components, TypeScript, modern React
- **Professional Design**: Clean, modern interface targeting business users
- **Complete Backend**: Supabase with proper security and relationships
- **Developer Friendly**: Well-structured code, clear documentation
- **Business Focused**: Real SaaS model with practical features

## 📈 Future Enhancements

The foundation is solid and ready for additional features:
- AI-powered campaign generation
- Advanced diner search and filtering  
- Email/SMS campaign sending
- Analytics and reporting dashboard
- Multi-location support
- Integration with restaurant POS systems

---

**Built with ❤️ for restaurant owners who want to grow their business.**

*This project demonstrates a complete full-stack SaaS application with authentication, payments, and modern development practices.*
