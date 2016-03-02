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
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Social Types
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _socialType = _sequelize.define('socialAccount', {
    title: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //    Apps
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var _app = _sequelize.define('app', {
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
    paranoid: true
  });



  _user.belongsTo(_role, {
    foreignKey: 'role_id'
  });
  _user.hasMany(_socialAccount, {
    foreignKey: 'user_id'
  });
  _socialAccount.belongsTo(_socialType, {
    foreignKey: 'social_type_id'
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
    list: _list,
    role: _role
  }
}();
