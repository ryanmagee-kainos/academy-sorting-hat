# Academy Sorting Hat

A single-page web application for creating teams and randomly distributing people among those teams through an automated, fair draft process.

## How to Use

### 1. Open the App
- Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
- No installation or server required—just double-click the file or open it via your browser.

### 2. Setup Phase
- **Add Teams:**
  - Enter a team name and click "Add".
  - You can edit or delete teams at any time before starting the draft.
  - At least 2 teams are required to proceed.
- **Add Participants:**
  - Enter a participant name and click "Add".
  - You can edit or delete participants at any time before starting the draft.
  - At least 2 participants are required to proceed.

### 3. Draft Phase
- Click the "Draft" tab (enabled when you have at least 2 teams and 2 participants).
- Click "Reveal Team" to assign the next participant in the waiting list to a random team, keeping teams as balanced as possible.
- The draft proceeds one participant at a time, with a modal pop-up showing each assignment (participant and team names are bolded for clarity).
- When all participants are assigned, click "View Results".

### 4. Results Phase
- View the final team rosters.
- Click "Restart Draft" to return to setup and start a new draft.

## Features
- **Fair Distribution:** Teams are balanced as evenly as possible by the end of the draft.
- **Random Assignment:** Each participant is assigned to a random team, one at a time, with fairness guaranteed.
- **Step-by-Step Reveal:** Assignments are revealed one at a time, not all at once.
- **Pop-up Feedback:** All actions and errors are shown in a modal pop-up, with participant and team names bolded for clarity.
- **Responsive Design:** Works on desktop and mobile browsers.
- **No Data Persistence:** All data is stored in memory and resets on refresh.

## Accessibility & Compatibility
- Fully keyboard accessible (tab, enter, escape for modals).
- Works offline after initial load.
- Uses Tailwind CSS for styling. For production, use a built CSS file instead of the CDN for best performance and no warnings.

## Support
If you encounter any issues or have suggestions, please open an issue or contact the project maintainer.
