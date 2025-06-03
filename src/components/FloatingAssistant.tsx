
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96">
          <Card className="h-full shadow-xl">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Buy n Large Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col justify-center items-center text-center">
              <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Voice Assistant Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                Our AI-powered voice assistant will help you find products, answer questions, and provide personalized recommendations.
              </p>
              <Button 
                variant="outline" 
                disabled
                className="cursor-not-allowed"
              >
                Start Voice Chat (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;
