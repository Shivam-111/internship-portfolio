# Accessibility notes

## Implemented

- Pages use a declared document language, semantic header/navigation/main/footer landmarks, descriptive page titles, and a single primary heading.
- A keyboard-focusable skip link moves users past repeated navigation to the main content.
- Navigation, theme, and form controls are native links, buttons, and labeled fields. The mobile menu exposes its expanded state, closes with Escape, and returns focus to its toggle.
- Current navigation pages expose `aria-current="page"`.
- Keyboard focus is visible, form errors are linked to their fields, and submission feedback is announced through a live status region.
- The dark theme updates text, surface, border, and form-control colors; the choice persists in local storage. When no saved choice exists, the operating-system color preference is used.
- Smooth scrolling is disabled for users who prefer reduced motion.
- Layouts reflow into single-column content on narrow screens and use CSS Grid/Flexbox rather than fixed page widths.

## Manual checks

1. Tab through every page; verify the skip link, focus indicator, navigation, theme control, links, and form controls.
2. Use the mobile menu with the keyboard, including Escape; check the expanded state.
3. Switch themes on multiple pages and reload; verify the saved choice is consistent.
4. Submit the contact form empty, with an invalid email, and with a short message; then submit valid input and listen for the status message.
5. Test at narrow and wide viewport widths and with reduced motion enabled.

## Limitations

- This is a practical accessibility checklist, not a claim of WCAG certification or a substitute for assistive-technology testing.
- The contact form performs client-side validation only. It does not send or store submissions.
- Confirm the sample profile, contact information, and project content are accurate before publishing.
