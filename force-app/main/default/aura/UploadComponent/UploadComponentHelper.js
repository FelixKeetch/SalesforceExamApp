({
    CSV2JSON: function (component,csv) {
  		var arr = []; 
        arr =  csv.split('\n');
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
            }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        console.log('json = '+ json);
        return json;  
    },
    
    saveRecords : function (component,jsonstr){
        let action = component.get("c.saveRecordsToDB"); 
        action.setParams({"input" : jsonstr});
        action.setCallback(this, function(response) {
           console.log('CALLBACK IS ON'); 
           let state = response.getState();
           var toastEvent = $A.get("e.force:showToast");
            if (state === "SUCCESS") {                 
               /*Firing the RecordsUploaded event*/   
                var allRecordsList = response.getReturnValue();
                console.log('response.getReturnValue(): ' + JSON.stringify(allRecordsList));
                let updateEvent = component.getEvent("recordsUploadedSuccessfully");
                updateEvent.setParams({"allRecordsList": allRecordsList });
                updateEvent.fire();                
                toastEvent.setParams({
                    "title": "Success!",
                     "type" : "success",
                    "message": "The records have been uploaded successfully."
                 });
                toastEvent.fire();
           }else{
               alert("Not Success");
                var errors = response.getError();
                if (errors) {
                  if (errors[0] && errors[0].message) {
                         console.log("Error message: " +  errors[0].message);
                  }
                toastEvent.setParams({
                    "title": "Error",
                    "type": "error",
                    "message": "The records have not been uploaded."});
                 }   
                 toastEvent.fire();
           }
        });
        $A.enqueueAction(action);
    }
})