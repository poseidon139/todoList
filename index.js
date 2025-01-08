const createListBtn = document.getElementById('create-list-btn');
    const listNameInput = document.getElementById('list-name');
    const listsContainer = document.getElementById('lists-container');

    // Function to create a new to-do list
    createListBtn.addEventListener('click', () => {
      const listName = listNameInput.value.trim();
      if (listName) {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');

        todoContainer.innerHTML = `
          <h1>${listName}</h1>
          <form class="todo-form">
            <input type="text" class="todo-input" placeholder="Add a new task...">
            <button type="button" class="add-task-btn">Add</button>
          </form>
          <ul class="todo-list"></ul>
        `;

        listsContainer.appendChild(todoContainer);
        listNameInput.value = '';

        const addTaskBtn = todoContainer.querySelector('.add-task-btn');
        const todoInput = todoContainer.querySelector('.todo-input');
        const todoList = todoContainer.querySelector('.todo-list');

        // Add tasks to the specific list
        addTaskBtn.addEventListener('click', () => {
          const task = todoInput.value.trim();
          if (task) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <button class="check-btn">✔</button>
              <span>${task}</span>
              <button class="delete-btn">Delete</button>
            `;
            todoList.appendChild(listItem);
            todoInput.value = '';

            // Add complete functionality
            listItem.querySelector('.check-btn').addEventListener('click', () => {
              listItem.classList.toggle('completed');
            });

            // Add delete functionality
            listItem.querySelector('.delete-btn').addEventListener('click', () => {
              listItem.remove();
            });
          }
        });

        // Handle Enter key for adding tasks
        todoInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            addTaskBtn.click();
          }
        });
      }
    });

    // Handle Enter key for creating lists
    listNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        createListBtn.click();
      }
    });