// Entry point for Draft Pick Application
// State and rendering logic will be added as features are developed

// --- State ---
let teams = [];
let editingTeamIndex = null;
let people = [];
let editingPersonIndex = null;
let phase = 'setup'; // 'setup' | 'draft' | 'results'

function showModal(msg, type = 'info') {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  const message = document.getElementById('modal-message');
  const okBtn = document.getElementById('modal-ok');
  message.innerHTML = msg;
  modal.classList.remove('border-green-600','border-red-600','border-blue-600');
  modal.classList.add(type === 'error' ? 'border-red-600' : type === 'success' ? 'border-green-600' : 'border-blue-600');
  overlay.classList.remove('hidden');
  okBtn.focus();
  function closeModal() {
    overlay.classList.add('hidden');
    okBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', escListener);
  }
  function escListener(e) {
    if (e.key === 'Escape') closeModal();
  }
  okBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', escListener);
}
let draftState = null; // { round, teamIndex, remaining, assignments }

// --- Render ---

function renderApp() {
  const app = document.getElementById('app');
  // Navigation with theme dropdown
  let nav = `
    <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8 items-center">
      <div class="flex gap-4">
  <button class="phase-btn px-4 py-2 rounded ${phase === 'setup' ? 'bg-accent' : 'bg-gray-200 text-gray-700'}" data-phase="setup">Setup</button>
  <button class="phase-btn px-4 py-2 rounded ${phase === 'draft' ? 'bg-accent' : 'bg-gray-200 text-gray-700'} ${teams.length < 2 || people.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}" data-phase="draft">Draft</button>
  <button class="phase-btn px-4 py-2 rounded ${phase === 'results' ? 'bg-accent' : 'bg-gray-200 text-gray-700'}" data-phase="results">Results</button>
      </div>
      <div class="flex items-center gap-2 mt-2 sm:mt-0">
        <label for="theme-select" class="text-sm font-medium">Theme:</label>
        <select id="theme-select" class="border rounded px-2 py-1 text-sm focus:outline-none">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <!-- Color scheme dropdown removed -->
      </div>
    </div>
  `;

  let content = '';
  if (phase === 'setup') {
    content = `
      <div class="bg-white rounded shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Teams</h2>
        <form id="team-form" class="flex flex-col sm:flex-row gap-2 mb-4">
          <input type="text" id="team-name" class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring" placeholder="Team name" value="${editingTeamIndex !== null ? teams[editingTeamIndex] : ''}" required />
          <button type="submit" class="bg-accent px-4 py-2 rounded hover:opacity-90 transition">
            ${editingTeamIndex !== null ? 'Update' : 'Add'}
          </button>
          ${editingTeamIndex !== null ? `<button type="button" id="cancel-edit" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>` : ''}
        </form>
        <ul class="divide-y">
          ${teams.map((team, i) => `
            <li class="flex items-center justify-between py-2">
              <span>${team}</span>
              <div class="flex gap-2">
                <button class="edit-team text-accent hover:underline" data-index="${i}">Edit</button>
                <button class="delete-team text-red-600 hover:underline" data-index="${i}">Delete</button>
              </div>
            </li>
          `).join('')}
        </ul>
        <div class="mt-4 text-sm text-gray-600">${teams.length < 2 ? 'At least 2 teams required to start draft.' : 'Ready to add participants.'}</div>
      </div>

      <div class="bg-white rounded shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Participants</h2>
        <form id="person-form" class="flex flex-col sm:flex-row gap-2 mb-4">
          <input type="text" id="person-name" class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring" placeholder="Participant name" value="${editingPersonIndex !== null ? people[editingPersonIndex] : ''}" required />
          <button type="submit" class="bg-accent px-4 py-2 rounded hover:opacity-90 transition">
            ${editingPersonIndex !== null ? 'Update' : 'Add'}
          </button>
          ${editingPersonIndex !== null ? `<button type="button" id="cancel-person-edit" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>` : ''}
        </form>
        <ul class="divide-y">
          ${people.map((person, i) => `
            <li class="flex items-center justify-between py-2">
              <span>${person}</span>
              <div class="flex gap-2">
                <button class="edit-person text-accent hover:underline" data-index="${i}">Edit</button>
                <button class="delete-person text-red-600 hover:underline" data-index="${i}">Delete</button>
              </div>
            </li>
          `).join('')}
        </ul>
        <div class="mt-4 text-sm text-gray-600">${people.length < 2 ? 'At least 2 participants required to start draft.' : 'Ready to start draft.'}</div>
      </div>
    `;
  } else if (phase === 'draft') {
    // Initialize draft state if not already
    if (!draftState) {
      // Shuffle people for random order
      const shuffled = [...people];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Fair distribution: all teams display the same max size
      const nTeams = teams.length;
      const nPeople = people.length;
      const maxTeamSize = Math.ceil(nPeople / nTeams);
      const teamSizes = Array(nTeams).fill(maxTeamSize);
      draftState = {
        round: 0,
        teamIndex: 0,
        remaining: [...shuffled],
        assignments: Array(nTeams).fill(0).map(() => []),
        teamSizes
      };
    }

    // Draft board UI with waiting list and team counters, one person at a time
    content = `
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-2/3 w-full">
          <div class="bg-white rounded shadow p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Draft Phase</h2>
            <div class="flex flex-wrap gap-4 justify-center">
              ${teams.map((team, i) => `
                <div class="min-w-[160px] bg-gray-50 rounded shadow p-3">
                  <div class="font-semibold mb-2 text-center flex items-center justify-center gap-2">
                    ${team}
                    <span aria-label="Assigned count" class="ml-2 inline-block px-2 py-0.5 rounded-full bg-accent-bg text-accent text-xs font-bold">${draftState.assignments[i].length}</span>
                  </div>
                  <ul class="min-h-[40px]">
                    ${draftState.assignments[i].map(p => `<li class="text-sm">${p}</li>`).join('')}
                  </ul>
                  <div class="text-xs text-gray-400 mt-2">of ${draftState.teamSizes[i]} max</div>
                </div>
              `).join('')}
            </div>
            <div class="mt-6 text-center">
              ${draftState.remaining.length > 0 ? `
                <div class="mb-2">Next up: <span class="font-semibold">${draftState.remaining[0]}</span></div>
                <button id="next-pick" class="bg-accent px-6 py-2 rounded hover:opacity-90 transition">Reveal Team</button>
              ` : `
                <div class="mb-2 text-green-700 font-semibold">Draft complete! (Random, fair distribution)</div>
                <button id="to-results" class="bg-accent px-6 py-2 rounded hover:opacity-90 transition">View Results</button>
              `}
            </div>
          </div>
        </div>
        <aside class="md:w-1/3 w-full">
          <div class="bg-white rounded shadow p-6 mb-6">
            <h3 class="text-lg font-semibold mb-3">Waiting to be picked</h3>
            <ul id="waiting-list" class="divide-y" aria-live="polite">
              ${draftState.remaining.length === 0 ? `<li class="text-gray-400 text-sm">All participants assigned!</li>` : draftState.remaining.map(p => `<li class="py-1 text-sm">${p}</li>`).join('')}
            </ul>
          </div>
        </aside>
      </div>
    `;
  } else if (phase === 'results') {
    // Show final team rosters
    content = `
      <div class="bg-white rounded shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Results Phase</h2>
        <div class="flex flex-wrap gap-4 justify-center">
          ${teams.map((team, i) => `
            <div class="min-w-[160px] bg-gray-50 rounded shadow p-3">
              <div class="font-semibold mb-2 text-center">${team}</div>
              <ul class="min-h-[40px]">
                ${(draftState && draftState.assignments[i]) ? draftState.assignments[i].map(p => `<li class="text-sm">${p}</li>`).join('') : ''}
              </ul>
              <div class="text-xs text-gray-400 mt-2">${draftState && draftState.assignments[i] ? draftState.assignments[i].length : 0}/${draftState && draftState.teamSizes ? draftState.teamSizes[i] : 0}</div>
            </div>
          `).join('')}
        </div>
        <div class="mt-6 text-center">
          <button id="restart" class="bg-accent px-6 py-2 rounded hover:opacity-90 transition">Restart Draft</button>
        </div>
      </div>
    `;
  } else if (phase === 'results') {
    content = `
      <div class="bg-white rounded shadow p-6 mb-6 text-center">
        <h2 class="text-xl font-semibold mb-4">Results Phase</h2>
        <p>Results and team rosters will be shown here.</p>
      </div>
    `;
  }


  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-6 text-center">Draft Pick Application</h1>
    ${nav}
    ${content}
  `;

  // Theme dropdown logic (must be after DOM update)
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    themeSelect.onchange = (e) => {
      if (e.target.value === 'dark') {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
    };
  }
    // Color scheme dropdown logic removed

  // Navigation
  document.querySelectorAll('.phase-btn').forEach(btn => {
    btn.onclick = () => {
      const nextPhase = btn.dataset.phase;
      if (nextPhase === 'draft' && (teams.length < 2 || people.length < 2)) {
        showModal('At least 2 teams and 2 participants required to start draft.', 'error');
        return;
      }
      if (nextPhase !== phase) {
        if (nextPhase === 'draft') draftState = null;
        phase = nextPhase;
        renderApp();
      }
    };
  });

  if (phase === 'setup') {
    // Team form submit
    document.getElementById('team-form').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('team-name').value.trim();
      if (!name) {
        showModal('Team name cannot be empty.', 'error');
        return;
      }
      if (teams.includes(name) && editingTeamIndex === null) {
        showModal('Team name must be unique.', 'error');
        return;
      }
      if (editingTeamIndex !== null) {
        teams[editingTeamIndex] = name;
        editingTeamIndex = null;
        showModal('Team updated.', 'success');
      } else {
        teams.push(name);
        showModal('Team added.', 'success');
      }
      renderApp();
    };
    // Cancel team edit
    if (editingTeamIndex !== null) {
      document.getElementById('cancel-edit').onclick = () => {
        editingTeamIndex = null;
        renderApp();
      };
    }
    // Edit team
    document.querySelectorAll('.edit-team').forEach(btn => {
      btn.onclick = () => {
        editingTeamIndex = parseInt(btn.dataset.index);
        renderApp();
      };
    });
    // Delete team
    document.querySelectorAll('.delete-team').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        teams.splice(idx, 1);
        if (editingTeamIndex === idx) editingTeamIndex = null;
  showModal('Team deleted.', 'success');
        renderApp();
      };
    });

    // Person form submit
    document.getElementById('person-form').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('person-name').value.trim();
      if (!name) {
        showModal('Participant name cannot be empty.', 'error');
        return;
      }
      if (people.includes(name) && editingPersonIndex === null) {
        showModal('Participant name must be unique.', 'error');
        return;
      }
      if (editingPersonIndex !== null) {
        people[editingPersonIndex] = name;
        editingPersonIndex = null;
        showModal('Participant updated.', 'success');
      } else {
        people.push(name);
        showModal('Participant added.', 'success');
      }
      renderApp();
    };
    // Cancel person edit
    if (editingPersonIndex !== null) {
      document.getElementById('cancel-person-edit').onclick = () => {
        editingPersonIndex = null;
        renderApp();
      };
    }
    // Edit person
    document.querySelectorAll('.edit-person').forEach(btn => {
      btn.onclick = () => {
        editingPersonIndex = parseInt(btn.dataset.index);
        renderApp();
      };
    });
    // Delete person
    document.querySelectorAll('.delete-person').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        people.splice(idx, 1);
        if (editingPersonIndex === idx) editingPersonIndex = null;
  showModal('Participant deleted.', 'success');
        renderApp();
      };
    });
  }

  if (phase === 'draft' && draftState) {
    // Next pick logic: assign next person to a random team with available space
    const nextBtn = document.getElementById('next-pick');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const { teamSizes, assignments, remaining } = draftState;
        if (remaining.length === 0) return;
        // Find teams with available space
        const availableTeams = assignments.map((a, i) => a.length < teamSizes[i] ? i : null).filter(i => i !== null);
        if (availableTeams.length === 0) return;
        // Pick a random available team
        const teamIdx = availableTeams[Math.floor(Math.random() * availableTeams.length)];
        const pick = remaining.shift();
        assignments[teamIdx].push(pick);
  showModal(`<strong>${pick}</strong> assigned to <strong>${teams[teamIdx]}</strong>.`, 'success');
        renderApp();
      };
    }
    // To results
    const toResultsBtn = document.getElementById('to-results');
    if (toResultsBtn) {
      toResultsBtn.onclick = () => {
        phase = 'results';
  showModal('Draft complete! Viewing results.', 'success');
        renderApp();
      };
    }
  }

  if (phase === 'results') {
    // Restart
    const restartBtn = document.getElementById('restart');
    if (restartBtn) {
      restartBtn.onclick = () => {
        // Reset everything except teams/people
        draftState = null;
        phase = 'setup';
  showModal('Draft reset. You can edit teams and participants.', 'info');
        renderApp();
      };
    }
  }
}

// Initial render
renderApp();
