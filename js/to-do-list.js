window.ToDoList = {

    apiUrl: 'http://localhost:8081',

    addItem: function () {

        var description = $('#description-input').val();
        var deadline = $('#deadline-input').val();

        var data = {
            description: description,
            deadline: deadline,
            done: false
        };

        $.ajax({
            url: ToDoList.apiUrl,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log('Successfully created an item.');
            console.log(response);

            // todo: reload table content
        });
    },

    bindEvents: function () {

        $('#create-item').submit(function (event) {
            event.preventDefault();

            console.log('Form submitted');

            ToDoList.addItem();

            // return false;
        })

    }
};

ToDoList.bindEvents();

