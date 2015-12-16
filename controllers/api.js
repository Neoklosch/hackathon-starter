/**
 * Split into declaration and initialization for better performance.
 */
var _ = require('lodash'),
    async = require('async'),
    querystring = require('querystring'),
    secrets = require('../config/secrets');

/**
 * GET /api
 * List of API examples.
 */
exports.index = function(req, res) {
    res.render('api/index', {
        title: 'API Examples'
    });
};
