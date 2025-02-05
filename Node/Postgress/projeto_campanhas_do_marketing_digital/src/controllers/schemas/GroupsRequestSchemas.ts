import {z} from "zod";

export const CreateGroupRequestSchema = z.object({
  name: z.string(),
  description: z.string()
})

export const UpdateGroupRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional()
})

export const GetGroupsLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  sortBy: z.enum(["name", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),  
})

export const AddLeadInGroupRequestSchema = z.object({
  leadId: z.number(),
});
