import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { MessageCircle, X } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

const FloatingChatButton = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const chatOptions = [
    { name: "Telegram", icon: <FaTelegram size={20} aria-hidden="true" />, link: "https://t.me/webnovauz" },
    { name: "WhatsApp", icon: <FaWhatsapp size={20} aria-hidden="true" />, link: "https://wa.me/998778774604" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5">
          {chatOptions.map((option, index) => (
            <a
              key={option.name}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center gap-3 whitespace-nowrap rounded-full border border-border bg-card px-5 font-semibold text-foreground shadow-lg transition-colors animate-fade-up hover:border-primary"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="text-primary">{option.icon}</span>
              {option.name}
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t("chat.tooltip")}
        title={t("chat.tooltip")}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition ${
          isOpen ? "bg-foreground text-background" : "bg-primary text-primary-foreground hover:brightness-110"
        }`}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
      </button>
    </div>
  );
};

export default FloatingChatButton;
