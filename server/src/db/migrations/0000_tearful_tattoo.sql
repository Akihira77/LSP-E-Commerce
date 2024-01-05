CREATE TABLE IF NOT EXISTS "Addresses" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Street" varchar(255) NOT NULL,
	"City" varchar(25) NOT NULL,
	"State" varchar(25) NOT NULL,
	"Postal_Code" varchar(9) NOT NULL,
	"Created_At" timestamp NOT NULL,
	"Updated_At" timestamp DEFAULT now() NOT NULL,
	"User_Id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Categories" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(25) NOT NULL,
	"Created_At" timestamp NOT NULL,
	"Updated_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Products" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Price" numeric NOT NULL,
	"Stock" integer NOT NULL,
	"Date_Expired" timestamp NOT NULL,
	"Category_Id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Transaction_Details" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Quantity" integer NOT NULL,
	"Product_Id" integer NOT NULL,
	"Transaction_Id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Transactions" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Total_Price" numeric NOT NULL,
	"Payment_Method" varchar(15) DEFAULT 'TUNAI' NOT NULL,
	"Status_Transactions" "Status_Transactions" NOT NULL,
	"Created_At" timestamp NOT NULL,
	"User_Id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(25) NOT NULL,
	"Phone_Number" varchar(16) NOT NULL,
	"Email" varchar(25) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"Created_At" timestamp NOT NULL,
	"Updated_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_Phone_Number_unique" UNIQUE("Phone_Number"),
	CONSTRAINT "Users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_User_Id_Users_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Products" ADD CONSTRAINT "Products_Category_Id_Categories_Id_fk" FOREIGN KEY ("Category_Id") REFERENCES "Categories"("Id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transaction_Details" ADD CONSTRAINT "Transaction_Details_Product_Id_Products_Id_fk" FOREIGN KEY ("Product_Id") REFERENCES "Products"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transaction_Details" ADD CONSTRAINT "Transaction_Details_Transaction_Id_Transactions_Id_fk" FOREIGN KEY ("Transaction_Id") REFERENCES "Transactions"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_User_Id_Users_Id_fk" FOREIGN KEY ("User_Id") REFERENCES "Users"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
