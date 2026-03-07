// CRUD
import { salvarTasks, carregarTasks } from './storage.js';

let tasks = carregarTasks();

export function create() {
    let listaAfazer = [];

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
            })

            function salvar () {
                const valor = input.value.trim();
                if (!valor) {
                    input.remove();
                    return;
                }

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

            input.addEventListener('blur', salvar);
            
        })
        
    })

}

export function renderTasks(tasks) {

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
