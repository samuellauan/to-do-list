import { carregarTasks, salvarTasks } from './storage.js';

function saveKanbanState() {
    const tasks = carregarTasks();
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        const columnId = column.id;
        const cards = [...column.querySelectorAll('.card')]; // Pega a ordem visual atual

        cards.forEach((card, index) => {
            const task = tasks.find(t => String(t.id) === String(card.id));
            if (task) {
                task.status = columnId;
                task.ordem = index; // Salva a posição (0, 1, 2...) naquela coluna
            }
        });
    });

    // Ordena o array principal por ordem antes de salvar, para garantir consistência
    tasks.sort((a, b) => a.ordem - b.ordem);

    salvarTasks(tasks);
    console.log("Posições e status salvos com sucesso!");
}

export function initDragAndDrop() {
    // Eventos dos Cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', e => e.currentTarget.classList.add('dragging'));
        card.addEventListener('dragend', e => {
            e.currentTarget.classList.remove('dragging');
            saveKanbanState();
        });
    });

    // Eventos das Colunas
    document.querySelectorAll('.cards').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('cards-hover');
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;

            const afterElement = getDragAfterElement(column, e.clientY);
            if (afterElement == null) {
                column.appendChild(dragging);
            } else {
                column.insertBefore(dragging, afterElement);
            }
        });

        column.addEventListener('dragleave', () => column.classList.remove('cards-hover'));
        
        column.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('cards-hover');
            saveKanbanState();
        });
    });
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