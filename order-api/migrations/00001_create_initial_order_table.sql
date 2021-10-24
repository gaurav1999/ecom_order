CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "order" (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id varchar NOT NULL,
	discount float8 NULL,
	total_amount float8 NOT NULL,
	billable_amount float8 NOT NULL,
	cart_object jsonb NOT NULL DEFAULT '[]'::jsonb,
	address_object jsonb NOT NULL DEFAULT '[]'::jsonb,
	email varchar NOT NULL,
	payment_id varchar NOT NULL,
	payment_status varchar NOT NULL,
	payment_mode varchar NOT NULL,
	created timestamp NOT NULL,
	updated timestamp NOT NULL
);
