import { salvarTasks, carregarTasks } from './storage.js';
import { renderList } from './theme.js';

let tasks = carregarTasks();

// --- FUNÇÕES INTERNAS (AUXILIARES) ---

function createCardDOM(task) {
    const card = document.createElement('div');
    card.classList.add('card');
    // ADICIONA A CLASSE DE PRIORIDADE AQUI
    card.classList.add(`priority-${task.prioridade || 'low'}`);
    
    card.id = String(task.id);
    card.draggable = true;
    card.innerHTML = `
        <div class="card-title">${task.titulo}</div>
        <div class="card-list hidden">
            <span class="card-status">${formatStatus(task.status)}</span>
            <span class="card-priority">${formatPriority(task.prioridade)}</span>
            <span class="card-date">${formatDate(task.prazo)}</span>
        </div>
    `;  
    card.addEventListener('dragstart', e => e.currentTarget.classList.add('dragging'));
    card.addEventListener('dragend', e => e.currentTarget.classList.remove('dragging'));
    card.addEventListener('click', () => setupModal(task));

    return card;
}

function formatStatus(status) {
    const map = {
        afazer: 'A Fazer',
        fazendo: 'Em andamento',
        feito: 'Concluído'
    };
    return map[status] || status;
}

function formatPriority(priority) {
    const map = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta'
    };
    return map[priority] || priority;
}

function formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
}

// --- FUNÇÕES EXPORTADAS ---

export function create() {
    document.querySelectorAll('.add-card').forEach(btn => {
        btn.onclick = (e) => {
            const coluna = e.target.closest('.column');
            const listaCards = coluna.querySelector('.cards');
            
            // SEGURANÇA: Verifica se a coluna tem um ID
            const statusColuna = coluna.id; 
            if (!statusColuna) {
                console.error("ERRO: A coluna clicada não possui um ID no HTML!");
                return;
            }

            if (listaCards.querySelector('.input-card')) return;

            const input = document.createElement('input');
            input.classList.add('input-card');
            input.placeholder = "Nova tarefa...";
            listaCards.appendChild(input);
            input.focus();

            let jaSalvou = false; 

            const salvar = () => {
                if (jaSalvou) return;

                const valor = input.value.trim();
                if (valor) {
                    jaSalvou = true;
                    const newTask = {
                        id: `task-${Date.now()}`,
                        titulo: valor,
                        status: statusColuna, // Agora garantimos o ID da coluna
                        prazo: '',
                        descricao: '',
                        prioridade: 'low',
                        ordem: listaCards.querySelectorAll('.card').length
                    };
                    
                    tasks.push(newTask);
                    salvarTasks(tasks);
                    renderTasks(tasks);
                } else {
                    input.remove();
                }
            };

            input.onkeydown = (e) => { 
                if (e.key === 'Enter') { e.preventDefault(); salvar(); }
                if (e.key === 'Escape') { jaSalvou = true; input.remove(); }
            };

            input.onblur = salvar;
        };
    });
}

export function renderTasks(lista) {
    if (lista) tasks = lista;

    // Ordena as tasks pelo índice de 'ordem' antes de renderizar
    tasks.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

    const colunasContainers = document.querySelectorAll('.column .cards');
    colunasContainers.forEach(c => c.innerHTML = '');

    tasks.forEach(task => {
        const cardElement = createCardDOM(task);
        const container = document.querySelector(`#${task.status} .cards`);
        if (container) {
            container.appendChild(cardElement);
        }
    });
}

export function setupModal(task) {
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

    prioritySelect.value = task.prioridade || 'low';

    modal.classList.add('active');

    // EVENTO: SALVAR
    modal.querySelector('.btn-save').onclick = () => {
        task.titulo = titleInput.textContent;
        task.descricao = descInput.value;
        task.prazo = dateInput.value;

        task.prioridade = prioritySelect.value;
        
        renderList(tasks);
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