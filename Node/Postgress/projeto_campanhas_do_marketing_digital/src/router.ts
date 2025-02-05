import { Router } from "express";
import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupsLeadsController } from "./controllers/GroupsLeadsController";

const router = Router();
const leadsController = new LeadsController();
const groupsController = new GroupsController();
const campaignController = new CampaignController();
const campaignLeadsController = new CampaignLeadsController();
const groupsLeadsController = new GroupsLeadsController()

router.get("/leads", leadsController.index);
router.get("/leads/:id", leadsController.show);
router.post("/leads", leadsController.create);
router.put("leads/:id", leadsController.update);
router.delete("leads/:id", leadsController.delete);

router.get("/groups", groupsController.create);
router.post("/groups", groupsController.create);
router.get("/groups/:id", groupsController.show);
router.put("/groups/:id", groupsController.update);
router.delete("/groups/:id", groupsController.delete);

router.get("/campaign", campaignController.create);
router.post("/campaign", campaignController.create);
router.get("/campaign/:id", campaignController.show);
router.put("/campaign/:id", campaignController.update);
router.delete("/campaign/:id", campaignController.delete);

router.get("/campaigns/:campaignId/leads", campaignLeadsController.getLeads);
router.post("/campaigns/:campaignId/leads", campaignLeadsController.addLead);
router.put("/campaigns/:campaignId/leads/:leadId",campaignLeadsController.updateLeadStatus);
router.delete("/campaigns/:campaignId/leads/:leadId",campaignLeadsController.removeLead);

router.get("/groups/:groupId/leads", groupsLeadsController.getLeads);
router.post("/groups/:groupId/leads", groupsLeadsController.addLeads);
router.delete("/groups/:groupId/leads/:leadId", groupsLeadsController.removeLead);

router.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "OK!" });
  } catch (error) {
    next(error);
  }
});

export { router };
