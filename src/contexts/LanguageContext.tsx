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
    heroTitle: "Hi, I'm Mohanad — IoT Developer & Web Enthusiast",
    heroSubtitle: 'Programming & Web Development Enthusiast',
    heroDescription: '17-year-old developer from Sudan, currently studying in UAE. Official ICSC Ambassador, passionate about creating innovative solutions through code.',
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
    role: 'Role',
    roleValue: 'ICSC Ambassador',
    role2: 'Role',
    role2Value: 'Student – Team Sudan, FIRST Global Challenge (FGC)',

    
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
    cert11Title: 'Certificate of Participation – Safe AI Cup 2026',
    cert11Desc: 'Generative AI in Education – University of Dubai',
    cert12Title: 'Introduction to Critical Infrastructure Protection',
    cert12Desc: 'OPSWAT Academy – ICIP Program',
    cert13Title: 'Claude Code in Action',
    cert13Desc: 'Anthropic – Certificate of Completion',
    cert14Title: 'Claude Code 101',
    cert14Desc: 'Anthropic – Certificate of Completion',
    cert15Title: 'Claude 101',
    cert15Desc: 'Anthropic – Certificate of Completion',
    cert16Title: 'Oratory & Diction Course',
    cert16Desc: 'M3aarf Platform – Yasmine El Baz',
    
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
    ambassadorDesc: 'Proud to serve as an official Ambassador for the International Coding & Sustainability Competition (ICSC).',
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
    certificates: 'الشهادات',
    contact: 'التواصل',
    dashboard: 'لوحة التحكم',
    
    // Hero Section
    heroTitle: 'مرحباً، أنا مهند — مطور إنترنت الأشياء والويب',
    heroSubtitle: 'شاب مهتم في البرمجة وتطوير المواقع',
    heroDescription: 'مطور عمره 17 سنة من السودان، أدرس حالياً في الإمارات. سفير رسمي لمسابقة ICSC الدولية.',
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
    role: 'الصفة',
    roleValue: 'سفير ICSC',
    role2: 'الصفة',
    role2Value: 'طالب – فريق السودان في تحدي فيرست العالمي (FGC)',

    
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
    cert11Title: 'شهادة مشاركة – كأس الذكاء الاصطناعي الآمن 2026',
    cert11Desc: 'الذكاء الاصطناعي التوليدي في التعليم – جامعة دبي',
    cert12Title: 'مقدمة في حماية البنية التحتية الحيوية',
    cert12Desc: 'أكاديمية OPSWAT – برنامج ICIP',
    cert13Title: 'Claude Code in Action',
    cert13Desc: 'Anthropic – شهادة إتمام',
    cert14Title: 'Claude Code 101',
    cert14Desc: 'Anthropic – شهادة إتمام',
    cert15Title: 'Claude 101',
    cert15Desc: 'Anthropic – شهادة إتمام',
    cert16Title: 'دورة فن الإلقاء والخطابة',
    cert16Desc: 'منصة معارف – ياسمين الباز',
    
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
