CREATE TABLE "app_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adhara_customer_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "app_users_adhara_customer_id_unique" UNIQUE("adhara_customer_id"),
	CONSTRAINT "app_users_email_unique" UNIQUE("email"),
	CONSTRAINT "app_users_role_check" CHECK ("app_users"."role" in ('coach', 'member'))
);
--> statement-breakpoint
CREATE TABLE "client_snapshots" (
	"client_id" uuid PRIMARY KEY NOT NULL,
	"goals" text DEFAULT '' NOT NULL,
	"starting_point" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coach_id" uuid NOT NULL,
	"member_user_id" uuid,
	"name" text NOT NULL,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "life_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"type_id" text NOT NULL,
	"title" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	CONSTRAINT "life_events_type_id_check" CHECK ("life_events"."type_id" in ('travel', 'work', 'other'))
);
--> statement-breakpoint
CREATE TABLE "month_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadmap_id" uuid NOT NULL,
	"month_index" smallint NOT NULL,
	"goal" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadmap_id" uuid NOT NULL,
	"type_id" text NOT NULL,
	"label" text NOT NULL,
	"color" text NOT NULL,
	"border" text NOT NULL,
	"text_class" text NOT NULL,
	"start_month" smallint NOT NULL,
	"end_month" smallint NOT NULL,
	CONSTRAINT "phases_type_id_check" CHECK ("phases"."type_id" in ('build', 'cut', 'maintenance', 'custom'))
);
--> statement-breakpoint
CREATE TABLE "roadmaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"duration" smallint NOT NULL,
	"start_date" date NOT NULL,
	CONSTRAINT "roadmaps_duration_check" CHECK ("roadmaps"."duration" in (3, 6, 12))
);
--> statement-breakpoint
CREATE TABLE "training_bounds" (
	"client_id" uuid PRIMARY KEY NOT NULL,
	"ceiling_days_per_week" text DEFAULT '' NOT NULL,
	"ceiling_session_length" text DEFAULT '' NOT NULL,
	"floor_days_per_week" text DEFAULT '' NOT NULL,
	"floor_session_length" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_snapshots" ADD CONSTRAINT "client_snapshots_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_coach_id_app_users_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_member_user_id_app_users_id_fk" FOREIGN KEY ("member_user_id") REFERENCES "public"."app_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "life_events" ADD CONSTRAINT "life_events_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "month_notes" ADD CONSTRAINT "month_notes_roadmap_id_roadmaps_id_fk" FOREIGN KEY ("roadmap_id") REFERENCES "public"."roadmaps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phases" ADD CONSTRAINT "phases_roadmap_id_roadmaps_id_fk" FOREIGN KEY ("roadmap_id") REFERENCES "public"."roadmaps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_bounds" ADD CONSTRAINT "training_bounds_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clients_coach_email_unique" ON "clients" USING btree ("coach_id","email") WHERE "clients"."email" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "month_notes_roadmap_month_unique" ON "month_notes" USING btree ("roadmap_id","month_index");--> statement-breakpoint
CREATE UNIQUE INDEX "roadmaps_client_duration_unique" ON "roadmaps" USING btree ("client_id","duration");