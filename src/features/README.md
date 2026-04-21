# Feature organization

Each domain follows this shape:

- `components/` UI specific to the feature
- `api.queries.ts` read operations
- `api.mutation.ts` write operations
- `schemas.ts` zod schemas for forms and payloads
- `types.ts` domain types

Feature directories use kebab-case names where needed.
