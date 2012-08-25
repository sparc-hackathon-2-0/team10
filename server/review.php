<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="sitters.json"');
//header('Content-type: application/json');

if ($_REQUEST['save'] == 'Y') {
  $ret = saveReview();
}
else
{
  $ret = getReviews();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';


function saveReview()
{
  $id=$_REQUEST['id'];
  $family=$_REQUEST['family'];
  $sitter=$_REQUEST['sitter'];
  $description=$_REQUEST['description'];
  $rating=$_REQUEST['rating'];
  $utype=$_REQUEST['utype'];

  if ($id != "")
  {
    $sql = "update review
    set family=".mysql_real_escape_string($family)."
    ,sitter=".mysql_real_escape_string($sitter)."
    ,rating=".mysql_real_escape_string($rating)."
    ,utype='".mysql_real_escape_string($utype)."'
    ,description='".mysql_real_escape_string($description)."'
    where id=".$id;

    mysql_query($sql);
  }
  else
  {
    $sql = "insert into review (
     family
    ,sitter 
    ,rating
    ,utype
    ,description ) values (
     ".mysql_real_escape_string($family)."
    ,".mysql_real_escape_string($sitter)."
    ,".mysql_real_escape_string($rating)."
    ,'".mysql_real_escape_string($utype)."'
    ,'".mysql_real_escape_string($description)."')";

    mysql_query($sql);
    $id = mysql_insert_id();
  }

  return json_encode(array('id'=>$id));
}


function getStaticReview() {
  
    $sample = array(
    'id'=>'1',
    'family'=>1,
    'sitter'=>2,
    'rating'=>4,
    'utype' => 'S',
    'description'=>'Anna was great'
    );

    return json_encode($sample);

}

function getReviews() {

  $id=$_GET['id'];
  $where = "";
  if ($id != "")
  {
    $where = " and id=".$id;
  }

  $sql = "select
     id
    ,family
    ,sitter 
    ,utype
    ,description
    ,rating
    ,(select name from profile where profile.id=r.family) familyname
    ,(select name from profile where profile.id=r.sitter) sittername
    from
     review r
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


