import { Handler } from "express";
import { AddLeadInGroupRequestSchema, GetGroupsLeadsRequestSchema } from "./schemas/GroupsRequestSchemas";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";

export class GroupsLeadsController {
  getLeads: Handler = async (req, res, next) => {
    try {
      const groupId = +req.params.groupId;
      const query = GetGroupsLeadsRequestSchema.parse(req.query);
      const {
        page = "1",
        pageSize = "10",
        name,
        sortBy = "name",
        order = "asc",
      } = query;

      const numberPage = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.LeadWhereInput = {
        groups: {
          some: { id: groupId },
        },
      };

      if (name) {
        where.name = { contains: name, mode: "insensitive" };
      }

      const leads = await prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (numberPage - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          groups: {
            select: {
              id: true,
              name: true, },
          },
        },
      });

      res.json({
        data: leads,
        meta: {
          page: numberPage,
          pageSize: pageSizeNumber,
          totalItems: leads.length,
        }
      })
    } catch (error) {
      next(error);
    }
  };
  addLeads: Handler = async (req,res,next) => {
    const body = AddLeadInGroupRequestSchema.parse(req.body);

    await prisma.group.update({

      data: {
        leads: {
          connect: {
            id: body.leadId
          },
          
        }
      },
      where: {
        id: +req.params.groupId
      },
      include: { leads: true}
    })

    res.json({
      message: "Lead adicionado ao grupo com sucesso"
    })
  }
  removeLead: Handler = async (req,res,next) => { 
    const leadId = +req.params.leadId;
    const groupId = +req.params.groupId;

    await prisma.group.update({
      data: {
        leads: {
          disconnect: {
            id: leadId
          }

        }

      }, where: {
        id: groupId
      }
    })
    res.json({ message: "Lead removido do grupo com sucesso" })
  }
}