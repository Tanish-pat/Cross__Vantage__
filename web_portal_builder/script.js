// Initialize the grid
const gridContainer = document.getElementById('grid');
const elements = []; // Store all elements
let isMouseDown = false;
let startCell = null;
let selectedCells = new Set();

// Create a 20x20 grid dynamically
for (let i = 0; i < 400; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    gridContainer.appendChild(cell);
}

// Mouse Event Listeners for Selection Logic
gridContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('cell')) {
        isMouseDown = true;
        startCell = e.target;
        selectedCells.clear();
        gridContainer.querySelectorAll('.cell').forEach(cell => {
            if (!cell.classList.contains('assigned')) {
                cell.classList.remove('selected');
            }
        });
    }
});

gridContainer.addEventListener('mousemove', (e) => {
    if (isMouseDown && e.target.classList.contains('cell')) {
        const endCell = e.target;
        selectRectangle(startCell, endCell);
    }
});

gridContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Function to select cells in a rectangle
function selectRectangle(cell1, cell2) {
    const allCells = Array.from(gridContainer.querySelectorAll('.cell'));
    const index1 = parseInt(cell1.dataset.index);
    const index2 = parseInt(cell2.dataset.index);

    const [startRow, startCol] = [Math.floor(index1 / 20), index1 % 20];
    const [endRow, endCol] = [Math.floor(index2 / 20), index2 % 20];

    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    selectedCells.clear();
    allCells.forEach((cell, i) => {
        const row = Math.floor(i / 20);
        const col = i % 20;
        if (row >= minRow && row <= maxRow && col >= minCol && col <= maxCol) {
            cell.classList.add('selected');
            selectedCells.add(cell);
        } else if (!cell.classList.contains('assigned')) {
            cell.classList.remove('selected');
        }
    });
}

// Element Assignment Logic
document.getElementById('assignElement').addEventListener('click', () => {
    if (selectedCells.size === 0) {
        alert('No cells selected!');
        return;
    }

    const type = document.getElementById('elementType').value;
    const coordinates = Array.from(selectedCells).map(cell => {
        const index = parseInt(cell.dataset.index);
        return { x: index % 20, y: Math.floor(index / 20) };
    });

    const id = `element${elements.length + 1}`;

    // Assign category-specific color
    selectedCells.forEach(cell => {
        cell.classList.add('assigned', `assigned-${type}`);
        cell.classList.remove('selected');
    });

    elements.push({ id, type, coordinates });
    alert(`Assigned ${id} as ${type}.`);
});

// Content Input Logic
document.getElementById('saveContent').addEventListener('click', () => {
    if (elements.length === 0) {
        alert('No elements to assign content to!');
        return;
    }

    const type = document.getElementById('elementType').value;
    const fileInput = document.getElementById('fileInput');
    const contentInput = document.getElementById('content');
    const currentElement = elements[elements.length - 1];

    if (type === 'table' || type === 'design') {
        fileInput.click(); // Trigger file upload
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                currentElement.content = { fileName: file.name, fileType: file.type };
                alert(`${file.name} assigned to ${currentElement.id}.`);
            }
        };
    } else {
        const content = contentInput.value.trim();
        if (!content) {
            alert('Content cannot be empty!');
            return;
        }
        currentElement.content = content;
        alert('Content saved!');
    }
});

// Export JSON Logic
document.getElementById('exportJSON').addEventListener('click', () => {
    const json = JSON.stringify({ elements }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elements.json';
    a.click();
});
