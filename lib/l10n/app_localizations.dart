import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static final Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'app_name': '処刑',
      'tip_from_ema': 'Hint from Ema:\nDouble tap the button to reset the state',
      'about_title': 'About',
      'version_label': 'Version:',
      'about_description_ja':
          '本アプリは、Re,AER 傘下のブランド Acacia によって制作された推理文字アドベンチャーゲーム「魔法少女ノ魔女裁判」の二次創作作品です。',
      'about_description_zh':
          '本应用程序是由 Re,AER 旗下品牌 Acacia 制作的推理文字冒险游戏《魔法少女的魔女审判》（魔法少女ノ魔女裁判）的二创作品。',
      'developer_info': 'Software Developed by GBXIN',
      'x_label': 'X (旧 Twitter)',
      'bilibili_label': 'bilibili',
    },
    'ja': {
      'app_name': '処刑',
      'tip_from_ema': 'エマからのヒント：\nボタンをダブルタップすると状態をリセットできます',
      'about_title': 'About',
      'version_label': 'Version:',
      'about_description_ja':
          '本アプリは、Re,AER 傘下のブランド Acacia によって制作された推理文字アドベンチャーゲーム「魔法少女ノ魔女裁判」の二次創作作品です。',
      'about_description_zh':
          '本应用程序是由 Re,AER 旗下品牌 Acacia 制作的推理文字冒险游戏《魔法少女的魔女审判》（魔法少女ノ魔女裁判）的二创作品。',
      'developer_info': 'Software Developed by GBXIN',
      'x_label': 'X (旧 Twitter)',
      'bilibili_label': 'bilibili',
    },
    'zh': {
      'app_name': '処刑',
      'tip_from_ema': '来自艾玛的提示：\n双击按钮可重置状态',
      'about_title': 'About',
      'version_label': 'Version:',
      'about_description_ja':
          '本アプリは、Re,AER 傘下のブランド Acacia によって制作された推理文字アドベンチャーゲーム「魔法少女ノ魔女裁判」の二次創作作品です。',
      'about_description_zh':
          '本应用程序是由 Re,AER 旗下品牌 Acacia 制作的推理文字冒险游戏《魔法少女的魔女审判》（魔法少女ノ魔女裁判）的二创作品。',
      'developer_info': 'Software Developed by GBXIN',
      'x_label': 'X (旧 Twitter)',
      'bilibili_label': 'bilibili',
    },
  };

  String get appName => _localizedValues[locale.languageCode]!['app_name']!;
  String get tipFromEma => _localizedValues[locale.languageCode]!['tip_from_ema']!;
  String get aboutTitle => _localizedValues[locale.languageCode]!['about_title']!;
  String get versionLabel => _localizedValues[locale.languageCode]!['version_label']!;
  String get aboutDescriptionJa => _localizedValues[locale.languageCode]!['about_description_ja']!;
  String get aboutDescriptionZh => _localizedValues[locale.languageCode]!['about_description_zh']!;
  String get developerInfo => _localizedValues[locale.languageCode]!['developer_info']!;
  String get xLabel => _localizedValues[locale.languageCode]!['x_label']!;
  String get bilibiliLabel => _localizedValues[locale.languageCode]!['bilibili_label']!;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'ja', 'zh'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) async {
    return AppLocalizations(locale);
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}
