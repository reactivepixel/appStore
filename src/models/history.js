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
 *   rawRoute: '/api/users',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.create = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: History Create', payload);
  db.history.create(payload).then(success).catch(err);
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
 *   rawRoute: '/api/app/c0dfa7c3-8b92-429e-b77c-dca8120a59c8/asset',
 * }, (errorMsg) => {
 *   console.log(errorMsg);
 * }, (successData) => {
 *   console.log(successData);
 * });
 */
exports.update = (payload, err, success) => {
  // If the Data has not been sanitized evoke an error.
  if (!payload.cleaned) return err('Data not sanitized.');

  util.debug('Model: History Update', payload);
  db.history.find({
    where: {
      id: payload.id,
    },
  }).then((matchedHistoryAsset) => {
    matchedHistoryAsset.updateAttributes(payload).then(success).catch(err);
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

  util.debug('Model: History Find', payload);

  db.history.find({
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
  db.history.findAll({
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

  util.debug('Model: History Destroy', payload);
  db.history.destroy({
    where: {
      id: payload.id,
    },
    // Override if paraniod mode has been set to true for this table.
    force: payload.force || false,
  }).then(success).catch(err);
  return true;
};
