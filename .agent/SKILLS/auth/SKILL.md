# 🔐 AUTH.JS (NEXTAUTH) – SKILL GUIDE

## 📌 Overview
Auth.js (formerly NextAuth.js) is the standard authentication solution for Next.js applications. It provides session management, authentication providers, and secure handling of user identity with minimal boilerplate.

---

## 🧱 Core Concepts

### 1. Authentication vs Authorization
- **Authentication** → Who the user is
- **Authorization** → What the user can do

---

### 2. Session Strategies

Auth.js supports two main session strategies:

#### 🧾 JWT (stateless)
- Default option
- Stored in cookies
- No database required

#### 🗄️ Database Sessions (stateful)
- Stores sessions in DB
- More control (revocation, tracking)

---

## ⚙️ Basic Implementation (App Router)

### 1. Install

```bash
npm install next-auth
```

---

### 2. Create auth config

```ts
// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate user
        if (!credentials?.email || !credentials?.password) return null

        const user = {
          id: "1",
          email: credentials.email,
          role: "user"
        }

        return user
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
})
```

---

### 3. Route handler

```ts
// app/api/auth/[...nextauth]/route.ts
export { handlers as GET, handlers as POST } from "@/auth"
```

---

### 4. Protect server components

```ts
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <div>Dashboard</div>
}
```

---

### 5. Client session access

```ts
"use client"

import { useSession } from "next-auth/react"

export function Profile() {
  const { data: session } = useSession()

  return <pre>{JSON.stringify(session)}</pre>
}
```

---

## 🔐 Security Best Practices

### ✅ Use HTTP-only cookies
- Prevent XSS attacks
- Never store tokens in localStorage

---

### ✅ Validate on the server
- Never trust client-side checks

---

### ✅ Hash passwords
Use bcrypt:

```ts
import bcrypt from "bcryptjs"

const isValid = await bcrypt.compare(password, hashedPassword)
```

---

### ✅ Use environment variables

```
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

### ✅ Enable CSRF protection
Handled automatically by Auth.js

---

## 🧠 Callbacks (Advanced Control)

### Add custom data to session

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role
    }
    return token
  },
  async session({ session, token }) {
    session.user.role = token.role
    return session
  }
}
```

---

## 🧑‍💻 Role-Based Access Control (RBAC)

### Example

```ts
const session = await auth()

if (session?.user.role !== "admin") {
  redirect("/unauthorized")
}
```

---

## 🧩 Middleware حماية rutas

```ts
// middleware.ts
import { NextResponse } from "next/server"

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token")

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
```

---

## 🚀 Providers

Auth.js supports multiple providers:

- Credentials
- Google
- GitHub
- Email (magic link)

---

## ⚠️ Common Mistakes

❌ Storing tokens in localStorage  
❌ Handling auth only in client  
❌ Not hashing passwords  
❌ Exposing secrets in frontend  

---

## 🧭 Recommended Architecture

```
/app
  /api/auth
  /dashboard
  /login
/lib
  auth.ts
```

---

## 🧪 Testing Checklist

- Login works
- Session persists
- Protected routes block access
- Roles enforced correctly
- Logout clears session

---

## 🏁 Summary

Auth.js provides:
- Secure authentication
- Flexible providers
- Server-first validation
- Easy integration with Next.js

Use JWT strategy for simplicity, and database sessions for scalability.

---

## 💡 AI Agent Guidelines

When implementing Auth.js:

1. Always prioritize server-side validation
2. Default to JWT unless DB sessions are required
3. Enforce role-based access early
4. Never expose sensitive data to client
5. Use middleware for global protection
6. Prefer App Router patterns over Pages Router

---

## Keywords
auth, auth.js, authentification, login

