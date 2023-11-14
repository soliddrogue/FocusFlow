$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
        selectable: true,
        selectHelper: true,
        select: function() {
            $('#myModal').modal('toggle');
        },
        eventClick: function(event) {
            $('#myModal').modal('toggle');
            $('#eventTitle').val(event.title);
            $('#startDate').val(event.start.format('YYYY-MM-DD'));
            $('#endDate').val(event.end ? event.end.format('YYYY-MM-DD') : event.start.format('YYYY-MM-DD'));
            $('#addEventBtn').hide();
            $('#deleteEventBtn').show();
        },
        header: {
            left: 'month, agendaWeek, agendaDay, list',
            center: 'title',
            right: 'prev, today, next'
        },
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'List'
        }
    });

    // Initialize datepickers
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });

    $('#addEventBtn').on('click', function() {
        var eventTitle = $('#eventTitle').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

        if (eventTitle && startDate && endDate) {
            calendar.fullCalendar('renderEvent', {
                title: eventTitle,
                start: startDate,
                end: endDate,
                allDay: true
            }, true);
        }
    });

    $('#deleteEventBtn').on('click', function() {
        var eventTitle = $('#eventTitle').val();
        if (eventTitle) {
            calendar.fullCalendar('removeEvents', function (event) {
                return event.title === eventTitle;
            });
        }
        // Clear input fields
        $('#eventTitle, #startDate, #endDate').val('');
        $('#addEventBtn').show();
        $('#deleteEventBtn').hide();
        $('#myModal').modal('toggle');
    });
});