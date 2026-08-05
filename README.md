# Device Hub Frontend (UI & Logic)

Welcome to the frontend application for **Device Hub**, a premium mobile-first internal enterprise web application where employees can scan QR codes, search devices, check out/return hardware, reserve devices, and manage waitlists.

---

## Technical Stack

*   **Core:** React 19 (Functional Components & Hooks)
*   **Build Tool:** Vite + Javascript (ESM)
*   **Styling:** Tailwind CSS v4 (configured via `@theme` variables inside `index.css`)
*   **Icons:** Lucide React
*   **Routing:** React Router DOM (Browser Routing & Guards)
*   **State Management:** React Context API (In-Memory global state)
*   **Toasts:** Sonner (Dark theme notifications)

---

## Complete Project Folder Structure

Here is the exact structure of the `src/` directory, outlining what each directory and file does:

```text
src/
├── components/                 # Reusable React components
│   ├── checkout/               # Checkout and Reservation workflows
│   │   ├── CheckoutList.jsx    # Component listing active checkouts & reservations
│   │   ├── CheckoutListItem.jsx# Rental detail list item row with Actions (Extend/Return/Cancel)
│   │   ├── ExtendDialog.jsx    # Modal dialog to choose extension duration (30m, 1h, 2h, 4h)
│   │   └── ReturnDialog.jsx    # Modal dialog verifying returning devices
│   ├── common/                 # Global business components
│   │   ├── EmptyState.jsx      # Beautiful default empty state card with CTA buttons
│   │   ├── ItemCard.jsx        # Shared layout container with built-in hover responses
│   │   ├── LoadingState.jsx    # Grid loaders containing list skeletons
│   │   ├── PageHeader.jsx      # Raycast/Linear style headers with optional title & details
│   │   └── StatusBadge.jsx     # Visual indicator formatting the 11 statuses
│   ├── device/                 # Device-specific visual elements
│   │   ├── DeviceCard.jsx      # Details specification grid card
│   │   ├── DeviceFilter.jsx    # Scrollable category & status pill selector tabs
│   │   ├── DeviceImage.jsx     # Glassmorphic category gradient rendering graphics
│   │   ├── DeviceList.jsx      # Device list mapping with loading & empty indicators
│   │   ├── DeviceListItem.jsx  # Compact list view of a device row
│   │   └── SearchBar.jsx       # Standardized search input with Lucide Search icon
│   ├── layout/                 # Layout framing building blocks
│   │   ├── BottomNavigation.jsx# Persistent navigation menu tabs (Scan, Search, Checkouts, Waitlist)
│   │   ├── Header.jsx          # Top logo navbar showing links to user Profile
│   │   └── MainContainer.jsx   # Responsive content page frame centering content
│   └── ui/                     # Primitive presentation elements (No business logic)
│       ├── Badge.jsx           # Low-level pill element
│       ├── Button.jsx          # Customizable click buttons
│       ├── Card.jsx            # Structuring panels (Header, Content, Footer)
│       ├── Input.jsx           # Text inputs with focus highlighting
│       ├── Label.jsx           # UPPERCASE uppercase text tags
│       ├── Skeleton.jsx        # Pulsing loader frames
│       ├── Checkoutlistitem.jsx# Wrapper re-exporting from components/checkout/
│       ├── Devicelist.jsx      # Wrapper re-exporting from components/device/
│       ├── Devicelistitem.jsx  # Wrapper re-exporting from components/device/
│       ├── EmptyState.jsx      # Wrapper re-exporting from components/common/
│       ├── StatusBadge.jsx     # Wrapper re-exporting from components/common/
│       ├── Waitlistlist.jsx    # Wrapper re-exporting from components/waitlist/
│       └── Waitlistlistitem.jsx# Wrapper re-exporting from components/waitlist/
│   ├── waitlist/               # Waitlist workflows
│   │   ├── WaitlistList.jsx    # Lists active waitlist queue entries
│   │   └── WaitlistListItem.jsx# Waitlist entry showing current position or notified claims
│   
├── context/
│   └── AppContext.jsx          # Global React context provider (useApp hook) handling mock state
│
├── layouts/                    # App Page frames
│   ├── AuthLayout.jsx          # Centered card frame for authentication screens (max-width: 400px)
│   └── MainLayout.jsx          # Main client grid wrapping top Header, center MainContainer, bottom Nav
│
├── lib/
│   ├── cn.js                   # Classnames helper
│   └── utils.js                # Utilities (includes cn merger using tailwind-merge & clsx)
│
├── pages/                      # Page components
│   ├── Checkout.jsx            # Renders checkouts lists and triggers extend/return modals
│   ├── DeviceDetails.jsx       # Detailed specs sheet with dynamic context-dependent triggers
│   ├── Login.jsx               # Form validation login portal
│   ├── Profile.jsx             # Active statistics summaries, returned logs, and Sign Out
│   ├── Scan.jsx                # Mock camera viewfinder scanning & manual ID entries
│   ├── Search.jsx              # Main search panel with live querying and category filters
│   └── Waitlist.jsx            # Waitlist lists
│
├── routes/                     # Router structures
│   ├── AppRouter.jsx           # Main routing routes maps
│   ├── ProtectedRoute.jsx      # Restricts child access if currentUser is not signed in
│   └── PublicRoute.jsx         # Redirects authenticated users away from login pages
│
├── App.jsx                     # Root router container wrapping AppRouter, AppProvider, Toaster
├── index.css                   # Theme configurations and custom scrollbars
└── main.jsx                    # Mount point to DOM
```

---

## Design System (Tailwind CSS v4 `@theme`)

Theme colors are defined via CSS variables inside [index.css](file:///home/vishnukumarng/me/DeviceHub/device-hub-frontend/src/index.css):
*   **Background:** `#111111` (dark theme default canvas)
*   **Cards:** `#1C1C1C` (for panels and sections)
*   **Borders:** `#2A2A2A` (thin separating guidelines)
*   **Primary:** `#3B82F6` (actions and highlights)
*   **Success:** `#22C55E` (available statuses and notified entries)
*   **Warning:** `#F59E0B` (pending claims and reservations)
*   **Danger:** `#EF4444` (maintenance, overdue alerts, and deletion prompts)
*   **Muted Text:** `#9CA3AF` (secondary details)
*   **Rounded Corners:** Large (`rounded-xl` / `rounded-2xl`)

---

## State Management Architecture (React Context)

All application states (active rentals, devices list, user notifications, active queue states) are managed **in-memory** within [AppContext.jsx](file:///home/vishnukumarng/me/DeviceHub/device-hub-frontend/src/context/AppContext.jsx).
This context provides the hook `useApp()`, which exposes:
*   `currentUser`: Current signed-in user object (`{ name, email }` or `null`).
*   `devices`: Array of 6 predefined devices, updating states in-memory during rental operations.
*   `checkouts`: Active checkouts and reservations (with overdue states).
*   `waitlist`: Queue lines with positions and notified markers.
*   Operations: `login()`, `logout()`, `checkoutDevice()`, `reserveDevice()`, `joinWaitlist()`, `returnDevice()`, `extendCheckout()`, `cancelReservation()`, `leaveWaitlist()`, `claimWaitlistDevice()`.

*Note: In accordance with project instructions, Redux is not used, and localStorage is restricted solely to preserving the authentication token across refreshes.*

---

## Development Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the local development server:**
    ```bash
    npm run dev
    ```
3.  **Run production build verification:**
    ```bash
    npm run build
    ```
