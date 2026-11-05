document.addEventListener('DOMContentLoaded', () => 
    {

  const form      = document.getElementById('todo-form');
  const input     = document.getElementById('todo-input');
  const errorMsg  = document.getElementById('error-msg');
  const list      = document.getElementById('todo-list');
  const counter   = document.getElementById('counter');
  const filterAll    = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone   = document.getElementById('filter-done');

  let currentFilter = 'all';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'x';

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);

    input.value = '';
    updateCounter();
    applyFilter();
  });

  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }

    updateCounter();
    applyFilter();
  });

  // filter buttons
  filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });

  filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });

  filterDone.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });

  function updateCounter() {
    const items = list.getElementsByTagName('li');
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      if (!items[i].classList.contains('completed')) {
        count++;
      }
    }
    counter.textContent = count + ' item(s) left';
  }

  function applyFilter() {
    const items = list.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
      const done = items[i].classList.contains('completed');
      let show = true;

      if (currentFilter === 'active' && done) show = false;
      if (currentFilter === 'done' && !done) show = false;

      if (show) {
        items[i].classList.remove('hidden');
      } else {
        items[i].classList.add('hidden');
      }
    }
  }

  updateCounter();

});
