<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="sitters.json"');
//header('Content-type: application/json');

if ($_REQUEST['save'] == 'Y') {
  $ret = saveJob();
}
else
{
  $ret = getJobs();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';


function saveJob()
{
  $id=$_REQUEST['id'];
  $when=$_REQUEST['when'];
  $start=$_REQUEST['start'];
  $end=$_REQUEST['end'];
  $family=$_REQUEST['family'];
  $sitter=$_REQUEST['sitter'];
  $kids=$_REQUEST['kids'];
  $description=$_REQUEST['description'];

  if ($id != "")
  {
    $sql = "update sitjob
    set sitwhen='".mysql_real_escape_string($when)."'
    ,sitstarttime='".mysql_real_escape_string($start)."'
    ,sitendtime='".mysql_real_escape_string($end)."'
    ,family=".mysql_real_escape_string($family)."
    ,sitter=".mysql_real_escape_string($sitter)."
    ,kids='".mysql_real_escape_string($kids)."'
    ,description='".mysql_real_escape_string($description)."'
    where id=".$id;

    mysql_query($sql);
  }
  else
  {
    $sql = "insert into sitjob (
     sitwhen
    ,sitstarttime 
    ,sitendtime
    ,family
    ,sitter
    ,kids
    ,description ) values (
     '".mysql_real_escape_string($when)."'
    ,'".mysql_real_escape_string($start)."'
    ,'".mysql_real_escape_string($end)."'
    ,".mysql_real_escape_string($family)."
    ,".mysql_real_escape_string($sitter)."
    ,'".mysql_real_escape_string($kids)."'
    ,'".mysql_real_escape_string($description)."')";

    mysql_query($sql);
    $id = mysql_insert_id();
  }

  return json_encode(array('id'=>$id));
}


function getStaticJob() {
  
    $sample = array(
    'id'=>'1',
    'sitter'=>1,
    'family'=>2,
    'kids'=>3,
    'ages'=>'0-2,2-5[2],5-10[1]',
    'when'=>'2012-08-25',
    'start'=>'8:00p',
    'end'=>'10:00p',
    'description'=>'Just a quick trip out.'
    );

    return json_encode($sample);

}

function getJobs() {

  $id=$_GET['id'];
  $where = "";
  if ($id != "")
  {
    $where = " and id=".$id;
  }

  $sql = "select
     id
    ,sitwhen
    ,sitstarttime 
    ,sitendtime
    ,family
    ,sitter
    ,kids
    ,description
    ,(select name from profile where profile.id=j.family) familyname
    ,(select name from profile where profile.id=j.sitter) sittername
    from
     sitjob j
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


