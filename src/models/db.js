const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    User
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const user = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  dispName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  hobby: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    genre
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const genre = sequelize.define('genre', {
  title: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    degree
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const degree = sequelize.define('degree', {
  title: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Roles
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const role = sequelize.define('role', {
  title: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Social Accounts
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const socialAccount = sequelize.define('socialAccount', {
  socialID: {
    type: Sequelize.INTEGER,
  },
  publicLink: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['google', 'twitter', 'facebook'],
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Apps
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const app = sequelize.define('app', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  readme: {
    type: Sequelize.TEXT,
  },
  sourceLink: {
    type: Sequelize.STRING,
  },
  exeLink: {
    type: Sequelize.STRING,
  },
  iOSAppStoreLink: {
    type: Sequelize.STRING,
  },
  releaseDate: {
    type: Sequelize.DATE,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Review
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const review = sequelize.define('review', {
  name: {
    type: Sequelize.STRING,
  },
  post: {
    type: Sequelize.TEXT,
  },
  star: {
    type: Sequelize.INTEGER,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    App Assets
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const appAsset = sequelize.define('appAsset', {
  type: {
    type: Sequelize.ENUM,
    values: ['image', 'YouTube', 'other'],
  },
  link: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Lists
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const list = sequelize.define('list', {
  title: {
    type: Sequelize.STRING,
  },
  releaseDate: {
    type: Sequelize.DATE,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    History
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const history = sequelize.define('history', {
  rawRoute: {
    type: Sequelize.STRING,
  },
  model: {
    type: Sequelize.STRING,
  },
  action: {
    type: Sequelize.STRING,
  },
  target: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Listed Apps - table joins
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const listedApp = sequelize.define('listedApp', {}, {
  paranoid: false,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//    Relations
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
user.belongsTo(role, {
  foreignKey: 'role_id',
});

genre.hasOne(app, {
  foreignKey: 'genre_id',
});

degree.hasOne(user, {
  foreignKey: 'degree_id',
});

user.hasMany(socialAccount, {
  foreignKey: 'user_id',
});

user.hasMany(review, {
  foreignKey: 'user_id',
});

user.hasMany(app, {
  foreignKey: 'user_id',
});

app.hasMany(appAsset, {
  foreignKey: 'app_id',
});

user.hasMany(list, {
  foreignKey: 'user_id',
});

app.belongsToMany(list, {
  through: 'listedApp',
});

// Sync the Database with the ORM's Model.
sequelize.sync();

exports.sequelize = sequelize;
exports.user = user;
exports.app = app;
exports.history = history;
exports.review = review;
exports.appAsset = appAsset;
exports.list = list;
exports.listedApp = listedApp;
exports.role = role;
