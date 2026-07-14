import type { ContactContent, Lang } from "./types";

export const contactByLang: Record<Lang, ContactContent> = {
  tr: {
    contactBang: "BAM!",
    contactTitle: "BİRLİKTE ÇALIŞALIM",
    contactText:
      "Bir proje mi var? Süper kahraman takviyesi mi lazım? Sinyal gönder, hemen geliyorum!",
    formName: "İSİM",
    formEmail: "E-POSTA",
    formMessage: "MESAJ",
    formSend: "SİNYAL GÖNDER",
    formSending: "GÖNDERİLİYOR...",
    formSuccess: "POW! Mesajın ulaştı. Hemen dönüyorum!",
    formError: "ZAP! Bir şey ters gitti. Tekrar dene.",
    formNamePh: "Adın / süper kahraman adın",
    formEmailPh: "ornek@mail.com",
    formMessagePh: "Projeden, işbirliğinden veya bir BAM! fikrinden bahset...",
  },
  en: {
    contactBang: "BAM!",
    contactTitle: "LET'S WORK TOGETHER",
    contactText:
      "Got a project? Need superhero reinforcements? Send the signal, I'll be right there!",
    formName: "NAME",
    formEmail: "EMAIL",
    formMessage: "MESSAGE",
    formSend: "SEND SIGNAL",
    formSending: "SENDING...",
    formSuccess: "POW! Message received. I'll be right back!",
    formError: "ZAP! Something went wrong. Try again.",
    formNamePh: "Your name / hero alias",
    formEmailPh: "you@mail.com",
    formMessagePh: "Tell me about a project, collab, or a BAM! idea...",
  },
};
