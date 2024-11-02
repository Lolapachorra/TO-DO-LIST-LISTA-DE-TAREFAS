// URL base da API
const apiUrl = 'http://localhost:3000/api/tarefas';

// Função para carregar e exibir as tarefas
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        if (task.custo >= 1000) taskDiv.classList.add('expensive');

        taskDiv.innerHTML = `
            <span>${task.nome} - R$${task.custo.toFixed(2)} - ${task.data_limite}</span>
            <div class="buttons">
                <button onclick="moveTaskUp(${task.id})">↑</button>
                <button onclick="moveTaskDown(${task.id})">↓</button>
                <button onclick="editTask(${task.id})">✎ Editar</button>
                <button onclick="deleteTask(${task.id})">🗑️ Excluir</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}

// Mostrar formulário de inclusão
function showAddTaskForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskName').value = '';
    document.getElementById('taskCost').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('formTitle').textContent = 'Adicionar Tarefa';
    document.getElementById('taskFormModal').style.display = 'block';
}

// Mostrar formulário de edição
async function editTask(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const task = await response.json();

    document.getElementById('taskId').value = task.id;
    document.getElementById('taskName').value = task.nome;
    document.getElementById('taskCost').value = task.custo;
    document.getElementById('taskDeadline').value = task.data_limite;
    document.getElementById('formTitle').textContent = 'Editar Tarefa';
    document.getElementById('taskFormModal').style.display = 'block';
}

// Fechar formulário
function closeTaskForm() {
    document.getElementById('taskFormModal').style.display = 'none';
}

// Salvar tarefa e recarregar a lista
async function saveTask() {
    const id = document.getElementById('taskId').value;
    const taskData = {
        nome: document.getElementById('taskName').value,
        custo: parseFloat(document.getElementById('taskCost').value),
        data_limite: document.getElementById('taskDeadline').value
    };

    // Decide entre criar ou atualizar a tarefa
    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    }

    closeTaskForm(); // Fecha o modal
    loadTasks(); // Recarrega e exibe a lista de tarefas
}

// Excluir tarefa
async function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        loadTasks(); // Recarrega e exibe a lista de tarefas após exclusão
    }
}

// Mover tarefa para cima
async function moveTaskUp(id) {
    await fetch(`${apiUrl}/${id}/up`, { method: 'PUT' });
    loadTasks(); // Recarrega e exibe a lista de tarefas após mover para cima
}

// Mover tarefa para baixo
async function moveTaskDown(id) {
    await fetch(`${apiUrl}/${id}/down`, { method: 'PUT' });
    loadTasks(); // Recarrega e exibe a lista de tarefas após mover para baixo
}

// Carregar as tarefas ao iniciar
loadTasks();
