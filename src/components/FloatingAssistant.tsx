
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceAssistant from "./VoiceAssistant";

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleAssistant}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all bg-blue-600 hover:bg-blue-700"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96">
          <Card className="shadow-xl">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Asistente IA de Buy n Large</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <VoiceAssistant />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;
