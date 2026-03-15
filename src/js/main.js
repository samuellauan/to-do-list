import { create, renderTasks } from './crud.js';
import { carregarTasks } from './storage.js';
import { initDragAndDrop, loadKanbanState } from './dragdrop.js';
import { toggleMode } from "./theme.js";

function initStatusTabs() {
    const tabs = document.querySelectorAll('.status-tab');
    const columns = document.querySelectorAll('.column');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target; // Ex: "afazer"
            
            // 1. Remove classes ativas de todos
            tabs.forEach(t => t.classList.remove('active'));
            columns.forEach(c => c.classList.remove('active-mobile'));

            // 2. Adiciona no elemento clicado
            tab.classList.add('active');
            const targetColumn = document.getElementById(targetId);
            
            if (targetColumn) {
                targetColumn.classList.add('active-mobile');
                console.log("Mostrando coluna:", targetId);
            } else {
                console.warn("Coluna não encontrada para o ID:", targetId);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    toggleMode(); // Inicializa o tema salvo
    
    const tasks = carregarTasks(); // 1. Busca os objetos
    renderTasks(tasks);            // 2. Cria os cards no DOM
    setTimeout(() => {
        loadKanbanState();
        initDragAndDrop(); // Ativa os eventos por último
    }, 50);
    
    create();
    initStatusTabs()
});