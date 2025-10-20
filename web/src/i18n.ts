import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'Execution',
      tipFromEma: 'Tip from Ema: \nDouble-tap the button to reset its state',
      aboutTitle: 'About',
      versionLabel: 'Version:',
      aboutDescriptionJa: '本アプリは、Re,AER 傘下のブランド Acacia によって制作された推理文字アドベンチャーゲーム「魔法少女ノ魔女裁判」の二次創作作品です。',
      aboutDescriptionZh: '本应用程序是由 Re,AER 旗下品牌 Acacia 制作的推理文字冒险游戏《魔法少女的魔女审判》（魔法少女ノ魔女裁判）的二创作品。',
      developerInfo: 'Software Developed by GBXIN',
      xLabel: 'X (旧 Twitter)',
      bilibiliLabel: 'bilibili'
    }
  },
  ja: {
    translation: {
      appName: '処刑',
      tipFromEma: 'エマからのヒント：\nボタンをダブルタップすると状態をリセットできます',
      aboutTitle: 'About',
      versionLabel: 'Version:',
      aboutDescriptionJa: '本アプリは、Re,AER 傘下のブランド Acacia によって制作された推理文字アドベンチャーゲーム「魔法少女ノ魔女裁判」の二次創作作品です。',
      aboutDescriptionZh: '本应用程序是由 Re,AER 旗下品牌 Acacia 制作的推理文字冒险游戏《魔法少女的魔女审判》（魔法少女ノ魔女裁判）的二创作品。',
      developerInfo: 'Software Developed by GBXIN',
      xLabel: 'X (旧 Twitter)',
      bilibiliLabel: 'bilibili'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('ja') ? 'ja' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
