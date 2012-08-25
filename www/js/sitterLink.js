var db = null;

// Page Events
$('#page-sitter-search').live('pageshow', function() {
	getSitters();
});

function init()
{
	try {
		db = window.openDatabase("testdb", "1.0", "Test DB", 1000000);
		db.transaction(bootstrapSchema, errorCB, successCB);

	}
	catch(err)
	{
		alert(err);
	}
}


/*
// Generic Callbacks
*/

function errorCB(err)
{
	alert(err.code);
}

function successCB()
{
	//alert('successfully bootstrapped');
}

function queryError(err)
{
	alert(err.code);
}


/*
// Data Calls
*/

function getSitters()
{
	if(db != null)
	{
		db.transaction(sqlGetSitters, queryError);
	}
}


/*
// DOM Manipulation Functions
*/

function domPopulateSitters(tx, results)
{
	var len = results.rows.length;

	for(var i=0; i<len; i++)
	{
		try
		{
			$('.sitterResults').append('<li><a href="sitterprofile.html"><div class="leftCol"><h1>' + results.rows.item(i).name + '</h1><h2>Location, ST</h2></div><div class="rightCol"><div class="previewRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></div><div class="clearer"></div></a></li>');
			
		}
		catch(err)
		{
			alert(err);
		}
	}
}


/*
// SQL Call Functions
*/

function sqlGetSitters(tx)
{
	tx.executeSql('SELECT * FROM sitters', [], domPopulateSitters, queryError);
}


/*
// Bootstrapping Functions
*/

function bootstrapSchema(tx)
{
	tx.executeSql('DROP TABLE IF EXISTS sitters');
	tx.executeSql('CREATE TABLE IF NOT EXISTS sitters (id unique, name, rating)');
	tx.executeSql('INSERT INTO sitters (id, name, rating) VALUES (1, "Lilly", 4)');
	tx.executeSql('INSERT INTO sitters (id, name, rating) VALUES (2, "Robin", 1)');
}
