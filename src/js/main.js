import { create, renderTasks } from './crud.js';
import { carregarTasks } from './storage.js';
import { initDragAndDrop } from './dragdrop.js'; // REMOVIDO: loadKanbanState
import { toggleMode } from "./theme.js";

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
    
    // 1. Carrega os dados brutos do LocalStorage
    const tasks = carregarTasks(); 
    
    // 2. O renderTasks cria os elementos no DOM nas colunas certas (pelo ID)
    renderTasks(tasks); 
    
    // 3. AGORA que os cards existem no HTML, ativamos o Drag and Drop neles
    initDragAndDrop(); 
    
    create();
    initStatusTabs();
});