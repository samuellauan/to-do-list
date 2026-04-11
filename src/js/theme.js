// Toggle Light/Dark Mode
export function toggleMode() {
  const html = document.documentElement;
  const btnSwitch = document.querySelector('#switch');

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    html.classList.add('light');
  } else {
    html.classList.remove('light');
}

  btnSwitch.addEventListener('click', () => {
    document. documentElement.classList.toggle("light")
    
    if (html.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
  })
 
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

export function renderList(tasks, onClickTask) {
    if (typeof onClickTask !== 'function') {
      console.error('onClickTask não é função:', onClickTask);
      return;
    }

    const listBody = document.getElementById('list-body');
    listBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('div');
        row.classList.add('list-row');

        row.innerHTML = `
            <span>${task.titulo}</span>
            <span>${formatStatus(task.status)}</span>
            <span>${formatPriority(task.prioridade)}</span>
            <span>${formatDate(task.prazo)}</span>
        `;

        row.addEventListener('click', () => onClickTask(task));

        listBody.appendChild(row);
    });    
}

const btnBoard = document.getElementById('btn-board');
const btnList = document.getElementById('btn-list');
const board = document.getElementById('view-board');

export function toggleView(view, tasks, onClickTask) {
    const board = document.getElementById('view-board');
    const list = document.getElementById('view-list');

    btnBoard.classList.remove('active');
    btnList.classList.remove('active');

    if (view === 'list') {
        btnList.classList.add('active');

        board.style.display = 'none';
        list.style.display = 'block';

        renderList(tasks, onClickTask); // 🔥 AQUI

    } else {
        btnBoard.classList.add('active');

        board.style.display = 'flex';
        list.style.display = 'none';
    }
}