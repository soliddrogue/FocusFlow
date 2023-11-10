<html>
<head>
    <title>Calendar</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel = "stylesheet"  href="/css/calender.css">
</head>

<?php 
include('connection.php');
if(isset($_REQUEST['save-event']))
{
  $title = $_REQUEST['title'];
  $start_date = $_REQUEST['start_date'];
  $end_date = $_REQUEST['end_date'];

  $insert_query = mysqli_query($connection, "insert into tbl_event set title='$title', start_date='$start_date', end_date='$end_date'");
  if($insert_query)
  {
    header('location:view-calendar.php');
  }
  else
  {
    $msg = "Event not created";
  }
}
?>
<body>
    <div class="container">
    <div class="table-responsive">
    <h3 align="center">Create Event</h3><br/>
    <div class="box">
     <form method="post" >
       <div class="form-group">
       <label for="title">Enter Title of the Event</label>
       <input type="text" name="title" id="title" placeholder="Enter Title" required 
       data-parsley-type="title" data-parsley-trigg
       er="keyup" class="form-control"/>
      </div>
      <div class="form-group">
       <label for="date">Start Date</label>
       <input type="date" name="start_date" id="start_date" required 
       data-parsley-type="date" data-parsley-trigg
       er="keyup" class="form-control"/>
      </div>
      <div class="form-group">
       <label for="date">End Date</label>
       <input type="date" name="end_date" id="end_date" required 
       data-parsley-type="date" data-parsley-trigg
       er="keyup" class="form-control"/>
      </div>
      <div class="form-group">
       <input type="submit" id="save-event" name="save-event" value="Save Event" class="btn btn-success" />
       </div>
       <p class="error"><?php if(!empty($msg)){ echo $msg; } ?></p>
     </form>
     </div>
   </div>
  </div>
 </body>
</html>
