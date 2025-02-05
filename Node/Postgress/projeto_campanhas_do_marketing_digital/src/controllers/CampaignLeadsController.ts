import { Handler } from "express";
import { Prisma } from "@prisma/client";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchemas";
import { prisma } from "../database";

export class CampaignLeadsController {
  getLeads: Handler = async (req, res, next) => {
    try {
      //Extrai o id da campanha da URL
      const campaignId = +(req.params.campaignId);
      //Valida a query string
      const query = GetCampaignLeadsRequestSchema.parse(req.query);
      //Extrai os valores da query string
      const {
        page = "1",
        pageSize = "10",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      //Converte os valores da query string para números
      const pageNumber = +page;
      //Converte os valores da query string para números
      const pageSizeNumber = +pageSize;

      //Cria o objeto de filtro
      const where: Prisma.LeadWhereInput = {
        campaigns: {
          //Filtra os leads pela campanha
          some: { campaignId },
        },
      };

      //Adiciona o filtro de nome
      if (name) where.name = { contains: name, mode: "insensitive" };
      //Adiciona o filtro de status
      if (status) where.campaigns = { some: { status } };

      //Busca os leads no banco de dados
      const leads = await prisma.lead.findMany({
        //Aplica os filtros
        where,
        //Ordena os resultados
        orderBy: { [sortBy]: order },
        //Pagina os resultados
        skip: (pageNumber - 1) * pageSizeNumber,
        //Limita a quantidade de resultados
        take: pageSizeNumber,
        //Inclui as campanhas relacionadas
        include: {
          //Inclui as campanhas relacionadas
          campaigns: {
            //Seleciona apenas os campos necessários
            select: {
              campaignId: true,
              leadId: true,
              status: true,
            },
          },
        },
      });

      res.json({
        data: leads,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total: leads.length,
          totalPages: Math.ceil(leads.length / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };
  addLead: Handler = async (req, res, next) => {
    try {
      const body = AddLeadRequestSchema.parse(req.body)
      await prisma.leadCampaign.create({
        data: {
          campaignId: +(req.params.campaignId),
          leadId: body.leadId,
          status: body.status,
        }
        }
      )
      res.status(201).end()

    } catch (error) {
      next(error);
    }
  };
  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const body = UpdateLeadStatusRequestSchema.parse(req.body)
      const updatedLeadCampaign = await prisma.leadCampaign.update({
        data: body, 
        where: {
          leadId_campaignId:{
            campaignId: +req.params.campaignId,
            leadId: +req.params.leadId
          }
        }
      })
      res.json(updatedLeadCampaign)
    } catch (error) {
      next(error);
    }
  };
  removeLead: Handler = async (req, res, next) => {
    try {
      await prisma.leadCampaign.delete({
        where: {
          leadId_campaignId:{
            campaignId: +req.params.campaignId,
            leadId: +req.params.leadId
          }
        }
      })
      res.status(204).end()
    } catch (error) {
      next(error);
    }
  };
}
