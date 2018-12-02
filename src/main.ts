import * as through2 from "through2";
import * as pluginError from "plugin-error";
import * as aegean from "aegean";

const PLUGIN_NAME = "gulp-aegean";

/**
 * Inline ES6 import statements.
 *
 * @return {Void}
 */
function gulpAegean(): void {
	return through2.obj(function(file, encryption, callback) {
		if (file.isNull() === true) {
			return callback(null, file);
		}

		if (file.isBuffer() === true) {
			let contents = file.contents;

			try {
				contents = Buffer.from(aegean(file.path));
			} catch (exception) {
				throw new pluginError(PLUGIN_NAME, exception);
			}

			file.contents = contents;
		}

		if (file.isStream() === true) {
			let stream = file.contents.pipe(file.contents.toString());

			try {
				stream = file.contents.pipe(aegean(file.path));
			} catch (exception) {
				throw new pluginError(PLUGIN_NAME, exception);
			}

			file.contents = stream;
		}

		return callback(null, file);
	});
}

export = gulpAegean;
