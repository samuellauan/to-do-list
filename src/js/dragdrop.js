// Drag and Drop Cards
import { carregarTasks, salvarTasks } from './storage.js';

function saveKanbanState() {
    const columns = document.querySelectorAll('.cards');
    const state = {};
    const tasks = carregarTasks();

    columns.forEach(column => { 
        const columnParent = column.closest('.column');

        if (columnParent && columnParent.id) {
            const columnId = columnParent.id;
            const newStatus = columnParent.dataset.status;
            const cards = [...column.querySelectorAll('.card')];
        
            state[columnId] = cards.map(card => {
                const task = tasks.find(t => String(t.id) === String(card.id));
                
                if (task) {
                    task.status = newStatus;
                }
                return card.id;
            }).filter(id => id);
        }
    });

    localStorage.setItem('novaTaskCards', JSON.stringify(state));
    salvarTasks(tasks); 
    console.log("Estado e Status sincronizados!");
}

export function initDragAndDrop() {
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    })

    card.addEventListener('dragend', e=> {
        e.currentTarget.classList.remove('dragging');
        saveKanbanState();
    })
})
        
// Drag and Drop Columns
document.querySelectorAll('.cards').forEach(column => {
    column.addEventListener('dragover', e => {
    e.preventDefault();

    e.currentTarget.classList.add('cards-hover');
    const dragging = document.querySelector('.dragging');

    if (!dragging) return;

    const afterElement = getDragAfterElement(column, e.clientY);

    if (afterElement == null) {
        column.appendChild(dragging);
    } else {
        column.insertBefore(dragging, afterElement);
    }
    });

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-hover');
    })

    column.addEventListener('drop', e => {
        e.preventDefault();
        e.currentTarget.classList.remove('cards-hover');
        saveKanbanState();
    })
})
}   

function getDragAfterElement(column, y) {
    const draggableElements = [...column.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export function loadKanbanState() {
    const data = localStorage.getItem('novaTaskCards');
    
    // Se não houver nada salvo, não fazemos nada
    if (!data) return;

    const state = JSON.parse(data);

    // Percorre cada coluna salva (todo, doing, done)
    Object.keys(state).forEach(columnId => {
        // Encontra o container '.cards' dentro da coluna com o ID correspondente
        const columnContainer = document.querySelector(`#${columnId} .cards`);
        
        if (columnContainer) {
            state[columnId].forEach(cardId => {
                const card = document.getElementById(cardId);
                // Se o card existe no HTML, movemos ele para a coluna certa
                if (card) {
                    columnContainer.appendChild(card);
                }
            });
        }
    });
    
    console.log("Layout do Kanban restaurado!");
}