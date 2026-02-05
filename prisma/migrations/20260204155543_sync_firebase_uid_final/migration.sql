-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20),
    "access_token" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(255),
    "role_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(255),
    "name" VARCHAR DEFAULT '128',
    "place_of_birth" VARCHAR DEFAULT '64',
    "date_of_birth" DATE,
    "gender" SMALLINT DEFAULT 1,
    "card_number" VARCHAR DEFAULT '32',
    "address" VARCHAR DEFAULT '128',
    "rt" SMALLINT DEFAULT 2,
    "rw" SMALLINT DEFAULT 2,
    "city_id" VARCHAR DEFAULT '16',
    "postal_code" INTEGER,
    "responsible_for_costs" VARCHAR DEFAULT '64',
    "blood_group" VARCHAR DEFAULT '2',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR DEFAULT '64',
    "address" VARCHAR DEFAULT '255',
    "accreditation" VARCHAR DEFAULT '2',
    "contact_name" VARCHAR DEFAULT '64',
    "contact_phone" VARCHAR DEFAULT '24',
    "contact_email" VARCHAR DEFAULT '255',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR DEFAULT '128',
    "description" TEXT,
    "status" SMALLINT DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "clinic_id" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "polies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "degree" VARCHAR DEFAULT '64',
    "description" TEXT,
    "clinic_id" UUID DEFAULT gen_random_uuid(),
    "poly_id" UUID DEFAULT gen_random_uuid(),
    "status" SMALLINT DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "specialize" VARCHAR DEFAULT '64',
    "user_id" VARCHAR(255),
    "name" VARCHAR,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_dates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "poly_id" UUID DEFAULT gen_random_uuid(),
    "doctor_id" UUID DEFAULT gen_random_uuid(),
    "schedule_date" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedule_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_times" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_id" UUID DEFAULT gen_random_uuid(),
    "schedule_time" VARCHAR DEFAULT '64',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "limit" INTEGER,

    CONSTRAINT "schedule_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(255),
    "clinic_id" UUID DEFAULT gen_random_uuid(),
    "poly_id" UUID DEFAULT gen_random_uuid(),
    "doctor_id" UUID DEFAULT gen_random_uuid(),
    "date_id" UUID DEFAULT gen_random_uuid(),
    "time_id" UUID DEFAULT gen_random_uuid(),
    "status" SMALLINT DEFAULT 1,
    "rejected_note" VARCHAR DEFAULT '255',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "qr_code" VARCHAR DEFAULT '8',
    "symptoms" TEXT,
    "symptom_description" TEXT,
    "ai_response" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drugs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR DEFAULT '128',
    "description" TEXT,
    "company_name" VARCHAR DEFAULT '255',
    "stock" INTEGER DEFAULT 0,
    "buy_price" DECIMAL(15,2),
    "sell_price" DECIMAL(65,30),
    "dosis" VARCHAR DEFAULT '16',
    "kind" VARCHAR DEFAULT '32',
    "is_halal" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_drugs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "appointment_id" UUID DEFAULT gen_random_uuid(),
    "drug_id" UUID DEFAULT gen_random_uuid(),
    "status" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30),
    "grab_status" SMALLINT DEFAULT 1,
    "grab_date" TIMESTAMP(6),

    CONSTRAINT "appointment_drugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "procedure" VARCHAR,
    "price" DECIMAL(65,30),
    "status" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "clinic_id" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_fees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "appointment_id" UUID DEFAULT gen_random_uuid(),
    "fee_id" UUID DEFAULT gen_random_uuid(),
    "status" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "price" BIGINT,

    CONSTRAINT "appointment_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "bank_id" UUID NOT NULL,
    "appointment_id" UUID NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "transaction_number" VARCHAR(255) NOT NULL,
    "total_price" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "status" INTEGER,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "account_number" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drug_patients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(255),
    "drug_id" UUID DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR DEFAULT '255',
    "consume_time" VARCHAR,
    "many_per_day" SMALLINT,

    CONSTRAINT "drug_patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" SMALLINT,
    "user_id_from" VARCHAR(255),
    "user_id_to" VARCHAR(255),
    "page_link" VARCHAR DEFAULT '',
    "message" TEXT,
    "status" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symptoms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "poly_id" UUID DEFAULT gen_random_uuid(),
    "en_name" VARCHAR DEFAULT '32',
    "id_name" VARCHAR DEFAULT '32',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abouts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_body" TEXT,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "en_body" TEXT,

    CONSTRAINT "abouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_apis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "api_model" VARCHAR,
    "api_key" VARCHAR,
    "max_tokens_limit" INTEGER DEFAULT 900000,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN,

    CONSTRAINT "ai_apis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "en_title" VARCHAR DEFAULT '255',
    "en_description" TEXT,
    "id_title" VARCHAR DEFAULT '255',
    "id_description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "module_class" VARCHAR NOT NULL,
    "module_id" UUID NOT NULL,
    "file_name" VARCHAR NOT NULL,
    "file_type" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_centers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "en_summary" TEXT,
    "en_note" VARCHAR DEFAULT '255',
    "en_contact" VARCHAR DEFAULT '255',
    "id_summary" TEXT,
    "id_note" VARCHAR DEFAULT '255',
    "id_contact" VARCHAR DEFAULT '255',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "help_centers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "polies" ADD CONSTRAINT "polies_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_poly_id_fkey" FOREIGN KEY ("poly_id") REFERENCES "polies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedule_dates" ADD CONSTRAINT "schedule_dates_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedule_dates" ADD CONSTRAINT "schedule_dates_poly_id_fkey" FOREIGN KEY ("poly_id") REFERENCES "polies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedule_times" ADD CONSTRAINT "schedule_times_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "schedule_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "schedule_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_poly_id_fkey" FOREIGN KEY ("poly_id") REFERENCES "polies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_time_id_fkey" FOREIGN KEY ("time_id") REFERENCES "schedule_times"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment_drugs" ADD CONSTRAINT "appointment_drugs_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment_drugs" ADD CONSTRAINT "appointment_drugs_drug_id_fkey" FOREIGN KEY ("drug_id") REFERENCES "drugs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment_fees" ADD CONSTRAINT "appointment_fees_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment_fees" ADD CONSTRAINT "appointment_fees_fee_id_fkey" FOREIGN KEY ("fee_id") REFERENCES "fees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_appointment_id" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_bank_id" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_patients" ADD CONSTRAINT "drug_patients_drug_id_fkey" FOREIGN KEY ("drug_id") REFERENCES "drugs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_patients" ADD CONSTRAINT "drug_patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "symptoms" ADD CONSTRAINT "symptoms_poly_id_fkey" FOREIGN KEY ("poly_id") REFERENCES "polies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
