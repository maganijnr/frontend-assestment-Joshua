# Proc360 — Frontend Developer Test

A test project for the **Proc360** frontend developer role, built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <repo-url> proc360-test && cd proc360-test

# 2. Install dependencies
bun install

# 3. Start the dev server
bun dev
```

---

## 🏗 Architecture & Design Patterns

This project follows a structured, modular architecture tailored to create a scalable and maintainable Next.js application.

### 1. Components (Atomic Design Pattern)

Our UI components are organized intuitively inside the `components` folder using the **Atomic Design** philosophy.

- **`atoms/`** (e.g., `button.tsx`, `input.tsx`): The foundational building blocks of the UI.
- **`molecules/`** (e.g., `card.tsx`, `search-bar.tsx`): Simple groups of UI elements functioning together as a unit.
- **`organisms/`** (e.g., `header.tsx`, `product-list.tsx`): Complex UI sections built by combining atoms and molecules.
  **Why this pattern?** It promotes exceptional reusability, predictability, and consistent visual language across the app.

### 2. Hooks (Data Fetching with React Query)

Custom hooks such as `use-products-api.tsx` encapsulate all server state management.
**Why this pattern?** I leverage `@tanstack/react-query` to decouple server data fetching from UI logic. It gives us out-of-the-box caching, background refetching, request deduplication, and loading/error states, vastly enhancing performance and user experience over raw `useEffect` approaches.

### 3. Lib (API Abstractions & Utilities)

The `lib/` directory contains our core API interactions (`api.client.ts`, `axios.instance.ts`), global definitions (`types.ts`), and helper functions (`utils.ts`).
**Why this pattern?** By abstracting network requests via a centralized `axios` instance and custom client methods, I ensure a single source of truth for endpoints, easy injection of interceptors (e.g. for auth tokens), and strict TypeScript typing for API responses.

### 4. Providers (Next.js Client Boundaries)

The `providers/` directory groups essential React context wrappers (like `react-query-provider.tsx`).
**Why this pattern?** Next.js App Router heavily leans on Server Components. Putting providers in their own client-side modules allows us to keep our `layout.tsx` clean and ensure contexts are correctly instantiated at the client boundary.

### 5. Store (Client State with Zustand)

Our application state, spanning global features like the Shopping Cart, is managed in `store/app-store.ts` using **Zustand**.
**Why this pattern?** Zustand is used for its minimalist, boilerplate-free API compared to Redux or Context API. I utilized its `persist` middleware to instantly save and hydrate user cart data utilizing `localStorage`, ensuring the state naturally survives page reloads with minimal code.

---

## ⚡ Performance Optimizations

To ensure the application runs incredibly fast and delivers a seamless User Experience, several Next.js and library-level performance optimizations Ire applied:

1. **Automatic Image Optimization (`next/image`)**
   - **Where**: `components/molecules/card.tsx`, `components/organisms/product-list.tsx`
   - **What & Why**: Instead of standard `<img>` tags, `next/image` is used with `sizes` enabled. This automatically serves correctly sized images in modern formats (like IbP/AVIF), preventing large payload bottlenecks. Priority loading (`priority={index < 4}`) was added to the first 4 "above the fold" products to directly mitigate Largest Contentful Paint (LCP) delays. I also implement an `onError` image fallback so broken images don’t degrade the UI.

2. **Code Splitting & Lazy Loading (`next/dynamic`)**
   - **Where**: `app/dashboard/page.tsx`
   - **What & Why**: Loaded non-critical UI elements like `FilterSheet` dynamically using `next/dynamic`. This reduces the initial JavaScript bundle sent to the client, greatly reducing Total Blocking Time (TBT) and improving INP metrics since the main thread unblocks faster.

3. **Preconnect Optimization (`<link rel="preconnect">`)**
   - **Where**: `app/layout.tsx`
   - **What & Why**: To preemptively establish DNS lookup and SSL handshakes for external CDNs (like `cdn.dummyjson.com`), an explicit preconnect link tag was placed in the global layout header. This speeds up the loading of all product images over the network.

4. **Route Prefetching (`next/link`)**
   - **Where**: `components/molecules/card.tsx`
   - **What & Why**: For internal navigation (like opening a product page), I use Next.js's `<Link>` wrapper. It automatically prefetches the linked routes in the background when the link enters the viewport. As a result, page transitions feel instantaneous.

5. **Font Optimization (Zero Layout Shift)**
   - **Where**: `app/layout.tsx`
   - **What & Why**: The application imports the `Poppins` font via `next/font/google` using `display: "swap"`. Next.js hosts the font self-contained at build time rather than making external network requests to Google. This drastically reduces the time to first paint and completely removes Cumulative Layout Shift (CLS) when fonts finally load.

6. **Intelligent Network Catching & Deduplication**
   - **Where**: `hooks/use-products-api.tsx`
   - **What & Why**: I heavily optimized `@tanstack/react-query` settings by explicitly declaring `refetchOnWindowFocus: false` and `refetchOnMount: false` for certain high-frequency endpoints (e.g. searching products). This prevents redundant API hit spam when users switch browser tabs or remount components.

7. **Client Caching via Local Storage**
   - **Where**: `store/app-store.ts`
   - **What & Why**: I utilize Zustand’s `persist` middleware. This syncs the Shopping Cart state offline in `localStorage` in real-time. It completely bypasses the need to initialize server data for cart persistence on hard refreshes, granting users an uninterrupted session.

> **Note on Local Performance Testing:** During local Lighthouse capability checks, I noticed a significant drop in scores due to Chrome Extension background interference. The raw application performance sits much higher when measured in absolute isolation (Incognito browser). Given more time, I would isolate and document which exact Chrome extension heuristics drop the lighthouse scores artificially.
