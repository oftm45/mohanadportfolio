import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  Copy,
  Check,
  ExternalLink,
  Send,
  X
} from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { TextScrollTitle } from '@/components/ui/text-scroll-animation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
};

const cardVariantsRight = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
};

export const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const emails = [
    'MohanadAbubaker5@gmail.com'
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/mo_n5d',
      color: '',
      username: '@mo_n5d'
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
    } catch {
      toast({
        title: "Couldn't copy the email",
        description: `Please copy it manually: ${email}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <TextScrollTitle
              text={t('contactTitle')}
              gradient
              className="text-4xl md:text-5xl font-bold font-display"
            />
          </div>
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
          <Card className="glass glow-primary hover:glow-primary transition-smooth h-full">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-accent">
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
                        <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground font-mono text-sm md:text-base break-all">
                          {email}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(email)}
                        aria-label={copiedEmail === email ? 'Email copied' : 'Copy email address'}
                        title="Copy email address"
                        className="ml-3 rtl:mr-3 rtl:ml-0 hover:bg-primary/10 group-hover:scale-110 transition-spring"
                      >
                        {copiedEmail === email ? (
                          <Check className="w-4 h-4 text-accent" aria-label="Copied" />
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
            <Card className="glass glow-primary hover:glow-primary transition-smooth h-full">
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
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:glow-primary">
                          <social.icon className={`w-6 h-6 text-muted-foreground group-hover:text-accent transition-smooth ${social.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-accent transition-smooth">
                            {social.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {social.username}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-smooth" />
                    </a>
                  ))}
                  <a
                    href="https://www.linkedin.com/in/mohanadabubakerabdallh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Mohanad Abubaker's LinkedIn profile in a new tab"
                    className="group flex items-center justify-between gap-4 rounded-lg border border-primary/70 bg-primary/15 p-4 transition-smooth hover:scale-105 hover:border-accent hover:bg-primary/25 hover:shadow-[0_0_30px_hsl(var(--primary)/0.45)]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Linkedin className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">Connect on LinkedIn</p>
                        <p className="truncate text-sm text-muted-foreground">Mohanad Abubaker</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-smooth group-hover:text-accent" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Direct contact form – opens from a button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto mt-12"
        >
          {!formOpen && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setFormOpen(true)}
                aria-expanded={formOpen}
                aria-controls="contact-form-panel"
                className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-[0_0_30px_hsl(var(--primary)/0.55)] transition-smooth"
              >
                <Send className="mr-2 h-5 w-5" /> Send me a message
              </Button>
            </div>
          )}

          <AnimatePresence initial={false}>
            {formOpen && (
              <motion.div
                id="contact-form-panel"
                key="contact-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <Card className="glass glow-primary transition-smooth">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold flex items-center text-accent">
                        <Send className="w-6 h-6 mr-3" />
                        Send a message
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setFormOpen(false)}
                        aria-label="Close the message form"
                        className="h-10 w-10 shrink-0 hover:bg-primary/15"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-6">Write to me directly from here — no need to leave the site.</p>
                    <ContactForm />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-secondary/20 blur-3xl opacity-50 float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl opacity-50 float" style={{ animationDelay: '1s' }} />
    </section>
  );
};