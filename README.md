# WorkIout

> !!! **Experimental / learning project - very much a work in progress** !!!

WorkIout is a personal project I'm building while learning **React Native, Expo, Expo Router, Supabase, and mobile app development**.

This is **not a finished or production-ready application**. Most of the project is currently experimental, and functionality, UI, database structure, and code organization are likely to change as I learn.

Things in the repository may be incomplete, temporary, broken, or simply there to test an idea.

## What is this?

The general idea is to eventually build a workout tracking app.

For now, the main goal is **learning by building** rather than having a fully functional product.

I'm using the project to experiment with things such as:

- React Native components
- Expo
- Expo Router
- Navigation
- Supabase
- Authentication
- Database interaction
- React hooks
- Workout timers
- UI design
- State management
- Git and GitHub
- Structuring a larger React Native project

## Current State

**Very early development / experimentation.**

There is currently no expectation that the application works as a complete product.

Some things that are being experimented with include:

- Login and signup UI
- Supabase authentication
- Authentication/session handling
- Navigation between screens
- Workout screen UI
- Workout timer
- Starting and stopping workouts
- Connecting the application to a Supabase database
- Profile-related screens

Some of these may work partially, while others are only prototypes or tests.

## Tech I'm Learning

The project currently uses or experiments with:

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **Supabase**
- **AsyncStorage**
- **React Native Reanimated**
- **@gorhom/bottom-sheet**
- **Expo Vector Icons**

The exact technologies and dependencies may change as the project develops.

## Project Structure

The structure is still evolving, but currently looks roughly like:

```text
WorkIout/
├── assets/
│   └── images/
│
├── components/
│   ├── HomeHeader.tsx
│   └── workout-page/
│
├── lib/
│   └── supabase.ts
│
├── src/
│   └── app/
│       ├── _layout.tsx
│       ├── account.tsx
│       ├── signUp.tsx
│       │
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   └── workoutTimer.ts
│       │
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── index.tsx
│           ├── workout.tsx
│           └── profile.tsx
│
├── styles/
│   └── global.ts
│
├── app.json
├── package.json
└── README.md
```

This structure is **not final** and will probably change.

## Running the Project

If you want to experiment with the project locally:

### Clone it

```bash
git clone https://github.com/AdriansVeinoSlaidins/WorkIout.git
cd WorkIout
```

### Install dependencies

```bash
npm install
```

### Start Expo

```bash
npm start
```

Depending on what I'm currently testing, the project can also be run with:

```bash
npm run android
```

```bash
npm run ios
```

```bash
npm run web
```

## Supabase

Supabase is being used as a way to learn about backend services, authentication, and databases.

The project currently experiments with:

- Supabase Auth
- Email/password authentication
- User sessions
- Database tables
- Saving workout-related data

The Supabase setup is still being developed, so the database structure should **not** be considered final.

### Environment variables

Local Supabase configuration is stored using environment variables.

For example:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not commit private credentials or service-role keys to the repository.

## Branches

The repository uses branches while experimenting with different parts of the application.

For example:

```text
main
feature/workoutlogic
```

`feature/workoutlogic` is currently being used to experiment with workout-related logic.

Branches may contain unfinished experiments and should not necessarily be expected to work as a complete application.

## Learning Goals

The main purpose of this project is to learn how to build a real mobile application from scratch.

Some of the things I want to understand better through this project:

- How React Native applications are structured
- How Expo works
- How navigation works with Expo Router
- How authentication works
- How to persist login sessions
- How to communicate with a backend
- How Supabase databases work
- How to structure database relationships
- How React hooks work
- How to manage application state
- How to build reusable components
- How to structure larger projects
- How to use Git and GitHub properly

## Possible Future Ideas

These are **ideas, not implemented features**.

Eventually, I might experiment with:

- Exercises
- Sets and reps
- Weight tracking
- Workout history
- Personal records
- Progress tracking
- Rest timers
- User profiles
- Better authentication flows
- More advanced workout creation
- Improved UI/UX

Whether these actually get implemented may change as the project develops.

## Disclaimer

This project is primarily a **learning project**.

It is not currently intended to be:

- A production application
- A finished workout tracker
- A polished public product
- A stable API or database schema

Expect unfinished code, experiments, refactors, bugs, and things that may change without warning.

That's basically the point of the project.

## License

This project is licensed under the MIT License.
