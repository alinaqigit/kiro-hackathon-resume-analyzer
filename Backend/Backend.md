# Express Quickstart

**Example Repository**

- [Express Quickstart Repo](https://github.com/clerk/clerk-express-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

Learn how to integrate Clerk into your Express backend for secure user authentication and management. This guide focuses on backend implementation and requires a [Clerk frontend SDK](https://clerk.com/docs.md#explore-by-frontend-framework) to function correctly.

1. ## Create a new Express app

   If you don't already have an Express app, run the following commands to [create a new one](https://expressjs.com/en/starter/installing.html).

   ```npm
   mkdir clerk-express
   cd clerk-express
   npm init -y
   npm install express
   ```
2. ## Install `@clerk/express`

   The [Clerk Express SDK](https://clerk.com/docs/reference/express/overview.md) provides a range of backend utilities to simplify user authentication and management in your application.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/express
   ```
3. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```sh {{ filename: '.env' }}
   CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```

   Node can load `.env` files natively. When running your app, use the `--env-file=.env` flag so environment variables can be accessed at import time.
4. ## Add `clerkMiddleware()` to your app

   The [`clerkMiddleware()`](https://clerk.com/docs/reference/express/clerk-middleware.md) function checks the request's cookies and headers for a session JWT and, if found, attaches the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} object to the `request` object under the `auth` key.

   ```ts {{ filename: 'index.ts', mark: [2, 7] }}
   import express from 'express'
   import { clerkMiddleware } from '@clerk/express'

   const app = express()
   const PORT = 3000

   app.use(clerkMiddleware())

   // Start the server and listen on the specified port
   app.listen(PORT, () => {
     console.log(`Example app listening at http://localhost:${PORT}`)
   })
   ```
5. ## Protect your routes using `requireAuth()`

   To protect your routes, use the [`requireAuth()`](https://clerk.com/docs/reference/express/require-auth.md) middleware. This middleware functions similarly to `clerkMiddleware()`, but also protects your routes by redirecting unauthenticated users to the sign-in page.

   In the following example, `requireAuth()` is used to protect the `/protected` route. If the user isn't authenticated, they're redirected to the homepage. If the user is authenticated, the [`getAuth()`](https://clerk.com/docs/reference/express/get-auth.md) function is used to get the `userId`, which is passed to [`clerkClient.users.getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} to fetch the current user's `User` object.

   ```ts {{ filename: 'index.ts' }}
   import express from 'express'
   import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'

   const app = express()
   const PORT = 3000

   app.use(clerkMiddleware())

   // Use requireAuth() to protect this route
   // If user isn't authenticated, requireAuth() will redirect back to the homepage
   app.get('/protected', requireAuth(), async (req, res) => {
     // Use `getAuth()` to get the user's `userId`
     const { userId } = getAuth(req)

     // Use the `getUser()` method to get the user's User object
     const user = await clerkClient.users.getUser(userId)

     return res.json({ user })
   })

   // Start the server and listen on the specified port
   app.listen(PORT, () => {
     console.log(`Example app listening at http://localhost:${PORT}`)
   })
   ```
6. ## Add global TypeScript type (optional)

   If you're using TypeScript, add a global type reference to your project to enable auto-completion and type checking for the `auth` object in Express request handlers.

   1. In your application's root folder, create a `types/` directory.
   2. Inside this directory, create a `globals.d.ts` file with the following code.

   ```ts {{ filename: 'types/globals.d.ts' }}
   /// <reference types="@clerk/express/env" />
   ```

## Next steps

Learn how to protect routes, handle authentication and authorization, and prepare your Clerk app for production using the following guides.

- [Protect routes using requireAuth()](https://clerk.com/docs/reference/express/require-auth.md): Learn how to protect specific routes from unauthenticated users.
- [Protect routes based on authorization status](https://clerk.com/docs/reference/express/get-auth.md): Learn how to protect a route based on both authentication and authorization status.
- [Deploy to production](https://clerk.com/docs/guides/development/deployment/production.md): Learn how to deploy your Clerk app to production.
- [Clerk Express SDK reference](https://clerk.com/docs/reference/express/overview.md): Learn about the Clerk Express SDK and how to integrate it into your app.
