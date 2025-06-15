import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import styles from "./AlternativeVoiceAssistant.module.css";
import { ProductEntity } from "@/domain/entities/Product";
import { SearchResponse } from "@/types/product";
import { SpeechRecognition } from "@/types/speech";

const AlternativeVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    text: string;
    products?: ProductEntity[];
  }>>([]);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar el asistente con un mensaje de bienvenida
  useEffect(() => {
    setConversation([{
      type: 'assistant',
      text: '¡Hola! Soy tu asistente de compras de Buy n Large. Puedes preguntarme sobre productos usando tu voz. ¡Habla conmigo!'
    }]);

    // Verificar si el navegador soporta Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.");
    }
  }, []);

  const startListening = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-ES';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success("Escuchando... Habla ahora");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcription:', transcript);
        processTranscription(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error(`Error de reconocimiento: ${event.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error("Error al iniciar reconocimiento de voz");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processTranscription = async (userText: string) => {
    try {
      setIsProcessing(true);

      if (!userText || userText.trim().length === 0) {
        toast.error("No se pudo entender el audio. Intenta de nuevo.");
        return;
      }

      // Agregar mensaje del usuario a la conversación
      setConversation(prev => [...prev, { type: 'user', text: userText }]);

      // Buscar productos usando búsqueda simple
      console.log('Performing simple search...');
      const { data: searchData, error: searchError } = await supabase.functions.invoke('simple-search', {
          body: { query: userText, maxResults: 5 }
      });

      if (searchError) {
        throw new Error(searchError.message);
      }

      const searchResponse: SearchResponse = searchData;
      console.log('Search Response:', searchResponse);

      // Convert Product objects to ProductEntity instances
      const productEntities = searchResponse.products.map(product => 
        ProductEntity.fromApiResponse(product)
      );

      // Agregar respuesta del asistente
      setConversation(prev => [...prev, { 
        type: 'assistant', 
        text: searchResponse.response,
        products: productEntities 
      }]);

      // Usar text-to-speech del navegador como fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(searchResponse.response);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        
        setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Error processing transcription:', error);
      toast.error("Error al procesar la consulta: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${styles.assistantCard}`}> {/* Apply assistantCard class */}
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${styles.assistantTitle}`}> {/* Apply assistantTitle class */}
          <MessageCircle className="h-5 w-5" />
          Pregúntame
        </CardTitle>
      </CardHeader>
      <CardContent className={`${styles.conversationContainer} space-y-4`}>
        {/* Botones de control */}
        <div className={styles.controlButtons}> {/* Apply controlButtons class */}
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing || isSpeaking}
            className={`${styles.micButton} ${isListening ? styles.listening : ''}`} // Apply micButton and listening classes
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

        {/* Conversación */}
        <div className={` space-y-3`}> {/* Apply conversationContainer class */}
          {conversation.map((message, index) => (
            <div key={index} className={`${styles.messageWrapper} ${message.type === 'user' ? styles.userMessage : styles.assistantMessage}`}> {/* Apply messageWrapper, userMessage/assistantMessage classes */}
              <div className={`${styles.messageBubble} ${message.type === 'user' ? styles.userMessage : styles.assistantMessage}`}> {/* Apply messageBubble, userMessage/assistantMessage classes */}
                <p className="text-sm">{message.text}</p>
                
                {/* Mostrar productos recomendados */}
                {message.products && message.products.length > 0 && (
                  <div className={`${styles.productCardContainer} space-y-2`}> {/* Apply productCardContainer class */}
                    <p className={`${styles.productTitle}`}>Productos encontrados:</p> {/* Apply productTitle class */}
                    {message.products.slice(0, 3).map((product) => (
                      <div key={product.id} className={styles.productItem}> {/* Apply productItem class */}
                        <p className={styles.productName}>{product.name}</p> {/* Apply productName class */}
                        <p className={styles.productPrice}>${product.price}</p> {/* Apply productPrice class */}
                        <p className={styles.productCategory}>{product.category}</p> {/* Apply productCategory class */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estado del asistente */}
        <div className={`${styles.statusMessage} text-sm`}> {/* Apply statusMessage class */}
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

        <div className={styles.noteBox}> {/* Apply noteBox class */}
          <p><strong>Nota:</strong> Esta versión usa la Web Speech API del navegador para reconocimiento de voz y búsqueda simple sin embeddings.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeVoiceAssistant;
