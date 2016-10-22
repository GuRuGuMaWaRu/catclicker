$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                time: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            var newNoteForm = $('#new-note-form'),
                newNoteContent = $('#new-note-content');

            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '',
                noteList = $('#notes');

            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + '<span class="note-date">' + new Date(note.time).toString() + '</span>'
                    '</li>';
            });
            noteList.html( htmlStr );
        }
    };

    octopus.init();
});
