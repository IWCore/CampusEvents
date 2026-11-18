# Campus Events

**Name:** P. G. I. W. Dharmasiri  
**Student ID:** PE/2022/053 
**Demo video:** PASTE YOUR UNLISTED YOUTUBE / GOOGLE DRIVE LINK HERE

## 1. What is the app?
Campus Events is a mobile app for university students to discover campus events (hackathons, sports finals, cultural nights, career fairs), bookmark favourites and get reminders. Event information is usually scattered across posters and social media groups; this app puts it in one place with filtering, bookmarking and reminders.

## 2. Screens (3)
| Screen | File | Purpose |
|---|---|---|
| Explore | `src/app/(tabs)/explore/index.js` | Lists all events in a FlatList; a Modal filters by category; shows a "Welcome back" banner after AppState resume |
| Event Details | `src/app/(tabs)/explore/[id].js` | Full event info; add/remove favorite; schedule a 5-second reminder notification; back button |
| Favorites | `src/app/(tabs)/favorites.js` | Shows only bookmarked events (shared state), with an empty state |

## 3. Core components and where they are used
| Component | Where |
|---|---|
| `View`, `Text` | All screens |
| `Image` | `src/components/EventCard.js`, `explore/[id].js` |
| `Pressable` | Cards, heart button, filter button, action buttons |
| `FlatList` | `explore/index.js`, `favorites.js` (data from `data/events.js`) |
| `Modal` | `explore/index.js` (category filter bottom sheet) |
| `ScrollView` | `explore/[id].js` |
| `AppState` | `src/context/AppContext.js` |

## 4. Expo Router structure
```
src/
└── app/
    ├── _layout.js            Root Stack + AppProvider (global state)
    ├── index.js              Redirects "/" to "/explore"
    └── (tabs)/
        ├── _layout.js        Tab navigator (Explore, Favorites + badge count)
        ├── favorites.js
        └── explore/
            ├── _layout.js    Nested Stack inside the Explore tab
            ├── index.js
            └── [id].js       Dynamic route for event details
```
Back navigation uses the stack header back button and `router.back()`.

## 5. State management
`src/context/AppContext.js` holds `favorites` (array of ids) with `useState` and shares it through React Context, so the heart on any card updates the Favorites tab and the tab badge.

## 6. AppState
In `AppContext.js`, `AppState.addEventListener('change', ...)` tracks the previous state in a `useRef`. When it moves from `inactive/background` to `active`, a counter and timestamp are updated and shown as a banner on the Explore screen.

## 7. Local notifications (research approach)
I read the `expo-notifications` documentation and learned that: permissions must be requested, an Android channel is needed, `setNotificationHandler` decides whether notifications show while the app is open, and `scheduleNotificationAsync` accepts a `trigger` (`null` = immediate, `TIME_INTERVAL` = delayed). I implemented both in `utils/notifications.js`: an immediate "Event bookmarked!" notification when adding a favorite, and a 5-second timed reminder from the details screen. I tested on a real device with Expo Go.

## 8. Run locally
```bash
git clone "https://github.com/IWCore/CampusEvents.git"
cd campus-events
npm install
npx expo start
```
Scan the QR code with Expo Go (or press `a` for an Android emulator).
