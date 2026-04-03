import { salvarTasks, carregarTasks } from './storage.js';

let tasks = carregarTasks();

// --- FUNÇÕES INTERNAS (AUXILIARES) ---

function setupModal(task) {
    const modal = document.querySelector('#task-modal');
    const prioritySelect = document.querySelector('#modal-priority');
    const titleInput = document.querySelector('#modal-title');
    const descInput = document.querySelector('#modal-desc');
    const dateInput = document.querySelector('#modal-due-date');
    const statusText = document.querySelector('#modal-status-text');

    // 1. Sincroniza o status com a coluna real onde o card está
    const cardNoDom = document.getElementById(task.id);
    if (cardNoDom) {
        task.status = cardNoDom.closest('.column').id;
    }

    // Preenche campos
    titleInput.textContent = task.titulo;
    descInput.value = task.descricao || '';
    dateInput.value = task.prazo || '';
    statusText.textContent = task.status.toUpperCase();

    prioritySelect.value = task.prioridade || 'medium';

    modal.classList.add('active');

    // EVENTO: SALVAR
    modal.querySelector('.btn-save').onclick = () => {
        task.titulo = titleInput.textContent;
        task.descricao = descInput.value;
        task.prazo = dateInput.value;

        task.prioridade = prioritySelect.value;
        
        salvarTasks(tasks);
        renderTasks(tasks);
        modal.classList.remove('active');
    };

    // EVENTO: CONCLUIR (Move para a coluna 'feito')
    modal.querySelector('.btn-complete').onclick = () => {
        task.status = 'feito';
        salvarTasks(tasks);
        renderTasks(tasks);
        modal.classList.remove('active');
    };

    // EVENTO: EXCLUIR (Com Confirmação)
    modal.querySelector('.btn-delete').onclick = () => {
        if (confirm(`Deseja realmente apagar a tarefa "${task.titulo}"?`)) {
            tasks = tasks.filter(t => t.id !== task.id); // Remove do array
            salvarTasks(tasks);
            renderTasks(tasks);
            modal.classList.remove('active');
        }
    };

    // Fechar Modal
    modal.querySelector('.close-modal').onclick = () => modal.classList.remove('active');
}

function createCardDOM(task) {
    const card = document.createElement('div');
    card.classList.add('card');
    // ADICIONA A CLASSE DE PRIORIDADE AQUI
    card.classList.add(`priority-${task.prioridade || 'medium'}`);
    
    card.id = String(task.id);
    card.draggable = true;
    card.innerHTML = `<div class="card-content">${task.titulo}</div>`;

    card.addEventListener('dragstart', e => e.currentTarget.classList.add('dragging'));
    card.addEventListener('dragend', e => e.currentTarget.classList.remove('dragging'));
    card.addEventListener('click', () => setupModal(task));

    return card;
}

// --- FUNÇÕES EXPORTADAS ---

export function create() {
    document.querySelectorAll('.add-card').forEach(btn => {
        btn.onclick = (e) => {
            const coluna = e.target.closest('.column');
            const listaCards = coluna.querySelector('.cards');
            if (listaCards.querySelector('.input-card')) return;

            const input = document.createElement('input');
            input.classList.add('input-card');
            input.placeholder = "Nova tarefa...";
            listaCards.appendChild(input);
            input.focus();

            const salvar = () => {
                const valor = input.value.trim();
                if (valor) {
                    const newTask = {
                        id: `task-${Date.now()}`,
                        titulo: valor,
                        status: coluna.id,
                        prazo: '',
                        descricao: ''
                    };
                    tasks.push(newTask);
                    salvarTasks(tasks);
                    renderTasks(tasks);
                } else {
                    input.remove();
                }
            };

            input.onkeydown = (e) => { if (e.key === 'Enter') salvar(); };
            input.onblur = salvar;
        };
    });
}

export function renderTasks(lista) {
    if (lista) tasks = lista;
    const colunas = document.querySelectorAll('.column .cards');
    colunas.forEach(c => c.innerHTML = '');

    tasks.forEach(task => {
        const cardElement = createCardDOM(task);
        const container = document.querySelector(`#${task.status} .cards`);
        if (container) container.appendChild(cardElement);
    });
}