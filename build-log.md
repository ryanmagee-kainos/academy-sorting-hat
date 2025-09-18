# Academy Sorting Hat: Build Log & Implementation Rationale

## Chat & Implementation History

### 1. Project Planning
- **User:** Asked to break down the spec into separate task files.
- **Copilot:** Created a `tasks` folder with a markdown file for each major feature, outlining subtasks and acceptance criteria.
- **Rationale:** This modularizes the work, making it easy to track progress and requirements for each feature.

### 2. Task Prioritization & Renaming
- **User:** Requested the tasks be renamed in the order they should be developed.
- **Copilot:** Renamed files to `1-team-management.md`, `2-people-management.md`, etc.
- **Rationale:** Sequential naming clarifies the recommended development flow and dependencies.

### 3. Spec Update for Frameworks
- **User:** Asked to allow external JS/CSS frameworks.
- **Copilot:** Updated the spec and all task files to explicitly allow frameworks like Tailwind.
- **Rationale:** Enables use of modern UI libraries for faster, more maintainable development.

### 4. Project Bootstrapping
- **User:** Asked to start building the website from the tasks.
- **Copilot:** Created `index.html`, `app.js`, and `style.css` with Tailwind CSS included.
- **Rationale:** Sets up a modern, minimal, and extensible project structure.

### 5. Team Management Implementation
- **User:** Requested to proceed with development.
- **Copilot:** Implemented add/edit/delete UI for teams, with validation and Tailwind styling.
- **Rationale:** Team management is foundational and must be robust before adding participants or draft logic.

### 6. People Management Implementation
- **User:** Asked to continue.
- **Copilot:** Added UI and logic for managing participants, mirroring the team management approach.
- **Rationale:** Both teams and participants are required for the draft, so both must be managed before proceeding.

### 7. UI for All Phases
- **User:** Asked to keep going.
- **Copilot:** Added navigation and UI for setup, draft, and results phases.
- **Rationale:** Clear phase separation improves user experience and code maintainability.

### 8. Automated Draft Process
- **User:** Asked to continue.
- **Copilot:** Implemented fair, round-based, random assignment of participants to teams, with a visual draft board and results display.
- **Rationale:** The draft process is the core feature, requiring careful handling of fairness and randomness.

### 9. Fair Distribution Algorithm
- **User:** Progressed through tasks.
- **Copilot:** Ensured the draft algorithm distributes participants as evenly as possible, handling remainders.
- **Rationale:** Fairness is critical for user trust and application integrity.

### 10. User Experience Enhancements
- **User:** Requested ongoing progress and details.
- **Copilot:** Added toasts for feedback, error handling, and smooth navigation. Disabled navigation when requirements aren't met.
- **Rationale:** Immediate feedback and validation are essential for usability and accessibility.

### 11. Technical Constraints
- **User:** Final steps in progress.
- **Copilot:** Ensured the app is self-contained, works offline after load, and is compatible with all modern browsers.
- **Rationale:** Meeting these constraints ensures reliability and broad accessibility.

---

## Implementation Thinking for Each Task

### Team Management
- **Goal:** Allow users to add, edit, and delete teams with unique names.
- **Approach:** Used a simple array for state, with form validation and edit/delete controls. UI is styled with Tailwind for clarity and accessibility.

### People Management
- **Goal:** Manage the pool of participants for the draft.
- **Approach:** Mirrored the team management logic, ensuring unique names and easy editing/deletion. This keeps the UX consistent.

### In-Memory Data Management
- **Goal:** All state is session-based and lost on refresh.
- **Approach:** Used plain JS variables for state, with no persistence. This meets the spec and keeps the app simple.

### UI for All Phases
- **Goal:** Guide users through setup, draft, and results.
- **Approach:** Added navigation buttons and conditional rendering for each phase. Disabled navigation when requirements aren't met.

### Automated Draft Process
- **Goal:** Fairly and randomly assign participants to teams in rounds.
- **Approach:** Calculated team sizes for even distribution, then assigned participants randomly in a round-robin fashion. UI updates after each pick.

### Fair Distribution Algorithm
- **Goal:** Ensure teams are as balanced as possible.
- **Approach:** Used integer division and remainder logic to distribute participants (e.g., 23 people, 5 teams = 5,5,5,4,4).

### User Experience Enhancements
- **Goal:** Make the app intuitive and pleasant to use.
- **Approach:** Added toast notifications for all actions, validation errors, and navigation feedback. Used Tailwind for responsive, modern UI.

### Technical Constraints
- **Goal:** App is self-contained, offline-capable, and browser-compatible.
- **Approach:** No external dependencies except Tailwind CDN, all logic in a single HTML/JS/CSS bundle, and tested for modern browser compatibility.

---

## Summary
This markdown file documents the full chat and the rationale behind each implementation step, providing a clear audit trail and design reasoning for the Academy Sorting Hat project.
