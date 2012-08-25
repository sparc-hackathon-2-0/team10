<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="sitters.json"');
//header('Content-type: application/json');

if ($_REQUEST['save'] == 'Y') {
  $ret = saveSitter();
}
else
{
  $ret = getSitters();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';


function saveSitter()
{
  $name=$_REQUEST['name'];
  $ages=$_REQUEST['ages'];
  $cpr=$_REQUEST['cpr'];
  $description=$_REQUEST['description'];
  $city=$_REQUEST['city'];
  $state=$_REQUEST['state'];
  $zip=$_REQUEST['zip'];

  $id=$_REQUEST['id'];

  $sql = "update profile
  set name='".mysql_real_escape_string($name)."'
  ,zip='".mysql_real_escape_string($zip)."'
  ,description='".mysql_real_escape_string($description)."'
  ,city='".mysql_real_escape_string($city)."'
  ,state='".mysql_real_escape_string($state)."'
  where id=".$id;

  mysql_query($sql);

  $sql = "update sitter
  set ages=".mysql_real_escape_string($ages)."
  ,cpr=".mysql_real_escape_string($cpr)."
  where profile=".$id;

  mysql_query($sql);

  return json_encode(array('id'=>$id));
}


function getStaticSitter() {
  
  $sample = array(
  'id'=>'1',
  'firstname'=>'Anna',
  'ages'=>'0-2,2-5,5-10',
  'cpr'=>'y',
  'description'=>'I go to Wando and work hard',
  'address'=>'32.7791432, -79.9248669',
  );
  return json_encode($sample);
}

function getSitters() {

  $id=$_GET['id'];
  $where = "";
  if ($id != "")
  {
    $where = " and p.id=".$id;
  }

  $sql = "select
     p.id id
    ,p.name firstname
    ,s.ages ages
    ,s.cpr cpr
    ,p.description description
    ,p.address_latlon address
    ,p.city
    ,p.state
    ,p.zip
    ,(select floor(avg(rating)) from review r where r.sitter=p.id) rating
    from
     profile p
    ,sitter s
    where
    s.profile=p.id and p.name is not null
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


