public class UploadController {
    public class SensorStruct {
        public String Base_Station;
        public String Status;    
        public String Model;
    } 
    @AuraEnabled
    public static List<Sensor__c> saveRecordsToDB(String input){
        String returnresponse ='';
        List<Sensor__c> sensorList = new List<Sensor__c>();
        system.debug('input = ' + input);
        List<SensorStruct> datalist = (List<SensorStruct>) JSON.deserialize(input, List<SensorStruct>.class);
        system.debug('datalist = ' + datalist);
        system.debug('datalistSize = ' + datalist.size());
        for(SensorStruct s : datalist)
        {
            Sensor__c newSens = new Sensor__c();
            newSens.Model__c        = s.Model;
            newSens.Base_Station__c = (Id)s.Base_Station;
            newSens.Status__c       = s.Status;
            sensorList.add(newSens);
        }
        if(sensorList.size() > 0){
            insert sensorList;
        }
        return sensorList;
    }
    

}