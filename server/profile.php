<?php include("db.inc") ?>

<?php

//header('Content-Disposition: attachment; filename="users.json"');

//echo "[".crypt("anna","anna@mailinator.com"."foo")."]";

if ($_REQUEST['auth'] == "")
{
  $ret = saveProfile();
}
else
{
  $ret = authProfile();
}

echo $_GET['jsoncallback'] . '(' . $ret . ');';

function saveProfile()
{
  $email=$_REQUEST['email'];
  $pass=$_REQUEST['pass'];
  $utype=$_REQUEST['utype'];

  $sql = "insert into profile (email,password,utype)
          values ('".mysql_real_escape_string($email)."'
          ,'".mysql_real_escape_string(cryptPass())."'
          ,'".mysql_real_escape_string($utype)."')";

  mysql_query($sql);

  $id = mysql_insert_id();

  if ($utype == "S")
  {
    if ("0" != $id)
    {
      $sql = "insert into sitter (profile) values (".$id.")";
    }
  }
  else
  {
    if ("0" != $id)
    {
      $sql = "insert into family (profile) values (".$id.")";
    }
  }

  mysql_query($sql);


  return json_encode(array('id'=>$id));
}


function cryptPass()
{
  $email=$_REQUEST['email'];
  $pass=$_REQUEST['pass'];
  return crypt($pass,$email."foo");
}

function authProfile() {

  $sql = "select
     p.id id
    from
     profile p
    where password='".mysql_real_escape_string(cryptPass())."'";

  $sth = mysql_query($sql);
  $rows = array();
  while($r = mysql_fetch_assoc($sth)) {
      $rows[] = $r;
  }

  return json_encode($rows);
}

?>


