# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Project

Melorium Website is a Next.js 16 + React 19 + Tailwind CSS v4 project.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
```

Package manager: pnpm.
Linting and formatting: Biome.
Path alias: `@/` maps to `src/`.

## Component Style

- Always use arrow functions for components: `const Foo = () => (...)`. Never use `function Foo() {}` for components.
- Do not add `'use client'` to `page.tsx` files unless explicitly required.
- Put `'use client'` only in components that actually need state, effects, browser APIs, or client-only libraries.
- Keep page components semantic and thin. Move stateful composition into `src/components/`.
- Do not over-decompose plain layout into wrapper components. Use plain `div` elements with Tailwind classes for simple layout.
- Each distinct reusable UI display element should have a named component file when it is meaningful and repeated.

## Styling

- Use `cn()` from `@/modules/shadcn/lib/utils` for conditional `className` construction.
- Never build `className` with template literals or string concatenation.
- Split long class lists across lines by semantic group when readability requires it.
- Do not use inline `style={{ }}` in TSX.
- Prefer Tailwind classes and Tailwind arbitrary classes over inline styles.
- For dynamic values that cannot be static Tailwind classes, use CSS custom properties through a wrapper element.
- Use gap values based on powers of 2: `gap-2`, `gap-4`, `gap-8`. Avoid `gap-1.5`, `gap-2.5`, `gap-3.5`.
- Put colors and tokens in `:root` plus `@theme inline`.
- Put reusable shadows, gradients, and layout utilities in `@layer utilities`.
- Do not write multi-value arbitrary values inline in `className` when a named utility is cleaner.
- Extract custom shadows to named utility classes. Avoid inline `shadow-[...]` for complex shadows.
- Tailwind v4: use `bg-linear-to-r`, not `bg-gradient-to-r`.
- Tailwind v4: use `var(--color-name)`, not `theme(colors.name)` in arbitrary values.
- Prefer canonical Tailwind classes over arbitrary values when a canonical class exists.

## Typography

- Do not write uppercase UI text manually in JSX. Use the `uppercase` class when uppercase styling is needed.
- Field and section labels should use: `font-manrope font-semibold uppercase tracking-widest text-xs text-muted-foreground` when that typography exists in the project.

## UI Components

- Before writing a UI element from scratch, search `src/modules/` for an existing component.
- Prefer existing local UI modules over new primitives.
- Do not modify files inside `src/modules/`; treat them as vendored or library code.
- Use `Button` from `@/modules/shadcn/components/ui/button` for buttons and button-like interactive controls.
- Avoid plain `<button>` unless there is a clear reason and no project component fits.

## Logic

- Do not use nested ternaries for state logic. Use `switch` or `if/else`.
- Handle each state/status explicitly. Avoid broad chained conditions like `status === 'x' || status === 'y'` when separate handling is clearer.
- Use descriptive variable names. Avoid single-letter names such as `i`, `e`, or `v` except where a local API convention makes it unavoidable.

## Formatting

- Never align values with spaces or tabs.
- No column padding like `foo:     bar` or `baz:  qux`.
- Each property gets its own normal formatting with one space after the colon.
- This applies everywhere: TypeScript types, object literals, CSS-in-JS, union types, comments, Rust structs, and any other language.
- Do not add section divider comments like `/* --- Section --- */`.

## Collaboration

- Clarify before implementing when design or implementation details are ambiguous.
- Keep edits scoped to the requested area.
- Run relevant checks after changes when available.