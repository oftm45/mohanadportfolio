import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    about: 'About',
    skills: 'Skills',
    timeline: 'Journey',
    projects: 'Projects',
    contact: 'Contact',
    dashboard: 'Dashboard',
    
    // Hero Section
    heroTitle: "Hi, I'm Mohanad \n\n",
    heroSubtitle: 'Programming & Web Development Enthusiast',
    heroDescription: '17-year-old developer from Sudan, currently studying in UAE. Official ICSC Ambassador, passionate about creating innovative solutions through code.',
    contactMe: 'Contact Me',
    
    // About Section
    aboutTitle: 'About Me',
    aboutSubtitle: 'Getting to know me',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    nameValue: 'Mohanad Abubaker Osman',
    nationality: 'Nationality',
    nationalityValue: 'Sudan',
    age: 'Age',
    ageValue: '17 years old',
    dateOfBirth: 'Date of Birth',
    dobValue: '30/11/2008',
    role: 'Role',
    roleValue: 'ICSC Ambassador',
    role2: 'Role',
    role2Value: 'Student – Team Sudan, FIRST Global Challenge (FGC)',

    
    // Education
    educationTitle: 'Education Journey',
    grade1to3: 'Grades 1-3: British Curriculum Schools – Sudan',
    grade4to8: 'Grades 4-8: Al-Qabas Private Schools – Sudan',
    grade9to10: 'Grades 9-10: Manarat Al Sharjah School – Sharjah, UAE',
    grade11: 'Grade 11: Manarat Al Sharjah School – Sharjah, UAE',
    grade12: 'Grade 12 – Senior (Current): Manarat Al Sharjah School – Sharjah, UAE',
    
    // Skills & Interests
    skillsTitle: 'Skills & Interests',
    interests: 'Interests',
    interestsValue: 'Programming , cyber security , vibe coding , Ai , web',
    technicalSkills: 'Technical Skills',
    skillsValue: ' Python , C++ and vibe coding',
    
    
    // Button actions
    viewButton: 'View',
    downloadButton: 'Download',
    
    // Contact
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Let\'s connect and collaborate',
    emailTitle: 'Email Addresses',
    socialTitle: 'Social Media',
    copyEmail: 'Copy Email',
    emailCopied: 'Email copied to clipboard!',
    
    // Ambassador
    ambassadorTitle: 'ICSC Ambassador',
    ambassadorDesc: 'Proud to be an official Ambassador for International Computer Science Competition (ICSC).',
    ambassadorCta: 'View My ICSC Page',

    // Footer
    footerText: 'Made with ❤ by Mohanad',

    // 404
    notFoundCode: '404',
    notFoundTitle: 'Page Not Found',
    notFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    notFoundCta: 'Back to Home',
  },
  ar: {
    // Navigation
    about: 'نبذة عني',
    skills: 'المهارات',
    timeline: 'رحلتي',
    projects: 'المشاريع',
    contact: 'التواصل',
    dashboard: 'لوحة التحكم',
    
    // Hero Section
    heroTitle: 'مرحباً، أنا مهند — مطور إنترنت الأشياء والويب',
    heroSubtitle: 'شاب مهتم في البرمجة وتطوير المواقع',
    heroDescription: 'مطور عمره 17 سنة من السودان، أدرس حالياً في الإمارات. سفير رسمي لمسابقة ICSC الدولية.',
    contactMe: 'تواصل معي',
    
    // About Section
    aboutTitle: 'نبذة عني',
    aboutSubtitle: 'تعرف علي أكثر',
    personalInfo: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل',
    nameValue: 'مهند أبوبكر عبدالله عبد الجليل',
    nationality: 'الجنسية',
    nationalityValue: 'السودان',
    age: 'العمر',
    ageValue: '17 سنة',
    dateOfBirth: 'تاريخ الميلاد',
    dobValue: '30/11/2008',
    role: 'الصفة',
    roleValue: 'سفير ICSC',
    role2: 'الصفة',
    role2Value: 'طالب – فريق السودان في تحدي فيرست العالمي (FGC)',

    
    // Education
    educationTitle: 'رحلة التعليم',
    grade1to3: 'الصفوف 1-3: مدارس التعليم البريطاني – السودان',
    grade4to8: 'الصفوف 4-8: مدارس القبس الخاصة – السودان',
    grade9to10: 'الصفوف 9-10: مدرسة منارة الشارقة – الإمارات',
    grade11: 'الصف 11: مدرسة منارة الشارقة',
    grade12: 'الصف 12 (حالياً): مدرسة منارة الشارقة',
    
    // Skills & Interests
    skillsTitle: 'المهارات والاهتمامات',
    interests: 'الاهتمامات',
    interestsValue: 'البرمجة وتطوير المواقع',
    technicalSkills: 'المهارات التقنية',
    skillsValue: 'مبتدئ في Python و C++',
    
    
    // Button actions
    viewButton: 'عرض',
    downloadButton: 'تحميل',
    
    // Contact
    contactTitle: 'تواصل معي',
    contactSubtitle: 'دعنا نتواصل ونتعاون',
    emailTitle: 'عناوين البريد الإلكتروني',
    socialTitle: 'وسائل التواصل الاجتماعي',
    copyEmail: 'نسخ البريد الإلكتروني',
    emailCopied: 'تم نسخ البريد الإلكتروني!',
    
    // Ambassador
    ambassadorTitle: 'سفير ICSC',
    ambassadorDesc: 'فخور بأنني سفير رسمي لمسابقة ICSC الدولية للبرمجة والاستدامة.',
    ambassadorCta: 'زيارة صفحتي في ICSC',

    // Footer
    footerText: 'صُنع بـ ❤ بواسطة مهند',

    // 404
    notFoundCode: '٤٠٤',
    notFoundTitle: 'الصفحة غير موجودة',
    notFoundDesc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    notFoundCta: 'العودة للرئيسية',
  }
};

const fallbackLanguageContext: LanguageContextType = {
  language: 'en',
  toggleLanguage: () => undefined,
  t: (key: string) => translations.en[key as keyof typeof translations['en']] || key,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => {
      const nextLanguage = prev === 'en' ? 'ar' : 'en';
      document.dir = nextLanguage === 'ar' ? 'rtl' : 'ltr';
      return nextLanguage;
    });
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-cairo' : 'font-poppins'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context ?? fallbackLanguageContext;
};
