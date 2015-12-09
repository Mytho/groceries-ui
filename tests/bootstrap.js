'use strict';

require('angular');
require('angular-mocks');
require('../src/js/bootstrap.js');

var ctx = require.context('.', true, /\.js$/);
ctx.keys().forEach(ctx);
