/* 
App Store Analytics Pseudocode
Using BucketAdmin Bootstrap Theme

~ Global Clock
	- Uses moment.js
			(http://momentjs.com/)
		* Will detect the date and time
		* Moment timezone can be used to detect each timezone for the dropdown menu
	- Drop down menu for different time zones
		* Moment.js timezone
			(http://momentjs.com/timezone/)
	- Styled with CSS / Bootstrap / choice framework
	- Clock can be created three ways
		* HTML5 Canvas
		* CSS animation property
			(https://cssanimation.rocks/clocks/)
		* BucketAdmin's Clock Widget
			(http://bucketadmin.themebucket.net/widget.html)
				- This relies on a JS interaction
				- Not sure if this would play well with moment.js
	- Having multiple time zones is important because apps that launch at midnight in certain places will not launch at midnight in others.
		* Allows us to convert that time easier

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
	- Use bucketadmin's bootstrap theme
			* Has pre-made charts that would suit this perfectly
			* See "Area Chart"
				(http://bucketadmin.themebucket.net/chartjs.html)
			* "Area Chart" from this section would also look nice
				(http://bucketadmin.themebucket.net/flot_chart.html)

~ Most Popular Apps
	- Styled section
	- Displays database information
		* Ordered by highest grossing applications

~ Daily Planner / To Do List

~ Daily Sales
	- Use bucketadmin's bootstrap theme
		* Has pre-made charts that would suit this perfectly
		* See "Bar Chart"
			(http://bucketadmin.themebucket.net/chartjs.html)

~ Users
	- Use bucketadmin's bootstrap theme
			* Has pre-made charts that would suit this perfectly
			* See "Donut Chart"
			(http://bucketadmin.themebucket.net/morris.html)
					- Notice that it has the text in the center of the donut, just as is mocked up in the AI file.
			* Alternatively, "Donut Chart" or "Pie Chart" from here would also work
				(http://bucketadmin.themebucket.net/chartjs.html)

*/