const db = require('./db.js');
const util = require('../../lib/util');

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
 *   app_id: 'xxxx-xxx-xxx-xxx-xxxx',
 *   link: 'https://someURL.com',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.create = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: App Asset Create', payload);
  db.appAsset.create(payload).then(success).catch(err);
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
 *   link: 'https://someOtherURL.com',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.update = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: App Asset Find', payload);
  db.appAsset.find({
    where: {
      id: payload.id,
    },
  }).then((matchedAppAsset) => {
    matchedAppAsset.updateAttributes(payload).then(success).catch(err);
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

  util.debug('Model: App Asset Find', payload);

  db.appAsset.find({
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
  db.appAsset.findAll({
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

  db.appAsset.destroy({
    where: {
      id: payload.id,
    },
    // Override if paraniod mode has been set to true for this table.
    force: payload.force || false,
  }).then(success).catch(err);
  return true;
};
