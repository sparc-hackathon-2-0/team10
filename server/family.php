<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="users.json"');

if ($_REQUEST['save'] == 'Y') {
  $ret = saveFamily();
}
else
{
  $ret = getFamilies();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';


function saveFamily()
{
  $name=$_REQUEST['name'];
  $kids=$_REQUEST['kids'];
  $contact=$_REQUEST['contact'];
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

  $sql = "update family
  set kids='".mysql_real_escape_string($kids)."'
  ,contact='".mysql_real_escape_string($contact)."'
  where profile=".$id;

  mysql_query($sql);

  return json_encode(array('id'=>$id));
}


function getStaticFamily() {
  
  $sample = array(
  'id'=>'2',
  'name'=>'Smith',
  'kids'=>'Chris 12, Sam 10',
  'description'=>'A nice family',
  'address'=>'32.7791432, -79.9248669',
  );
  return  json_encode($sample);

}

function getFamilies() {

  $id=$_GET['id'];
  $where = "";
  if ($id != "")
  {
    $where = " and p.id=".$id;
  }

  $sql = "select
     p.id id
    ,p.name firstname
    ,f.kids kids
    ,f.contact contact
    ,p.description description
    ,p.address_latlon address
    ,p.city
    ,p.state
    ,p.zip
    ,(select count(*) from sitjob j where sitwhen>=CURDATE() and sitter is null and j.family=p.id) jobcount
    from
     profile p
    ,family f
    where
    f.profile=p.id and p.name is not null
  ".$where;

  $sth = mysql_query($sql);
  $rows = array();
  while($r = mysql_fetch_assoc($sth)) {
      $rows[] = $r;
  }
  return json_encode($rows);
}

?>


