"use server";

import { requireUser } from "@/features/auth/action/require-user";
import { prisma } from "@/lib/db";

export async function startNewChat() {
  const user = await requireUser();

  const conversation = await prisma.conversation.create({
    data: {
      userId: user.id,
      title: "New Chat",
    },
  });

  console.log(conversation.id);
  console.log(conversation.userId);
  console.log(conversation.title);
  return conversation.id;
}
