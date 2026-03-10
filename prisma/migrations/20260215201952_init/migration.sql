-- CreateEnum
CREATE TYPE "ICalFileUploadLimit" AS ENUM ('THREE', 'TEN', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "CronServiceStatus" AS ENUM ('PROCESSED', 'PROCESSING', 'NOT_PROCESSED', 'FAILED_PROCESSING');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('DAILY', 'HOURLY');

-- CreateEnum
CREATE TYPE "ConflictResolution" AS ENUM ('NONE', 'KEPT_PLA', 'KEPT_ALA', 'MERGE', 'SPLIT');

-- CreateEnum
CREATE TYPE "SupportedCountries" AS ENUM ('USA', 'CAN', 'MEX', 'GBR', 'AUS', 'CYM');

-- CreateEnum
CREATE TYPE "OrgTierType" AS ENUM ('TIER_0', 'TIER_1', 'TIER_3');

-- CreateEnum
CREATE TYPE "PriorityType" AS ENUM ('PRIORITY_0', 'PRIORITY_1', 'NO_PRIORITY');

-- CreateEnum
CREATE TYPE "ICalOwnerType" AS ENUM ('PLA', 'ALA', 'IND');

-- CreateEnum
CREATE TYPE "AppRoles" AS ENUM ('PLA', 'ALA', 'RLA', 'IND');

-- CreateEnum
CREATE TYPE "BookingRequestStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameHash" TEXT,
    "homepageLink" TEXT NOT NULL,
    "homepageLinkHash" TEXT,
    "archived" BOOLEAN DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "cid" TEXT NOT NULL,
    "coid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "titleHash" TEXT,
    "width" TEXT,
    "widthHash" TEXT,
    "height" TEXT,
    "heightHash" TEXT,
    "size" BIGINT NOT NULL DEFAULT 0,
    "mime" TEXT,
    "mimeHash" TEXT,
    "ext" TEXT,
    "extHash" TEXT,
    "srcUrl" TEXT,
    "srcUrlHash" TEXT,
    "thumbnailUrl" TEXT,
    "thumbnailUrlHash" TEXT,
    "mediumUrl" TEXT,
    "mediumUrlHash" TEXT,
    "deleteUrl" TEXT,
    "deleteUrlHash" TEXT,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "isMUA" BOOLEAN NOT NULL DEFAULT false,
    "street" TEXT NOT NULL,
    "streetHash" TEXT,
    "street2" TEXT,
    "street2Hash" TEXT,
    "street3" TEXT,
    "street3Hash" TEXT,
    "city" TEXT NOT NULL,
    "cityHash" TEXT,
    "state" TEXT NOT NULL,
    "stateHash" TEXT,
    "postalCode" TEXT NOT NULL,
    "postalCodeHash" TEXT,
    "country" "SupportedCountries" NOT NULL DEFAULT 'USA',
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "coid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CronService" (
    "id" TEXT NOT NULL,
    "icalFileUploadLimit" "ICalFileUploadLimit" NOT NULL DEFAULT 'THREE',
    "scheduleType" "ScheduleType" NOT NULL DEFAULT 'DAILY',
    "lastRun" TIMESTAMP(3),
    "nextRun" TIMESTAMP(3) NOT NULL,
    "status" "CronServiceStatus" NOT NULL DEFAULT 'NOT_PROCESSED',
    "coid" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "calendarId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CronService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ICalEntry" (
    "id" TEXT NOT NULL,
    "importType" TEXT NOT NULL,
    "importTypeHash" TEXT,
    "icalUrl" TEXT,
    "icalUrlHash" TEXT,
    "icalFilename" TEXT,
    "icalFilenameHash" TEXT,
    "isMainSrc" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cronServiceId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "ICalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateBlock" (
    "id" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "calendarType" TEXT NOT NULL,
    "prodid" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventUID" TEXT NOT NULL,
    "eventCreated" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryHash" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT NOT NULL DEFAULT '',
    "priority" "PriorityType" NOT NULL DEFAULT 'NO_PRIORITY',
    "iCalEntryId" TEXT NOT NULL,
    "propertyId" TEXT,
    "propertyName" TEXT,
    "propertyNameHash" TEXT,
    "cid" TEXT NOT NULL,
    "coid" TEXT NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateBlockConflict" (
    "id" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "calendarType" TEXT NOT NULL,
    "prodid" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventUID" TEXT NOT NULL,
    "eventCreated" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryHash" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT NOT NULL DEFAULT '',
    "priority" "PriorityType" NOT NULL DEFAULT 'NO_PRIORITY',
    "firstBlockId" TEXT NOT NULL,
    "overlapDuration" INTEGER NOT NULL,
    "resolved" BOOLEAN NOT NULL,
    "resolutionAction" "ConflictResolution" NOT NULL DEFAULT 'NONE',
    "iCalEntryId" TEXT NOT NULL,
    "propertyId" TEXT,
    "propertyName" TEXT,
    "propertyNameHash" TEXT,
    "cid" TEXT NOT NULL,
    "coid" TEXT NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateBlockConflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL,
    "status" "BookingRequestStatus" DEFAULT 'PENDING',
    "arrival" TIMESTAMP(3) NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "notesHash" TEXT,
    "messageId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "orgImprintId" TEXT NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttachedPMS" (
    "id" TEXT NOT NULL,
    "pmsList" TEXT[],
    "foreignIdList" TEXT[],
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttachedPMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImprint" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "firstNameHash" TEXT,
    "lastName" TEXT NOT NULL,
    "lastNameHash" TEXT,
    "fullName" TEXT NOT NULL,
    "fullNameHash" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactEmailHash" TEXT,
    "contactPhone" TEXT NOT NULL,
    "contactPhoneHash" TEXT,
    "appRole" TEXT NOT NULL,
    "appRoleHash" TEXT,
    "cid" TEXT NOT NULL,
    "cidHash" TEXT,
    "orgImprintId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserImprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgImprint" (
    "id" TEXT NOT NULL,
    "tier" "OrgTierType" NOT NULL DEFAULT 'TIER_0',
    "name" TEXT NOT NULL,
    "nameHash" TEXT,
    "coid" TEXT NOT NULL,
    "coidHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgImprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAudit" (
    "id" TEXT NOT NULL,
    "actionsTaken" TEXT[],
    "api" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uec" TEXT,
    "uecHash" TEXT,
    "sessionId" TEXT NOT NULL,
    "sessionIdHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "orgImprintId" TEXT NOT NULL,

    CONSTRAINT "UserAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResolutionAudit" (
    "id" TEXT NOT NULL,
    "propertyName" TEXT NOT NULL,
    "propertyNameHash" TEXT,
    "firstBookedBy" TEXT NOT NULL,
    "firstBookedByHash" TEXT,
    "conflictUploadedBy" TEXT NOT NULL,
    "conflictUploadedByHash" TEXT,
    "eventUID" TEXT NOT NULL,
    "retainedBookingStartDate" TIMESTAMP(3) NOT NULL,
    "retainedBookingEndDate" TIMESTAMP(3) NOT NULL,
    "removedBookingStartDate" TIMESTAMP(3) NOT NULL,
    "removedBookingEndDate" TIMESTAMP(3) NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT true,
    "resolutionAction" "ConflictResolution" NOT NULL DEFAULT 'NONE',
    "propertyId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "icalEntryId" TEXT NOT NULL,
    "firstBlockId" TEXT NOT NULL,
    "oldConflictId" TEXT NOT NULL,
    "prodid" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "conflictDetectedOn" TIMESTAMP(3) NOT NULL,
    "userImprintId" TEXT NOT NULL,
    "orgImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResolutionAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledJobsAudit" (
    "id" TEXT NOT NULL,
    "scheduleType" TEXT NOT NULL,
    "scheduleTypeHash" TEXT,
    "jobBeganAt" TIMESTAMP(3) NOT NULL,
    "jobEndedAt" TIMESTAMP(3) NOT NULL,
    "pcs" TEXT[],
    "status" "CronServiceStatus" NOT NULL,
    "errors" TEXT[],
    "orgImprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledJobsAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Property_coid_cid_idx" ON "Property"("coid", "cid");

-- CreateIndex
CREATE INDEX "Property_coid_idx" ON "Property"("coid");

-- CreateIndex
CREATE INDEX "Property_cid_idx" ON "Property"("cid");

-- CreateIndex
CREATE INDEX "Property_name_idx" ON "Property"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_propertyId_key" ON "Photo"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyId_key" ON "Address"("propertyId");

-- CreateIndex
CREATE INDEX "Address_city_state_idx" ON "Address"("city", "state");

-- CreateIndex
CREATE INDEX "Address_postalCode_idx" ON "Address"("postalCode");

-- CreateIndex
CREATE INDEX "Address_isMUA_idx" ON "Address"("isMUA");

-- CreateIndex
CREATE INDEX "Address_city_state_postalCode_idx" ON "Address"("city", "state", "postalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_propertyId_key" ON "Calendar"("propertyId");

-- CreateIndex
CREATE INDEX "Calendar_propertyId_idx" ON "Calendar"("propertyId");

-- CreateIndex
CREATE INDEX "Calendar_coid_idx" ON "Calendar"("coid");

-- CreateIndex
CREATE INDEX "Calendar_createdAt_idx" ON "Calendar"("createdAt");

-- CreateIndex
CREATE INDEX "Calendar_propertyId_createdAt_idx" ON "Calendar"("propertyId", "createdAt");

-- CreateIndex
CREATE INDEX "Calendar_coid_createdAt_idx" ON "Calendar"("coid", "createdAt");

-- CreateIndex
CREATE INDEX "Calendar_propertyId_coid_idx" ON "Calendar"("propertyId", "coid");

-- CreateIndex
CREATE UNIQUE INDEX "CronService_propertyId_key" ON "CronService"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "CronService_calendarId_key" ON "CronService"("calendarId");

-- CreateIndex
CREATE INDEX "CronService_nextRun_idx" ON "CronService"("nextRun" ASC);

-- CreateIndex
CREATE INDEX "CronService_lastRun_idx" ON "CronService"("lastRun");

-- CreateIndex
CREATE INDEX "CronService_coid_id_idx" ON "CronService"("coid", "id");

-- CreateIndex
CREATE INDEX "CronService_propertyId_idx" ON "CronService"("propertyId");

-- CreateIndex
CREATE INDEX "CronService_scheduleType_nextRun_idx" ON "CronService"("scheduleType", "nextRun");

-- CreateIndex
CREATE INDEX "CronService_status_nextRun_idx" ON "CronService"("status", "nextRun");

-- CreateIndex
CREATE INDEX "ICalEntry_propertyId_idx" ON "ICalEntry"("propertyId");

-- CreateIndex
CREATE INDEX "ICalEntry_propertyId_calendarId_idx" ON "ICalEntry"("propertyId", "calendarId");

-- CreateIndex
CREATE INDEX "ICalEntry_cronServiceId_idx" ON "ICalEntry"("cronServiceId");

-- CreateIndex
CREATE INDEX "ICalEntry_importType_idx" ON "ICalEntry"("importType");

-- CreateIndex
CREATE INDEX "ICalEntry_createdAt_idx" ON "ICalEntry"("createdAt");

-- CreateIndex
CREATE INDEX "ICalEntry_propertyId_importType_idx" ON "ICalEntry"("propertyId", "importType");

-- CreateIndex
CREATE INDEX "ICalEntry_cronServiceId_importType_idx" ON "ICalEntry"("cronServiceId", "importType");

-- CreateIndex
CREATE INDEX "DateBlock_startDate_endDate_coid_idx" ON "DateBlock"("startDate", "endDate", "coid");

-- CreateIndex
CREATE INDEX "DateBlock_calendarId_idx" ON "DateBlock"("calendarId");

-- CreateIndex
CREATE UNIQUE INDEX "DateBlock_eventUID_startDate_endDate_coid_propertyId_key" ON "DateBlock"("eventUID", "startDate", "endDate", "coid", "propertyId");

-- CreateIndex
CREATE INDEX "DateBlockConflict_firstBlockId_id_coid_idx" ON "DateBlockConflict"("firstBlockId", "id", "coid");

-- CreateIndex
CREATE INDEX "DateBlockConflict_startDate_endDate_idx" ON "DateBlockConflict"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "DateBlockConflict_calendarId_idx" ON "DateBlockConflict"("calendarId");

-- CreateIndex
CREATE UNIQUE INDEX "DateBlockConflict_eventUID_startDate_endDate_coid_firstBloc_key" ON "DateBlockConflict"("eventUID", "startDate", "endDate", "coid", "firstBlockId", "propertyId");

-- CreateIndex
CREATE INDEX "BookingRequest_arrival_departure_idx" ON "BookingRequest"("arrival", "departure");

-- CreateIndex
CREATE INDEX "BookingRequest_calendarId_idx" ON "BookingRequest"("calendarId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingRequest_arrival_departure_orgImprintId_calendarId_key" ON "BookingRequest"("arrival", "departure", "orgImprintId", "calendarId");

-- CreateIndex
CREATE UNIQUE INDEX "AttachedPMS_propertyId_key" ON "AttachedPMS"("propertyId");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronService" ADD CONSTRAINT "CronService_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronService" ADD CONSTRAINT "CronService_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICalEntry" ADD CONSTRAINT "ICalEntry_cronServiceId_fkey" FOREIGN KEY ("cronServiceId") REFERENCES "CronService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICalEntry" ADD CONSTRAINT "ICalEntry_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ICalEntry" ADD CONSTRAINT "ICalEntry_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateBlock" ADD CONSTRAINT "DateBlock_iCalEntryId_fkey" FOREIGN KEY ("iCalEntryId") REFERENCES "ICalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateBlock" ADD CONSTRAINT "DateBlock_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateBlockConflict" ADD CONSTRAINT "DateBlockConflict_firstBlockId_fkey" FOREIGN KEY ("firstBlockId") REFERENCES "DateBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateBlockConflict" ADD CONSTRAINT "DateBlockConflict_iCalEntryId_fkey" FOREIGN KEY ("iCalEntryId") REFERENCES "ICalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateBlockConflict" ADD CONSTRAINT "DateBlockConflict_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRequest" ADD CONSTRAINT "BookingRequest_orgImprintId_fkey" FOREIGN KEY ("orgImprintId") REFERENCES "OrgImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRequest" ADD CONSTRAINT "BookingRequest_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttachedPMS" ADD CONSTRAINT "AttachedPMS_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImprint" ADD CONSTRAINT "UserImprint_orgImprintId_fkey" FOREIGN KEY ("orgImprintId") REFERENCES "OrgImprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAudit" ADD CONSTRAINT "UserAudit_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAudit" ADD CONSTRAINT "UserAudit_orgImprintId_fkey" FOREIGN KEY ("orgImprintId") REFERENCES "OrgImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionAudit" ADD CONSTRAINT "ResolutionAudit_userImprintId_fkey" FOREIGN KEY ("userImprintId") REFERENCES "UserImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionAudit" ADD CONSTRAINT "ResolutionAudit_orgImprintId_fkey" FOREIGN KEY ("orgImprintId") REFERENCES "OrgImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledJobsAudit" ADD CONSTRAINT "ScheduledJobsAudit_orgImprintId_fkey" FOREIGN KEY ("orgImprintId") REFERENCES "OrgImprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
