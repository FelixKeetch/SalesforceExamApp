@isTest
public class UploadControllerTest {
    public static testmethod void testSaveRecords(){
        Base_Station__c b = new Base_Station__c(Name = 'Yo');
        insert b;
        b = [SELECT Id, Name FROM Base_Station__c LIMIT 1];
        String json = '[{\"Base_Station\":\"' + b.Id + '\", \"Status\":\"On\", \"Model\" : \"S32\"}]';
        List<Sensor__c> sens = UploadController.saveRecordsToDB(json);
        Sensor__c s = [SELECT Id, Model__c, Status__c, Base_Station__c FROM Sensor__C LIMIT 1];
        
        System.assertEquals('S32', s.Model__c);
        System.assertEquals('On', s.Status__c);
        
        
    }
}