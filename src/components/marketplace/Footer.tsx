import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-12">
      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TRIVO MARKET</h3>
            <p className="text-gray-300 text-sm">
              Современный маркетплейс с широким ассортиментом товаров и быстрой
              доставкой.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Как сделать заказ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Способы оплаты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Возврат товара
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Партнёрам</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  className="hover:text-white"
                  onClick={() => navigate("/admin/register")}
                >
                  Стать продавцом
                </a>
              </li>
              <li>
                <a className="hover:text-white" onClick={() => navigate("/")}>
                  Реклама на сайте
                </a>
              </li>
              <li>
                <a className="hover:text-white" onClick={() => navigate("/")}>
                  Программа лояльности
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 8 (800) 123-45-68</li>
              <li>📧 support@trivomarket.net</li>
              <li>🕐 Ежедневно с 9:00 до 21:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Trivo Market. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
