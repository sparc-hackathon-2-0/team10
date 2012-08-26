var db = null;

// Page Events

$('#user-type-select').live('pageshow', function() {
	if(sessionStorage.getItem('auth') == 1)
	{
		if(utype == 'F')
		{
			$.mobile.changePage("search-families.html");
		}
		else
		{
			$.mobile.changePage("search-sitters.html")
		}
	}
});

$('#page-register').live('pageshow', function() {
	$('#formRegister').submit(function() {

		var email = $('#email').val();
		var pass = $('#password').val();
		var utype = sessionStorage.getItem('userType');


		$.ajax({
			url: 'http://hackathon.bluekeylabs.com/profile.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			type: 'POST',
			data: "email="+$('#email').val()+"&pass="+$('#password').val()+"&utype="+sessionStorage.getItem('userType'),
			timeout: 5000,
			success: function(data, status)
			{
				sessionStorage.setItem('auth', 1);
				sessionStorage.setItem('userid', data.id);

				if(utype == 'F')
				{
					$.mobile.changePage("search-families.html");
				}
				else
				{
					$.mobile.changePage("search-sitters.html")
				}
				
			},
			error: function(a, textStatus){
				alert(textStatus);
			}
		});

		return false;
	});
});

$('#page-signin').live('pageshow', function() {
	$('#formSignIn').submit(function() {

		var email = $('#email').val();
		var pass = $('#password').val();


		$.ajax({
			url: 'http://hackathon.bluekeylabs.com/profile.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			type: 'POST',
			data: "email="+$('#email').val()+"&pass="+$('#password').val()+"&auth=1",
			timeout: 5000,
			success: function(data, status)
			{
				if(data[0].id > -1)
				{
					sessionStorage.setItem('auth', 1);
					sessionStorage.setItem('userid', data[0].id);
					sessionStorage.setItem('userType', data[0].utype)

					if(data[0].utype == 'F')
					{
						$.mobile.changePage("search-families.html");
					}
					else
					{
						$.mobile.changePage("search-sitters.html")
					}
				}
				else
				{
					$('#formErrors').html('Invalid Username/Password');
				}
				
			},
			error: function(a, textStatus){
				$('#formErrors').html('Invalid Username/Password');
			}
		});

		return false;
	});
});

$('#page-messages').live('pageshow', function() {
	resetBgHack();
	initMessages();
	getMessages();
});

$('#page-profile-edit').live('pageshow', function() {
	//$('#dbg').html(sessionStorage.getItem('userid') + "<a href='search-families.html'>families</a><a href='search-sitters.html'>sitters</a>");
	initMessages();
});

$('#page-sitter-search').live('pageshow', function() {
	resetBgHack();
	initMessages();
	getSitters();
});

$('#page-family-search').live('pageshow', function() {
	resetBgHack();
	initMessages();
	getFamilies();
});

$('#page-job-search').live('pageshow', function() {
	resetBgHack();
	initMessages();
	getJobs();
});

$('#page-sitter-profile').live('pageshow', function() {
	resetBgHack();
	initMessages();
	populateSitterProfile();
	populateSitterReviews();

	$("#profileReadReview").click(function() {
		$('.profileReviewListing').fadeIn();		
		$('.profileReviewForm').fadeOut();
	});
	
	$("#profileLeaveReview").click(function() {
		$('.profileReviewListing').fadeOut();
		$('.profileReviewForm').fadeIn();
	});
});

$('#page-family-profile').live('pageshow', function() {
	resetBgHack();
	initMessages();
	populateFamilyProfile();
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
	// try {
	// 	db = window.openDatabase("testdb", "1.0", "Test DB", 1000000);
	// 	db.transaction(bootstrapSchema, errorCB, successCB);

	// }
	// catch(err)
	// {
	// 	alert(err);
	// }
}

function resetBgHack()
{
	$('body').removeClass('indexBg');
}

function initMessages()
{
	wsGetMessageCount();
}

// Utility Functions

function setActiveProfileID(id)
{
	sessionStorage.setItem('activeID', id);
}

function getStarRatings(n)
{
	var output = "";

	if(!n)
	{
		output += "no rating";
	}
	else
	{

		for(var i=0; i<5; i++)
		{
			if(n > i)
			{
				output += '<img src="images/rateStarOn.png" class="rateStar" />';
			}
			else
			{
				output += '<img src="images/rateStarOff.png" class="rateStar" />';
			}
		}
	}

	return output;
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
	wsGetSitters();
}

function populateSitterProfile()
{
	wsGetSittersProfile();
}

function getFamilies()
{
	wsGetFamilies();
}

function getJobs()
{
	wsGetJobs();
}

function populateFamilyProfile()
{
	wsGetFamilyProfile();
}

function getMessages()
{
	wsGetMessages();
}

function populateSitterReviews()
{
	wsGetSittersReviews();
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
				$('.sitterResults').append('<li><a href="sitterprofile.html" onclick="setActiveProfileID(' + item.id + ');"><div class="leftCol"><h1>' + item.firstname + '</h1><h2>' + item.city + ', ' + item.state + '</h2></div><div class="rightCol"><div class="previewRating">' + getStarRatings(item.rating) + '</div></div><div class="clearer"></div></a></li>');
			});
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetSittersReviews()
{
	var id = sessionStorage.getItem('activeID');

	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/review.php?id=' + id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.profileReviewListing').append('<div class="profileReviewContent"><div class="reviewRating">' + getStarRatings(item.rating) + '</div><div class="clearer"></div><p>' + item.description + '</p></div>');
			});

			if(data.length == 0)
			{
				$('.profileReviewListing').append('<div class="profileReviewContent"><p style="test-align: center;">no reviews</p></div>');
			}

		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetMessageCount()
{
	var id = sessionStorage.getItem('userid');

	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/message.php?profile=' + id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			var message_count = data.length;

			$('.badge').html(message_count);
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetMessages()
{
	var id = sessionStorage.getItem('userid');

	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/message.php?profile=' + id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			var message_count = data.length;

			$.each(data, function(i, item) {

				var byline = "";
				if(item.direction = 1)
				{
					byline = "To: " + item.toname;
				}
				else
				{
					byline = "From: " + item.fromname
				}
				$('.messagesResults').append('<li><p>' + item.message + '</p><br />' + byline + '</li>')
			});

			if(data.length == 0)
			{
				$('.messagesResults').append('<li><p>No Messages</p></li>');
			}
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetJobs()
{
	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/job.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.jobResults').append('<li><a href="familyprofile.html" onclick="setActiveProfileID(' + item.family + ');"><div class="leftCol"><h1>' + item.familyname + '</h1><h2>' + item.city + ', ' + item.state + '</h2></div><div class="rightCol">' + item.sitwhen + '<br />' + item.sitstarttime + '-' + item.sitendtime + '</div><div class="clearer"></div></a></li>');
			});
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}


function wsGetFamilies()
{
	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/family.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.familiesResults').append('<li><a href="familyprofile.html" onclick="setActiveProfileID(' + item.id + ');"><div class="leftCol"><h1>' + item.firstname + '</h1><h2>' + item.city + ', ' + item.state + '</h2></div><div class="rightCol"><div class="previewRating">' + getStarRatings(item.rating) + '</div></div><div class="clearer"></div></a></li>');
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
				$('.profileTop').html('<img src="images/profileMissing.png" class="profilePic" /><h1>' + item.firstname + '</h1><h2>' + item.city + ', ' + item.state + '</h2><a href="#reviews"><div class="profileRating">' + getStarRatings(item.rating) + '</div></a><div class="clearer"></div><p class="profileQuote"></p>');

				$('.profileBio').html('<p>' + item.description + '</p>');
			});
		},
		error: function(a, textStatus){
			alert(textStatus);
		}
	})
}

function wsGetFamilyProfile()
{
	var id = sessionStorage.getItem('activeID');

	$.ajax({
		url: 'http://hackathon.bluekeylabs.com/family.php?id=' + id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status)
		{
			$.each(data, function(i, item) {
				$('.profileTop').html('<img src="images/profileMissing.png" class="profilePic" /><h1>' + item.firstname + '</h1><h2>' + 'location' + '</h2><a href="#reviews"><div class="profileRating">' + getStarRatings(item.rating) + '</div></a><div class="clearer"></div><p class="profileQuote"></p>');

				$('.profileBio').html('<p>' + item.description + '</p>');
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

		$('.profileTop').html('<img src="images/profileMissing.png" class="profilePic" /><h1>' + results.rows.item(0).name + '</h1><h2>' + 'location' + '</h2><a href="#reviews"><div class="profileRating"><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarOn.png" class="rateStar" /><img src="images/rateStarHalf.png" class="rateStar" /><img src="images/rateStarOff.png" class="rateStar" /></div></a><div class="clearer"></div><p class="profileQuote">' + 'profileQuote' + '</p>');

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
