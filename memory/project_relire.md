---
name: Project Relire
description: Stack, fonctionnalités V1, ordre de dev, état d'avancement
type: project
---

Letterboxd pour les livres. Concurrent à Goodreads / The Storygraph.

**Stack :** Next.js 16 (App Router) · TypeScript · Tailwind 4 · shadcn/ui · Supabase · Vercel · Google Books API

**Auth :** Google OAuth + Facebook OAuth + Email/Password via Supabase Auth

**Why:** Build propre feature par feature, design system à venir (wireframe d'abord)

**Base de données Supabase :** projet `qfxupcuekamjhrnitxjf` (région eu-west-2)
Tables : users · books · reading_entries · lists · list_books · follows
Champs notables : users.onboarding_completed · users.favorite_genres

**How to apply:** Toujours vérifier la cohérence avec le schéma Supabase avant d'écrire des actions ou requêtes.

**État d'avancement (2026-05-05) :**
- [x] Schéma Supabase + RLS + triggers
- [x] Projet Next.js initialisé (Next 16 + Tailwind 4 + shadcn)
- [x] lib/supabase (client + server), lib/google-books/client
- [x] middleware auth + onboarding redirect
- [x] types/database.ts
- [x] actions/auth.ts + actions/onboarding.ts
- [x] Pages : /login · /register · /onboarding/profile · /onboarding/genres · /onboarding/import
- [x] API routes : /api/auth/callback · /api/books/search
- [ ] .env.local à remplir (Supabase URL + anon key + Google Books API key)
- [ ] Google OAuth + Facebook OAuth configurés dans Supabase Dashboard
- [ ] Pages principales (feed, search, book detail, profile)
- [ ] Déploiement Vercel
