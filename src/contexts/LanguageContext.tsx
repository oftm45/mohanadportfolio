import React, { createContext, useContext } from 'react';

type Language = 'en';

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
    heroDescription: 'Grade 12 Advanced STEM student in the UAE (Class of 2027) building real-world solutions with Artificial Intelligence, Robotics and IoT. FIRST Global Gold Medalist with Team Sudan and Official ICSC Ambassador.',
    contactMe: 'Contact Me',
    
    // About Section
    aboutTitle: 'About Me',
    aboutSubtitle: 'Getting to know me',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    nameValue: 'Mohanad Abubaker Osman',
    nationality: 'Nationality',
    nationalityValue: 'Sudan (Based in Sharjah, UAE)',
    age: 'Age',
    ageValue: '18 years old',
    dateOfBirth: 'Date of Birth',
    dobValue: '30/11/2008',
    role: 'Official Role',
    roleValue: 'Official ICSC Ambassador (International Computer Science Competition)',
    role2: 'Robotics Team',
    role2Value: 'Team Sudan – FIRST Global Challenge (FGC), Gold Medal: Rajaâ Cherkaoui El Moursli Award for Courageous Achievement',

    
    // Education
    educationTitle: 'Education Journey',
    grade1to3: 'Foundational Education (Grades 1–8) – British Curriculum & Al-Qabas Private Schools, Sudan',
    grade4to8: 'Grades 4-8: Al-Qabas Private Schools – Sudan',
    grade9to10: 'Manarat Al Sharjah School – Sharjah, UAE (Grades 9–12, Senior – Current)',
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

    // 404
    notFoundCode: '404',
    notFoundTitle: 'Page Not Found',
    notFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    notFoundCta: 'Back to Home',
  }
};

const fallbackLanguageContext: LanguageContextType = {
  language: 'en',
  toggleLanguage: () => undefined,
  t: (key: string) => translations.en[key as keyof typeof translations['en']] || key,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageContext.Provider value={fallbackLanguageContext}>{children}</LanguageContext.Provider>
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context ?? fallbackLanguageContext;
};
