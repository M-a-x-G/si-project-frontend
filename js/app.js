var App = Ember.Application.create({});
App.ApplicationAdapter = DS.FixtureAdapter;


//App.ApplicationAdapter = DS.RESTAdapter.extend({
//    namespace: 'api/v1',
//    host: 'http://localhost:8080'
//});

App.Router.map(function () {
    this.resource('books');
    this.resource('book', {path: '/books/:book_id'});
    this.route('new_book');
    this.route('search');
    this.route('about');
    //this.resource('posts', function() {
    //  this.resource('post', { path: ':post_id' });
    //});
});

//
//App.BooksRoute = Ember.Route.extend({
//    model: function () {
//        return books;
//    }
//});


App.NewBookController = Ember.ObjectController.extend({
    actions: {
        submitBook: function (book) {
            var bookToSend = this.store.createRecord("book", {
                title: book.title,
                author: book.author,
                year: book.year,
                publisher: book.publisher
            });

            var onSuccess = function (book) {
                this.transitionToRoute('books.show', book);
            };

            var onFail = function (book) {
                // deal with the failure here
            };

            //bookToSend.save().then(onSuccess, onFail);
            bookToSend.save();

            //alert("Created book " + book.year + " with author " + book.cover + ".");
        },
        cancelUserCreation: function () {
            alert("Canceled user creation.");
        }
    }
});

App.NewBookFormComponent = Ember.Component.extend({
    actions: {
        submit: function () {
            this.sendAction('submit', {
                title: this.get('title'),
                author: this.get('author'),
                year: this.get('year'),
                publisher: this.get('publisher'),
                cover: this.get('cover')
            });
        }
    }
});

App.BooksRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll("book");
    }
});


App.Book = DS.Model.extend({
    title: DS.attr("string"),
    author: DS.attr("string"),
    year: DS.attr("number"),
    publisher: DS.attr("string"),
    isbn: DS.attr("string")
    //cover: DS.attr("string"),
    //excerpt: DS.attr("string")
});

//App.Books = DS.Model.extend({
//    lineItems: DS.hasMany('book')
//});

App.Book.reopenClass({
    FIXTURES: [
        {
            id: '1',
            title: "Necronomicon",
            author: "Devil",
            year: "666",
            publisher: "Hell inc.",
            isbn: "666-666-666-666",
            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '2',
            title: "Never Bet the Devil",
            author: "Orin Gray",
            year: "2011",
            publisher: "Wer weiss",
            isbn: "666-666-666-666",
            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '3',
            title: "Necronomicon",
            author: "Devil",
            year: "666",
            publisher: "Hell inc.",
            isbn: "666-666-666-666",
            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '4',
            title: "Never Bet the Devil",
            author: "Orin Gray",
            year: "2011",
            publisher: "Wer weiss",
            isbn: "666-666-666-666",
            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '5',
            title: "Necronomicon",
            author: "Devil",
            year: "666",
            publisher: "Hell inc.",
            isbn: "666-666-666-666",
            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '6',
            title: "Never Bet the Devil",
            author: "Orin Gray",
            year: "2011",
            publisher: "Wer weiss",
            isbn: "666-666-666-666",
            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '7',
            title: "Necronomicon",
            author: "Devil",
            year: "666",
            publisher: "Hell inc.",
            isbn: "666-666-666-666",
            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }, {
            id: '8',
            title: "Never Bet the Devil",
            author: "Orin Gray",
            year: "2011",
            publisher: "Wer weiss",
            isbn: "666-666-666-666",
            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
        }
    ]
});


//App.PostRoute = Ember.Route.extend({
//  model: function(params) {
//    return posts.findBy('id', params.post_id);
//  }
//});
//
//App.PostController = Ember.ObjectController.extend({
//  isEditing: false,
//
//  actions: {
//    edit: function() {
//      this.set('isEditing', true);
//    },
//
//    doneEditing: function() {
//      this.set('isEditing', false);
//    }
//  }
//});
//
//var showdown = new Showdown.converter();
//
//Ember.Handlebars.helper('format-markdown', function(input) {
//  return new Handlebars.SafeString(showdown.makeHtml(input));
//});
//
//Ember.Handlebars.helper('format-date', function(date) {
//  return moment(date).fromNow();
//});