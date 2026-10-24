import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Calendar, GraduationCap, Code, Heart, Award, ExternalLink } from 'lucide-react';

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
    { icon: Award, label: t('role'), value: t('roleValue') },
    { icon: Award, label: t('role2'), value: t('role2Value') },
  ];


  const educationSteps = [
    { text: t('grade1to3') },
    { text: t('grade9to10') },
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
          className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-6xl mx-auto"
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

          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
          <Card className="glass glow-primary hover:glow-primary transition-smooth">
            <CardContent className="p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center break-words text-secondary">
                <GraduationCap className="w-6 h-6 mr-3" />
                {t('educationTitle')}
              </h3>
              <div className="space-y-6">
                {educationSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary glow-primary mt-2" />
                      <div className="flex-1 min-w-0">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 sm:p-4">
                          <p className="text-foreground text-sm sm:text-base break-words leading-relaxed">{step.text}</p>
                        </div>
                      </div>
                    </div>
                    {/* Timeline line */}
                    {index < educationSteps.length - 1 && (
                      <div className="absolute left-2 rtl:right-2 top-6 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
                    )}
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
