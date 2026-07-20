import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { ChatStatus, isTextUIPart, UIMessage } from "ai";
import { Loader } from "lucide-react";
import React from "react";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

function getMessageText(message: UIMessage) {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

const ChatMessages = ({ messages, status }: ChatMessagesProps) => {
  const isWaiting = status === "submitted" && messages.at(-1)?.role === "user";

  return (
    <Conversation>
      <ConversationContent className="py-8">
        {messages.map((message) => (
          <Message key={message.id} from={message.role}>
            <MessageContent>
              <MessageResponse>{getMessageText(message)}</MessageResponse>
            </MessageContent>
          </Message>
        ))}

        {isWaiting ? (
          <Message from="assistant">
            <MessageContent>
              <Loader />
            </MessageContent>
          </Message>
        ) : null}
      </ConversationContent>
    </Conversation>
  );
};

export default ChatMessages;
