# The Passing Wind

A decentralized, anonymous storytelling platform designed for survivors, witnesses, and allies. Users can release their "truths to the wind" anonymously, and others can witness or respond to these stories.

## Features

- **Anonymous Storytelling**: Submit stories without account creation or tracking.
- **Comment System**: Respond to stories anonymously.
- **Smooth Interaction**: Powered by Lenis for ultra-smooth scrolling.
- **Global Reach**: Multi-language support (English & Chinese).
- **Admin Dashboard**: Verification via Google Auth for designated admin emails.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Firebase (Firestore & Google Auth)
- **Animation**: Motion (formerly Framer Motion)
- **Scroll Engine**: Lenis

## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/the-passing-wind/web
cd web
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`) and fill in your Firebase credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DATABASE_ID="(default)" # Or your specific database ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"

# Application Config
NEXT_PUBLIC_ADMIN_EMAIL="your-admin-email@gmail.com"
```

### 3. Firebase Setup

1. **Authentication**: Enable **Google Sign-In** in the Firebase Console under Authentication > Sign-in method.
2. **Firestore**: Create a Firestore database.
3. **Security Rules**: Copy the content of `firestore.rules` from this repository into the Firebase Console's Rules tab. **Note**: Update the `isAdmin()` function in the rules with your actual admin email if you're not using the environment variable logic directly in the rules (since Firestore Rules cannot read client-side environment variables).

   ```javascript
   function isAdmin() {
     return isEmailVerified() && request.auth.token.email == "YOUR_ADMIN_EMAIL_HERE";
   }
   ```

### 4. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deployment

This project is ready to be deployed on **Vercel**, **Cloud Run**, or any other Node.js hosting platform.

When deploying, make sure to add all the environment variables listed in `.env.example` to your deployment's configuration panel.

## Security & Privacy

This application is built with anonymity at its core. No user data is collected beyond what is explicitly submitted in the story and comment forms. Admin access is strictly controlled via Firestore Security Rules.
