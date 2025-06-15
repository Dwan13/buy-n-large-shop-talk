
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProductEntity } from "@/domain/entities/Product";
import { SearchResponse } from "@/types/product";

export interface ConversationMessage {
  type: 'user' | 'assistant';
  text: string;
  products?: ProductEntity[];
}

export const useVoiceProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([{
    type: 'assistant',
    text: '¡Hola! Soy tu asistente de compras de Buy n Large. Puedes preguntarme sobre productos usando tu voz. ¡Habla conmigo!'
  }]);

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

  return {
    isProcessing,
    isSpeaking,
    conversation,
    processTranscription
  };
};
