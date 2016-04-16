
/*
 * GET users listing.
 */

 /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
   LIST REVIEWS
 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// lists all reviews from reviews db.
exports.list = function(req, res){
  // get connection to db.
  req.getConnection(function(err,connection){
        // select all from reviews
        var query = connection.query('SELECT * FROM reviews',function(err,rows)
        {
            // if Error console.log
            if(err)
                console.log("Error Selecting : %s ",err );
            // page title
            res.render('reviews',{page_title:"Comment Area",data:rows});

         });
         //console.log(query.sql);
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  ADD REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// add function to add a review to reviews db.
exports.add = function(req, res){
  // page title.
  res.render('add_review',{page_title:"Add Comment"});
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  EDIT REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// edit function to edit reviews in the review db.
exports.edit = function(req, res){
    var id = req.params.id;
    // get connection to db.
    req.getConnection(function(err,connection){
        // select all from reviews where id = selected review.
        var query = connection.query('SELECT * FROM reviews WHERE id = ?',[id],function(err,rows)
        {
            // if error console log message.
            if(err)
                console.log("Error Selecting : %s ",err );
            // page title.
            res.render('edit_review',{page_title:"Edit Comment",data:rows});
         });
         //console.log(query.sql);
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  SAVE REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/*Save the customer*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    // get connection to db.
    req.getConnection(function (err, connection) {
        // input feilds for name, post, and star rating.
        var data = {
            name    : input.name,
            post : input.post,
            star   : input.star
        };
        // insert info into reviews db.
        var query = connection.query("INSERT INTO reviews set ? ",data, function(err, rows)
        {
          // if error console log message.
          if (err)
              console.log("Error inserting : %s ",err );
          // on submit send user back to main page.
          res.redirect('/reviews');
        });
       // console.log(query.sql); get raw query
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  SAVE EDITED REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// save edited review function that saves the edited reviews to the review db.
exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    // get connection to db.
    req.getConnection(function (err, connection) {
        // input feilds for name, post, and star rating.
        var data = {
            name    : input.name,
            post : input.post,
            star   : input.star
        };
        // update selected review in review db.
        connection.query("UPDATE review set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          // if error console log message.
          if (err)
              console.log("Error Updating : %s ",err );
          // on submit send use to main page.
          res.redirect('/reviews');
        });
    });
};

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  DELETE REVIEWS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// delete function delete selected review from review db.
exports.delete_review = function(req,res){
     var id = req.params.id;
     // get connection to db.
     req.getConnection(function (err, connection) {
        // delete selected review from db.
        connection.query("DELETE FROM reviews  WHERE id = ? ",[id], function(err, rows)
        {
             // if error console log message.
             if(err)
                 console.log("Error deleting : %s ",err );
             // on submit send user to main page.
             res.redirect('/reviews');
        });
     });
};
