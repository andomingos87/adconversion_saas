Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

Set up the frontend according to the following prompt:
<frontend-prompt>
Create detailed components with these requirements:
1. Use 'use client' directive for client-side components
2. Make sure to concatenate strings correctly using backslash
3. Style with Tailwind CSS utility classes for responsive design
4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
7. Create root layout.tsx page that wraps necessary navigation items to all pages
8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
9. Accurately implement necessary grid layouts
10. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping

<summary_title>
Video Ad Creation Dashboard with Trending Content Display
</summary_title>

<image_analysis>

1. Navigation Elements:
- Left sidebar with: Home, Template, Projects, Support, Know-How
- Top-right: Help icon, Generate New Ad button, Profile avatar
- Secondary navigation through stats cards


2. Layout Components:
- Header: 60px height, full width
- Sidebar: 240px width, full height
- Main content: Fluid width (calc(100% - 240px))
- Stats cards: 3-column grid, equal width
- Video grid: 4-column layout for trending content


3. Content Sections:
- Stats Overview (Credits, Videos, Average Ads)
- Trending Ads section with video thumbnails
- Recent Creations section (empty state shown)
- Progress bar showing 0/40 credits used


4. Interactive Controls:
- "Generate New Ad" primary button
- "Replicate" buttons on video cards
- Video thumbnail play buttons
- Upgrade Plan CTA button
- Sign Out option in sidebar


5. Colors:
- Primary Blue: #1652F0 (buttons, links)
- White: #FFFFFF (background)
- Gray: #F7F8FA (cards background)
- Text Dark: #1E2329
- Border: #E6E8EA


6. Grid/Layout Structure:
- Main container: 1440px max-width
- Card grid: 24px gap
- Video grid: 16px gap
- Responsive breakpoints at 1200px, 992px, 768px
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── StatsGrid
│   ├── features/
│   │   ├── VideoCard
│   │   ├── StatsCard
│   │   └── AdGenerator
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- Video generation system
- Credit management
- Video replication
- Stats tracking
- Content recommendation


3. State Management:
```typescript
interface AppState {
├── user: {
│   ├── credits: number
│   ├── videosCreated: number
│   ├── weeklyAverage: number
│   └── profile: UserProfile
├── videos: {
│   ├── trending: Video[]
│   ├── recent: Video[]
│   └── loading: boolean
├── }
}
```


4. Routes:
```typescript
const routes = [
├── '/',
├── '/templates/*',
├── '/projects/*',
├── '/support',
└── '/know-how/*'
]
```


5. Component Architecture:
- AppLayout (wrapper)
- NavigationBar
- StatsDisplay
- VideoGrid
- AdGenerator
- ReplicationSystem


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'xl': 1440px,
├── 'lg': 1200px,
├── 'md': 992px,
└── 'sm': 768px
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.