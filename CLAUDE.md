# bean — coffee shop demo app

Small Expo + TypeScript demo for recording Fermata walkthroughs.

## Scope

- Three screens: Menu, Cart, Checkout
- Menu data is hard-coded in `lib/menu.ts`
- Cart state lives in `lib/cart.ts` as a reducer
- No persistence, no backend, no auth
- Styling via React Native `StyleSheet` — no external UI libraries

## When fixing bugs

- Keep changes minimal and focused
- Don't add dependencies
- Don't add routing libraries — screen switching is plain state
- Don't refactor files that aren't the target of the fix

## Style

- React Native core components only (`View`, `Text`, `Pressable`, `FlatList`, `ScrollView`, `SafeAreaView`)
- No external UI libraries
- TypeScript everywhere
- Coffee brown accent color `#6f4e37`
