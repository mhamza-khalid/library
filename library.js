let myLibrary = [];

var j = 0 ;
const form = document.getElementById('form1');

form.addEventListener('submit', addBookToLibrary);  //fires when form is submitted is

function addBookToLibrary(event) {
  // do stuff here
  
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('choice').value;

  const book = new Book(title, author, pages, read);  // creates book through Book constructor
  myLibrary.push(book);         // adds book to myLibrary array

  form.reset();    //clears form inputs
  
  
    var element = document.createElement("div");   //creates a div for a new card
    element.className = "card";                    //assigns all cards to class = "card"
    var parent = document.getElementById("cards");   
    parent.appendChild(element);                  // append card to parent cards

    var cardElements = document.querySelectorAll(".card")   //creates a nodeList of all cards

    var cardArray = Array.from(cardElements);     //converts nodeList to an array

    cardArray[j].innerHTML =                      //seelcts current card and adds content to it
        "<div>Title: " + myLibrary[j].title + "</div>" +
        "<div>Author: " + myLibrary[j].author + "</div>" +
        "<div>No. of pages: " + myLibrary[j].pages + "</div>" +
        "<button class='readT'>Read Status: " + myLibrary[j].read + "</button>" +
        "<div><button class='delete'>Delete</button></div>";
    
        const deleteB = document.querySelectorAll('.delete'); 
        const deleteArray = Array.from(deleteB);
        deleteArray.forEach((deleteButton, index) => {
          deleteButton.addEventListener('click', () => {
            deleteButton.parentElement.parentElement.remove();  //remove  div then upper div (card)
            myLibrary.splice(index,1);    //remove element from object
            cardArray.splice(index,1);
            j =  cardArray.length;        //next index update
          });
        });
        const read1 = document.querySelectorAll('.readT');  //toggle read status
        const read2 = Array.from(read1);
        read2.forEach((element2, index)=>{
            element2.addEventListener('click', ()=>{
              if(myLibrary[index].read === "yes"){
                myLibrary[index].read = "no";
              }
              else{
                myLibrary[index].read = "yes";
              }
              element2.textContent = "Read Status: " + myLibrary[index].read;
            });
        });
        

    j =  cardArray.length;                    // moves to next object in array conatining objects
  
}

function Book (title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

