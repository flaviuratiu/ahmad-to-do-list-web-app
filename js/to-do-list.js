window.ToDoList = {

    apiUrl: 'http://localhost:8081/to-do-items',

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

            ToDoList.getItems();
        });
    },

    getItems: function () {
        $.ajax({
            url: ToDoList.apiUrl,
            method: "GET"
        }).done(function (response) {
            ToDoList.displayItems(JSON.parse(response));
        });
    },

    deleteItem: function (id) {
        $.ajax({
            url: ToDoList.apiUrl + "?id=" + id,
            method: "DELETE"
        }).done(function () {
            ToDoList.getItems();
        });
    },

    markItemDone: function (id, done) {
        $.ajax({
            url: ToDoList.apiUrl + "?id=" + id,
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({done: done})
        }).done(function () {
            ToDoList.getItems();
        });
    },

    displayItems: function (items) {
        var tableBody = '';

        items.forEach(item => tableBody += ToDoList.getTableRow(item));

        $('#items tbody').html(tableBody)
    },

    getTableRow: function (item) {
        let formattedDeadline = new Date(item.deadline).toLocaleDateString("en-US");
        let checkedAttribute = item.done ? "checked" : "";

        return `<tr>
        <td class="description">${item.description}</td>
        <td class="deadline">${formattedDeadline}</td>
        <td><input type="checkbox" ${checkedAttribute} title="Done" class="mark-done"  data-id=${item.id}></td>
        <td><a href="#" class="delete fas fa-trash-alt" data-id=${item.id}></a></td>
    </tr>`
    },

    bindEvents: function () {

        $('#create-item').submit(function (event) {
            event.preventDefault();

            console.log('Form submitted');

            ToDoList.addItem();

            // return false;
        });

        $('#items').delegate('.delete', 'click', function () {
            event.preventDefault();

            let id = $(this).data('id');

            ToDoList.deleteItem(id);
        });

        $('#items').delegate('.mark-done', 'change', function () {
            let id = $(this).data('id');
            let done = $(this).is(":checked");

            ToDoList.markItemDone(id, done);
        });

    }
};

ToDoList.getItems();
ToDoList.bindEvents();

