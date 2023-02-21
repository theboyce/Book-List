//Book Constructor

function Book(title, author, isbn){
this.title = title;
this.author = author;
this.isbn = isbn;
}

//UI Constructor

function UI(){
}

//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create a tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class= "delete">x<a></td>
        `;

list.appendChild(row);
};

//Show Alert
UI.prototype.showAlert = function(message, className){
    //create div
    const div =document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));

    //Get a parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //set alert to dissappear after 3 seconds

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}

//Delete book

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
};

//clear fields
UI.prototype.clearFields = function(){
     document.getElementById('title').value = '';
     document.getElementById('author').value = '';
     document.getElementById('isbn').value = '';
};




//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){


//Get form value
 const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

//Instantiate book
const book = new Book(title, author, isbn);

//Instatiate UI
const ui = new UI();

//validate 
if(title === '' || author === '' || isbn === '' ){  
    //show alert
    ui.showAlert('Please fill in all the fields', 'error');

}else {
    //Add book to list
ui.addBookToList(book);

ui.showAlert('Book Added!', 'success')

//clear fields
ui.clearFields();
}




 e.preventDefault();
});

//Even listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

//instantiate UI
const ui = new UI();

//Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Booked Removed!','success')
    e.preventDefault();
})