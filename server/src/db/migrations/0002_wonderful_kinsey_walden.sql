DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('CUSTOMER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "role" "role" DEFAULT 'CUSTOMER';