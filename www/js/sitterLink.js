var db = null;

// Page Events
$('#page-sitter-search').live('pageshow', function() {
	getSitters();
});

$('#page-sitter-profile').live('pageshow', function() {
	populateSitterProfile();
	//populateReviews();

	$("#profileReadReview").click(function() {
		$('.profileReviewListing').fadeIn();		
		$('.profileReviewForm').fadeOut();
	});
	
	$("#profileLeaveReview").click(function() {
		$('.profileReviewListing').fadeOut();
		$('.profileReviewForm').fadeIn();
	});
});

// Initialization Methods

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

// Utility Apps

function setActiveProfileID(id)
{
	sessionStorage.setItem('activeID', id);
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
	alert(err.message);
}


/*
// Data Calls
*/

function getSitters()
{
	if(db != null)
	{
		//db.transaction(sqlGetSitters, queryError);
		wsGetSitters();
	}
}

function populateSitterProfile()
{
	if(db != null)
	{
		//db.transaction(sqlGetSitterProfile, queryError);
		wsGetSittersProfile();
	}
}

function populateReviews()
{
	if(db != null)
	{
		db.transaction(sqlGetSitterReviews, queryError);
	}
}

/*
// Web Service Data Retrieval
*/

function wsGetSitters()
{
	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/sitter.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.sitterResults').append('<li><a href="sitterprofile.html" onclick="setActiveProfileID(' + item.id + ');"><div class="leftCol"><h1>' + item.firstname + '</h1><h2>Location, ST</h2></div><div class="rightCol"><div class="previewRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></div><div class="clearer"></div></a></li>');
			});
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetSittersProfile()
{
	var id = sessionStorage.getItem('activeID');

	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/sitter.php?id=' + id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.profileTop').html('<img src="images/tempProfilePic.png" class="profilePic" /><h1>' + item.firstname + '</h1><h2>' + 'location' + '</h2><a href="#reviews"><div class="profileRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></a><div class="clearer"></div><p class="profileQuote">' + 'profileQuote' + '</p>');

				$('.profileBio').html('<p>Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis.</p>');
			});
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
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
			$('.sitterResults').append('<li><a href="sitterprofile.html" onclick="setActiveProfileID(' + results.rows.item(i).id + ');"><div class="leftCol"><h1>' + results.rows.item(i).name + '</h1><h2>Location, ST</h2></div><div class="rightCol"><div class="previewRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></div><div class="clearer"></div></a></li>');
			
		}
		catch(err)
		{
			alert(err);
		}
	}
}

function domPopulateSitterProfile(tx, results)
{
	var len = results.rows.length;

	try {

		$('.profileTop').html('<img src="images/tempProfilePic.png" class="profilePic" /><h1>' + results.rows.item(0).name + '</h1><h2>' + 'location' + '</h2><a href="#reviews"><div class="profileRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></a><div class="clearer"></div><p class="profileQuote">' + 'profileQuote' + '</p>');

		$('.profileBio').html('<p>Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis. Id iriure hendrerit legentis claritas est. Etiam eodem lius esse fiant tempor. Nostrud tempor tempor iis hendrerit iis.</p>');
	}
	catch(err)
	{
		alert(err);
	}
}

function domPopulateSitterReviews(tx, results)
{
	var len = results.rows.length;

	try {
		$('.profileReviewListing').html('<h2>Reviews</h2>');
		
		if(len == 0)
		{
			$('.profileReviewListing').append('No Reviews');
		}

		for(var i=0; i<len; i++)
		{
			$('.profileReviewListing').append('<div class="profileReviewContent"><h3>Review Title is much longer than the other ones are</h3><div class="reviewRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div><div class="clearer"></div><p>' + results.rows.item(i).message + '</p></div><!-- /profileReviewContent -->')
		}

	}
	catch(err)
	{
		alert(err);
	}
}


/*
// SQL Call Functions
*/

function sqlGetSitters(tx)
{
	tx.executeSql('SELECT * FROM sitters', [], domPopulateSitters, queryError);
}

function sqlGetSitterProfile(tx)
{
	if(sessionStorage.getItem('activeID'))
	{
		var id = sessionStorage.getItem('activeID');
		tx.executeSql('SELECT * FROM sitters WHERE id=' + id, [], domPopulateSitterProfile, queryError);
	}
	else
	{
		alert('Invalid Profile');
	}
}

function sqlGetSitterReviews(tx)
{
	if(sessionStorage.getItem('activeID'))
	{
		var id = sessionStorage.getItem('activeID');
		tx.executeSql('SELECT * FROM reviews WHERE sitter_id=' + id, [], domPopulateSitterReviews, queryError);
	}
	else
	{
		alert('Invalid Profile');
	}
}

/*
// Bootstrapping Functions
*/

function bootstrapSchema(tx)
{
	// Sitters
	tx.executeSql('DROP TABLE IF EXISTS sitters');
	tx.executeSql('CREATE TABLE IF NOT EXISTS sitters (id unique, name, rating)');
	tx.executeSql('INSERT INTO sitters (id, name, rating) VALUES (1, "Lilly", 4)');
	tx.executeSql('INSERT INTO sitters (id, name, rating) VALUES (2, "Robin", 1)');

	// Parents

	// Reviews
	/**
	tx.ececuteSql('DROP TABLE IF EXISTS reviews');
	tx.executeSql('CREATE TABLE IF NOT EXISTS reviews (id unique, sitter_id, parent_id, rating, message)');
	tx.executeSql('INSERT INTO reviews (id, sitter_id, parent_id, rating, message) VALUES (1, 1, 0, 4, "Amazing Babysitter!")');
	tx.executeSql('INSERT INTO reviews (id, sitter_id, parent_id, rating, message) VALUES (2, 1, 0, 4, "Even Took Care of the Dog!")');
	tx.executeSql('INSERT INTO reviews (id, sitter_id, parent_id, rating, message) VALUES (3, 2, 0, 4, "She was simple Awe-wait for it............SOME!")');
	**/
}
