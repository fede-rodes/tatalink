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
   if (x == y) {
     //return ' checked="checked"';
		//return {selected: "selected"};
		return 'selected';
   }
   return;
});

Template.registerHelper('formatDateTime', function(date) {

	// Set locale:
	moment.locale('es', {
		months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
		weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
		weekdaysShort : "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
		weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
	});

	moment.locale('es'); // change the global locale to Spanish
	return moment(date).format('DD/MM hh:mm');

});
