import { Handler } from "express";
import { prisma } from "../database";
import {
  CreateGroupRequestSchema,
  UpdateGroupRequestSchema,
} from "./schemas/GroupsRequestSchemas";
import { HttpError } from "../errors/HttpError";

export class GroupsController {
  index: Handler = async (req, res, next) => {
    try {
      const groups = await prisma.group.findMany();
      res.json(groups).status(200);
    } catch (error) {
      next(error);
    }
  };
  create: Handler = async (req, res, next) => {
    try {
      const body = await CreateGroupRequestSchema.parse(req.body);

      const newGroup = await prisma.group.create({
        data: body,
      });
      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  };
  show: Handler = async (req, res, next) => {
    try {
      const group = await prisma.group.findUnique({
        where: { id: +req.params.id },
        include: { leads: true },
      });

      if (!group) throw new HttpError(404, "Grupo não encontrado");
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };
  update: Handler = async (req, res, next) => {
    try {
      const body = await UpdateGroupRequestSchema.parse(req.body);
      const updatedGroup = await prisma.group.update({
        where: { id: +req.params.id },
        data: body,
      });
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };
  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const groupExists = await prisma.group.findUnique({ where: { id } });
      if (!groupExists) throw new HttpError(404, "Grupo não encontrado");
      const deletedGroup = await prisma.group.delete({
        where: { id: +req.params.id },
      });
      res.status(200).json([{ message: "Grupo deletado" }, { deletedGroup }]);
    } catch (error) {
      next(error);
    }
  };
}
