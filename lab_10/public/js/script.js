$(document).ready(function() {
    function createTable(data, decimalPlaces) {
        let table = '<tr>' + Array(10).fill().map((_, i) => `<th>Col ${i + 1}</th>`).join('') + '</tr>';
        for (let i = 0; i < 10; i++) {
            table += '<tr>';
            for (let j = 0; j < 10; j++) {
                const index = i * 10 + j;
                const value = data[index].toFixed(decimalPlaces);
                table += `<td>${value}</td>`;
            }
            table += '</tr>';
        }
        return table;
    }

    function loadOriginalData() {
        const decimalPlaces = parseInt($('#decimalPlaces').val());
        $.get('/data', function(data) {
            $('#originalTable').html(createTable(data.original, decimalPlaces));
        });
    }

    function loadSortedData(order) {
        const decimalPlaces = parseInt($('#decimalPlaces').val());
        $.get(`/sorted/${order}`, function(data) {
            $('#sortedTable').html(createTable(data.sorted, decimalPlaces));
        });
    }

    loadOriginalData();

    $('#decimalPlaces').change(function() {
        loadOriginalData();
        if ($('#sortedTable').html()) {
            loadSortedData($('#sortedTable').data('order') || 'asc');
        }
    });

    $('#sortAsc').click(function() {
        loadSortedData('asc');
        $('#sortedTable').data('order', 'asc');
    });

    $('#sortDesc').click(function() {
        loadSortedData('desc');
        $('#sortedTable').data('order', 'desc');
    });
});
