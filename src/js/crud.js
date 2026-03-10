// CRUD
import { salvarTasks, carregarTasks } from './storage.js';

let tasks = carregarTasks();

export function create() {

    document.querySelectorAll('.add-card').forEach(btn => {
        btn.addEventListener('click', e => {

            const coluna = e.target.closest('.column');
            const listaCards = coluna.querySelector('.cards');

            const input = document.createElement('input');
            input.classList.add('input-card');

            listaCards.appendChild(input);

            input.focus();
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    salvar();
                }

                 if (e.key === 'Escape') {
                    cancelou = true;
                    input.remove();
                }
            })

            input.addEventListener('blur', salvar);

            let salvou = false;
            let cancelou = false;

            function salvar () {
                if (salvou || cancelou) return;

                const valor = input.value.trim();
                if (!valor) {
                    input.remove();
                    return;
                }

                salvou = true;

                const status = coluna.dataset.status;

                const task = {
                    id: Date.now(),
                    titulo: valor,
                    status: status
                };

                tasks.push(task);
                salvarTasks(tasks);
                
                const card = document.createElement('div');
                card.classList.add('card');
                card.textContent = valor ;
                card.draggable = true;

                card.addEventListener('dragstart', e => {
                    e.currentTarget.classList.add('dragging');
                });

                card.addEventListener('dragend', e => {
                    e.currentTarget.classList.remove('dragging');
                });
                
                listaCards.replaceChild(card, input);
            }
            
        })
        
    })

}

export function renderTasks(tasks) {
    const colunas = document.querySelectorAll('collumn .cards');

    colunas.forEach(coluna => {
        coluna.innerHTML = '';
    });

    tasks.forEach(task => {

        const coluna = document.querySelector(
            `.column[data-status="${task.status}"]`
        );

        const listaCards = coluna.querySelector('.cards');

        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = task.titulo;
        card.draggable = true;

        card.dataset.id = task.id;

        card.addEventListener('dragstart', e => {
            e.currentTarget.classList.add('dragging');
        });

        card.addEventListener('dragend', e => {
            e.currentTarget.classList.remove('dragging');
        });

        listaCards.appendChild(card);

    });

}
