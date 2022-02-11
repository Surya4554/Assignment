class Book{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class Store{
    static getBooks(){
        let books
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks()
        books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

class UI{
    static displayBooks(){
        const books = Store.getBooks()
        books.forEach((book) => UI.addBoookToList(book))
    }
    static addBoookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }
    static clearFields(){
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container")
        const form = document.getElementById("book-form")
        container.insertBefore(div,form)

        setTimeout(() =>{
               document.querySelector('.alert').remove()
        }, 4000)
    }
    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
        }
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-list').addEventListener('click', function(e){
     UI.deleteBook(e.target)
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
     UI.showAlert("Book and It's information Successfully Deleted","success")
})

document.addEventListener('submit', function(e){
    e.preventDefault()
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value

    if(title ==="" || author ==="" || isbn ===""){
        UI.showAlert("Please Enter All The Fields","danger")
    }else{
        const book = new Book(title, author, isbn)
        UI.addBoookToList(book)
        Store.addBook(book)
        UI.showAlert("Your Book Information is Successfully Added", "success")
        UI.clearFields()
    }
})