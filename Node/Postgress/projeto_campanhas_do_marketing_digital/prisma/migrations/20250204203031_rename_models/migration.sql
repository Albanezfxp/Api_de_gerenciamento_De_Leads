/*
  Warnings:

  - You are about to drop the `campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeadCampaign" DROP CONSTRAINT "LeadCampaign_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupLeads" DROP CONSTRAINT "_GroupLeads_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupLeads" DROP CONSTRAINT "_GroupLeads_B_fkey";

-- DropTable
DROP TABLE "campaign";

-- DropTable
DROP TABLE "group";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeadCampaign" ADD CONSTRAINT "LeadCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupLeads" ADD CONSTRAINT "_GroupLeads_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupLeads" ADD CONSTRAINT "_GroupLeads_B_fkey" FOREIGN KEY ("B") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
