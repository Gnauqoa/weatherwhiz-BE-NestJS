-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verified" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false,
ALTER COLUMN "location_id" DROP NOT NULL,
ALTER COLUMN "notification_each_day" SET DEFAULT false,
ALTER COLUMN "location_query" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "active" SET DEFAULT true;
