import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
        <p className="text-xl mb-8 text-white/90">
          Присоединяйтесь к миллионам довольных покупателей
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
          onClick={() => navigate("/marketplace")}
        >
          <Icon name="ArrowRight" size={20} className="mr-2" />
          Перейти к покупкам
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
