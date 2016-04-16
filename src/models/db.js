module.exports = function() {
  var Sequelize = require('sequelize');
  var mysql = require('mysql');
  var _sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_SCHEMA,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });

  //Sequelize will setup a connection pool on initialization so you should ideally only ever create one instance per database.

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    User
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _user = _sequelize.define('user', { //to define mapping between a model and table use ".define" . Sequelize will then automatically add the attributes createdAt and updatedAt to it
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    dispName: {
      type: Sequelize.STRING  //.STRING sets the 
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    gender: { //added ability for user to set gender on registration to generate recommendations based on gender
      type: Sequelize.STRING
    },
    age: { //added ability for user to set age on registration to generate recommendations based on age
      type: Sequelize.INTEGER
    },
    hobby: { //added ability for user to set hobbys on registration to generate recommendations based on degree
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });



  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    genre
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _genre = _sequelize.define('genre', {
    title: { 
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

   // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    degree  - if you are reading this sean is awesome 
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _degree = _sequelize.define('degree', {
    title: { 
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Roles
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _role = _sequelize.define('role', {
    title: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Social Accounts
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _socialAccount = _sequelize.define('socialAccount', {
    socialID: {
      type: Sequelize.INTEGER
    },
    publicLink: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.ENUM,
      values: ['google', 'twitter', 'facebook']
    },
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Apps
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _app = _sequelize.define('app', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    age: {
      type: Sequelize.INTEGER
    },
    readme: {
      type: Sequelize.TEXT
    },
    sourceLink: {
      type: Sequelize.STRING
    },
    exeLink: {
      type: Sequelize.STRING
    },
    iOSAppStoreLink: {
      type: Sequelize.STRING
    },
    releaseDate: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true
  });

  // This is making the table in SQL with 3 fields for now: name, post, & star rating.
  
  var _review = _sequelize.define('review', {
    name: {
      type: Sequelize.STRING
    },
    post: {
      type: Sequelize.TEXT
    },
    star: {
      type: Sequelize.INTEGER
    }
  }, {
    paranoid: true
  });


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    App Assets
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _appAsset = _sequelize.define('appAsset', {
    type: {
      type: Sequelize.ENUM,
      values: ['image', 'YouTube', 'other']
    },
    link: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Lists
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _list = _sequelize.define('list', {
    title: {
      type: Sequelize.STRING
    },
    releaseDate: {
      type: Sequelize.DATE
    },
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    History
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _history = _sequelize.define('history', {
    rawRoute: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    action: {
      type: Sequelize.STRING
    },
    target: {
      type: Sequelize.STRING
    },
  }, {
    paranoid: true
  });


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Listed Apps - table joins
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _listedApp = _sequelize.define('listedApp', {}, {
    paranoid: false
  });

  _user.belongsTo(_role, { //belongsTo - add a foreign key and singular association mixins to the source.
    foreignKey: 'role_id'
  });
  _genre.hasOne(_app, { //hasOne - adds a foreign key to the target "app" and singular association mixins to the source.
    foreignKey: 'genre_id'
  });
  _degree.hasOne(_user, {
    foreignKey: 'degree_id'
  });
  _user.hasMany(_socialAccount, { //hasMany - adds a foreign key to target and plural association mixins to the source.
    foreignKey: 'user_id'
  });
  _user.hasMany(_app, {
    foreignKey: 'user_id'
  });
  _app.hasMany(_appAsset, {
    foreignKey: 'app_id'
  });
  _user.hasMany(_list, {
    foreignKey: 'user_id'
  });

  _app.belongsToMany(_list, { //
    through: 'listedApp'
  });



  _sequelize.sync();

  return {
    connection: _sequelize,
    user: _user,
    app: _app,
    histories: _history,
    appAsset: _appAsset,
    list: _list,
    listedApp: _listedApp,
    role: _role
  }
}();
