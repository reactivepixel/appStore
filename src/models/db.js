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

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    User
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _user = _sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    dispName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
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
//This is what making the table in sql it is making 3 fields for now: name, content, and star
  var _review = _sequelize.define('review', {
    name: {
      type: Sequelize.STRING
    },
    content: {
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
  //    Listed Apps
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _listedApp = _sequelize.define('listedApp', {}, {
    paranoid: false
  });



  _user.belongsTo(_role, {
    foreignKey: 'role_id'
  });
  _user.hasMany(_socialAccount, {
    foreignKey: 'user_id'
  });
  _user.hasMany(_review, { //This is what tracks the user so when they log in it will track them here.
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

  _app.belongsToMany(_list, {
    through: 'listedApp'
  });



  _sequelize.sync();

  return {
    connection: _sequelize,
    user: _user,
    app: _app,
    appAsset: _appAsset,
    list: _list,
    listedApp: _listedApp,
    role: _role
  }
}();
