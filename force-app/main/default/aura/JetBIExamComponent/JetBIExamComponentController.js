({
	handleRecordsUpload : function(component, event, helper) {
		var allrecList = event.getParam("allRecordsList");
        component.set('v.allRecordsList', allrecList);
        
	}
})