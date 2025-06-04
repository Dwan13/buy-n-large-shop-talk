
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// global.d.ts
export {};

declare global {
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    abort(): void;
    onaudioend: ((ev: Event) => any) | null;
    onaudiostart: ((ev: Event) => any) | null;
    onend: ((ev: Event) => any) | null;
    onerror: ((ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((ev: SpeechRecognitionEvent) => any) | null;
    onsoundend: ((ev: Event) => any) | null;
    onsoundstart: ((ev: Event) => any) | null;
    onspeechend: ((ev: Event) => any) | null;
    onspeechstart: ((ev: Event) => any) | null;
    onstart: ((ev: Event) => any) | null;
  }

  var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };

  var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  }

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
}


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface SearchResponse {
  query: string;
  response: string;
  products: Product[];
  total_found: number;
}

const AlternativeVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    text: string;
    products?: Product[];
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

      // Agregar respuesta del asistente
      setConversation(prev => [...prev, { 
        type: 'assistant', 
        text: searchResponse.response,
        products: searchResponse.products 
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Asistente de Voz Alternativo - Buy n Large
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
                    <p className="text-xs font-semibold text-gray-600">Productos encontrados:</p>
                    {message.products.slice(0, 3).map((product) => (
                      <div key={product.id} className="text-xs bg-gray-100 p-2 rounded border">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-blue-600">{product.category}</p>
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

        <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
          <p><strong>Nota:</strong> Esta versión usa la Web Speech API del navegador para reconocimiento de voz y búsqueda simple sin embeddings.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeVoiceAssistant;
