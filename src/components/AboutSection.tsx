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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const AboutSection = () => {
  const { t } = useLanguage();

  const personalInfo = [
    { icon: User, label: t('fullName'), value: t('nameValue') },
    { icon: MapPin, label: t('nationality'), value: t('nationalityValue') },
    { icon: Calendar, label: t('age'), value: t('ageValue') },
    { icon: Calendar, label: t('dateOfBirth'), value: t('dobValue') },
    { icon: Award, label: t('role'), value: t('roleValue') },
    { icon: Award, label: t('role2'), value: t('role2Value') },
  ];


  const educationSteps = [
    { text: t('grade1to3') },
    { text: t('grade4to8') },
    { text: t('grade9to10') },
    { text: t('grade11') },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Personal Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="glass glow-blue hover:glow-green transition-smooth">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                  <User className="w-6 h-6 mr-3" />
                  {t('personalInfo')}
                </h3>
                <div className="space-y-4">
                  {personalInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                      <info.icon className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{info.label}:</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card className="glass glow-purple hover:glow-blue transition-smooth">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-accent">
                  <Heart className="w-6 h-6 mr-3" />
                  {t('skillsTitle')}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <Heart className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{t('interests')}:</p>
                      <p className="text-muted-foreground">{t('interestsValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <Code className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{t('skills')}:</p>
                      <p className="text-muted-foreground">{t('skillsValue')}</p>
                    </div>
                  </div>
                </div>
            </CardContent>
            </Card>

            {/* ICSC Ambassador */}
            <Card className="glass glow-blue hover:glow-purple transition-smooth border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-primary">
                  <Award className="w-6 h-6 mr-3" />
                  {t('ambassadorTitle')}
                </h3>
                <p className="text-muted-foreground mb-5">{t('ambassadorDesc')}</p>
                <a
                  href="https://icscompetition.org/en/mabubaker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-smooth font-medium"
                >
                  {t('ambassadorCta')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>


          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
          <Card className="glass glow-green hover:glow-purple transition-smooth">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-secondary">
                <GraduationCap className="w-6 h-6 mr-3" />
                {t('educationTitle')}
              </h3>
              <div className="space-y-6">
                {educationSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary glow-blue mt-2" />
                      <div className="flex-1">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                          <p className="text-foreground">{step.text}</p>
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
