"use strict";
var through2 = require("through2");
var pluginError = require("plugin-error");
var aegean = require("aegean");
var PLUGIN_NAME = "gulp-aegean";
/**
 * Inline ES6 import statements.
 *
 * @return {Void}
 */
function gulpAegean() {
    return through2.obj(function (file, encryption, callback) {
        if (file.isNull() === true) {
            return callback(null, file);
        }
        if (file.isBuffer() === true) {
            var contents = file.contents;
            try {
                contents = Buffer.from(aegean(file.path));
            }
            catch (exception) {
                throw new pluginError(PLUGIN_NAME, exception);
            }
            file.contents = contents;
        }
        if (file.isStream() === true) {
            var stream = file.contents.pipe(file.contents.toString());
            try {
                stream = file.contents.pipe(aegean(file.path));
            }
            catch (exception) {
                throw new pluginError(PLUGIN_NAME, exception);
            }
            file.contents = stream;
        }
        return callback(null, file);
    });
}
module.exports = gulpAegean;
