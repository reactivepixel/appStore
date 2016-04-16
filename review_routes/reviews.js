
// Function to GET user listing from database

exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM reviews',function(err,rows)
        {

// If there is an error, display this message:
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('reviews',{page_title:"Comment Area",data:rows});


         });

         //console.log(query.sql); Test to get raw query
    });

};

/* Code to add your review / comment
Required for CREATE part of CRUD */

exports.add = function(req, res){
  res.render('add_review',{page_title:"Add Comment"});
};

/* Edit your review
Required for UPDATE part of CRUD */

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM reviews WHERE id = ?',[id],function(err,rows)
        {

// If there is an error, display this message:
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_review',{page_title:"Edit Comment",data:rows});


         });

         //console.log(query.sql);
    });
};

/* Save the customer information in the database.
We are only keeping this name until a login is created. */

exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            post : input.post,
            star   : input.star

        };

        var query = connection.query("INSERT INTO reviews set ? ",data, function(err, rows)
        {

// If there is an error, display this message:
          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/reviews');

        });

       // console.log(query.sql); Test to get raw query

    });
};

/* Save any edits made to your review 
Required for UPDATE part of CRUD */

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            post : input.post,
            star   : input.star

        };

        connection.query("UPDATE review set ? WHERE id = ? ",[data,id], function(err, rows)
        {

// If there is an error, display this message:
          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/reviews');

        });

    });
};

/* Code to Delete your Review
Required for DELETE part of CRUD */

exports.delete_review = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM reviews  WHERE id = ? ",[id], function(err, rows)
        {

// If there is an error, display this message:
             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/reviews');

        });

     });
};
