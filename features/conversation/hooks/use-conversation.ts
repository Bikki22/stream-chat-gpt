"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createConversation,
  deleteConversation,
  listConversations,
  updateConversation,
} from "@/features/conversation/actions/conversations-actions";
import { queryKeys } from "../utils/query-keys";

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversation.all,
    queryFn: () => listConversations,
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (title: string) => createConversation(title),
    onSuccess: (conversation) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversation.all,
      });
      router.push(`/c/${conversation.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not create chat");
    },
  });
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      title: string;
      isPinned: boolean;
      isArchived: boolean;
    }) => updateConversation(id, data),
    onSuccess: (conversation) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversation.all,
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversation.detail(conversation.id),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not update chat");
    },
  });
}

export async function useDeleteConversation(activeId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: ({ id }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversation.all,
      });
      queryClient.removeQueries({
        queryKey: queryKeys.messages.byConversation(id),
      });

      if (activeId === id) {
        router.push("/");
      }

      toast.success("chat deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "couldnot delete chat");
    },
  });
}
