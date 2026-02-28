// Drag and Drop Cards
export function initDragAndDrop() {
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    })

    card.addEventListener('dragend', e=> {
        e.currentTarget.classList.remove('dragging');
    })
})

// Drag and Drop Columns
document.querySelectorAll('.cards').forEach(column => {
    column.addEventListener('dragover', e => {
    e.preventDefault();
    e.currentTarget.classList.add('cards-hover');
    const dragging = document.querySelector('.dragging');
    const cards = [...column.querySelectorAll('.card:not(.dragging)')];

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
        e.currentTarget.classList.remove('cards-hover');
  
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