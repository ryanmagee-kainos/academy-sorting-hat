# Feature Plan: Pop-up Notification Modal

## Description
Replace the current green toast message with a modal pop-up for user feedback (success, error, info). The modal should appear centered, overlay the app, and require user dismissal (e.g., clicking an OK button).

## Subtasks
- Design modal UI (centered, overlay, accessible)
- Implement modal state management in JS
- Integrate modal with all feedback points (success, error, info)
- Add animation for modal appearance/disappearance
- Ensure accessibility (focus trap, keyboard dismiss)
- Remove or disable existing toast logic

## Acceptance Criteria
- All feedback is shown in a modal pop-up, not a toast
- Modal is visually clear, accessible, and dismissible
- Modal works for all feedback types (success, error, info)
- No green toast messages remain in the app

## Rationale
A modal pop-up provides more prominent feedback and requires user acknowledgment, improving clarity for important actions or errors.
