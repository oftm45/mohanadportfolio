import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/animated-sidebar";
import { LayoutDashboard, UserCog, Settings, Home, FolderKanban, Award, Mail, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const links = [
    {
      label: "الرئيسية",
      href: "/",
      icon: <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "لوحة التحكم",
      href: "/dashboard",
      icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "المشاريع",
      href: "#projects",
      icon: <FolderKanban className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "الشهادات",
      href: "#certificates",
      icon: <Award className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "الإعدادات",
      href: "#",
      icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "تواصل معي",
      href: "#contact",
      icon: <Mail className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved preference or default to dark
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme class to the dashboard container
    localStorage.setItem('dashboard-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full flex-1 min-h-screen mx-auto border overflow-hidden transition-colors duration-300",
        isDarkMode 
          ? "bg-neutral-800 border-neutral-700" 
          : "bg-gray-100 border-neutral-200"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "مهند علي",
                href: "/",
                icon: (
                  <img
                    src="/lovable-uploads/5b411d7b-af96-4b50-8303-757e157fe095.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre mr-2"
      >
        لوحة التحكم
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const DashboardContent = ({ 
  isDarkMode, 
  toggleTheme 
}: { 
  isDarkMode: boolean; 
  toggleTheme: () => void;
}) => {
  return (
    <div className="flex flex-1">
      <div className={cn(
        "p-4 md:p-10 rounded-tl-2xl border flex flex-col gap-4 flex-1 w-full h-full transition-colors duration-300",
        isDarkMode 
          ? "border-neutral-700 bg-neutral-900" 
          : "border-neutral-200 bg-white"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={cn(
            "text-2xl font-bold",
            isDarkMode ? "text-neutral-100" : "text-neutral-800"
          )}>
            مرحباً بك في لوحة التحكم 👋
          </h1>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-all duration-300",
              isDarkMode 
                ? "bg-neutral-800 hover:bg-neutral-700 text-yellow-400" 
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
            )}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="المشاريع" value="3" icon={<FolderKanban className="h-6 w-6" />} color="bg-blue-500" isDarkMode={isDarkMode} />
          <StatCard title="الشهادات" value="5+" icon={<Award className="h-6 w-6" />} color="bg-green-500" isDarkMode={isDarkMode} />
          <StatCard title="سنوات الخبرة" value="2+" icon={<UserCog className="h-6 w-6" />} color="bg-purple-500" isDarkMode={isDarkMode} />
          <StatCard title="التقنيات" value="10+" icon={<Settings className="h-6 w-6" />} color="bg-orange-500" isDarkMode={isDarkMode} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 flex-1">
          {/* Main Content */}
          <div className={cn(
            "lg:col-span-4 rounded-xl p-6 border transition-colors duration-300",
            isDarkMode 
              ? "bg-neutral-800 border-neutral-700" 
              : "bg-neutral-50 border-neutral-200"
          )}>
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-neutral-100" : "text-neutral-800"
            )}>
              المشاريع الأخيرة
            </h2>
            <div className="space-y-3">
              <ProjectItem 
                title="المنزل الذكي" 
                status="مكتمل" 
                statusColor="bg-green-500"
                isDarkMode={isDarkMode}
              />
              <ProjectItem 
                title="البيت الزجاجي الذكي" 
                status="مكتمل" 
                statusColor="bg-green-500"
                isDarkMode={isDarkMode}
              />
              <ProjectItem 
                title="Agri-Shield 4.0" 
                status="قيد التطوير" 
                statusColor="bg-yellow-500"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Side Content */}
          <div className={cn(
            "lg:col-span-3 rounded-xl p-6 border transition-colors duration-300",
            isDarkMode 
              ? "bg-neutral-800 border-neutral-700" 
              : "bg-neutral-50 border-neutral-200"
          )}>
            <h2 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-neutral-100" : "text-neutral-800"
            )}>
              المهارات التقنية
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Arduino", "ESP32", "Python", "React", "IoT", "الطاقة المتجددة", "التصميم ثلاثي الأبعاد", "الروبوتات"].map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors duration-300",
                    isDarkMode 
                      ? "bg-neutral-700 text-neutral-300" 
                      : "bg-neutral-200 text-neutral-700"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color,
  isDarkMode
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color: string;
  isDarkMode: boolean;
}) => {
  return (
    <div className={cn(
      "rounded-xl p-4 border flex items-center gap-4 transition-colors duration-300",
      isDarkMode 
        ? "bg-neutral-800 border-neutral-700" 
        : "bg-white border-neutral-200"
    )}>
      <div className={cn("p-3 rounded-lg text-white", color)}>
        {icon}
      </div>
      <div>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-neutral-400" : "text-neutral-500"
        )}>{title}</p>
        <p className={cn(
          "text-2xl font-bold",
          isDarkMode ? "text-neutral-100" : "text-neutral-800"
        )}>{value}</p>
      </div>
    </div>
  );
};

const ProjectItem = ({ 
  title, 
  status, 
  statusColor,
  isDarkMode
}: { 
  title: string; 
  status: string; 
  statusColor: string;
  isDarkMode: boolean;
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg border transition-colors duration-300",
      isDarkMode 
        ? "bg-neutral-900 border-neutral-700" 
        : "bg-white border-neutral-200"
    )}>
      <span className={cn(
        isDarkMode ? "text-neutral-200" : "text-neutral-700"
      )}>{title}</span>
      <span className={cn("px-2 py-1 rounded-full text-xs text-white", statusColor)}>
        {status}
      </span>
    </div>
  );
};
