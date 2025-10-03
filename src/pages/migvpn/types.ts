export type Platform = 'ios' | 'android' | 'windows' | 'macos' | 'linux';

export interface PlatformApp {
  name: string;
  icon: string;
  downloadUrl: string;
  instructions: string[];
}

export const platformApps: Record<Platform, PlatformApp> = {
  ios: {
    name: 'V2Box',
    icon: '📱',
    downloadUrl: 'https://apps.apple.com/app/v2box/id6446814690',
    instructions: [
      'Скачайте V2Box из App Store',
      'Откройте приложение',
      'Нажмите "+" в правом верхнем углу',
      'Выберите "Import from QR Code"',
      'Отсканируйте QR-код ниже',
      'Нажмите на добавленную конфигурацию для подключения'
    ]
  },
  android: {
    name: 'V2rayNG',
    icon: '🤖',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.v2ray.ang',
    instructions: [
      'Скачайте V2rayNG из Google Play',
      'Откройте приложение',
      'Нажмите "+" в правом нижнем углу',
      'Выберите "Импорт из QR-кода"',
      'Отсканируйте QR-код ниже',
      'Нажмите на конфигурацию и выберите "Подключиться"'
    ]
  },
  windows: {
    name: 'V2rayN',
    icon: '💻',
    downloadUrl: 'https://github.com/2dust/v2rayN/releases',
    instructions: [
      'Скачайте V2rayN с GitHub',
      'Распакуйте архив и запустите v2rayN.exe',
      'Нажмите "Серверы" → "Импорт из буфера обмена"',
      'Скопируйте ссылку подписки (кнопка ниже)',
      'Нажмите правой кнопкой на сервер',
      'Выберите "Установить как активный сервер"'
    ]
  },
  macos: {
    name: 'V2rayU',
    icon: '🍎',
    downloadUrl: 'https://github.com/yanue/V2rayU/releases',
    instructions: [
      'Скачайте V2rayU с GitHub',
      'Установите приложение',
      'Откройте V2rayU из панели меню',
      'Нажмите "Configure" → "Import"',
      'Выберите "Import from QR Code"',
      'Отсканируйте QR-код или вставьте ссылку'
    ]
  },
  linux: {
    name: 'Qv2ray',
    icon: '🐧',
    downloadUrl: 'https://github.com/Qv2ray/Qv2ray/releases',
    instructions: [
      'Скачайте Qv2ray для вашего дистрибутива',
      'Установите пакет',
      'Запустите Qv2ray',
      'Нажмите "Группы" → "Импорт"',
      'Выберите "Импорт из QR-кода"',
      'Отсканируйте QR-код или вставьте ссылку'
    ]
  }
};