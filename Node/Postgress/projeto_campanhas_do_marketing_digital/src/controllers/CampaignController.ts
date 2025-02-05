import { Handler } from "express";
import { prisma } from "../database";
import {
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
} from "./schemas/CampaignRequestSchemas";
import { HttpError } from "../errors/HttpError";

export class CampaignController {
  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await prisma.campaign.findMany();
      res.status(200).json(campaigns);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignRequestSchema.parse(req.body);

      const data: any = {
        ...body,
        endDate: body.endDate ? body.endDate.toISOString() : undefined,
      };

      if (data.endDate === undefined) {
        delete data.endDate;
      }

      const newCampaign = await prisma.campaign.create({
        data,
      });

      res.status(200).json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: +req.params.id },
        include: {
          leads: {
            include: {
              lead: true,
            },
          },
        },
      });
      if (!campaign) {
        throw new HttpError(404, "Não foi possível encontrar a campanha");
      }
      res.status(200).json(campaign);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateCampaignRequestSchema.parse(req.body);

      if (!body) {
        throw new HttpError(404, "Não possivel encontrar a campanha");
      }

      const updateCampaigns = await prisma.campaign.update({
        where: { id: +req.params.id },
        data: body,
      });
      res.status(200).json(updateCampaigns);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const campaignExists = await prisma.campaign.findUnique({
        where: { id },
      });
      if (!campaignExists) throw new HttpError(404, "campanha não encontrada");

      const deletedCampaign = await prisma.campaign.delete({ where: { id } });

      res.json({ deletedCampaign });
    } catch (error) {
      next(error);
    }
  };
}
