// CLIENT SIDE:


//======================================================================
// SECTION HEADER:
//======================================================================
// HELPERS:
/*Template.sectionHeader.helpers({

	'statusEqualsCanceled': function() {
		return this.sectionStatus === 'canceled';
	},

	'statusEqualsFull': function() {
		return this.sectionStatus === 'full';
	},

	'statusEqualsFinished': function() {
		return this.sectionStatus === 'finished';
	}
});*/

//======================================================================
// RANDOM BACKGROUND COLOR:
//======================================================================
// USAGE: {{randomBgColor}}
Template.registerHelper('randomBgColor', function() {
	//return randomColor();
	return '#1EFFB4';
});


//======================================================================
// ENGLISH:
//======================================================================
// USAGE: {{english}}
Template.registerHelper('english', function() {
	return TAPi18n.getLanguage() === 'en';
});


//======================================================================
// SPANISH:
//======================================================================
// USAGE: {{english}}
Template.registerHelper('spanish', function() {
	return TAPi18n.getLanguage() === 'es';
});


//======================================================================
// EXTEND PARENT CONTENT:
//======================================================================
/*Template.registerHelper('extendContext', function(keysArray, valuesArray) {
	result = _.clone(this);
	var length = keysArray.length;
	for (var i = 0; i < length; i++) {
		result[keysArray[i]] = valuesArray[i];
	}
	console.log('result: '+_.keys(result));
	return result;
});*/
// USAGE: {{Template extendContext key value}}
Template.registerHelper('extendContext', function(key, value) {
   var result = _.clone(this);
   result[key] = value;
   return result;
});


//======================================================================
// GET USER NAME AND AVATAR FROM USER_ID:
//======================================================================
// USAGE: {{getUserName userId}}
Template.registerHelper('getUserName', function(userId, options) {
	if (userId) {
		return Meteor.users.findOne(userId).profile.name;
	}
});

Template.registerHelper('getUserAvatar', function(userId, options) {
	if (userId) {
		var user = Meteor.users.findOne(userId);
		//console.log('getUserAvatar, userId: '+userId);

		// Check
		if (!user) {
			throw new Meteor.Error('Get User Avatar: no user. userId: ' + userId);
			return;
		}

		// Check
		if (_.isUndefined(user.profile)) {
			throw new Meteor.Error('Get User Avatar: no user profile. userId: ' + userId);
			return;
		}

		var profile = user.profile;

		return !_.isUndefined(profile.avatar) ? profile.avatar : '/default_avatar2.jpg';
		/*if (!_.isUndefined(profile.avatar)) {
			return  profile.avatar;
		} else {
			// Get user name first character
			var firstChar = profile.name.charAt(0);
			return '/chars/' + firstChar + '.png';
		}*/

	}
});


//======================================================================
// SET CHECKED ATTRIBUTE:
//======================================================================
// USAGE: {{isChecked x y}}
Template.registerHelper('isChecked', function(x, y) {
  	if (_.isArray(x)) {
		return _.indexOf(x, y) !== -1 ? {checked: "checked"} : '';
	} else {
		if (x === y){
			return {checked: "checked"};
	   }
	}
  	return;
});


//======================================================================
// SET SELECTED ATTRIBUTE:
//======================================================================
Template.registerHelper('isSelected', function(x, y){
  if (x == y){
     //return ' checked="checked"';
		//return {selected: "selected"};
		return 'selected';
  }
  return;
});

//======================================================================
// GET SCREEN SIZE:
//======================================================================
// USAGE: {{> screenWidth 'operand' 'value'}}
// operands: 'eq', 'leq', 'geq'
// values: 'xs', 'sm', 'md', 'lg'
//----------------------------------------------------------------------
/*UI.registerHelper('screenWidth', function(operand, value){
   if (screen.width < 768) {
     return true;
   }
   return false;
});*/


//======================================================================
// DATE FORMAT USING MOMENT.JS PACKAGE:
//======================================================================
// Source: http://momentjs.com/docs/#/displaying/
//----------------------------------------------------------------------
/*
// SET LANGUAGE:
var lang = TAPi18n.getLanguage();

moment.locale('es', {
	months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
	weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
	weekdaysShort : "Dom._Lun._Mar._Mie._Jue._Vie._Sab.".split("_"),
	weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
});

if (lang === 'es') {
	moment.locale('es'); // change the global locale to Spanish
} else if (lang === 'en') {
	moment.locale('en'); // change the global locale to English
}
*/
//----------------------------------------------------------------------
// DEFINE COMMON TEMPLATES:
/*Template.registerHelper('formatDate', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('DD/MM/YYYY');
	}
});*/

Template.registerHelper('formatDateTime', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		//var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		//if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		/*} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}*/
		return moment(context).format('DD/MM hh:mm');
	}
});

/*Template.registerHelper('formatDateName', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('dddd DD/MM/YYYY');
	}
});

Template.registerHelper('formatDateDayNumber', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('DD');
	}
});

Template.registerHelper('formatDateDayName', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('dddd');
	}
});

Template.registerHelper('formatDateMonthName', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('MMMM');
	}
});

Template.registerHelper('formatDateMonthNameUpper', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('MMMM').toUpperCase();
	}
});
Template.registerHelper('formatDateDayNameUpper', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('dddd').toUpperCase();
	}
});
//----------------------------------------------------------------------
Template.registerHelper('formatDateDayShortName', function(context, options) {
	if(context) {
		// SET LANGUAGE:
		var lang = TAPi18n.getLanguage();

		moment.locale('es', {
			months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
			weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
			weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
			weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
		});

		if (lang === 'es') {
			moment.locale('es'); // change the global locale to Spanish
		} else if (lang === 'en') {
			moment.locale('en'); // change the global locale to English
		}
		return moment.utc(context).format('ddd');
	}
});*/
