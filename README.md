# MockPulse

Full-stack API mocking studio with Vite, React, TypeScript, Tailwind CSS v4 and Vercel Serverless Functions.

## Local development
`npm install && npm run dev`

Use `npx vercel dev` for serverless API locally. Vite-only mode uses localStorage and a simulated playground fallback.

## Deploy
Import this repository into Vercel. Build command: `npm run build`; output directory: `dist`. No environment variables required.

## API
- GET /api/mocks — list routes
- POST /api/mocks — create route
- PUT /api/mocks — replace collection
- DELETE /api/mocks?id=route-id — delete one; without id clears all
- GET|POST|PUT|PATCH|DELETE /api/mock/api/v1/... — execute a mock

**Note:** The route registry is in-memory per serverless instance and can reset across cold starts or instances. Use persistent KV/database storage for shared production state.