Vou criar o CRUD para os cards de tarefas
a lógica é:
    -adicionar um novo card com o símbolo de adicionar(+)

    -quando clicar no card, abrir um modal para editar a tarefa, ver detalhes, 
     prioridades, futuramente arquivos anexados, data de entrega, opção para exluir 
     e marcar como concluída(indo automaticamente para a coluna de concluídas)

    -dentro do modal deve conter título com o nome da tarefa, 
     logo abaixo prioridade e data de entrega um ao lado do outro,
     no meio a descrição da tarefa   

PALETAS:

    dark mode(root):
        --text-color: white;
        --cor-header: #151528;
        --cor-body: #0F0F1A;
        --cor-coluna: #1C1C33;
        --cor-card: #242447;
        --cor-titulo: #E4E4F0;
        --cor-texto: #A0A0B8;
        --cor-addCard: #E4E4F0;
        --cor-theme: #E4E4F0;
        --shadow-card-hover: 0 12px 24px rgba(0, 0, 0, 0.6);
        --card-hover: #212132;

    ligth mode(var):
        --text-color: black;
        --cor-header: rgba(255, 255, 255, 0.8);
        --cor-body: #F8FAFC;
        --cor-coluna: #FFFFFF;
        --cor-card: #FAF9FF;
        --cor-titulo: #1A1A1A;
        --cor-texto: #242424;
        --cor-addCard: #000000;
        --cor-theme: #000000;
        --border-header: #E2E8F0;
        --border-column: #E5EAF2;
        --border-card: #E2E8F0;
        --shadow-card: 0 2px 8px rgba(15, 23, 42, 0.06);
        --shadow-card-hover: 0 12px 24px rgba(15, 23, 42, 0.10);
        --card-hover: #E2E8F0;

 <input type="date"> para criar calendário