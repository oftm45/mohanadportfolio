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
    certificates: 'Certificates', 
    contact: 'Contact',
    dashboard: 'Dashboard',
    
    // Hero Section
    heroTitle: "Hi, I'm Mohanad",
    heroSubtitle: 'Programming & Web Development Enthusiast',
    heroDescription: '17-year-old developer from Sudan, currently studying in UAE. Passionate about creating innovative solutions through code.',
    viewCertificates: 'View Certificates',
    contactMe: 'Contact Me',
    
    // About Section
    aboutTitle: 'About Me',
    aboutSubtitle: 'Getting to know me',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    nameValue: 'Mohanad Abubaker Abdullah Abdelgalli',
    nationality: 'Nationality',
    nationalityValue: 'Sudan',
    age: 'Age',
    ageValue: '17 years old',
    dateOfBirth: 'Date of Birth',
    dobValue: '30/11/2008',
    
    // Education
    educationTitle: 'Education Journey',
    grade1to3: 'Grades 1-3: British Curriculum Schools – Sudan',
    grade4to8: 'Grades 4-8: Al-Qabas Private Schools – Sudan',
    grade9to10: 'Grades 9-10: Manarat Al Sharjah School – Sharjah, UAE',
    grade11: 'Grade 11 (Current): Manarat Al Sharjah School – Sharjah',
    
    // Skills & Interests
    skillsTitle: 'Skills & Interests',
    interests: 'Interests',
    interestsValue: 'Programming and Web Development',
    technicalSkills: 'Technical Skills',
    skillsValue: 'Beginner in Python and C++',
    
    // Certificates
    certificatesTitle: 'Achievements & Certificates',
    certificatesSubtitle: 'Recognition of my work and participation',
    cert1Title: 'First Place – Smart Green House',
    cert1Desc: 'Manarah School Innovation Competition',
    cert2Title: 'Second Place – Smart House',
    cert2Desc: 'Manarah School Innovation Competition',
    cert3Title: 'Second Place – Smart Green House',
    cert3Desc: 'Al Sho\'la Foundation Competition – 2024–2025 (Grades 9–10)',
    cert4Title: 'Certificate of Participation – AI & Python',
    cert4Desc: 'National Championship (AINC)',
    cert5Title: 'Certificate of Participation – Sustainability',
    cert5Desc: 'University of Fujairah Competition (UOF)',
    cert6Title: 'Certificate of Participation – Our Summer with Knowledge and Religion',
    cert6Desc: 'Islamic Affairs and Endowments Authority in Sharjah',
    cert7Title: 'Certificate of Participation – AI Debate',
    cert7Desc: 'Al Sho\'la School Ajman',
    cert8Title: 'UAE Coders Test – Easy Level',
    cert8Desc: 'Programming Proficiency Assessment',
    cert9Title: 'UAE Coders Test – Medium Level',
    cert9Desc: 'Programming Proficiency Assessment',
    cert10Title: 'Second Place – Industrial Engineering',
    cert10Desc: 'Rochester Institute of Technology (RIT) Competition',
    
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
    
    // Footer
    footerText: 'Made with ❤ by Mohanad',
  },
  ar: {
    // Navigation
    about: 'نبذة عني',
    skills: 'المهارات',
    timeline: 'رحلتي',
    projects: 'المشاريع',
    certificates: 'الشهادات',
    contact: 'التواصل',
    dashboard: 'لوحة التحكم',
    
    // Hero Section
    heroTitle: 'مرحباً، أنا مهند',
    heroSubtitle: 'شاب مهتم في البرمجة وتطوير المواقع',
    heroDescription: 'مطور عمره 17 سنة من السودان، أدرس حالياً في الإمارات.',
    viewCertificates: 'عرض الشهادات',
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
    
    // Education
    educationTitle: 'رحلة التعليم',
    grade1to3: 'الصفوف 1-3: مدارس التعليم البريطاني – السودان',
    grade4to8: 'الصفوف 4-8: مدارس القبس الخاصة – السودان',
    grade9to10: 'الصفوف 9-10: مدرسة منارة الشارقة – الإمارات',
    grade11: 'الصف 11 (حالياً): مدرسة منارة الشارقة',
    
    // Skills & Interests
    skillsTitle: 'المهارات والاهتمامات',
    interests: 'الاهتمامات',
    interestsValue: 'البرمجة وتطوير المواقع',
    technicalSkills: 'المهارات التقنية',
    skillsValue: 'مبتدئ في Python و C++',
    
    // Certificates
    certificatesTitle: 'الإنجازات والشهادات',
    certificatesSubtitle: 'تقدير لعملي ومشاركتي',
    cert1Title: 'المركز الأول – البيت الأخضر الذكي',
    cert1Desc: 'مسابقة الابتكار بمدرسة المنارة',
    cert2Title: 'المركز الثاني – البيت الذكي',
    cert2Desc: 'مسابقة الابتكار بمدرسة المنارة',
    cert3Title: 'المركز الثاني – البيت الأخضر الذكي',
    cert3Desc: 'مسابقة مؤسسة الشعلة (الصفوف 9-10)',
    cert4Title: 'شهادة مشاركة – الذكاء الاصطناعي وPython',
    cert4Desc: 'البطولة الوطنية (AINC)',
    cert5Title: 'شهادة مشاركة – الاستدامة',
    cert5Desc: 'مسابقة جامعة الفجيرة (UOF)',
    cert6Title: 'شهادة مشاركة – صيفنا علماً ودين',
    cert6Desc: 'هيئة الشؤون الإسلامية والأوقاف في الشارقة',
    cert7Title: 'شهادة مشاركة – مناظرة عن الذكاء الاصطناعي',
    cert7Desc: 'مدرسة الشعلة عجمان',
    cert8Title: 'اختبار UAE Coders – المستوى السهل',
    cert8Desc: 'تقييم كفاءة البرمجة',
    cert9Title: 'اختبار UAE Coders – المستوى المتوسط',
    cert9Desc: 'تقييم كفاءة البرمجة',
    cert10Title: 'المركز الثاني – الهندسة الصناعية',
    cert10Desc: 'مسابقة معهد روتشستر للتكنولوجيا (RIT)',
    
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
    
    // Footer
    footerText: 'صُنع بـ ❤ بواسطة مهند',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    document.dir = language === 'en' ? 'rtl' : 'ltr';
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
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
