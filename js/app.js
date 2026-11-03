(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const input = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');
    const errorMsg = document.querySelector('#error-msg');
    const todoForm = document.querySelector('#todo-form');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-done');
    const counter = document.querySelector('#counter');

    let itemsArray = [];

    // Add item (button click or Enter both trigger submit)
    todoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const inputValue = input.value.trim();

      if (inputValue === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
      errorMsg.classList.add('hidden');

      itemsArray.push(inputValue);

      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = inputValue;
      span.classList.add('item-text');
      li.appendChild(span);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      input.value = '';
      updateCounter();
    });

    // Event delegation: ONE listener on #todo-list
    todoList.addEventListener('click', function (event) {
      const li = event.target.closest('li');
      if (!li) return;

      if (event.target.classList.contains('delete-btn')) {
        const text = li.querySelector('.item-text').textContent;
        const idx = itemsArray.indexOf(text);
        if (idx > -1) itemsArray.splice(idx, 1);
        li.remove();
      } else {
        li.classList.toggle('completed');
      }
      updateCounter();
    });

    // Filters
    filterAllBtn.addEventListener('click', function () {
      applyFilter(function () { return true; });
    });

    filterActiveBtn.addEventListener('click', function () {
      applyFilter(function (li) { return !li.classList.contains('completed'); });
    });

    filterCompletedBtn.addEventListener('click', function () {
      applyFilter(function (li) { return li.classList.contains('completed'); });
    });

    updateCounter();

    // ---- Helpers (hoisted; placed after all listeners on purpose) ----
    function getItems() {
      return Array.from(todoList.children);
    }

    function updateCounter() {
      const n = getItems().filter(function (li) {
        return !li.classList.contains('completed');
      }).length;
      counter.textContent = n + (n === 1 ? ' item' : ' items') + ' left';
    }

    function applyFilter(predicate) {
      getItems().forEach(function (li) {
        li.style.display = predicate(li) ? 'flex' : 'none';
      });
    }
  }
})();