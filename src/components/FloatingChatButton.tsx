import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const FloatingChatButton = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const chatOptions = [
    {
      name: "Telegram",
      icon: "paper-plane",
      bg: "bg-[#0088cc]",
      link: "https://t.me/webnova_uz", // Replace with your actual Telegram
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
      bg: "bg-[#25D366]",
      link: "https://wa.me/998901234567", // Replace with your actual WhatsApp
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat options */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2">
            {chatOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${option.bg} text-white px-4 py-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center gap-3 whitespace-nowrap animate-fade-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="font-semibold">{option.name}</span>
              </a>
            ))}
          </div>
        )}

        {/* Main button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                isOpen
                  ? "bg-red-500 hover:bg-red-600 rotate-90"
                  : "bg-primary hover:brightness-110 glow-cyan pulse-glow-animation"
              }`}
            >
              {isOpen ? <X size={24} /> : <MessageCircle size={24} className="animate-bounce" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{t('chat.tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FloatingChatButton;
