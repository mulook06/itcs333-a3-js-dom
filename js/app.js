document.addEventListener('DOMContentLoaded', function() {

let input =document.querySelector('#todo-input');
let addButton =document.querySelector('#add-btn');
let todoList =document.querySelector('#todo-list');
let errorMsg =document.querySelector('#error-msg');
let todoForm = document.querySelector('#todo-form');
let deleteButton = document.querySelector('#delete-btn');
let filterAlBtn = document.getElementById('filter-all');
let filterActiveBtn = document.getElementById('filter-active');
let filterCompletedBtn = document.getElementById('filter-done');
let counter = document.querySelector('#counter');

let itemsArray = [];

function updateCounter() {
    const activeTasks = todoList.querySelectorAll('li:not(.completed)');
    counter.textContent = activeTasks.length;
    counter.textContent = `${activeTasks.length} items left`;
}

todoForm.addEventListener('submit', function(event) 
{
 event.preventDefault();
 const inputValue = input.value.trim();
 //empty submission 
 if (inputValue === '')
    {    
        errorMsg.classList.remove('hidden');
        return;
    }
 
    errorMsg.classList.add('hidden');

    itemsArray.push(inputValue);
    console.log("saved items array" , itemsArray);

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

updateCounter();

//event delegation 
todoList.addEventListener('click', function(event) {
        const li = event.target.closest('li');
        if (!li) return; // If clicked outside an li, ignore

        // If the delete button was clicked
        if (event.target.classList.contains('delete-btn')) {
            const spanText = li.querySelector('.item-text').textContent;
            const itemIndex = itemsArray.indexOf(spanText);
            if (itemIndex > -1) {
                itemsArray.splice(itemIndex, 1);
            }
            li.remove();
            updateCounter();
        } 
        // Otherwise, toggle completion on the list item
        else {
            li.classList.toggle('completed');
            updateCounter();
        }
    });

//show all tasks 
filterAlBtn.addEventListener('click', function()
{
  const tasks = todoList.querySelectorAll('li');
  tasks.forEach(li => {li.style.display = 'flex'; });
});


//show only active tasks
filterActiveBtn.addEventListener('click', function()
{
  const tasks = todoList.querySelectorAll('li');  
  tasks.forEach(li =>
  { 
    if (li.classList.contains('completed')){li.style.display = 'none';
      
    }else{
      li.style.display = 'flex';
    }
  })
});

//show only done tasks 
filterCompletedBtn.addEventListener('click', function()
{
  const tasks = todoList.querySelectorAll('li');
  tasks.forEach(li => {
    if (li.classList.contains('completed')) {
       li.style.display = 'flex'; 

       } else {
       li.style.display = 'none';
       }
     }
    )
});


});
