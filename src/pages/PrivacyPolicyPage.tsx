import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-gray-600">
            Последнее обновление: 27 июля 2025 года
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Shield" className="w-6 h-6 text-blue-600" />
                <span>Введение</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Мы серьезно относимся к защите ваших персональных данных. Настоящая Политика конфиденциальности 
                описывает, как мы собираем, используем, храним и защищаем вашу информацию при использовании 
                нашего сервиса.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Database" className="w-6 h-6 text-green-600" />
                <span>Какие данные мы собираем</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Личная информация:</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Имя, фамилия, отчество</li>
                    <li>• Адрес электронной почты</li>
                    <li>• Номер телефона</li>
                    <li>• Адрес проживания или доставки</li>
                    <li>• Фотография профиля</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Техническая информация:</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• IP-адрес и данные о браузере</li>
                    <li>• Информация об устройстве</li>
                    <li>• Файлы cookie и похожие технологии</li>
                    <li>• История активности на сайте</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Контент и сообщения:</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Тексты и фотографии объявлений</li>
                    <li>• Сообщения в чатах с другими пользователями</li>
                    <li>• Отзывы и рейтинги</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Settings" className="w-6 h-6 text-purple-600" />
                <span>Как мы используем ваши данные</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Предоставление услуг:</h4>
                  <p className="text-blue-800">
                    Обработка и публикация объявлений, обеспечение связи между пользователями, 
                    обработка платежей и доставка.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Безопасность и защита:</h4>
                  <p className="text-green-800">
                    Предотвращение мошенничества, защита от спама, обеспечение безопасности 
                    платформы и пользователей.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Улучшение сервиса:</h4>
                  <p className="text-orange-800">
                    Анализ использования платформы, персонализация контента, разработка 
                    новых функций и улучшений.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Коммуникации:</h4>
                  <p className="text-purple-800">
                    Уведомления о сделках, новости сервиса, маркетинговые сообщения 
                    (с вашего согласия).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Users" className="w-6 h-6 text-orange-600" />
                <span>Передача данных третьим лицам</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Мы не продаем ваши персональные данные. Передача данных возможна только в следующих случаях:
                </p>
                <ul className="text-gray-700 space-y-2 ml-4">
                  <li>• <strong>С вашего согласия</strong> - когда вы явно разрешаете передачу</li>
                  <li>• <strong>Поставщики услуг</strong> - партнеры, которые помогают нам предоставлять сервис</li>
                  <li>• <strong>Правовые требования</strong> - при запросах государственных органов</li>
                  <li>• <strong>Защита прав</strong> - для предотвращения мошенничества или нарушений</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Storage */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Lock" className="w-6 h-6 text-red-600" />
                <span>Хранение и защита данных</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Срок хранения:</h4>
                    <p className="text-gray-700 text-sm">
                      Мы храним ваши данные до тех пор, пока это необходимо для предоставления 
                      услуг или выполнения правовых обязательств.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Меры защиты:</h4>
                    <p className="text-gray-700 text-sm">
                      Шифрование данных, контроль доступа, регулярные аудиты безопасности, 
                      защищенные серверы.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="User" className="w-6 h-6 text-blue-600" />
                <span>Ваши права</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="Eye" className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Доступ к данным</h4>
                      <p className="text-sm text-gray-600">Запросить копию ваших данных</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Edit" className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Исправление</h4>
                      <p className="text-sm text-gray-600">Исправить неточные данные</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Trash2" className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Удаление</h4>
                      <p className="text-sm text-gray-600">Удалить ваши данные</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="Download" className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Портативность</h4>
                      <p className="text-sm text-gray-600">Получить данные в удобном формате</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Ban" className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Ограничение</h4>
                      <p className="text-sm text-gray-600">Ограничить обработку данных</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="X" className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Отзыв согласия</h4>
                      <p className="text-sm text-gray-600">Отозвать ранее данное согласие</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Cookie" className="w-6 h-6 text-orange-600" />
                <span>Использование cookie</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Мы используем cookie и похожие технологии для улучшения работы сайта:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <Icon name="Settings" className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Функциональные</h4>
                    <p className="text-xs text-gray-600">Сохранение настроек</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <Icon name="BarChart" className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Аналитические</h4>
                    <p className="text-xs text-gray-600">Анализ использования</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <Icon name="Target" className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Маркетинговые</h4>
                    <p className="text-xs text-gray-600">Персонализация</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="MessageCircle" className="w-6 h-6 text-green-600" />
                <span>Связь с нами</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 mb-3">
                  Если у вас есть вопросы о нашей политике конфиденциальности или вы хотите 
                  воспользоваться своими правами, свяжитесь с нами:
                </p>
                <div className="space-y-2">
                  <p className="text-green-700">
                    <strong>Email:</strong> privacy@avito.ru
                  </p>
                  <p className="text-green-700">
                    <strong>Телефон:</strong> 8 (800) 123-45-67
                  </p>
                  <p className="text-green-700">
                    <strong>Почтовый адрес:</strong> г. Москва, ул. Тверская, 15, БЦ "Центральный"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="RefreshCw" className="w-6 h-6 text-blue-600" />
                <span>Изменения политики</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Мы можем периодически обновлять эту политику конфиденциальности. О существенных 
                изменениях мы уведомим вас по электронной почте или через уведомления на сайте. 
                Дата последнего обновления указана в начале документа.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;