import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.word.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
});
