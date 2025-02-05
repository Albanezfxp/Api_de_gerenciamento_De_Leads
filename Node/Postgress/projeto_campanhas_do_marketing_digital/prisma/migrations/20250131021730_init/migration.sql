-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('New', 'Contacted', 'Qualified', 'Converted', 'Unresponsive', 'Desqualified', 'Archived');

-- CreateEnum
CREATE TYPE "LeadCampaignStatus" AS ENUM ('New', 'Engaged', 'FolloUp_Scheduled', 'Contacted', 'Converted', 'Unresponsive', 'Qualified', 'Disqualified', 'Re_Engaged', 'Opted_Out');

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'New',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadCampaign" (
    "leadId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "status" "LeadCampaignStatus" NOT NULL DEFAULT 'New',

    CONSTRAINT "LeadCampaign_pkey" PRIMARY KEY ("leadId","campaignId")
);

-- CreateTable
CREATE TABLE "_GroupLeads" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GroupLeads_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "_GroupLeads_B_index" ON "_GroupLeads"("B");

-- AddForeignKey
ALTER TABLE "LeadCampaign" ADD CONSTRAINT "LeadCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCampaign" ADD CONSTRAINT "LeadCampaign_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupLeads" ADD CONSTRAINT "_GroupLeads_A_fkey" FOREIGN KEY ("A") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupLeads" ADD CONSTRAINT "_GroupLeads_B_fkey" FOREIGN KEY ("B") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
