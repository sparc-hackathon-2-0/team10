<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="sitters.json"');
//header('Content-type: application/json');

if ($_REQUEST['save'] == 'Y') {
  $ret = saveMessage();
}
else
{
  $ret = getMessages();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';


function saveMessage()
{
  $id=$_REQUEST['id'];
  $fromid=$_REQUEST['fromid'];
  $toid=$_REQUEST['toid'];
  $message=$_REQUEST['message'];
  $job=$_REQUEST['job'];

  if ($id != "")
  {
    $sql = "update message
    set fromid=".mysql_real_escape_string($fromid)."
    ,toid=".mysql_real_escape_string($toid)."
    ,job=".mysql_real_escape_string($job)."
    ,sent=CURDATE()
    ,message='".mysql_real_escape_string($message)."'
    where id=".$id;

    mysql_query($sql);
  }
  else
  {
    $sql = "insert into message (
     fromid
    ,toid 
    ,job
    ,sent
    ,message ) values (
     ".mysql_real_escape_string($fromid)."
    ,".mysql_real_escape_string($toid)."
    ,".mysql_real_escape_string($job)."
    ,CURDATE()
    ,'".mysql_real_escape_string($message)."')";

    mysql_query($sql);
    $id = mysql_insert_id();
  }

  return json_encode(array('id'=>$id));
}


function getStaticMessage() {
  
    $sample = array(
    'id'=>'1',
    'to'=>1,
    'from'=>2,
    'message'=>'I can work Friday night from 5-10',
    'when'=>'2012-08-25 10:00',
    'job' => 1
    );

    return json_encode($sample);
}

function getMessages() {

  $where = "";

  $id=$_GET['id'];
  if ($id != "")
  {
    $where = " and id=".$id;
  }

  $profile=$_GET['profile'];
  if ($profile != "")
  {
    $where = $where." and ((toid=".$profile.") or (fromid=".$profile.")) " ;
  }

  $sql = "select
     id
    ,fromid
    ,toid 
    ,message
    ,sent
    ,job
    ,(select name from profile where profile.id=m.fromid) fromname
    ,(select name from profile where profile.id=m.toid) toname
    from
     message m
    where
    1=1
  ".$where;

  $sth = mysql_query($sql);
  $rows = array();
  while($r = mysql_fetch_assoc($sth)) {
      $rows[] = $r;
  }
  //print json_encode($rows);

  return json_encode($rows);
}

?>


