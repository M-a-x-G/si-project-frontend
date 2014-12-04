var App = Ember.Application.create({
LOG_TRANSITIONS: true
});
//App.ApplicationAdapter = DS.FixtureAdapter;


App.ApplicationAdapter = DS.RESTAdapter.extend({
    //namespace: 'api/v1',
    host: 'http://localhost:8080'
});

App.SpringSerializer = DS.RESTSerializer.extend({
    serializeIntoHash: function (hash, type, record, options) {
        var serialized = this.serialize(record, options);

        //Include the id in the payload
        //Jackson was complaining when it received a null id ...
        //serialized.id = record.id ? record.id : 0;

        //remove the root element
        Ember.merge(hash, serialized);
    }
});

App.ApplicationSerializer = App.SpringSerializer.extend();

App.Router.map(function () {
    this.resource('books');
    //this.resource('book', {path: '/books/:book_id'});
    this.route('new_book');
    this.resource('search');
    this.route('about');
    //this.resource('posts', function() {
    //  this.resource('post', { path: ':post_id' });
    //});
});

//if (window.history && window.history.pushState) {
//    App.Router.reopen({
//        location: 'hash',
//        rootURL: 'index.html'
//    });
//}
//
//App.BooksRoute = Ember.Route.extend({
//    model: function () {
//        return books;
//    }
//});

App.SearchRoute = Ember.Route.extend({
    queryParams: {
        key: {
            refreshModel: true
        },
        value: {
            refreshModel: true
        }
    },
    model: function (params) {
        if (!params.key || !params.value) {
            return [];
        }
        //var self = this;
        //var onSuccess = function (result) {
        //    return result;
        //};
        //
        //var onFail = function (result) {
        //    alert("request failed");
        //    return result;
        //};
        //return this.store.find("book", {key: params.key, value: params.value}).save();
        //this.store.findQuery("book", params);
        var books = this.store.find("book", {key: params.key, value: params.value});
        alert(books.type)
        return books;
    }
});

App.SearchController = Ember.ArrayController.extend({
    queryParams: ['key', 'value'],
    key: "title",
    value: "",

    result: function () {
        var value = this.get("value");
        if (value) {
            var self = this;
            var onSuccess = function (result) {
                self.set("result", result);
            };

            var onFail = function () {
                alert("request failed");
            };
            this.store.find("book", {key: this.key, value: value}).then(onSuccess, onFail);

            this.set("searchText", "");
        }
    }.property("key", "value"),

    result_length: function () {
        if (this.result) {
            this.set("hasNoElements", this.get("result").length == 0);
            return this.get("result").length;
        } else {
            this.set("hasNoElements", false);
            return -1;
        }
    }.property("result"),

    actions: {
        select: function (id) {
            this.set("key", id);
        },

        search: function () {
            if (this.get("searchText")) {
                this.set("value", this.get("searchText"));
            } else {
                this.set("value", "");
            }

        }
    }
})
;

App.SearchResultController = Ember.ArrayController.extend({
    model: function () {
        return this.get("result");
    }
});

App.NewBookController = Ember.Controller.extend({
    url: "",
    actions: {
        submitBook: function () {

            var book = this.store.createRecord('book', {
                title: this.get('title'),
                author: this.get('author'),
                year: this.get('year'),
                publisher: this.get('publisher')
            });

            var onSuccess = function (book) {
                this.transitionToRoute("books");
            };

            var onFail = function (book) {
                alert("fail ");
            };

            book.save().then(onSuccess, onFail);
        }
    }
})
;

App.ImageUploadComponent = Ember.FileField.extend({});
//    url: '',
//    filesDidChange: (function() {
//        var uploadUrl = this.get('url');
//        var files = this.get('files');
//
//        var uploader = Ember.Uploader.create({
//            url: uploadUrl
//        });
//
//        if (!Ember.isEmpty(files)) {
//            uploader.upload(files[0]);
//        }
//    }).observes('files')
//});

//App.NewBookFormComponent = Ember.Component.extend({
//    actions: {
//        submit: function () {
//
//                //cover: this.get('cover')
//
//
//        }
//    }
//});


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
    coverPage: DS.attr("string")
});

//App.NewBookController = Ember.ObjectController.extend({
//    actions: {
//        submitBook: function (book) {
//            var bookToSend = this.store.createRecord("book", {
//                title: book.title,
//                author: book.author,
//                year: book.year,
//                publisher: book.publisher
//            });
//
//            var onSuccess = function (book) {
//                this.transitionToRoute('books.show', book);
//            };
//
//            var onFail = function (book) {
//                // deal with the failure here
//            };
//
//            //bookToSend.save().then(onSuccess, onFail);
//            bookToSend.save();
//
//            //alert("Created book " + book.year + " with author " + book.cover + ".");
//        },
//        cancelUserCreation: function () {
//            alert("Canceled user creation.");
//        }
//    }
//});

//App.Book.reopenClass({
//    FIXTURES: [
//        {
//            id: '1',
//            title: "Necronomicon",
//            author: "Devil",
//            year: "666",
//            publisher: "Hell inc.",
//            isbn: "666-666-666-666",
//            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '2',
//            title: "Never Bet the Devil",
//            author: "Orin Gray",
//            year: "2011",
//            publisher: "Wer weiss",
//            isbn: "666-666-666-666",
//            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '3',
//            title: "Necronomicon",
//            author: "Devil",
//            year: "666",
//            publisher: "Hell inc.",
//            isbn: "666-666-666-666",
//            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '4',
//            title: "Never Bet the Devil",
//            author: "Orin Gray",
//            year: "2011",
//            publisher: "Wer weiss",
//            isbn: "666-666-666-666",
//            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '5',
//            title: "Necronomicon",
//            author: "Devil",
//            year: "666",
//            publisher: "Hell inc.",
//            isbn: "666-666-666-666",
//            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '6',
//            title: "Never Bet the Devil",
//            author: "Orin Gray",
//            year: "2011",
//            publisher: "Wer weiss",
//            isbn: "666-666-666-666",
//            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '7',
//            title: "Necronomicon",
//            author: "Devil",
//            year: "666",
//            publisher: "Hell inc.",
//            isbn: "666-666-666-666",
//            cover: "http://media-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }, {
//            id: '8',
//            title: "Never Bet the Devil",
//            author: "Orin Gray",
//            year: "2011",
//            publisher: "Wer weiss",
//            isbn: "666-666-666-666",
//            cover: "http://3.bp.blogspot.com/-BDgNviL3jAY/ThsNN8nTGiI/AAAAAAAACdo/GTe9jzcRz_4/s1600/never_bet_the_devil_Orrin_Grey_Evileye_Books.jpg",
//            excerpt: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
//        }
//    ]
//});


//App.PostRoute = Ember.Route.extend({
//  model: function(params) {
//    return posts.findBy('id', params.post_id);
//  }
//});
//
//App.PostController = Ember.ObjectController.extend({
//  isEditinmedia-cache-ak0.pinimg.com/736x/c0/63/ef/c063efc82cfc801492beebeae0c7c388    },
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