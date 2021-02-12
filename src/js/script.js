{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
    bookImage: 'book__image',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();

    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector(select.containerOf.bookList);
      thisBooksList.filtersContainer = document.querySelector(select.containerOf.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

    }

    render(){
      const thisBooksList = this;

      for(let books of dataSource.books){
        const generatedHTML = templates.bookTemplate(books); //wygenerowanie kodu HTML
        const element = utils.createDOMFromHTML(generatedHTML);//wygeneruj element DOM
        thisBooksList.bookContainer.appendChild(element);// element DOM dołącz jako nowe dziecko DOM do listy .books-list

      }
    }

    initActions(){ // nie dziala klikanie
      const thisBooksList = this;

      thisBooksList.bookContainer.addEventListener('dbClick', function(event){
        event.preventDefault();

        const clickedElement = event.target.offsetParent; //Element, od którego obliczane są wszystkie przesunięcia.

        if(clickedElement.classList.contains(select.bookImage)) {
          const bookId = clickedElement.getAttribute('data-id');

          if(clickedElement.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(bookId);
            clickedElement.classList.add(classNames.favoriteBook);
          }
          else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
            clickedElement.classList.remove(classNames.favoriteBook);
          }
        }

      });

      // filtrowanie książek przy użyciu formularza

      thisBooksList.filtersContainer.addEventListener('click', function(event){
        const clickedElement = event.target; //?????

        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name ==='filter'){

          if(clickedElement.checked){
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const id = thisBooksList.filters.indexOf(clickedElement.value);
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(id), 1);
          }
        }

        console.log('filter', clickedElement.value);

        thisBooksList.filterBooks();

      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(let hiddenBook of dataSource.books){

        let shouldBeHidden = false;

        for(let filter of thisBooksList.filters){
          if(!hiddenBook.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        const book = document.querySelector('.book__image[data-id="' + hiddenBook.id + '"]');

        if(shouldBeHidden){
          book.classList.add(classNames.hidden);
        }
        else {
          book.classList.remove(classNames.hidden);
        }
      }
    }









  }

  const app = new BooksList();




}
