import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  Copy,
  ExternalLink 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const emails = [
    'MohanadAbubaker1@gmail.com',
    'Mohanadabubaker5@gmail.com'
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/mo_n5d?igsh=MXM3d2xtajlvMHBscw==',
      color: 'hover:text-pink-500',
      username: '@mo_n5d'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/mohanadabubakerabdallh',
      color: 'hover:text-blue-500',
      username: 'Mohanad Abubaker'
    }
  ];

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      toast({
        title: t('emailCopied'),
        description: email,
      });
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
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
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('contactSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Email Section */}
          <motion.div variants={cardVariants}>
          <Card className="glass glow-blue hover:glow-green transition-smooth h-full">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                <Mail className="w-6 h-6 mr-3" />
                {t('emailTitle')}
              </h3>
              <div className="space-y-4">
                {emails.map((email, index) => (
                  <div 
                    key={index} 
                    className="glass p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-smooth group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
                        <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground font-mono text-sm md:text-base break-all">
                          {email}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(email)}
                        className="ml-3 rtl:mr-3 rtl:ml-0 hover:bg-primary/10 group-hover:scale-110 transition-spring"
                      >
                        {copiedEmail === email ? (
                          <span className="text-green-500 text-xs">✓</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={cardVariantsRight}>
          <Card className="glass glow-purple hover:glow-blue transition-smooth h-full">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-accent">
                <ExternalLink className="w-6 h-6 mr-3" />
                {t('socialTitle')}
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-smooth group flex items-center justify-between hover:scale-105"
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:glow-blue">
                        <social.icon className={`w-6 h-6 text-muted-foreground group-hover:text-primary transition-smooth ${social.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                          {social.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </motion.div>
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="glass glow-green max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                Let's Build Something Amazing Together!
              </h3>
              <p className="text-muted-foreground mb-6">
                Whether you want to collaborate on a project, discuss technology, or just say hello, 
                I'd love to hear from you. Feel free to reach out through any of the channels above.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {emails.map((email, index) => (
                  <Button
                    key={index}
                    onClick={() => window.open(`mailto:${email}`, '_blank')}
                    className="gradient-primary hover:scale-105 transition-spring"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-secondary/20 blur-3xl opacity-50 float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl opacity-50 float" style={{ animationDelay: '1s' }} />
    </section>
  );
};