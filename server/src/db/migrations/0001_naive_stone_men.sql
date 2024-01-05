DO $$ BEGIN
 CREATE TYPE "Status_Transactions" AS ENUM('PENDING', 'SUCCESS', 'CANCELED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
