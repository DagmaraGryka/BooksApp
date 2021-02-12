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

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();

    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector(select.containerOf.bookList);
    }

    render(){
      const thisBooksList = this;

      for(let books of dataSource.books){
        const generatedHTML = templates.bookTemplate(books); //wygenerowanie kodu HTML
        const element = utils.createDOMFromHTML(generatedHTML);//wygeneruj element DOM
        thisBooksList.bookContainer.appendChild(element);// element DOM dołącz jako nowe dziecko DOM do listy .books-list

      }
    }







  }

  const app = new BooksList();

  app.init();


}
