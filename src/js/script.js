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


  function render(){
    for(const data of dataSource.books){
      /*generate HTML based on template */
      const generateHTML = templates.book(data);

      /*create element using utils.createElementFromHTML */
      const elementHTML = utils.createDOMFromHTML(generateHTML);

      /*add element to menu */
      booksWrapper.appendChild(elementHTML);
    }
  }

  render();

  }
























}
