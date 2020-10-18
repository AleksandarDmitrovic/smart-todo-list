const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};
const createTodoInstance = function(todo) {
  const title = escape(todo.title);
  const $instance = `
  <div class="to-do-instance">
    <p>${title}</p>
    <span>
      <button class="btn btn-outline-secondary">Edit</button>
      <button class="btn btn-outline-danger">Delete</button>
    </span>
  </div>`;

  return $instance;
};

$(() => {

  //Ajax get request of todos data
  $('.filter button').on('click', function(event) {
    event.preventDefault();

    let category = event.target.parentElement;
    let categoryID = ($(category).data('filter')).toString();
    // console.log('categoryID :', categoryID);

    //Empty todos container
    $(".todos_container").empty();

    $.ajax({
      method: "GET",
      url: `/api/categories/${categoryID}`
    }).done((todos) => {
      for (const todo of todos) {
        const todoInstance = createTodoInstance(todo);
        $(".todos_container").append(todoInstance);
      }
    });

  // $('.to-do-instance').on('click', function(event) {
  //   event.preventDefault();
  //   alert('test');
  });

});
