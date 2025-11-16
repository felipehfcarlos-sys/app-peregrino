"use client";

import { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Home, 
  TrendingUp, 
  AlertCircle, 
  Users,
  ArrowRight,
  Mountain,
  Clock,
  Sun,
  Phone,
  Star,
  Bed,
  DollarSign,
  Wifi,
  Coffee,
  ShoppingBag,
  Heart,
  Camera,
  Pause,
  Play,
  Award,
  QrCode,
  Share2,
  Download,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
  MapPinned,
  Compass,
  Battery,
  Signal,
  Globe
} from "lucide-react";

type Screen = 
  | "splash"
  | "onboarding"
  | "route-selection"
  | "home"
  | "navigation"
  | "albergues"
  | "albergue-detail"
  | "progress"
  | "credential"
  | "sos";

type Language = "pt" | "es" | "en" | "fr";

const translations = {
  pt: {
    appName: "PEREGRINO",
    tagline: "Seu companheiro digital no Caminho",
    menu: "Menu",
    notifications: "Notificações",
    settings: "Configurações",
    language: "Idioma",
    map: "Mapa",
    progress: "Progresso",
    community: "Comunidade",
    config: "Config",
    youAreIn: "Você está em:",
    kmToSantiago: "até Santiago",
    nextStage: "Próxima etapa:",
    distance: "Distância",
    elevation: "Elevação",
    time: "Tempo",
    weather: "Clima",
    startNavigation: "INICIAR NAVEGAÇÃO",
    albergues: "Albergues",
    nearby: "Próximos",
    statistics: "Estatísticas",
    emergency: "Emergência",
    credential: "Credencial",
    digital: "Digital",
    close: "Fechar"
  },
  es: {
    appName: "PEREGRINO",
    tagline: "Tu compañero digital en el Camino",
    menu: "Menú",
    notifications: "Notificaciones",
    settings: "Ajustes",
    language: "Idioma",
    map: "Mapa",
    progress: "Progreso",
    community: "Comunidad",
    config: "Config",
    youAreIn: "Estás en:",
    kmToSantiago: "hasta Santiago",
    nextStage: "Próxima etapa:",
    distance: "Distancia",
    elevation: "Elevación",
    time: "Tiempo",
    weather: "Clima",
    startNavigation: "INICIAR NAVEGACIÓN",
    albergues: "Albergues",
    nearby: "Cercanos",
    statistics: "Estadísticas",
    emergency: "Emergencia",
    credential: "Credencial",
    digital: "Digital",
    close: "Cerrar"
  },
  en: {
    appName: "PILGRIM",
    tagline: "Your digital companion on the Way",
    menu: "Menu",
    notifications: "Notifications",
    settings: "Settings",
    language: "Language",
    map: "Map",
    progress: "Progress",
    community: "Community",
    config: "Config",
    youAreIn: "You are in:",
    kmToSantiago: "to Santiago",
    nextStage: "Next stage:",
    distance: "Distance",
    elevation: "Elevation",
    time: "Time",
    weather: "Weather",
    startNavigation: "START NAVIGATION",
    albergues: "Hostels",
    nearby: "Nearby",
    statistics: "Statistics",
    emergency: "Emergency",
    credential: "Credential",
    digital: "Digital",
    close: "Close"
  },
  fr: {
    appName: "PÈLERIN",
    tagline: "Votre compagnon numérique sur le Chemin",
    menu: "Menu",
    notifications: "Notifications",
    settings: "Paramètres",
    language: "Langue",
    map: "Carte",
    progress: "Progrès",
    community: "Communauté",
    config: "Config",
    youAreIn: "Vous êtes à:",
    kmToSantiago: "jusqu'à Santiago",
    nextStage: "Prochaine étape:",
    distance: "Distance",
    elevation: "Élévation",
    time: "Temps",
    weather: "Météo",
    startNavigation: "DÉMARRER LA NAVIGATION",
    albergues: "Auberges",
    nearby: "À proximité",
    statistics: "Statistiques",
    emergency: "Urgence",
    credential: "Crédentiale",
    digital: "Numérique",
    close: "Fermer"
  }
};

export default function PeregrinoApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAlbergue, setSelectedAlbergue] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>("pt");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [languageMenuAnimated, setLanguageMenuAnimated] = useState(false);

  const t = translations[language];

  // Dados mockados
  const currentStage = {
    from: "Sarria",
    to: "Portomarín",
    distance: 22.4,
    elevationGain: 420,
    elevationLoss: 380,
    estimatedTime: "5h 30min",
    weather: "18°C, parcialmente nublado",
    kmToSantiago: 115
  };

  const navigationData = {
    timeElapsed: "1h 23min",
    distanceWalked: 6.2,
    elevationGain: 180,
    nextTurn: "Em 850m, vire à direita",
    currentSpeed: "4.2 km/h"
  };

  const albergues = [
    {
      id: 1,
      name: "Albergue Municipal de Portomarín",
      type: "Público",
      rating: 4.5,
      reviews: 127,
      distance: "450m",
      price: 8,
      beds: 45,
      facilities: ["shower", "wifi", "kitchen"],
      phone: "+34 982 545 123"
    },
    {
      id: 2,
      name: "Albergue Ferramenteiro",
      type: "Privado",
      rating: 4.8,
      reviews: 89,
      distance: "1.2km",
      price: 12,
      beds: 28,
      facilities: ["shower", "wifi", "kitchen", "dinner"],
      phone: "+34 982 545 456"
    },
    {
      id: 3,
      name: "Casa García",
      type: "Donativo",
      rating: 4.2,
      reviews: 56,
      distance: "2.8km",
      price: 0,
      beds: 18,
      facilities: ["shower", "kitchen"],
      phone: "+34 982 545 789"
    }
  ];

  const progressStats = {
    totalDistance: 782,
    completedDistance: 667,
    daysWalking: 28,
    stagesCompleted: 23,
    totalElevation: 7230,
    caloriesBurned: 47600,
    alberguesVisited: 23
  };

  const languages = [
    { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
    { code: "es" as Language, name: "Español", flag: "🇪🇸" },
    { code: "en" as Language, name: "English", flag: "🇬🇧" },
    { code: "fr" as Language, name: "Français", flag: "🇫🇷" }
  ];

  // Controla animação do menu de idiomas
  const handleLanguageMenuToggle = () => {
    if (!showLanguageMenu) {
      setShowLanguageMenu(true);
      setTimeout(() => setLanguageMenuAnimated(true), 10);
    } else {
      setLanguageMenuAnimated(false);
      setTimeout(() => setShowLanguageMenu(false), 300);
    }
  };

  // Splash Screen
  if (currentScreen === "splash") {
    setTimeout(() => setCurrentScreen("onboarding"), 2000);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003DA5] via-[#0051C8] to-[#FFD700] flex items-center justify-center relative overflow-hidden">
        {/* Background decorativo com imagens */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/594a047a-9c78-49de-a54b-f6d66d1ba16c.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-center animate-fade-in relative z-10">
          <div className="mb-8 relative">
            {/* Concha como símbolo principal */}
            <div className="relative inline-block">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7de943d5-0bd3-436e-8d93-3223803abc0a.png"
                alt="Concha do Caminho de Santiago"
                className="w-32 h-32 mx-auto animate-bounce drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-[#FFD700] blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-wider">{t.appName}</h1>
          <p className="text-2xl text-[#FFD700] font-semibold drop-shadow-lg">{t.tagline}</p>
        </div>
      </div>
    );
  }

  // Onboarding
  if (currentScreen === "onboarding") {
    const onboardingScreens = [
      {
        icon: <Navigation className="w-20 h-20 text-[#003DA5]" />,
        title: "Navegue offline com confiança",
        description: "Mapas detalhados e GPS preciso funcionam sem internet"
      },
      {
        icon: <Mountain className="w-20 h-20 text-[#003DA5]" />,
        title: "Planeje suas etapas",
        description: "Personalize seu ritmo e acompanhe seu progresso"
      },
      {
        icon: <Users className="w-20 h-20 text-[#003DA5]" />,
        title: "Conecte-se com peregrinos",
        description: "Compartilhe experiências e receba alertas da comunidade"
      }
    ];

    const currentOnboarding = onboardingScreens[onboardingStep];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] via-[#FFC700] to-[#FFB700] flex flex-col relative overflow-hidden">
        {/* Padrão decorativo com conchas */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/5dfa5737-769f-43d5-ae4b-bc7370d7ef67.png"
              alt=""
              className="w-24 h-24 rotate-12"
            />
          </div>
          <div className="absolute bottom-20 left-10">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/33ceab6f-5a1a-46d8-a7e3-49e5386eaa88.png"
              alt=""
              className="w-32 h-32 -rotate-12"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="text-center max-w-md animate-fade-in">
            <div className="mb-8 flex justify-center">
              <div className="bg-white rounded-full p-8 shadow-2xl">
                {currentOnboarding.icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#003DA5] mb-4">
              {currentOnboarding.title}
            </h2>
            <p className="text-lg text-[#0051C8]">
              {currentOnboarding.description}
            </p>
          </div>
        </div>

        <div className="p-8 relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === onboardingStep
                    ? "w-8 bg-[#003DA5]"
                    : "w-2 bg-[#003DA5]/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (onboardingStep < 2) {
                setOnboardingStep(onboardingStep + 1);
              } else {
                setCurrentScreen("route-selection");
              }
            }}
            className="w-full bg-[#003DA5] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-[#0051C8] transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            {onboardingStep < 2 ? "Próximo" : "Começar"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Route Selection
  if (currentScreen === "route-selection") {
    const routes = [
      { name: "Caminho Francês", distance: 780, days: "30-35 dias", difficulty: "Moderado" },
      { name: "Caminho Português", distance: 620, days: "25-30 dias", difficulty: "Fácil" },
      { name: "Caminho do Norte", distance: 825, days: "32-38 dias", difficulty: "Difícil" },
      { name: "Caminho Primitivo", distance: 320, days: "13-15 dias", difficulty: "Difícil" }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] to-[#FFC700]">
        <div className="bg-[#003DA5] text-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Escolha sua rota</h1>
          <p className="text-[#FFD700] mt-1">Selecione o Caminho que deseja percorrer</p>
        </div>

        <div className="p-6 space-y-4">
          {routes.map((route, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen("home")}
              className="w-full bg-white rounded-2xl p-6 border-4 border-[#003DA5] hover:border-[#FFD700] hover:shadow-2xl transition-all text-left relative overflow-hidden"
            >
              {/* Concha decorativa */}
              <div className="absolute top-2 right-2 opacity-10">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7de943d5-0bd3-436e-8d93-3223803abc0a.png"
                  alt=""
                  className="w-16 h-16"
                />
              </div>
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <h3 className="text-xl font-bold text-[#003DA5]">{route.name}</h3>
                <ChevronRight className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#003DA5]" />
                  {route.distance} km
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#003DA5]" />
                  {route.days}
                </span>
                <span className={`font-semibold ${
                  route.difficulty === "Fácil" ? "text-green-600" :
                  route.difficulty === "Moderado" ? "text-[#FFD700]" :
                  "text-red-600"
                }`}>
                  {route.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] via-[#FFC700] to-[#FFB700]">
        {/* Header com tema azul e amarelo */}
        <div className="bg-[#003DA5] text-white p-6 shadow-2xl relative overflow-hidden">
          {/* Background decorativo */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/a1edf1b2-85b4-48fd-9a2f-760dbdb412c7.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between mb-4 relative z-10">
            <Menu className="w-6 h-6" />
            <div className="flex items-center gap-2">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7de943d5-0bd3-436e-8d93-3223803abc0a.png"
                alt="Concha"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold">{t.appName}</h1>
            </div>
            <div className="flex gap-3">
              <Bell className="w-6 h-6" />
              <button 
                onClick={handleLanguageMenuToggle}
                className="relative"
              >
                <Globe className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Language Menu com animação e z-index máximo */}
          {showLanguageMenu && (
            <div 
              className={`fixed right-6 top-20 bg-white rounded-xl shadow-2xl border-4 border-[#FFD700] p-2 min-w-[200px] transition-all duration-300 ${
                languageMenuAnimated 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-4'
              }`}
              style={{ zIndex: 9999 }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLanguageMenuAnimated(false);
                    setTimeout(() => setShowLanguageMenu(false), 300);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#FFD700]/20 transition-colors ${
                    language === lang.code ? "bg-[#FFD700]/30 text-[#003DA5]" : "text-gray-700"
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-[#003DA5]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Current Location */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#003DA5] relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/33ceab6f-5a1a-46d8-a7e3-49e5386eaa88.png"
                alt=""
                className="w-24 h-24"
              />
            </div>
            <div className="flex items-center gap-2 text-[#003DA5] mb-2 relative z-10">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{t.youAreIn}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#003DA5] mb-1">Sarria</h2>
            <p className="text-gray-600">Km {currentStage.kmToSantiago} {t.kmToSantiago}</p>
          </div>

          {/* Next Stage - Azul e Amarelo */}
          <div className="bg-gradient-to-br from-[#003DA5] to-[#0051C8] rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
            {/* Background com catedral */}
            <div className="absolute inset-0 opacity-10">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/594a047a-9c78-49de-a54b-f6d66d1ba16c.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-5 h-5 text-[#FFD700]" />
                <span className="font-medium text-[#FFD700]">{t.nextStage}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{currentStage.to}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 text-[#FFD700] text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{t.distance}</span>
                  </div>
                  <p className="text-xl font-bold">{currentStage.distance} km</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 text-[#FFD700] text-sm mb-1">
                    <Mountain className="w-4 h-4" />
                    <span>{t.elevation}</span>
                  </div>
                  <p className="text-xl font-bold">+{currentStage.elevationGain}m</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 text-[#FFD700] text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{t.time}</span>
                  </div>
                  <p className="text-xl font-bold">{currentStage.estimatedTime}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center gap-2 text-[#FFD700] text-sm mb-1">
                    <Sun className="w-4 h-4" />
                    <span>{t.weather}</span>
                  </div>
                  <p className="text-lg font-bold">18°C</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentScreen("navigation");
                  setIsNavigating(true);
                }}
                className="w-full bg-[#FFD700] text-[#003DA5] py-4 rounded-xl font-bold text-lg hover:bg-[#FFC700] transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                <Navigation className="w-6 h-6" />
                {t.startNavigation}
              </button>
            </div>
          </div>

          {/* Quick Actions com bordas amarelas */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentScreen("albergues")}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 border-[#FFD700] hover:border-[#003DA5]"
            >
              <Home className="w-8 h-8 text-[#003DA5] mb-3" />
              <h4 className="font-bold text-[#003DA5] mb-1">{t.albergues}</h4>
              <p className="text-sm text-gray-600">{t.nearby}</p>
            </button>

            <button
              onClick={() => setCurrentScreen("progress")}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 border-[#FFD700] hover:border-[#003DA5]"
            >
              <TrendingUp className="w-8 h-8 text-[#003DA5] mb-3" />
              <h4 className="font-bold text-[#003DA5] mb-1">{t.progress}</h4>
              <p className="text-sm text-gray-600">{t.statistics}</p>
            </button>

            <button
              onClick={() => setCurrentScreen("sos")}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 border-[#FFD700] hover:border-red-600"
            >
              <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-bold text-[#003DA5] mb-1">SOS</h4>
              <p className="text-sm text-gray-600">{t.emergency}</p>
            </button>

            <button
              onClick={() => setCurrentScreen("credential")}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 border-[#FFD700] hover:border-[#003DA5] relative overflow-hidden"
            >
              <div className="absolute top-1 right-1 opacity-20">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/693dced7-2ffc-4e2f-8db7-81e92b97bb0c.jpg"
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
              <Award className="w-8 h-8 text-[#FFD700] mb-3 relative z-10" />
              <h4 className="font-bold text-[#003DA5] mb-1 relative z-10">{t.credential}</h4>
              <p className="text-sm text-gray-600 relative z-10">{t.digital}</p>
            </button>
          </div>
        </div>

        {/* Bottom Navigation com tema */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#003DA5] border-t-4 border-[#FFD700] px-6 py-4 shadow-2xl">
          <div className="flex justify-around">
            <button className="flex flex-col items-center gap-1 text-[#FFD700]">
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-medium">{t.map}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-medium">{t.progress}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">{t.community}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
              <span className="text-xs font-medium">{t.config}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Screen
  if (currentScreen === "navigation") {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 bg-[#003DA5]/90 backdrop-blur-sm p-4 z-10 flex items-center justify-between text-white border-b-4 border-[#FFD700]">
          <button onClick={() => setCurrentScreen("home")}>
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7de943d5-0bd3-436e-8d93-3223803abc0a.png"
              alt=""
              className="w-6 h-6"
            />
            <span className="font-bold text-[#FFD700]">{t.appName}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4 text-[#FFD700]" />
              <span>85%</span>
            </div>
            <div className="flex items-center gap-1">
              <Signal className="w-4 h-4 text-[#FFD700]" />
              <span>GPS</span>
            </div>
            <span>12:34</span>
          </div>
        </div>

        {/* Map Placeholder com imagem do caminho */}
        <div className="h-screen relative">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/a1edf1b2-85b4-48fd-9a2f-760dbdb412c7.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003DA5]/40 to-[#FFD700]/20"></div>
          
          {/* User Position */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-[#003DA5]">
              <Navigation className="w-10 h-10 text-[#003DA5] transform rotate-45" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
          </div>

          {/* Route Line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-96 bg-[#FFD700]/70 -rotate-45 shadow-lg"></div>
        </div>

        {/* Navigation Info Panel */}
        <div className="absolute top-24 left-4 right-4 bg-[#003DA5]/95 backdrop-blur-md rounded-2xl p-6 text-white border-4 border-[#FFD700] shadow-2xl">
          <div className="flex items-start gap-3 mb-4">
            <Compass className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold">{navigationData.nextTurn}</p>
              <p className="text-sm text-[#FFD700] mt-1">Continue reto pela estrada principal</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FFD700]/30">
            <div>
              <p className="text-xs text-[#FFD700] mb-1">{t.time}</p>
              <p className="text-lg font-bold">{navigationData.timeElapsed}</p>
            </div>
            <div>
              <p className="text-xs text-[#FFD700] mb-1">{t.distance}</p>
              <p className="text-lg font-bold">{navigationData.distanceWalked} km</p>
            </div>
            <div>
              <p className="text-xs text-[#FFD700] mb-1">{t.elevation}</p>
              <p className="text-lg font-bold">+{navigationData.elevationGain}m</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-4 right-4 flex gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 bg-[#003DA5]/90 backdrop-blur-md rounded-xl p-4 text-white hover:bg-[#003DA5] transition-colors border-2 border-[#FFD700]"
          >
            {isPaused ? <Play className="w-6 h-6 mx-auto" /> : <Pause className="w-6 h-6 mx-auto" />}
            <p className="text-xs mt-2 text-[#FFD700]">{isPaused ? "Retomar" : "Pausar"}</p>
          </button>

          <button
            onClick={() => setCurrentScreen("albergues")}
            className="flex-1 bg-[#003DA5]/90 backdrop-blur-md rounded-xl p-4 text-white hover:bg-[#003DA5] transition-colors border-2 border-[#FFD700]"
          >
            <Home className="w-6 h-6 mx-auto" />
            <p className="text-xs mt-2 text-[#FFD700]">{t.albergues}</p>
          </button>

          <button className="flex-1 bg-[#003DA5]/90 backdrop-blur-md rounded-xl p-4 text-white hover:bg-[#003DA5] transition-colors border-2 border-[#FFD700]">
            <Camera className="w-6 h-6 mx-auto" />
            <p className="text-xs mt-2 text-[#FFD700]">Foto</p>
          </button>
        </div>
      </div>
    );
  }

  // Albergues List
  if (currentScreen === "albergues") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] to-[#FFC700] pb-24">
        <div className="bg-[#003DA5] text-white p-6 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setCurrentScreen("home")}>
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">{t.albergues} {t.nearby.toLowerCase()}</h1>
          </div>

          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 bg-[#FFD700] text-[#003DA5] rounded-lg text-sm font-medium">
              Todos
            </button>
            <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium">
              Públicos
            </button>
            <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium">
              Privados
            </button>
          </div>

          <select className="w-full px-4 py-2 border-2 border-[#FFD700] rounded-lg text-sm bg-white text-[#003DA5] font-medium">
            <option>Ordenar por: Distância</option>
            <option>Ordenar por: Avaliação</option>
            <option>Ordenar por: Preço</option>
          </select>
        </div>

        <div className="p-6 space-y-4">
          {albergues.map((albergue) => (
            <button
              key={albergue.id}
              onClick={() => {
                setSelectedAlbergue(albergue.id);
                setCurrentScreen("albergue-detail");
              }}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left border-4 border-[#003DA5] hover:border-[#FFD700]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5 text-[#003DA5]" />
                    <h3 className="font-bold text-[#003DA5]">{albergue.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                      <span className="font-semibold">{albergue.rating}</span>
                      <span className="text-gray-500">({albergue.reviews})</span>
                    </div>
                    <span className="px-2 py-1 bg-[#FFD700] text-[#003DA5] rounded-full text-xs font-medium">
                      {albergue.type}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#003DA5]" />
                  <span>{albergue.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-[#003DA5]" />
                  <span>{albergue.price === 0 ? "Donativo" : `€${albergue.price}`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Bed className="w-4 h-4 text-[#003DA5]" />
                  <span>{albergue.beds} camas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#003DA5]" />
                  <span>Contato</span>
                </div>
              </div>

              <div className="flex gap-2">
                {albergue.facilities.includes("shower") && (
                  <span className="text-xs text-gray-500">🚿 Chuveiro</span>
                )}
                {albergue.facilities.includes("wifi") && (
                  <span className="text-xs text-gray-500">📶 WiFi</span>
                )}
                {albergue.facilities.includes("kitchen") && (
                  <span className="text-xs text-gray-500">🍳 Cozinha</span>
                )}
                {albergue.facilities.includes("dinner") && (
                  <span className="text-xs text-gray-500">🍽️ Jantar</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Albergue Detail
  if (currentScreen === "albergue-detail" && selectedAlbergue) {
    const albergue = albergues.find(a => a.id === selectedAlbergue)!;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] to-[#FFC700]">
        <div className="bg-gradient-to-br from-[#003DA5] to-[#0051C8] text-white p-6 shadow-lg">
          <button onClick={() => setCurrentScreen("albergues")} className="mb-4">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-2">{albergue.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              <span className="font-bold">{albergue.rating}</span>
              <span className="text-[#FFD700]">({albergue.reviews} avaliações)</span>
            </div>
            <span className="px-3 py-1 bg-[#FFD700] text-[#003DA5] rounded-full text-sm font-medium">
              {albergue.type}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
            <h3 className="font-bold text-[#003DA5] mb-4">Informações</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-gray-600">{t.distance}</p>
                  <p className="font-semibold text-[#003DA5]">{albergue.distance} à frente</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-gray-600">Preço</p>
                  <p className="font-semibold text-[#003DA5]">
                    {albergue.price === 0 ? "Donativo" : `€${albergue.price} por noite`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-gray-600">Capacidade</p>
                  <p className="font-semibold text-[#003DA5]">{albergue.beds} camas disponíveis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-semibold text-[#003DA5]">{albergue.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
            <h3 className="font-bold text-[#003DA5] mb-4">Facilidades</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  🚿
                </div>
                <span className="text-sm text-[#003DA5] font-medium">Chuveiro quente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-[#003DA5]" />
                </div>
                <span className="text-sm text-[#003DA5] font-medium">WiFi grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  🍳
                </div>
                <span className="text-sm text-[#003DA5] font-medium">Cozinha</span>
              </div>
              {albergue.facilities.includes("dinner") && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    🍽️
                  </div>
                  <span className="text-sm text-[#003DA5] font-medium">Jantar incluído</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#003DA5] text-white py-4 rounded-xl font-semibold hover:bg-[#0051C8] transition-colors flex items-center justify-center gap-2 shadow-xl border-2 border-[#FFD700]">
              <Navigation className="w-5 h-5" />
              Como chegar
            </button>
            <button className="bg-white border-4 border-[#003DA5] text-[#003DA5] py-4 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2 shadow-xl">
              <Phone className="w-5 h-5" />
              Ligar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Progress Screen
  if (currentScreen === "progress") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] to-[#FFC700]">
        <div className="bg-gradient-to-br from-[#003DA5] to-[#0051C8] text-white p-6 shadow-lg">
          <button onClick={() => setCurrentScreen("home")} className="mb-4">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-2">{t.progress}</h1>
          <p className="text-[#FFD700]">Acompanhe sua jornada no Caminho</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#003DA5]">Distância Total</h3>
              <span className="text-2xl font-bold text-[#FFD700]">
                {Math.round((progressStats.completedDistance / progressStats.totalDistance) * 100)}%
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#003DA5] to-[#FFD700] rounded-full transition-all"
                style={{ width: `${(progressStats.completedDistance / progressStats.totalDistance) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {progressStats.completedDistance} km de {progressStats.totalDistance} km
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
              <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-[#003DA5]" />
              </div>
              <p className="text-3xl font-bold text-[#003DA5] mb-1">{progressStats.daysWalking}</p>
              <p className="text-sm text-gray-600">Dias caminhando</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
              <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-[#003DA5]" />
              </div>
              <p className="text-3xl font-bold text-[#003DA5] mb-1">{progressStats.stagesCompleted}</p>
              <p className="text-sm text-gray-600">Etapas concluídas</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
              <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center mb-3">
                <Mountain className="w-6 h-6 text-[#003DA5]" />
              </div>
              <p className="text-3xl font-bold text-[#003DA5] mb-1">{progressStats.totalElevation}m</p>
              <p className="text-sm text-gray-600">Elevação total</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
              <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center mb-3">
                <Home className="w-6 h-6 text-[#003DA5]" />
              </div>
              <p className="text-3xl font-bold text-[#003DA5] mb-1">{progressStats.alberguesVisited}</p>
              <p className="text-sm text-gray-600">Albergues visitados</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
            <h3 className="font-bold text-[#003DA5] mb-4">Conquistas</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003DA5]">Primeira Etapa</p>
                  <p className="text-sm text-gray-600">Completou sua primeira etapa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003DA5]">100 km</p>
                  <p className="text-sm text-gray-600">Caminhou 100 quilômetros</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003DA5]">Montanhista</p>
                  <p className="text-sm text-gray-600">Subiu 5.000m de elevação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Credential Screen
  if (currentScreen === "credential") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] to-[#FFC700]">
        <div className="bg-gradient-to-br from-[#003DA5] to-[#0051C8] text-white p-6 shadow-lg relative overflow-hidden">
          {/* Background com carimbos */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/693dced7-2ffc-4e2f-8db7-81e92b97bb0c.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          
          <button onClick={() => setCurrentScreen("home")} className="mb-4 relative z-10">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-2 relative z-10">{t.credential} {t.digital}</h1>
          <p className="text-[#FFD700] relative z-10">Sua credencial do peregrino</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Credential Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-8 border-[#003DA5] relative overflow-hidden">
            {/* Concha decorativa */}
            <div className="absolute top-4 right-4 opacity-10">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7de943d5-0bd3-436e-8d93-3223803abc0a.png"
                alt=""
                className="w-24 h-24"
              />
            </div>

            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-[#003DA5] mb-1">CREDENCIAL DO PEREGRINO</h2>
              <p className="text-gray-600">Credential of the Pilgrim</p>
            </div>

            <div className="space-y-4 mb-6 relative z-10">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nome / Name</p>
                <p className="text-xl font-bold text-[#003DA5]">João Silva</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">País / Country</p>
                <p className="text-lg font-semibold text-[#003DA5]">🇧🇷 Brasil</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Início</p>
                  <p className="font-semibold text-[#003DA5]">15/04/2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rota</p>
                  <p className="font-semibold text-[#003DA5]">Francês</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4 relative z-10">
              <div className="w-48 h-48 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-xl flex items-center justify-center border-4 border-[#003DA5]">
                <QrCode className="w-32 h-32 text-[#003DA5]" />
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 relative z-10">
              Apresente este QR Code nos albergues para registrar carimbos
            </p>
          </div>

          {/* Stamps */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-[#003DA5]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#003DA5]">Carimbos Coletados</h3>
              <span className="text-sm font-semibold text-[#FFD700]">23/32</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl border-2 ${
                    i < 23
                      ? "bg-gradient-to-br from-[#FFD700] to-[#FFC700] text-[#003DA5] border-[#003DA5]"
                      : "bg-gray-100 text-gray-300 border-gray-300"
                  }`}
                >
                  {i < 23 ? "✓" : "○"}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#003DA5] text-white py-4 rounded-xl font-semibold hover:bg-[#0051C8] transition-colors flex items-center justify-center gap-2 shadow-xl border-2 border-[#FFD700]">
              <Download className="w-5 h-5" />
              Baixar PDF
            </button>
            <button className="bg-white border-4 border-[#003DA5] text-[#003DA5] py-4 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2 shadow-xl">
              <Share2 className="w-5 h-5" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SOS Screen
  if (currentScreen === "sos") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 shadow-lg border-b-4 border-[#FFD700]">
          <button onClick={() => setCurrentScreen("home")} className="mb-4">
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-3 animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">MODO SOS</h1>
            <p className="text-red-100">Emergência ativada</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Location */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-red-600">
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="font-semibold">Sua localização:</span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-mono">Lat: 42.7789°N</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-mono">Lon: -7.7156°W</span>
              </p>
              <p className="text-gray-900 font-semibold mt-3">
                Próximo a: Portomarín, Km 93.5
              </p>
            </div>
          </div>

          {/* Emergency Actions */}
          <div className="space-y-3">
            <button className="w-full bg-red-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-3 shadow-2xl border-4 border-[#FFD700]">
              <Phone className="w-6 h-6" />
              LIGAR 112
              <span className="text-sm font-normal">(Emergências Europa)</span>
            </button>

            <button className="w-full bg-white border-4 border-red-600 text-red-600 py-5 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-3 shadow-xl">
              <Home className="w-6 h-6" />
              LIGAR ALBERGUE MAIS PRÓXIMO
              <span className="text-sm font-normal">(1.2km)</span>
            </button>

            <button className="w-full bg-white border-4 border-[#003DA5] text-[#003DA5] py-5 rounded-xl font-bold text-lg hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-3 shadow-xl">
              <Share2 className="w-6 h-6" />
              COMPARTILHAR LOCALIZAÇÃO
            </button>
          </div>

          {/* Alert Status */}
          <div className="bg-orange-100 border-4 border-orange-500 rounded-2xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-orange-900 font-semibold mb-2">
              🔴 Alertando comunidade...
            </p>
            <p className="text-sm text-orange-700">
              Outros peregrinos próximos foram notificados
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen("home")}
            className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors border-2 border-gray-400"
          >
            Cancelar Emergência
          </button>
        </div>
      </div>
    );
  }

  return null;
}
