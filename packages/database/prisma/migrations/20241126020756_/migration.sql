/*
  Warnings:

  - The primary key for the `FlowerServiceRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomLongName` on the `FlowerServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `HighScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlowerServiceRequest" DROP CONSTRAINT "FlowerServiceRequest_roomLongName_fkey";

-- DropIndex
DROP INDEX "FlowerServiceRequest_roomLongName_key";

-- DropIndex
DROP INDEX "Node_longName_key";

-- AlterTable
ALTER TABLE "FlowerServiceRequest" DROP CONSTRAINT "FlowerServiceRequest_pkey",
DROP COLUMN "roomLongName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FlowerServiceRequest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FlowerServiceRequest_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Password";

-- DropTable
DROP TABLE "HighScore";

-- CreateTable
CREATE TABLE "Employee" (
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Unassigned',
    "employeeUser" TEXT NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cleaningServiceRequest" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,

    CONSTRAINT "cleaningServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "externalTransportationServiceRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "transportation" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "externalTransportationServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internalTransportServiceRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "internalTransportServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languageInterpreterServiceRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "languagePref" TEXT NOT NULL,

    CONSTRAINT "languageInterpreterServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "religiousServiceRequest" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "religiousServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodeVisit" (
    "nodeId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "nodeVisit_pkey" PRIMARY KEY ("nodeId")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("nodeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_employeeUser_fkey" FOREIGN KEY ("employeeUser") REFERENCES "Employee"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerServiceRequest" ADD CONSTRAINT "FlowerServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cleaningServiceRequest" ADD CONSTRAINT "cleaningServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "externalTransportationServiceRequest" ADD CONSTRAINT "externalTransportationServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internalTransportServiceRequest" ADD CONSTRAINT "internalTransportServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languageInterpreterServiceRequest" ADD CONSTRAINT "languageInterpreterServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "religiousServiceRequest" ADD CONSTRAINT "religiousServiceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
