
/* Function to GET user listing from database */

exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM reviews',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('reviews',{page_title:"Comment Area",data:rows});


         });

         //console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_review',{page_title:"Add Comment"});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM reviews WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_review',{page_title:"Edit Comment",data:rows});


         });

         //console.log(query.sql);
    });
};

/*  Save the customer  */

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

          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/reviews');

        });

       // console.log(query.sql); get raw query

    });
};

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

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/reviews');

        });

    });
};


exports.delete_review = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM reviews  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/reviews');

        });

     });
};
