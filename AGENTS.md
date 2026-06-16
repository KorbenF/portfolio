<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Universal Rules

### Security
- Never put API keys, passwords or secrets in frontend code
- Always use .env.local for secrets and add it to .gitignore
- Validate all user inputs server-side, never trust frontend only
- Enable RLS on all database tables
- Add security headers to next.config.ts
- Rate limit all forms and API routes
- Add honeypot to all contact forms

### SEO
- Unique meta title and description on every page
- Exactly one H1 per page
- Semantic HTML5 tags — nav, header, main, footer, section, article
- Alt text on every image
- sitemap.ts and robots.ts in every project
- Canonical URLs on every page

### Performance
- Always use next/image with lazy loading
- Convert images to WebP
- Lazy load heavy components
- Minimize bundle size

### Accessibility
- Proper heading hierarchy H1 → H2 → H3
- Keyboard navigable
- Sufficient color contrast
- ARIA labels where needed

### Code quality
- TypeScript strict mode, no any types
- Meaningful variable and function names
- Small focused components
- Comments for complex logic
- No console.log in production

### Forms
- Server-side validation always
- Rate limiting on submissions
- Honeypot field for bots
- Clear success and error states

### Git
- Commit after every working feature
- Meaningful commit messages in english
- Never commit .env.local

### GDPR
- Cookie consent before Analytics loads
- Privacy policy page on every client site
- Never store unnecessary user data

### UI/UX Pro Max Skill
- **Search Command:** `npx uipro-cli search "<query>" --domain <domain>`
- **Available Domains:** `product`, `style`, `typography`, `color`, `landing`, `chart`, `ux`
- **Supported Stacks:** `html-tailwind`, `react`, `nextjs` (use Next.js specific rules when generating components)
- **Usage:** Analyze user requests for UI/UX elements, use the skill to fetch recommended styles, colors, and fonts, and apply them dynamically.
