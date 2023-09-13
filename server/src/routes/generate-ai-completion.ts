import { FastifyInstance } from "fastify";
import { createReadStream } from "node:fs";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { openai } from "../lib/openai";
import { request } from "node:http";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, template, temperature } = bodySchema.parse(request.body);

    const video = await prisma.video.findFirstOrThrow({
      where: {
        id: videoId,
      },
    });
    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: "Transcription was not generated" });
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [{ role: "user", content: promptMessage }],
    });
    return response;
  });
}
