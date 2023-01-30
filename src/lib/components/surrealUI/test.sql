SELECT 
 Id  -- Auto generated in sf
,OD__c  -- ( ORIGIN||DEST  e.g. LHRDEL)  -- This should be unique key in salesforce
,PKG__c ( value )
,CurrencyIsoCode ( GBP )

-- Prasahnt to tell what more to be populate and with what value.
,Name
,IsDeleted
,CreatedDate
,CreatedById
,LastActivityDate
,LastModifiedById
,LastModifiedDate
,LastReferencedDate
,LastViewedDate
,OwnerId
,SystemModstamp 
FROM Trucking_Coast__c;


SELECT 
 Id  -- Auto generated in sf
,Origin_Destinatination__c   -- ( ORIGIN||DEST  e.g. LHRDEL)  -- This should be unique key in salesforce
,QMC_Expectation__c  -- ( value )


-- Prasahnt to tell what more to be populate and with what value.
,CreatedById
,CreatedDate
,CurrencyIsoCode,
,Destination__c
,IsDeleted
,kg_expection_167kg_density__c
,LastActivityDate
,LastModifiedById
,LastModifiedDate
,LastReferencedDate
,LastViewedDate
,Name
,Origin__c
,OwnerId
,SystemModstamp 
FROM RM_Input__c