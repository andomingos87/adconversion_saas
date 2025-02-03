Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /home
- /template
- /projects
- /support
- /know-how

Page Implementations:
/home:
Core Purpose: Main landing page showcasing platform overview and key features
Key Components
- Hero section with dynamic content slider
- Featured projects grid
- Quick action cards
- Latest updates feed
- Newsletter subscription
Layout Structure
- Full-width hero section
- Two-column grid for features
- Three-column responsive card layout
- Single-column news feed

/template:
Core Purpose: Template library and customization interface
Key Components
- Template category filters
- Template preview cards
- Customization toolbar
- Save/Export functions
Layout Structure
- Sidebar filter panel (collapsible on mobile)
- Main content grid (3x3 on desktop, 2x2 on tablet, 1x1 on mobile)
- Bottom action bar

/projects:
Core Purpose: Central hub for users to manage their projects, create new ones, and explore associated videos.
Key Components: "Create New Project" CTA button
List of existing projects with thumbnail previews
Search and filter options for project management
Project detail view displaying associated videos
Video management actions (upload, edit, delete)
Layout Structure
Full-width header with project creation CTA
Two-column grid for project listing
Single-column detailed view when a project is selected
Responsive video grid within the project detail view

/support:
Core Purpose: Customer support and help center
Key Components
- Search bar
- FAQ accordion
- Support ticket system
- Live chat widget
- Knowledge base links
Layout Structure
- Central search bar
- Two-column layout (desktop)
- Single-column layout (mobile)
- Sticky help widget

/know-how:
Core Purpose: Educational resources and documentation
Key Components
- Category navigation
- Article cards
- Video tutorials
- Resource downloads
Layout Structure
- Left sidebar navigation
- Main content area
- Right sidebar for quick links
- Breadcrumb navigation

Layouts:
MainLayout:
Applicable routes
- All routes
Core components
- Header with navigation
- Footer
- Sidebar (where applicable)
- Content container
Responsive behavior
- Collapsible navigation on mobile
- Fluid container widths
- Stackable columns
- Dynamic spacing

ContentLayout
Applicable routes
- /template
- /projects
- /know-how
Core components
- Page header
- Content area
- Action bar
Responsive behavior
- Adjustable grid columns
- Collapsible panels
- Touch-friendly interactions

SupportLayout
Applicable routes
- /support
Core components
- Help center header
- Support tools container
- Contact options
Responsive behavior
- Vertical stacking on mobile
- Floating chat widget
- Expandable sections
</page-structure-prompt>