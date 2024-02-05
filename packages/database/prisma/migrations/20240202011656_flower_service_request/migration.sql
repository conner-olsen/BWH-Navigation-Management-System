-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "nodeId" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("nodeId")
);

-- CreateTable
CREATE TABLE "Edge" (
    "edgeID" TEXT NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "User" (
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Username")
);

-- CreateTable
CREATE TABLE "FlowerServiceRequest" (
    "id" SERIAL NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "roomLongName" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "flowerType" TEXT NOT NULL,
    "deliveryDate" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "FlowerServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Node_longName_key" ON "Node"("longName");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerServiceRequest_roomLongName_key" ON "FlowerServiceRequest"("roomLongName");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "Node"("nodeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerServiceRequest" ADD CONSTRAINT "FlowerServiceRequest_roomLongName_fkey" FOREIGN KEY ("roomLongName") REFERENCES "Node"("longName") ON DELETE RESTRICT ON UPDATE CASCADE;
