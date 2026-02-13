document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('patch-notes-container');
    if (!container) return;

    fetch('patch_notes/patch_notes.json')
        .then(response => response.json())
        .then(data => {
            renderPatchNotes(data.patch_notes, container);
        })
        .catch(error => console.error('Error loading patch notes:', error));
});

function renderPatchNotes(notes, container) {
    if (!notes || notes.length === 0) return;

    // Create main header with anchor link
    if (!container.querySelector('#patch-notes-header')) {
        const headerContainer = document.createElement('div');
        headerContainer.id = 'patch-notes-header';
        headerContainer.className = 'patch-notes-main-header';
        headerContainer.style.marginBottom = '20px';
        headerContainer.style.display = 'flex';
        headerContainer.style.alignItems = 'center';

        const title = document.createElement('h1');
        title.id = 'patch-notes';
        title.textContent = 'Patch Notes';
        title.style.margin = '0';
        title.style.marginRight = '10px';

        const link = document.createElement('a');
        link.href = '#patch-notes';
        link.className = 'anchor-link';
        link.title = 'Copy link to Patch Notes';
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.color = 'var(--secondary-text-color)';
        link.style.opacity = '0.7';
        link.style.transition = 'opacity 0.2s';
        
        link.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
        `;

        link.addEventListener('mouseenter', () => link.style.opacity = '1');
        link.addEventListener('mouseleave', () => link.style.opacity = '0.7');
        
        link.addEventListener('click', (e) => {
            // Let the default hash change happen, but also copy
            const url = window.location.origin + window.location.pathname + '#patch-notes';
            navigator.clipboard.writeText(url).catch(err => console.error('Failed to copy:', err));
        });

        headerContainer.appendChild(title);
        headerContainer.appendChild(link);
        container.appendChild(headerContainer);

        // Scroll to header if hash matches (since content is loaded async)
        if (window.location.hash === '#patch-notes') {
            requestAnimationFrame(() => {
                headerContainer.scrollIntoView();
            });
        }
    }

    const list = document.createElement('div');
    list.className = 'patch-notes-list';

    notes.forEach(note => {
        const item = document.createElement('div');
        item.className = 'patch-note-item';

        const header = document.createElement('div');
        header.className = 'patch-note-header';
        header.innerHTML = `
            <span class="patch-version">${note.version}</span>
            <span class="patch-title">${note.title}</span>
            <span class="patch-toggle-icon">▼</span>
        `;

        const content = document.createElement('div');
        content.className = 'patch-note-content';
        content.style.display = 'none'; // Hidden by default
        content.innerHTML = note.content;

        header.addEventListener('click', () => {
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
            header.classList.toggle('active', !isVisible);
            header.querySelector('.patch-toggle-icon').textContent = isVisible ? '▼' : '▲';
        });

        item.appendChild(header);
        item.appendChild(content);
        list.appendChild(item);
    });

    container.appendChild(list);
}
