// Execute the following code when the window has finished loading
window.onload = function() { 
    // Wait for the document to be ready before executing the code
    $(document).ready(function() {

        // Initialize the FullCalendar plugin with various options
        var calendar = $('#calendar').fullCalendar({
            selectable: true,  // Allow selecting dates on the calendar
            selectHelper: true,  // Show a placeholder when selecting dates
            select: function() {
                // Reset the modal and show it when a date is selected
                resetModal();
                $('#myModal').modal('show');
            },
            eventClick: function(event) {
                // Populate the modal with event details when an event is clicked
                $('#eventTitle').val(event.title);
                $('#startDate').val(event.start.format('YYYY-MM-DD'));
                $('#endDate').val(event.end ? event.end.format('YYYY-MM-DD') : event.start.format('YYYY-MM-DD'));
                $('#addEventBtn').text('Update').removeClass('btn-success').addClass('btn-primary');
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

        // Initialize datepickers using the Bootstrap datepicker plugin
        $('.datepicker').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

        // Handle the click event for the 'Add'/'Update' button
        $('#addEventBtn').on('click', function() {
            var eventTitle = $('#eventTitle').val();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();

            if (eventTitle && startDate && endDate) {
                var eventData = {
                    title: eventTitle,
                    start: startDate,
                    end: endDate,
                    allDay: true
                };

                // Check if the button text is 'Update' to determine if it's an update or add operation
                if ($('#addEventBtn').text() === 'Update') {
                    // Update the event in the calendar
                    var existingEvent = calendar.fullCalendar('clientEvents', function(event) {
                        return event.title === eventTitle;
                    })[0];

                    if (existingEvent) {
                        existingEvent.title = eventTitle;
                        existingEvent.start = startDate;
                        existingEvent.end = endDate;
                        calendar.fullCalendar('updateEvent', existingEvent);
                    }
                } else {
                    // Add the event to the calendar via an AJAX request
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
                            calendar.fullCalendar('renderEvent', eventData, true);
                            resetModal();
                        },
                        error: function(error) {
                            console.error(error);
                        }
                    });
                }
            }
        });

        // Handle the click event for the 'Delete' button
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
            // Reset button text and visibility
            $('#addEventBtn').text('Add').removeClass('btn-primary').addClass('btn-success');
            $('#deleteEventBtn').hide();
            // Close the modal
            $('#myModal').modal('hide');
        }
    });
};