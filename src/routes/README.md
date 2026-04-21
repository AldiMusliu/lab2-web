# Route organization

- Keep route files thin and focused on routing concerns.
- Put UI and business logic in `src/features/*`.
- Use folder-based index pages for primary routes (example: `routes/books/index.tsx`).
- Use nested folder indexes for auth pages (example: `routes/auth/login/index.tsx`).
- Prefix non-route helper files with `-` (example: `-route-map.ts`).
