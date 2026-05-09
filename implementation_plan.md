# Implementation Plan - POS ATK PrintShop

Building a comprehensive Web Point of Sale (POS) system for an ATK & Printing shop as outlined in [Plan.md](file:///c:/Users/Administrator/Desktop/Duwik/Plan.md).

## User Review Required

> [!IMPORTANT]
> **Supabase Configuration**: This application requires a Supabase project. I will set up the local code, but you will need to:
> 1. Create a project at [supabase.com](https://supabase.com).
> 2. Execute the SQL schema provided in `Plan.md` in your Supabase SQL Editor.
> 3. Provide the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the `.env.local` file.

> [!NOTE]
> I will use **Next.js 14+ (App Router)**, **Tailwind CSS**, and **Zustand** for state management as requested. I will also incorporate **framer-motion** for premium animations and **lucide-react** for icons.

## Proposed Changes

### Phase 1: Project Initialization & Structure
- [NEW] Initialize Next.js project in the current directory.
- [NEW] Install dependencies: `@supabase/supabase-js`, `zustand`, `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`.
- [NEW] Setup directory structure as per [Plan.md](file:///c:/Users/Administrator/Desktop/Duwik/Plan.md#L113-L148).
- [NEW] Configure Supabase client in `src/lib/supabase.ts`.

### Phase 2: Design System & Shared Components
- [NEW] `src/app/globals.css`: Define a premium color palette (Indigo/Violet/Slate) with glassmorphism effects.
- [NEW] `src/components/common/Navbar.tsx`: Responsive navigation.
- [NEW] UI Components: Custom buttons, inputs, and cards following the "premium" aesthetic.

### Phase 3: POS Interface (The Core)
- [NEW] `src/app/pos/page.tsx`: The main POS layout.
- [NEW] `src/components/pos/ProductCard.tsx`: Visual display for items.
- [NEW] `src/components/pos/Cart.tsx`: Interactive cart with quantity adjustment.
- [NEW] `src/components/pos/CategoryFilter.tsx`: Tabbed filtering for ATK vs Printing services.
- [NEW] `src/store/useCartStore.ts`: Zustand store for cart state.

### Phase 4: Admin Dashboard & Product Management
- [NEW] `src/app/admin/dashboard/page.tsx`: Overview with summary cards and charts.
- [NEW] `src/app/admin/products/page.tsx`: CRUD interface for inventory.
- [NEW] `src/components/admin/ProductTable.tsx`: Data table for managing items.

### Phase 5: Authentication
- [NEW] `src/app/login/page.tsx`: Sleek login screen.
- [NEW] Middleware for route protection (if session exists).

### Phase 6: Final Polish & Animations
- [NEW] Add transitions between pages.
- [NEW] Empty state illustrations.

## Verification Plan

### Automated Tests
- I will use the `browser_subagent` to verify the UI layout and responsiveness once the dev server is running.
- Verify that components render correctly without hydration errors.

### Manual Verification
- User to test the actual checkout flow and Supabase integration once environment variables are set.
