@isTest
public class MainTableTest {
    public static testmethod void testGetNumberOfRecords(){
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='laknlkwjebliserlkbslkfb@testorg.com');

        System.runAs(u) {
            // The following code runs as user 'u' 
            MainTableCS__c m = MainTableCS__c.getInstance(UserInfo.getUserId());
        	m.NumberOfRecords__c = 99;
        	insert m;
            System.assertEquals(99, MainTableController.getNumberOfRecords());
        }
        
    }
    public static testmethod void testSetNumberOfRecords(){
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='laknlkwjebliserlkbslkfb@testorg.com');

        System.runAs(u) {
            // The following code runs as user 'u' 
            Integer i = 33;
	        MainTableCS__c m = MainTableCS__c.getInstance(UserInfo.getUserId());
			insert m;            
            i = MainTableController.setNumberOfRecords(i); 
            m = MainTableCS__c.getInstance(UserInfo.getUserId());
            System.assertEquals(33, m.NumberOfRecords__c);
            
            /*
                MainTableController.setNumberOfRecords(33); 
                MainTableCS__c m = MainTableCS__c.getInstance(UserInfo.getUserId());
                System.assertEquals(33, m.NumberOfRecords__c);
			*/
        }
        
    }
    public static testmethod void testDeleteRecordFrodDB(){
        Base_Station__c b = new Base_Station__c(Name = 'North-east');
        insert b;
        Base_Station__c nb = [SELECT Id, Name FROM Base_Station__c LIMIT 1];
        Sensor__c s = new Sensor__c(Status__c = 'On', Model__c = '8', Base_Station__c = nb.Id);
        insert s;
        Sensor__c ns = [SELECT Id, Model__c FROM Sensor__c LIMIT 1];
        String strId = (String)ns.Id;
        MainTableController.deleteRecordFromDB(strId);
        List<Sensor__c> lsl = [SELECT Id, Model__c FROM Sensor__c];
        
        System.assert(lsl.isEmpty());
    }
}