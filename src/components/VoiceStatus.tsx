
import styles from "./VoiceStatus.module.css";

interface VoiceStatusProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
}

export const VoiceStatus = ({ isListening, isProcessing, isSpeaking }: VoiceStatusProps) => {
  return (
    <div className={`${styles.statusMessage} text-sm`}>
      {isListening && (
        <p className={styles.listening}>🎤 Escuchando...</p> 
      )}
      {isProcessing && (
        <p className={styles.processing}>🤔 Procesando tu consulta...</p> 
      )}
      {isSpeaking && (
        <p className={styles.speaking}>🔊 Respondiendo...</p> 
      )}
      {!isListening && !isProcessing && !isSpeaking && (
        <p>Presiona "Hablar" para comenzar una conversación</p>
      )}
    </div>
  );
};
