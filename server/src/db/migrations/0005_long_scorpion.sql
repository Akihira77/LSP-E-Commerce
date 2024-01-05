CREATE TABLE IF NOT EXISTS "Carts" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Quantity" integer NOT NULL,
	"User_Id" integer NOT NULL,
	"Product_Id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Carts" ADD CONSTRAINT "Carts_User_Id_Users_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Carts" ADD CONSTRAINT "Carts_Product_Id_Products_Id_fk" FOREIGN KEY ("Product_Id") REFERENCES "Products"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
