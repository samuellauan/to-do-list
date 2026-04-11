import { create, renderTasks, setupModal } from './crud.js';
import { carregarTasks } from './storage.js';
import { initDragAndDrop } from './dragdrop.js'; // REMOVIDO: loadKanbanState
import { toggleMode, toggleView } from "./theme.js";

let tasks = [];

function initStatusTabs() {
    const tabs = document.querySelectorAll('.status-tab');
    const columns = document.querySelectorAll('.column');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            tabs.forEach(t => t.classList.remove('active'));
            columns.forEach(c => c.classList.remove('active-mobile'));

            tab.classList.add('active');
            const targetColumn = document.getElementById(targetId);
            
            if (targetColumn) {
                targetColumn.classList.add('active-mobile');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    toggleMode(); 

    tasks = carregarTasks(); 
    
    renderTasks(tasks); 
    
    initDragAndDrop(); 
    
    create();
    initStatusTabs();

    const btnBoard = document.getElementById('btn-board');
    const btnList = document.getElementById('btn-list');

    btnList.onclick = () => toggleView('list', tasks, setupModal);
    btnBoard.onclick = () => toggleView('board', tasks, setupModal);
});