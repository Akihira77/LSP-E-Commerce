DO $$ BEGIN
 CREATE TYPE "Roles" AS ENUM('CUSTOMER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "Image_Name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "Image_Data" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "Roles" "Roles" DEFAULT 'CUSTOMER' NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "role";