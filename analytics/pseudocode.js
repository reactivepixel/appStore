/* 
App Store Analytics Pseudocode

~ Global Clock
	- Uses moment.js
			(http://momentjs.com/)
		* Will detect the date and time
		* Moment timezone can be used to detect each timezone for the dropdown menu
	- Drop down menu for different time zones
		* Moment.js timezone
			(http://momentjs.com/timezone/)
	- Styled with CSS / Bootstrap / choice framework
	- Clock can be created two ways
		* HTML5 Canvas
		* CSS animation property
			(https://cssanimation.rocks/clocks/)

~ Toolbar
	- Simple HTML & CSS Build
	- Detect which user is logged in
		* Display this information on left hand side
	- Notifications, Messages, and Search icons floated right
		* All drop down menus
		* Display information specific to that user
	- This relies heavily upon user information
	- User MUST be logged in for anything to display

~ App Updates Section

~ Visitors Per Hour

~ Most Popular Apps

~ Daily Planner / To Do List

~ Daily Sales
	- Use bucketadmin's bootstrap theme as suggested
		* Has pre-made charts that would suit this perfectly
		* See "Bar Chart"
			(http://bucketadmin.themebucket.net/chartjs.html)

~ Users
	- Use bucketadmin's bootstrap theme as suggested
			* Has pre-made charts that would suit this perfectly
			* See "Donut Chart"
			* Alternatively, "Pie Chart" would also work
				(http://bucketadmin.themebucket.net/chartjs.html)

*/