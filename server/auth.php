<?php include("db.inc") ?>
<?php
    header('Content-Disposition: attachment; filename="users.json"');
    
    $sample = array(
    'id'=>'1',
    'firstname'=>'Anna',
    'ages'=>'0-2,2-5,5-10',
    'cpr'=>'y',
    'description'=>'I go to Wando and work hard',
    'address'=>'32.7791432, -79.9248669',
    );
    echo json_encode($sample);
?>

