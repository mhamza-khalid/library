let newBookInput = document.querySelector('.open-button'); // when add book button is hit
let modal = document.querySelector('.modal');
let form = document.querySelector('.form'); 
let cardsParent = document.querySelector('#cards') ;


let myLibrary = [];   //this array will contain book objects

newBookInput.addEventListener('click', ()=>{
        modal.showModal();
})

form.addEventListener('submit', addBookToLibrary);
form.addEventListener('submit', displayBooks);

window.addEventListener('click', (event)=>{ 

        console.log(event.target);

        if(event.target.className == 'read'){
                if(event.target.textContent == "Read Status: Yes"){
                        event.target.textContent = "Read Status: No";
                }
                else if(event.target.textContent == "Read Status: No"){
                        event.target.textContent = "Read Status: Yes"; 
                }
        }

        if(event.target.className == 'delete'){
                let deleteIndex = event.target.id;
                myLibrary.splice(deleteIndex,1);
                displayBooks();
        }

})

function Book(title, author, pages, read){   // Book object constructor used to make the book object
      
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

}
function addBookToLibrary(event){
        event.preventDefault();
        modal.close();

        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').value;

        let book = new Book(title,author,pages,read);

        myLibrary.push(book);  // appends book object to myLibrary array

        form.reset();   // clear form for next input
}

function displayBooks(){

        cardsParent.textContent = "";    //when cards are to be displayed, we remove all existing cards and start displaying cards from start of myLibrary array
        for (let i=0; i < myLibrary.length; i++){
                
              let card = document.createElement('div');  // the card containg book info
              card.setAttribute('class', 'card');

              let bookName = document.createElement('div');
              bookName.textContent = 'Title:' + ' ' + myLibrary[i].title;

              let bookAuthor = document.createElement('div');
              bookAuthor.textContent = 'Author:' + ' ' + myLibrary[i].author;

              let bookPages = document.createElement('div');
              bookPages.textContent = 'Pages:' + ' ' + myLibrary[i].pages;
              bookPages.setAttribute('class', 'pages')

              let readStatus = document.createElement('button');
              readStatus.textContent = 'Read Status:' + ' ' + myLibrary[i].read;
              readStatus.setAttribute('class', 'read');

              let deleteBook = document.createElement('button');
              deleteBook.textContent = 'Delete';
              deleteBook.setAttribute('class', 'delete');
              deleteBook.setAttribute('id', i);

        //       let editBook = document.createElement('button');
        //       editBook.textContent = 'Edit';
        //       editBook.setAttribute('class', 'edit');
        //       editBook.setAttribute('id', i);

              card.appendChild(bookName);    // attach elements to card
              card.appendChild(bookAuthor);
              card.appendChild(bookPages);
              card.appendChild(readStatus);
              card.appendChild(deleteBook);
        //       card.appendChild(editBook);  //will add edit when I get the time (wasn't a project requirement btw)

              cardsParent.appendChild(card);  // attach card to HTML document (cardsParent);

              let read = document.querySelectorAll('.read');
        }
}
