import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Trophy, Medal, Award, Brain, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import safeAiCup from '@/assets/certificates/safe-ai-cup.pdf.asset.json';
import opswatIcip from '@/assets/certificates/opswat-icip.png.asset.json';
import claudeCodeInAction from '@/assets/certificates/claude-code-in-action.pdf.asset.json';
import claudeCode101 from '@/assets/certificates/claude-code-101.pdf.asset.json';
import claude101 from '@/assets/certificates/claude-101.pdf.asset.json';
import m3aarfOratory from '@/assets/certificates/m3aarf-oratory.pdf.asset.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
};

export const CertificatesSection = () => {
  const { t } = useLanguage();

  const certificates = [
    {
      id: 1,
      icon: Trophy,
      title: t('cert1Title'),
      description: t('cert1Desc'),
      type: 'First Place',
      color: 'text-yellow-400',
      glowClass: 'glow-green',
      badgeVariant: 'default' as const,
      viewUrl: 'https://drive.google.com/file/d/1BiWR9PUsAsu4mKekye4PJ_VU_hhHmkDS/view',
    },
    {
      id: 2,
      icon: Medal,
      title: t('cert2Title'),
      description: t('cert2Desc'),
      type: 'Second Place',
      color: 'text-gray-300',
      glowClass: 'glow-blue',
      badgeVariant: 'secondary' as const,
      viewUrl: 'https://drive.google.com/file/d/1mOo9XWMlqcRNzMjFwfNtQqeSA-3yLy0q/view',
    },
    {
      id: 3,
      icon: Medal,
      title: t('cert3Title'),
      description: t('cert3Desc'),
      type: 'Second Place',
      color: 'text-gray-300',
      glowClass: 'glow-purple',
      badgeVariant: 'secondary' as const,
      viewUrl: 'https://drive.google.com/file/d/1hgb9adSt9lJWip5OQxi0hzoAMTi45ytm/view',
    },
    {
      id: 4,
      icon: Medal,
      title: t('cert10Title'),
      description: t('cert10Desc'),
      type: 'Second Place',
      color: 'text-gray-300',
      glowClass: 'glow-blue',
      badgeVariant: 'secondary' as const,
      viewUrl: 'https://drive.google.com/file/d/1QNV5vjMaDdr64kYB1nbr0LTImneWC-fS/view',
    },
    {
      id: 5,
      icon: Brain,
      title: t('cert4Title'),
      description: t('cert4Desc'),
      type: 'Participation',
      color: 'text-blue-400',
      glowClass: 'glow-blue',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/16xnBRyFA6mLphH5rCaHnLlTp06FbfOLw/view',
    },
    {
      id: 6,
      icon: Leaf,
      title: t('cert5Title'),
      description: t('cert5Desc'),
      type: 'Participation',
      color: 'text-green-400',
      glowClass: 'glow-green',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/1pnoDNdwgasz3i4SC2KYwy-sA8gyQmH0L/view',
    },
    {
      id: 7,
      icon: Award,
      title: t('cert6Title'),
      description: t('cert6Desc'),
      type: 'Participation',
      color: 'text-purple-400',
      glowClass: 'glow-purple',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/15KwPZ1XB19V_TFnvyxj9Tx6Z8GO0ZWky/view',
    },
    {
      id: 8,
      icon: Brain,
      title: t('cert7Title'),
      description: t('cert7Desc'),
      type: 'Participation',
      color: 'text-cyan-400',
      glowClass: 'glow-blue',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/1aiA_xzXtqXP_HWj_imxBSTu1FiS-JqEO/view',
    },
    {
      id: 9,
      icon: Brain,
      title: t('cert8Title'),
      description: t('cert8Desc'),
      type: 'Participation',
      color: 'text-indigo-400',
      glowClass: 'glow-purple',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/1FxjKxeHCUM-B_l_QkPhqWPWAse1uBkFX/view',
    },
    {
      id: 10,
      icon: Brain,
      title: t('cert9Title'),
      description: t('cert9Desc'),
      type: 'Participation',
      color: 'text-violet-400',
      glowClass: 'glow-purple',
      badgeVariant: 'outline' as const,
      viewUrl: 'https://drive.google.com/file/d/1vO76G25cwioRII4Zoiwx91fKm7Y4ky6m/view',
    },
    {
      id: 11,
      icon: Brain,
      title: t('cert11Title'),
      description: t('cert11Desc'),
      type: 'Participation',
      color: 'text-blue-400',
      glowClass: 'glow-blue',
      badgeVariant: 'outline' as const,
      viewUrl: safeAiCup.url,
    },
    {
      id: 12,
      icon: Award,
      title: t('cert12Title'),
      description: t('cert12Desc'),
      type: 'Course',
      color: 'text-cyan-400',
      glowClass: 'glow-blue',
      badgeVariant: 'outline' as const,
      viewUrl: opswatIcip.url,
    },
    {
      id: 13,
      icon: Brain,
      title: t('cert13Title'),
      description: t('cert13Desc'),
      type: 'Course',
      color: 'text-green-400',
      glowClass: 'glow-green',
      badgeVariant: 'outline' as const,
      viewUrl: claudeCodeInAction.url,
    },
    {
      id: 14,
      icon: Brain,
      title: t('cert14Title'),
      description: t('cert14Desc'),
      type: 'Course',
      color: 'text-green-400',
      glowClass: 'glow-green',
      badgeVariant: 'outline' as const,
      viewUrl: claudeCode101.url,
    },
    {
      id: 15,
      icon: Brain,
      title: t('cert15Title'),
      description: t('cert15Desc'),
      type: 'Course',
      color: 'text-green-400',
      glowClass: 'glow-green',
      badgeVariant: 'outline' as const,
      viewUrl: claude101.url,
    },
    {
      id: 16,
      icon: Award,
      title: t('cert16Title'),
      description: t('cert16Desc'),
      type: 'Course',
      color: 'text-purple-400',
      glowClass: 'glow-purple',
      badgeVariant: 'outline' as const,
      viewUrl: m3aarfOratory.url,
    },
  ];

  return (
    <section id="certificates" className="py-20 relative">
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
            {t('certificatesTitle')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('certificatesSubtitle')}
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={cardVariants}>
            <Card 
              className={`glass hover:${cert.glowClass} transition-smooth group cursor-pointer transform hover:scale-105 h-full`}
            >
               <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full glass ${cert.glowClass} flex items-center justify-center group-hover:rotate-12 transition-spring`}>
                    <cert.icon className={`w-8 h-8 ${cert.color}`} />
                  </div>
                </div>

                {/* Badge */}
                <Badge variant={cert.badgeVariant} className="mb-4">
                  {cert.type}
                </Badge>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Action Button */}
                <div className="flex justify-center">
                  <InteractiveHoverButton
                    text={t('viewButton')}
                    onClick={() => window.open(cert.viewUrl, '_blank')}
                    className="w-28 border-primary/30"
                  />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-smooth pointer-events-none" />
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">4</div>
            <p className="text-sm text-muted-foreground">First & Second Places</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">4</div>
            <p className="text-sm text-muted-foreground">Participation Certificates</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">2</div>
            <p className="text-sm text-muted-foreground">Test Certificates</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">10</div>
            <p className="text-sm text-muted-foreground">Total Certificates</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl opacity-50 float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl opacity-50 float" style={{ animationDelay: '3s' }} />
    </section>
  );
};
