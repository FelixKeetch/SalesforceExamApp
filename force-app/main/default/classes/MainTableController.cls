public class MainTableController {
    @AuraEnabled
    public static Integer getNumberOfRecords(){
        MainTableCS__c m = MainTableCS__c.getInstance(UserInfo.getUserId());
        /*
        if(m.NumberOfRecords__c == null){
            TestCSControlelr.setNumOfRecs(10);
        }
		*/
        return (Integer)m.NumberOfRecords__c;
    }
    @AuraEnabled
    public static Integer setNumberOfRecords(Integer num){
        MainTableCS__c m = MainTableCS__c.getInstance(UserInfo.getUserId());
        m.NumberOfRecords__c = num;
        update m;
        return num;
    }
    @AuraEnabled
    public static String deleteRecordFromDB(String input){
        String returnString = 'ERROR';
        Id idToDelete = (Id) input;
        List<Sensor__c> s = [SELECT Id FROM Sensor__c WHERE Id = :idToDelete LIMIT 1];
        if(!s.isEmpty()){
           delete s[0];
           returnString = 'SUCCESS';
        }

        return returnString;
        
    }
}