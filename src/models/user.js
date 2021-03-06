const db = require('./db.js');
const util = require('apex-util');

/**
 * @function create
 * @param payload
 * An object that contains all props for creation of the model.
 * @param err
 * Callback Function in the event of an error.
 * @param success
 * Callback Function in the event of an Success.
 * @example
 * .create({
 *   dispName: 'Best User Ever',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.create = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: User Create', payload);
  db.user.create(payload).then(success).catch(err);
  return true;
};

/**
 * @function update
 * @param payload
 * An object that contains all props for update of the db.
 * @param err
 * Callback Function in the event of an error.
 * @param success
 * Callback Function in the event of an Success.
 * @example
 * .update({
 *   id: 'xxxx-xxx-xxx-xxx-xxxx',
 *   dispName: 'An Even Better User',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.update = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: User Update', payload);
  db.user.find({
    where: {
      id: payload.id,
    },
  }).then((matchedUserAsset) => {
    matchedUserAsset.updateAttributes(payload).then(success).catch(err);
  }).catch(err);
  return true;
};

/**
 * @function find
 * @param payload
 * An object that contains an id prop to find in the db.
 * @param err
 * Callback Function in the event of an error.
 * @param success
 * Callback Function in the event of an Success.
 * @example
 * .find({
 *   id: 'xxxx-xxx-xxx-xxx-xxxx',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.find = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: User Find', payload);

  db.user.find({
    where: {
      id: payload.id,
    },
    // Find all relations defiend in sequelize
    include: [{
      all: true,
      nested: true,
    }],
  }).then(success).catch(err);
  return true;
};

/**
 * @function findAll
 * @param err
 * Callback Function in the event of an error.
 * @param success
 * Callback Function in the event of an Success.
 * @example
 * .findAll((errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.findAll = (err, success) => {
  db.user.findAll({
    // Find all relations defiend in sequelize
    include: [{
      all: true,
      nested: true,
    }],
  }).then(success).catch(err);
};

/**
 * @function destroy
 * @param payload
 * An object that contains an id prop to delete in the db.
 * @param err
 * Callback Function in the event of an error.
 * @param success
 * Callback Function in the event of an Success.
 * @example
 * .destroy({
 *   id: 'xxxx-xxx-xxx-xxx-xxxx',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.destroy = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: User Destroy', payload);
  db.user.destroy({
    where: {
      id: payload.id,
    },
    // Override if paraniod mode has been set to true for this table.
    force: payload.force || false,
  }).then(success).catch(err);
  return true;
};
