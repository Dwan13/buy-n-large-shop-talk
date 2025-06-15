
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import styles from "./AlternativeVoiceAssistant.module.css";

interface VoiceControlButtonsProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export const VoiceControlButtons = ({
  isListening,
  isProcessing,
  isSpeaking,
  onStartListening,
  onStopListening
}: VoiceControlButtonsProps) => {
  return (
    <div className={styles.controlButtons}>
      <Button
        onClick={isListening ? onStopListening : onStartListening}
        disabled={isProcessing || isSpeaking}
        className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4 mr-2" />
            Detener
          </>
        ) : isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Procesando...
          </>
        ) : isSpeaking ? (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            Hablando...
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            Hablar
          </>
        )}
      </Button>
    </div>
  );
};
