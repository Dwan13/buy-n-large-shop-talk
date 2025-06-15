
import { ConversationMessage } from "@/hooks/useVoiceProcessing";
import { ProductDisplay } from "./ProductDisplay";
import styles from "./ConversationMessage.module.css";

interface ConversationMessageProps {
  message: ConversationMessage;
}

export const ConversationMessageComponent = ({ message }: ConversationMessageProps) => {
  return (
    <div className={`${styles.messageWrapper} ${message.type === 'user' ? styles.userMessage : styles.assistantMessage}`}>
      <div className={`${styles.messageBubble} ${message.type === 'user' ? styles.userMessage : styles.assistantMessage}`}>
        <p className="text-sm">{message.text}</p>
        {message.products && <ProductDisplay products={message.products} />}
      </div>
    </div>
  );
};
