$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        var i = 0;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
    	    var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

            $columnDelete.click(function() {
                self.removeColumn();
            });
        
            $columnAddCard.click(function() {
                var desc = prompt("Wpisz nazwę karty");
                if (desc) {
                self.addCard(new Card(desc));
                } else {
                    alert("Karta nie może być pusta!")
                }
            });

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    function Card(description) {
	    var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function() {
                self.removeCard();
            });
            $card.append($cardDelete).append($cardDescription);
            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove(); 
        }
    };
    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    $('.create-column').click(function(){
        var name = prompt('Wpisz nazwę kolumny');
        if (name) {
        var column = new Column(name);
            board.addColumn(column);
        } else {
            alert("Nazwa kolumny nie może być pusta!");
        }
    });

var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Zakończone');

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('Stworzyć portfolio');
var card2 = new Card('Zadania API i Ajax');
var card3 = new Card('Tablica kanban');
var card4 = new Card('Zaktualizować CV')

todoColumn.addCard(card1);
todoColumn.addCard(card4);
doingColumn.addCard(card2);
doneColumn.addCard(card3);
});