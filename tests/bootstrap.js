'use strict';

require('angular');
require('angular-mocks');
require('../docs/js/bootstrap.js');

var ctx = require.context('.', true, /\.js$/);
ctx.keys().forEach(ctx);
