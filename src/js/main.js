// main.js corrigido
import { create, renderTasks } from './crud.js';
import { carregarTasks } from './storage.js';
import { initDragAndDrop, loadKanbanState } from './dragdrop.js';
import { toggleMode } from "./theme.js";

document.addEventListener('DOMContentLoaded', () => {
    toggleMode(); // Inicializa o tema salvo
    
    const tasks = carregarTasks(); // 1. Busca os objetos
    renderTasks(tasks);            // 2. Cria os cards no DOM
    setTimeout(() => {
        loadKanbanState();
        initDragAndDrop(); // Ativa os eventos por último
    }, 50);
    
    create();
});