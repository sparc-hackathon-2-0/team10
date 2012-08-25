	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/

	function loadSitters()
	{
		var query = 'SELECT id, name FROM test';
		db.executeSQL(query, onGetSitters, onSQLFail);

	}

	function onGetSitters(res)
	{
		function addSitter(row) {
			$('.sittersResults').append('<li>
				<a href="sitterprofile.html">
					<div class="leftCol">
						<h1>' + row['name'] + '</h1>
						<h2>Location, ST</h2>
					</div>
					
					<div class="rightCol">
						<div class="previewRating">
							 <img src="images/rateStarOn.png" class="rateStar" />
							 <img src="images/rateStarOn.png" class="rateStar" />
							 <img src="images/rateStarOn.png" class="rateStar" />
							 <img src="images/rateStarHalf.png" class="rateStar" />
							 <img src="images/rateStarOff.png" class="rateStar" />
						</div><!-- /previewRating -->
					</div>
					
					<div class="clearer">
					</div>
				</a>
			</li>');
                                        
                                        debug.log(row);
		}

		res.rows.forEach(addSitter);
		transact();
	}


	function prepDatabase()
	{
		var db = new PGSQLitePlugin('sitterlink', onOpen, onFail);
	}

	function bootstrapDatabase()
	{
		var query = '' +
                'CREATE TABLE IF NOT EXISTS "test" (' +
                'Id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'name VARCHAR(100)' +
                ');' + 
                '';
        db.executeSql(query, onCreateTable, onFail);

	}

	function addTempData()
	{
		var query = 'INSERT INTO "test" VALUES(1, "amy"), VALUES(2, "joan"), VALUES(3, "robin"), VALUES(4, "lilly)';
		db.executeSql(query, onSetData, onFail);
	}

	function onSetData()
	{
		debug.log('data was added successfully');
	}

	function onCreateTable()
	{
		debug.log('table created successfully');
	}

	function onOpen()
	{
		debug.log('database open.')

	}

	function onFail(e)
	{
		debug.log('Database Error. Nothing to worry about. Just fix it.');
		
	}

	/** Templates **/


    