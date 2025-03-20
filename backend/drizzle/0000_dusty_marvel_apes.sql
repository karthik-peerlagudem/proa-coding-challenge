CREATE TABLE `measurement` (
	`measurement_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`variable_id` integer NOT NULL,
	`value` text NOT NULL,
	`timestamp` text NOT NULL,
	FOREIGN KEY (`variable_id`) REFERENCES `variable`(`variable_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `station` (
	`station_id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`site` text NOT NULL,
	`portfolio` text NOT NULL,
	`state` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `variable` (
	`variable_id` integer PRIMARY KEY NOT NULL,
	`stations_id` text NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`long_name` text NOT NULL,
	FOREIGN KEY (`stations_id`) REFERENCES `station`(`station_id`) ON UPDATE no action ON DELETE no action
);
