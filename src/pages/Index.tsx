import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeContentType, setActiveContentType] = useState('text');
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const contentTypes = [
    { id: 'text', name: 'Текст', icon: 'FileText', color: 'from-purple-500 to-pink-500' },
    { id: 'image', name: 'Изображения', icon: 'Image', color: 'from-blue-500 to-cyan-500' },
    { id: 'video', name: 'Видео', icon: 'Video', color: 'from-orange-500 to-red-500' },
    { id: 'audio', name: 'Аудио', icon: 'Music', color: 'from-green-500 to-emerald-500' },
    { id: 'code', name: 'Код', icon: 'Code', color: 'from-violet-500 to-purple-500' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '990₽',
      period: '/месяц',
      features: ['1000 запросов/мес', 'Текст и изображения', 'Email поддержка', 'API доступ'],
      popular: false,
    },
    {
      name: 'Pro',
      price: '4990₽',
      period: '/месяц',
      features: ['10000 запросов/мес', 'Все типы контента', 'Приоритетная поддержка', 'Расширенное API', 'Кастомные модели'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Безлимит запросов', 'Все функции Pro', 'Персональный менеджер', 'SLA 99.9%', 'On-premise решение'],
      popular: false,
    },
  ];

  const capabilities = [
    { icon: 'Sparkles', title: 'Генерация контента', description: 'Создание уникального контента любого типа за секунды' },
    { icon: 'Zap', title: 'Высокая скорость', description: 'Обработка запросов в режиме реального времени' },
    { icon: 'Shield', title: 'Безопасность', description: 'Защита данных и конфиденциальность на уровне банка' },
    { icon: 'Globe', title: 'Мультиязычность', description: 'Поддержка 95+ языков для глобальных проектов' },
    { icon: 'Workflow', title: 'Автоматизация', description: 'Интеграция в ваши рабочие процессы через API' },
    { icon: 'TrendingUp', title: 'Масштабируемость', description: 'От стартапа до enterprise без ограничений' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите запрос для генерации",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setResult(null);

    try {
      if (activeContentType === 'image') {
        const response = await fetch('https://api.poehali.dev/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error('Ошибка генерации');

        const data = await response.json();
        setResult({ type: 'image', url: data.url });
        
        toast({
          title: "Готово!",
          description: "Изображение успешно сгенерировано",
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const demoResults: Record<string, any> = {
          text: {
            type: 'text',
            content: `Сгенерированный текст на основе запроса: "${prompt}"\n\nЭто демо-режим. Подключите OpenAI API для реальной генерации текста с помощью GPT-4.`
          },
          video: {
            type: 'video',
            content: 'Генерация видео (демо-режим). Подключите API для создания реальных видео.'
          },
          audio: {
            type: 'audio',
            content: 'Генерация аудио (демо-режим). Подключите ElevenLabs или OpenAI Whisper.'
          },
          code: {
            type: 'code',
            content: `// Сгенерированный код\nfunction example() {\n  console.log("${prompt}");\n  return "Демо-режим";\n}`
          }
        };

        setResult(demoResults[activeContentType]);
        
        toast({
          title: "Демо-режим",
          description: "Для реальной генерации подключите API",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать контент",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Cpu" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Factory</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Возможности</a>
            <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors">Тарифы</a>
            <a href="#api" className="text-gray-300 hover:text-purple-400 transition-colors">API</a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">Контакты</a>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Начать
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 animate-fade-in">
            🚀 Новое поколение контент-генерации
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
            Завод ИИ Контента
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in">
            Все виды контента в одном решении. Генерируйте тексты, изображения, видео, аудио и код с помощью передовых ИИ-технологий
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {contentTypes.map((type, index) => (
              <Card
                key={type.id}
                className={`p-6 cursor-pointer transition-all duration-300 border-2 animate-fade-in hover-scale ${
                  activeContentType === type.id
                    ? 'bg-gradient-to-br ' + type.color + ' border-transparent'
                    : 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setActiveContentType(type.id)}
              >
                <Icon name={type.icon} className="mx-auto mb-3 text-white" size={32} />
                <p className="text-white font-medium">{type.name}</p>
              </Card>
            ))}
          </div>

          <Card className="max-w-4xl mx-auto p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur animate-scale-in">
            <div className="mb-6">
              <label className="block text-left text-gray-300 mb-3 font-medium">Введите ваш запрос</label>
              <textarea
                className="w-full p-4 bg-slate-950 border border-purple-500/30 rounded-lg text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                rows={4}
                placeholder="Например: Создай описание продукта для умных часов с функцией мониторинга здоровья..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 text-lg"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Сгенерировать контент
                </>
              )}
            </Button>

            {result && (
              <Card className="max-w-4xl mx-auto mt-8 p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Icon name="CheckCircle" className="text-green-400" size={24} />
                    Результат
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setResult(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                {result.type === 'image' && (
                  <div className="space-y-4">
                    <img
                      src={result.url}
                      alt="Generated"
                      className="w-full rounded-lg border border-purple-500/30"
                    />
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/50 text-white hover:bg-purple-500/10"
                      onClick={() => window.open(result.url, '_blank')}
                    >
                      <Icon name="Download" className="mr-2" size={16} />
                      Скачать изображение
                    </Button>
                  </div>
                )}

                {result.type === 'text' && (
                  <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30">
                    <p className="text-gray-300 whitespace-pre-wrap">{result.content}</p>
                  </div>
                )}

                {result.type === 'code' && (
                  <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30">
                    <pre className="text-purple-300 font-mono text-sm overflow-x-auto">{result.content}</pre>
                  </div>
                )}

                {(result.type === 'video' || result.type === 'audio') && (
                  <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30 text-center">
                    <Icon name="Info" className="mx-auto mb-3 text-purple-400" size={32} />
                    <p className="text-gray-300">{result.content}</p>
                  </div>
                )}
              </Card>
            )}
          </Card>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-slate-950/50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold font-display text-center mb-4 text-white">Возможности ИИ</h2>
          <p className="text-gray-400 text-center mb-16 text-lg">Технологии будущего уже сегодня</p>
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="p-8 bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon name={capability.icon} className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{capability.title}</h3>
                <p className="text-gray-400 leading-relaxed">{capability.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold font-display text-center mb-4 text-white">Тарифы и цены</h2>
          <p className="text-gray-400 text-center mb-16 text-lg">Выберите план для вашего бизнеса</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 transition-all duration-300 animate-fade-in ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500 scale-105 hover-scale'
                    : 'bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 hover-scale'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    Популярный
                  </Badge>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <Icon name="Check" className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    plan.popular
                      ? 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'w-full bg-slate-800 hover:bg-slate-700 text-white'
                  }
                >
                  Выбрать план
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="api" className="py-20 px-6 bg-slate-950/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold font-display text-center mb-4 text-white">API Документация</h2>
          <p className="text-gray-400 text-center mb-16 text-lg">Интегрируйте AI Factory в ваши проекты</p>
          
          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900 border border-purple-500/20 mb-8">
              <TabsTrigger value="quickstart" className="data-[state=active]:bg-purple-500">Быстрый старт</TabsTrigger>
              <TabsTrigger value="endpoints" className="data-[state=active]:bg-purple-500">Endpoints</TabsTrigger>
              <TabsTrigger value="auth" className="data-[state=active]:bg-purple-500">Авторизация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quickstart">
              <Card className="p-8 bg-slate-900/50 border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Начало работы</h3>
                <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30 mb-6">
                  <code className="text-purple-300 font-mono text-sm">
                    npm install @aifactory/sdk
                  </code>
                </div>
                <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30">
                  <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`import { AIFactory } from '@aifactory/sdk';

const ai = new AIFactory({
  apiKey: 'your-api-key'
});

const result = await ai.generate({
  type: 'text',
  prompt: 'Создай описание продукта'
});`}
                  </pre>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="endpoints">
              <Card className="p-8 bg-slate-900/50 border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Основные эндпоинты</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-lg border border-purple-500/30">
                    <Badge className="mb-2 bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                    <code className="text-purple-300 font-mono">/api/v1/generate</code>
                    <p className="text-gray-400 mt-2">Генерация контента</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-purple-500/30">
                    <Badge className="mb-2 bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                    <code className="text-purple-300 font-mono">/api/v1/status/:id</code>
                    <p className="text-gray-400 mt-2">Проверка статуса генерации</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-purple-500/30">
                    <Badge className="mb-2 bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                    <code className="text-purple-300 font-mono">/api/v1/history</code>
                    <p className="text-gray-400 mt-2">История генераций</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="auth">
              <Card className="p-8 bg-slate-900/50 border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Авторизация</h3>
                <p className="text-gray-400 mb-6">Используйте API ключ в заголовке запроса:</p>
                <div className="bg-slate-950 p-6 rounded-lg border border-purple-500/30">
                  <code className="text-purple-300 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300 text-sm">
                      API ключ можно получить в личном кабинете после регистрации
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold font-display mb-6 text-white">Готовы начать?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Присоединяйтесь к тысячам компаний, которые уже используют AI Factory
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg">
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/10 px-8 py-6 text-lg">
              <Icon name="Mail" className="mr-2" size={20} />
              Связаться с нами
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <a href="mailto:contact@aifactory.dev" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Icon name="Mail" size={20} />
              contact@aifactory.dev
            </a>
            <a href="https://t.me/aifactory" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Icon name="Send" size={20} />
              Telegram
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Icon name="Github" size={20} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-purple-500/20 bg-slate-950/50">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 AI Factory. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;