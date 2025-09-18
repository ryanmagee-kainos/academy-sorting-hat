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
- Click "Next Pick" to randomly assign a participant to the current team.
- The draft proceeds in rounds, assigning participants as evenly as possible.
- When all participants are assigned, click "View Results".

### 4. Results Phase
- View the final team rosters.
- Click "Restart Draft" to return to setup and start a new draft.

## Features
- **Fair Distribution:** Ensures teams are as balanced as possible.
- **Random Assignment:** Each pick is random and round-based.
- **Pop-up Feedback:** All actions and errors are shown in a modal pop-up for clarity.
- **Responsive Design:** Works on desktop and mobile browsers.
- **No Data Persistence:** All data is stored in memory and resets on refresh.

## Accessibility & Compatibility
- Fully keyboard accessible (tab, enter, escape for modals).
- Works offline after initial load.
- No external dependencies except Tailwind CSS CDN.

## Support
If you encounter any issues or have suggestions, please open an issue or contact the project maintainer.
