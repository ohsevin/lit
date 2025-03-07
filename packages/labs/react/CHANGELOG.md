# Change Log

## 1.0.9

### Patch Changes

- [#3163](https://github.com/lit/lit/pull/3163) [`1212ddd0`](https://github.com/lit/lit/commit/1212ddd0744529c294ea3905782917172c5aa11e) - Provide the explicit return type `WrappedWebComponent` for `createComponent`. This exposes an explicit typing for wrapped components rather than relying on inferences from Typescript. A well defined type should provide more resilience for implementations like SSR and others.

## 1.0.8

### Patch Changes

- [#2800](https://github.com/lit/lit/pull/2800) [`043d9c80`](https://github.com/lit/lit/commit/043d9c80de59177335fa6543d5654e0295f5a743) - Support setting custom accessors by using an 'in' check instead of a for/in loop to check for properties.

## 1.0.7

### Patch Changes

- [#3072](https://github.com/lit/lit/pull/3072) [`94722633`](https://github.com/lit/lit/commit/947226339746d5795a8ded3d19d51d3d6fdf7b0e) - Avoid nested component props type declarations. Incrementally define what types are needed rather than nesting.

- [#3067](https://github.com/lit/lit/pull/3067) [`f3e3cddf`](https://github.com/lit/lit/commit/f3e3cddf5e03602558c92306ed4fc0234767ac39) - Fixed an error that occurs when when compiling TS. The error occurs when createComponent() is not provided an event map causing instance properties to be confused with event handlers.

- [#3111](https://github.com/lit/lit/pull/3111) [`6158482c`](https://github.com/lit/lit/commit/6158482c4123d74c29eb1ba2307c5aa2d059c041) - Removed the unexposed and unnecessary `StringValued` type used to correlate property names with event listener names.

- [#3132](https://github.com/lit/lit/pull/3132) [`2fe2053f`](https://github.com/lit/lit/commit/2fe2053fe04e7226e5fa4e8b730e91a62a547b27) - Added "types" entry to package exports. This tells newer versions of TypeScript where to look for typings for each module.

## 1.0.6

### Patch Changes

- [#3050](https://github.com/lit/lit/pull/3050) [`5227ca52`](https://github.com/lit/lit/commit/5227ca52863ac6fd9f3ee57d7a6c78ea1e617b56) - Fix a property collision in the minified production build.

## 1.0.5

### Patch Changes

- [#2987](https://github.com/lit/lit/pull/2987) [`93b30f7d`](https://github.com/lit/lit/commit/93b30f7de81eb203ad88abfc1e0e87a719d132c5) - [labs/react] `useController` is compatible with React strict mode.

- [#2960](https://github.com/lit/lit/pull/2960) [`16a900c7`](https://github.com/lit/lit/commit/16a900c7d0191140a65cdb38126ab3653c334935) - Fix `'@lit-labs/react/use-controller.js'` not being correctly exported from package.json.

## 1.0.4

### Patch Changes

- [#2678](https://github.com/lit/lit/pull/2678) [`80e701e2`](https://github.com/lit/lit/commit/80e701e25cfac71d220acb646c6f4964c829de84) - Skip the \_\_forwardedRef when passing component props to element.

## 1.0.3

### Patch Changes

- [#2648](https://github.com/lit/lit/pull/2648) [`7cb492a3`](https://github.com/lit/lit/commit/7cb492a37352ea2402f783bf83fa0bef7ed29036) - Event callbacks can be typed by casting with EventHandler

## 1.0.2

### Patch Changes

- [#2410](https://github.com/lit/lit/pull/2410) [`b9a6962b`](https://github.com/lit/lit/commit/b9a6962b84c841eaabd5c4cbf8687ff34dbfe511) - Correct the link path of CONTRIBUTING.md in README.md files

## 1.0.1

### Patch Changes

- [#2155](https://github.com/lit/lit/pull/2155) [`55cc9df4`](https://github.com/lit/lit/commit/55cc9df43f8702bf2b530fa9d70b2a2951f83de8) - Fix displayName of components created with "createComponent"

## 1.0.0

### Patch Changes

- [#1942](https://github.com/lit/lit/pull/1942) [`c8fe1d4`](https://github.com/lit/lit/commit/c8fe1d4c4a8b1c9acdd5331129ae3641c51d9904) - For minified class fields on classes in lit libraries, added prefix to stable properties to avoid collisions with user properties.

* [#2113](https://github.com/lit/lit/pull/2113) [`5b2f3642`](https://github.com/lit/lit/commit/5b2f3642ff91931b5b01f8bdd2ed98aba24f1047) - Dependency upgrades including TypeScript 4.4.2

- [#2123](https://github.com/lit/lit/pull/2123) [`efe88ba5`](https://github.com/lit/lit/commit/efe88ba5a31bae117f8a4c8ddf111068368cf249) - Adds React.HTMLAttributes to component props, which enables the built-in `onXyz` event handler props.

* [#1964](https://github.com/lit/lit/pull/1964) [`f43b811`](https://github.com/lit/lit/commit/f43b811405be32ce6caf82e80d25cb6170eeb7dc) - Don't publish src/ to npm.

## 1.0.0-rc.4

### Patch Changes

- [#2113](https://github.com/lit/lit/pull/2113) [`5b2f3642`](https://github.com/lit/lit/commit/5b2f3642ff91931b5b01f8bdd2ed98aba24f1047) - Dependency upgrades including TypeScript 4.4.2

* [#2123](https://github.com/lit/lit/pull/2123) [`efe88ba5`](https://github.com/lit/lit/commit/efe88ba5a31bae117f8a4c8ddf111068368cf249) - Adds React.HTMLAttributes to component props, which enables the built-in `onXyz` event handler props.

## 1.0.0-rc.3

### Patch Changes

- [#1942](https://github.com/lit/lit/pull/1942) [`c8fe1d4`](https://github.com/lit/lit/commit/c8fe1d4c4a8b1c9acdd5331129ae3641c51d9904) - For minified class fields on classes in lit libraries, added prefix to stable properties to avoid collisions with user properties.

* [#1964](https://github.com/lit/lit/pull/1964) [`f43b811`](https://github.com/lit/lit/commit/f43b811405be32ce6caf82e80d25cb6170eeb7dc) - Don't publish src/ to npm.

---

Changes below were based on the [Keep a Changelog](http://keepachangelog.com/) format. All changes above are generated automatically by [Changesets](https://github.com/atlassian/changesets).

---

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## [x.y.z] - YYYY-MM-DD -->
<!-- ## Unreleased -->
<!-- ### Changed -->
<!-- ### Added -->
<!-- ### Removed -->
<!-- ### Fixed -->

## Unreleased

### Fixed

- Included `development` folder in release [#1912](https://github.com/lit/lit/issues/1912).

## [1.0.0-rc.2] - 2021-05-07

### Fixed

- Fixed a bug where `host.requestUpdate()` only worked on the first call from within `useController()`.

## [1.0.0-rc.1] - 2021-04-20

### Added

- Added `useControler()` hook for creating React hooks from Reactive Controllers ([#1532](https://github.com/Polymer/lit-html/pulls/1532)).

## [1.0.0-pre.2] - 2021-03-31

### Changed

- Updated dependencies

## [1.0.0-pre.1] - 2021-02-11

### Added

- Adds React component wrapper for custom elements. Use by calling `createComponent` ([#1420](https://github.com/Polymer/lit-html/pulls/1420)).
