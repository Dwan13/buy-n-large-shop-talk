
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import styles from "./AlternativeVoiceAssistant.module.css";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useVoiceProcessing } from "@/hooks/useVoiceProcessing";
import { VoiceControlButtons } from "./VoiceControlButtons";
import { ConversationMessageComponent } from "./ConversationMessage";
import { VoiceStatus } from "./VoiceStatus";

const AlternativeVoiceAssistant = () => {
  const { isListening, startListening, stopListening } = useSpeechRecognition();
  const { isProcessing, isSpeaking, conversation, processTranscription } = useVoiceProcessing();

  // Verificar si el navegador soporta Web Speech API
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.");
    }
  }, []);

  const handleStartListening = () => {
    startListening(processTranscription);
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${styles.assistantCard}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${styles.assistantTitle}`}>
          <MessageCircle className="h-5 w-5" />
          Pregúntame
        </CardTitle>
      </CardHeader>
      <CardContent className={`${styles.conversationContainer} space-y-4`}>
        <VoiceControlButtons
          isListening={isListening}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          onStartListening={handleStartListening}
          onStopListening={stopListening}
        />

        <div className="space-y-3">
          {conversation.map((message, index) => (
            <ConversationMessageComponent key={index} message={message} />
          ))}
        </div>

        <VoiceStatus
          isListening={isListening}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
        />

        <div className={styles.noteBox}>
          <p><strong>Nota:</strong> Esta versión usa la Web Speech API del navegador para reconocimiento de voz y búsqueda simple sin embeddings.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeVoiceAssistant;
