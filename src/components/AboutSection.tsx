import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Calendar, Award } from 'lucide-react';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
};

export const AboutSection = () => {
  const { t } = useLanguage();

  const personalInfo = [
    { icon: User, label: t('fullName'), value: t('nameValue') },
    { icon: MapPin, label: t('nationality'), value: t('nationalityValue') },
    { icon: Calendar, label: t('age'), value: t('ageValue') },
    // { icon: Calendar, label: t('dateOfBirth'), value: t('dobValue') },
    { icon: Award, label: 'Current Status', value: 'Grade 12 ADV Student' },
    { icon: Award, label: t('role'), value: t('roleValue') },
    { icon: Award, label: t('role2'), value: t('role2Value') },
  ];


  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('aboutSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          {/* Personal Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="glass glow-primary hover:glow-primary transition-smooth">
              <CardContent className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center break-words text-primary">
                  <User className="w-6 h-6 mr-3" />
                  {t('personalInfo')}
                </h3>
                <div className="space-y-4">
                  {personalInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <info.icon className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{info.label}:</p>
                        <p className="text-muted-foreground break-words leading-relaxed">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


          </motion.div>

        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-accent/20 blur-2xl opacity-50 float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-secondary/20 blur-2xl opacity-50 float" style={{ animationDelay: '2s' }} />
    </section>
  );
};
