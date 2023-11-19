$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
        selectable: true,
        selectHelper: true,
        select: function() {
            resetModal();
            $('#myModal').modal('show');
        },
        eventClick: function(event) {
            $('#eventTitle').val(event.title);
            $('#startDate').val(event.start.format('YYYY-MM-DD'));
            $('#endDate').val(event.end ? event.end.format('YYYY-MM-DD') : event.start.format('YYYY-MM-DD'));
            $('#addEventBtn').hide();
            $('#deleteEventBtn').show();
            
            // Open the modal after setting the values
            $('#myModal').modal('show');
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
        // Send the event data to the server
        $.ajax({
            url: '/saveEvent',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                title: eventTitle,
                start: startDate,
                end: endDate
            }),
            success: function(response) {
                console.log(response.message);
                calendar.fullCalendar('renderEvent', {
                    title: eventTitle,
                    start: startDate,
                    end: endDate,
                    allDay: true
                }, true);

                resetModal();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
});

   $('#deleteEventBtn').on('click', function() {
    var eventTitle = $('#eventTitle').val();

    if (eventTitle) {
        // Send a request to delete the event from the server
        $.ajax({
            url: '/deleteEvent',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title: eventTitle }),
            success: function(response) {
                console.log(response.message);

                // Remove the event from FullCalendar
                calendar.fullCalendar('removeEvents', function(event) {
                    return event.title === eventTitle;
                });

                resetModal();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
});

    // Function to reset the modal state
    function resetModal() {
        // Clear input fields
        $('#eventTitle, #startDate, #endDate').val('');
        // Reset button visibility
        $('#addEventBtn').show();
        $('#deleteEventBtn').hide();
        // Close the modal
        $('#myModal').modal('hide');
    }
});