
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  similarity: number;
}

interface RAGResponse {
  query: string;
  response: string;
  products: Product[];
  total_found: number;
}

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    text: string;
    products?: Product[];
  }>>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar el asistente con un mensaje de bienvenida
  useEffect(() => {
    setConversation([{
      type: 'assistant',
      text: '¡Hola! Soy tu asistente de compras de Buy n Large. Puedes preguntarme sobre productos, pedirme recomendaciones o buscar algo específico. ¡Habla conmigo!'
    }]);
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = processAudio;
      
      mediaRecorder.start();
      setIsListening(true);
      toast.success("Escuchando... Habla ahora");
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Error al acceder al micrófono");
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      // Convertir audio a base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        console.log('Sending audio to speech-to-text...');
        
        // Transcribir audio
        const { data: transcriptionData, error: transcriptionError } = await supabase.functions.invoke('speech-to-text', {
          body: { audio: base64Audio }
        });

        if (transcriptionError) {
          throw new Error(transcriptionError.message);
        }

        const userText = transcriptionData.text;
        console.log('Transcription:', userText);

        if (!userText || userText.trim().length === 0) {
          toast.error("No se pudo entender el audio. Intenta de nuevo.");
          setIsProcessing(false);
          return;
        }

        // Agregar mensaje del usuario a la conversación
        setConversation(prev => [...prev, { type: 'user', text: userText }]);

        // Buscar productos con RAG
        console.log('Performing RAG search...');
        const { data: ragData, error: ragError } = await supabase.functions.invoke('rag-search', {
          body: { query: userText, maxResults: 5 }
        });

        if (ragError) {
          throw new Error(ragError.message);
        }

        const ragResponse: RAGResponse = ragData;
        console.log('RAG Response:', ragResponse);

        // Agregar respuesta del asistente
        setConversation(prev => [...prev, { 
          type: 'assistant', 
          text: ragResponse.response,
          products: ragResponse.products 
        }]);

        // Convertir respuesta a audio
        console.log('Converting to speech...');
        const { data: ttsData, error: ttsError } = await supabase.functions.invoke('text-to-speech', {
          body: { text: ragResponse.response, voice: 'nova' }
        });

        if (ttsError) {
          throw new Error(ttsError.message);
        }

        // Reproducir audio
        const audioBlob = new Blob([
          new Uint8Array(atob(ttsData.audioContent).split('').map(c => c.charCodeAt(0)))
        ], { type: 'audio/mp3' });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();

      };
      
      reader.readAsDataURL(audioBlob);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      toast.error("Error al procesar el audio: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateEmbeddings = async () => {
    try {
      toast.info("Generando embeddings de productos...");
      const { data, error } = await supabase.functions.invoke('generate-embeddings');
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success(`Embeddings generados exitosamente: ${data.processed} productos procesados`);
    } catch (error) {
      console.error('Error generating embeddings:', error);
      toast.error("Error al generar embeddings: " + error.message);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Asistente de Voz IA - Buy n Large
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Botones de control */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing || isSpeaking}
            className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
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
          
          <Button onClick={generateEmbeddings} variant="outline">
            Generar Embeddings
          </Button>
        </div>

        {/* Conversación */}
        <div className="max-h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
          {conversation.map((message, index) => (
            <div key={index} className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border shadow-sm'
              }`}>
                <p className="text-sm">{message.text}</p>
                
                {/* Mostrar productos recomendados */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-600">Productos recomendados:</p>
                    {message.products.slice(0, 3).map((product) => (
                      <div key={product.id} className="text-xs bg-gray-100 p-2 rounded border">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-green-600">Relevancia: {(product.similarity * 100).toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estado del asistente */}
        <div className="text-center text-sm text-gray-600">
          {isListening && (
            <p className="text-red-600 font-semibold">🎤 Escuchando...</p>
          )}
          {isProcessing && (
            <p className="text-blue-600 font-semibold">🤔 Procesando tu consulta...</p>
          )}
          {isSpeaking && (
            <p className="text-green-600 font-semibold">🔊 Respondiendo...</p>
          )}
          {!isListening && !isProcessing && !isSpeaking && (
            <p>Presiona "Hablar" para comenzar una conversación</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
