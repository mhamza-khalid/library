let newBookInput = document.querySelector('.open-button'); // when add book button is hit
let modal = document.querySelector('.modal');
let form = document.querySelector('.form'); 
let cardsParent = document.querySelector('#cards') ;


let myLibrary = [{title: 'Tintin',
                  author: 'Herge', 
                  pages: '63', 
                  read: 'Yes'},

                 {title: 'Meditations', 
                 author: 'Marcus Aurelius', 
                 pages: '308', 
                 read: 'No'}];   //this array will contain book objects (two intial books)

let editFlag = false;
let editIndex;

let titleEdit = document.querySelector('#title');
let authorEdit = document.querySelector('#author');
let pagesEdit = document.querySelector('#pages');
let readEdit = document.querySelector('#read');

displayBooks(); // to load initial 2 book objects in myLibrary array on first page load

newBookInput.addEventListener('click', ()=>{
        modal.showModal();
})

form.addEventListener('submit', addBookToLibrary);
form.addEventListener('submit', displayBooks);

window.addEventListener('click', (event)=>{ 

        // console.log(event.target);

        if(event.target.className == 'read'){
                 if(event.target.textContent == "Read Status: Yes"){
                         event.target.textContent = "Read Status: No";
                         myLibrary[event.target.id].read = 'No';
                        
                 }
                 else if(event.target.textContent == "Read Status: No"){
                         event.target.textContent = "Read Status: Yes"; 
                         myLibrary[event.target.id].read = 'Yes';
                 }

        }

        if(event.target.className == 'delete'){
                let deleteIndex = event.target.id; //the index at which object is to be removed
                myLibrary.splice(deleteIndex,1);   //remove that object from array
                displayBooks();                    //display new cards
        }

        if(event.target.className == 'edit'){

                editFlag = true;
                editIndex = event.target.id;

                console.log(event.target.id)

                modal.showModal();

                
                //to fill form with existing details of card to be edited
                titleEdit.value = myLibrary[editIndex].title;

                authorEdit.value = myLibrary[editIndex].author;

                pagesEdit.value = myLibrary[editIndex].pages;

                readEdit.value = myLibrary[editIndex].read;

        }

})

window.addEventListener('submit', ()=>{

        if(editFlag == true){
                             
                //to update myLibrary array with edited values
                myLibrary[editIndex].title = titleEdit.value;
                myLibrary[editIndex].author = authorEdit.value;
                myLibrary[editIndex].pages = pagesEdit.value;
                myLibrary[editIndex].read = readEdit.value; 
                
                form.reset();

                editFlag = false;
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

        if (editFlag == false){
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
        else{ return }
}

function displayBooks(){

     if(editFlag == false){

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
              readStatus.setAttribute('id', i);

              let deleteBook = document.createElement('button');
              deleteBook.textContent = 'Delete';
              deleteBook.setAttribute('class', 'delete');
              deleteBook.setAttribute('id', i);

              let editBook = document.createElement('button');
              editBook.textContent = 'Edit';
              editBook.setAttribute('class', 'edit');
              editBook.setAttribute('id', i);

              card.appendChild(bookName);    // attach elements to card
              card.appendChild(bookAuthor);
              card.appendChild(bookPages);
              card.appendChild(readStatus);
              card.appendChild(deleteBook);
              card.appendChild(editBook);  

              cardsParent.appendChild(card);  // attach card to HTML document (cardsParent);

              let read = document.querySelectorAll('.read');
        }
      }
      else {return}
}
