({
	uploadRecords : function(component, event, helper) {
		//working in lightning record page, doesn't work in aura app
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if (file) {
            console.log("File");
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                console.log("EVT FN");
                var csv = evt.target.result;
                console.log('csv file contains'+ csv);
                var result = helper.CSV2JSON(component,csv);
                console.log('result = ' + JSON.parse(result));
                helper.saveRecords(component,result);        
            }
            reader.onerror = function (evt) {
                console.log("Error occured while reading the file");
            }
    	}
       
	}
})