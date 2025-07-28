import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const AvitoFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4 text-white">TRIVO</div>
            <p className="text-blue-100 mb-4">
              Крупнейшая площадка объявлений в России
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/trivo_net" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} className="text-blue-200 hover:text-white" />
              </a>
              <Icon name="Twitter" size={20} className="text-blue-200 hover:text-white cursor-pointer" />
              <Icon name="Instagram" size={20} className="text-blue-200 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/how-to-buy" className="hover:text-white">Как покупать</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white">Безопасность</Link></li>
              <li><Link to="/terms" className="hover:text-white">Правила пользования</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Карта сайта</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Продавцам</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/how-to-sell" className="hover:text-white">Как продавать</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Тарифы</Link></li>
              <li><Link to="/advertising" className="hover:text-white">Реклама на TRIVO</Link></li>
              <li><Link to="/help" className="hover:text-white">Помощь</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/about" className="hover:text-white">О нас</Link></li>
              <li><Link to="/contacts" className="hover:text-white">Контакты</Link></li>
              <li className="hover:text-white cursor-pointer">Вакансии</li>
              <li className="hover:text-white cursor-pointer">Пресс-центр</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-blue-100">© 2025 Trivo объявления. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-blue-100 hover:text-white">Политика конфиденциальности</Link>
              <Link to="/terms" className="text-blue-100 hover:text-white">Условия использования</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AvitoFooter;