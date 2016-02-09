//----------------------------------------------------------------------
processMessage = function(message) {

	if (_.isArray(message)) {
		_.each(message, function(msg) {
			if (!_.isUndefined(msg.text) && _.isString(msg.text)) {
				toastr[msg.status](msg.text);
			}
		});
	} else {
		if (!_.isNull(message) && !_.isUndefined(message) && !_.isUndefined(message.text) && _.isString(message.text)) {
			toastr[message.status](message.text);
		}
	}
}
