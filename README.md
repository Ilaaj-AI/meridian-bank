# Meridian — mobile banking UI (front-end only)

An Expo / React Native front-end for a mobile banking app. **No backend, no
network calls, no real accounts** — every balance, transaction, account number
and routing number in `data/` is fabricated sample content for the UI build.

Branding (name, palette, marks) is original to this project. Layout and
interaction patterns follow the reference screens supplied by the client.

## Running it

```bash
npm install
npx expo start --android
```

## Screens

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | Accounts home | Greeting, security banner, Virtual Wallet group, Tools row, Transaction History |
| `/transactions` | All transactions | Filter chips (All / Deposits / Withdrawals), grouped by date |
| `/transaction/[id]` | Transaction detail | Amount, note, method, source account, Send Money |
| `/account/[id]` | Account & routing numbers | Balance, account + routing, wire details, recent activity |
| `/profile` | Profile | Opened from the avatar in the home header |
| `/send` | Send money | Recipient / amount / from-account / note, simulated confirmation |
| `/transfer`, `/rewards`, `/deposit`, `/more` | Tab placeholders | Deliberately inert — shell and row lists only |

## What is wired up

Working: profile avatar → profile, account rows → account detail, transaction
rows → transaction detail, **More Transactions** → full list with filters, Send
Money → simulated confirmation.

Everything else (Reminders, cart, help, Low Cash Mode, the four Tools icons,
Customize Tools, kebab menus, the four non-Accounts tabs) is intentionally
inert.

## Layout

```
app/          expo-router routes (thin wrappers)
screens/      screen implementations
components/   TabBar, TxnRow, ScreenHeader, shared primitives
data/         sample accounts + transactions
theme/        colour, spacing, type tokens
```

Design tokens live in `theme/tokens.ts` — change the palette there and it
propagates across every screen.
