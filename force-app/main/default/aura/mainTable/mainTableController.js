({
    doInit: function(component, event, helper) {
        //getNumberOfRecords - gets number of shown records per page,
        //stored in Custom Settings object
        let retVal;
        let action = component.get("c.getNumberOfRecords");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                retVal = response.getReturnValue();
                component.set('v.pageSize', retVal);
            }else{
                console.log(response.getError()[0]);
                component.set('v.pageSize', 20);
            }            
        });
        $A.enqueueAction(action);
    },
    handleRecordsUpdate : function(component, event, helper){
        let recordList = component.get('v.allRecordsList');
        let pageSize = component.get("v.pageSize");
        let totalSize = recordList.length;
        let end;
        
        if(totalSize > pageSize){
	     	end = pageSize - 1;               
    	}else{
            end = totalSize - 1;
        }
        
        component.set("v.totalSize", totalSize);
        component.set("v.start", 0);
        component.set("v.end", end);
        
        let pageList = [];
        for(let i = 0; i <= end; i++){
            pageList.push(recordList[i]);
        }  
        component.set('v.paginationList', pageList);
    },
    deleteRecord : function(component, event, helper){
        let allRecs   = component.get("v.allRecordsList");
        
        let indexToDelete = event.getSource().get('v.name');
        console.log('indexToDelete : ' + indexToDelete);
        let id = allRecs[indexToDelete].Id;
        console.log('id : ' + id);
        
        
        let action = component.get('c.deleteRecordFromDB');
        action.setParams({"input": id});
        action.setCallback(this, function(response){
            //using returned string as state
            let resp = response.getReturnValue();
            if(resp === 'SUCCESS'){
                let totalSize = component.get("v.totalSize"); 
                let newAllRecs = [];
                let allRecs   = component.get("v.allRecordsList");
                
                for(let i = 0; i < totalSize; i++){
                	if(i != indexToDelete){
                        newAllRecs.push(allRecs[i]);
                    }   
	            }
                component.set('v.allRecordsList', newAllRecs);
                
            }else{
                console.log("Couldn't find such a record" + id);
            }
        });
        $A.enqueueAction(action);
        
    },
    setNOR: function(component, event, helper){
        console.log('setNOR started');
        //NOR stands for Number Of Records per Page = PageSize 
        //letnewNOR = component.find("numberOfRecords").get("v.value");
        let newNOR = component.get("v.pageSize");
        let action = component.get("c.setNumberOfRecords");
        //component.set("v.pageSize", newNOR);
                
        //to reload paginationList
        let allRecs = component.get("v.allRecordsList");
        if(!$A.util.isUndefinedOrNull(allRecs)){
	        component.set("v.allRecordsList", allRecs);
        }
		
        //Update NOR in MainTableCustomSetting
        action.setParams({"num": newNOR });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                console.log('Now showing ' + newNOR + ' records');
                //doNothing	
            }else{
                console.log("Failed " + response.getError()[0]);
            }
        });
        $A.enqueueAction(action);
        
    },
    first: function(component, event, helper){
        
        let pageSize  = component.get("v.pageSize");
        let newStart  = 0;
        let totalSize = component.get("v.totalSize"); 
        let newEnd;
        
        if(totalSize > pageSize){
            newEnd = pageSize - 1;
        }else{
            newEnd = totalSize - 1;
        }
        
        let allRecs   = component.get("v.allRecordsList");
        let pageList = []; 
        
        for(let i = newStart; i <= newEnd; i++){
            pageList.push(allRecs[i]);
        }
        
        component.set('v.paginationList', pageList);
        component.set('v.start', newStart);
        component.set('v.end' ,  newEnd);
    },
    last: function(component, event, helper){
        
        let pageSize  = component.get("v.pageSize");
        let totalSize = component.get("v.totalSize"); 
		let newStart;
        if((totalSize % pageSize) !== 0){
            newStart = totalSize - (Number(totalSize) % Number(pageSize));
        }else{
            newStart = totalSize - pageSize;
        }
        let newEnd    = totalSize - 1;
        let allRecs   = component.get("v.allRecordsList");
        let pageList = []; 
        
        for(let i = newStart; i <= newEnd; i++){
            pageList.push(allRecs[i]);
        }
        
        component.set('v.paginationList', pageList);
        component.set('v.start', newStart);
        component.set('v.end' ,  newEnd);
    },
    next: function(component, event, helper){

        let pageSize  = component.get("v.pageSize");
        let totalSize = component.get("v.totalSize");
        let newStart  = component.get('v.end') + 1;
        let newEnd   =  Number(component.get('v.end')) + Number(pageSize);

        if(totalSize <= newEnd){
            newEnd = totalSize - 1;
        }      
        let allRecs   = component.get("v.allRecordsList");
        let pageList = []; 
        
        for(let i = newStart; i <= newEnd; i++){
            pageList.push(allRecs[i]);
        }
        
        component.set('v.paginationList', pageList);
        component.set('v.start', newStart);
        component.set('v.end' ,  newEnd);
    },
    previous: function(component, event, helper){
        let pageSize  = component.get("v.pageSize");
        let totalSize = component.get("v.totalSize"); 
        let newStart  = component.get('v.start') - pageSize;
        let newEnd    = component.get('v.start') - 1;
        let allRecs   = component.get("v.allRecordsList");
        let pageList = []; 
        
        for(let i = newStart; i <= newEnd; i++){
            pageList.push(allRecs[i]);
        }
        
        component.set('v.paginationList', pageList);
        component.set('v.start', newStart);
        component.set('v.end' ,  newEnd);
    }
})