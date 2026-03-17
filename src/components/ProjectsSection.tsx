import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Home, Leaf, Shield, Cpu, Wifi, Zap, CheckCircle2, Clock, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectsSection = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      icon: Home,
      title: language === 'ar' ? 'البيت الذكي' : 'Smart Home',
      subtitle: 'Smart Home System',
      description: language === 'ar' 
        ? 'هو نظام يعتمد على تقنية إنترنت الأشياء (IoT)، حيث يتم ربط جميع أجهزة المنزل (الإضاءة، التكييف، الأجهزة الكهربائية، أنظمة الأمان) بشبكة واحدة يمكن التحكم بها عن بُعد عبر الهاتف الذكي أو الأوامر الصوتية.'
        : 'A system based on Internet of Things (IoT) technology, where all home devices (lighting, air conditioning, electrical appliances, security systems) are connected to a single network that can be controlled remotely via smartphone or voice commands.',
      fullDescription: language === 'ar'
        ? 'نظام البيت الذكي هو حل متكامل يعتمد على تقنية إنترنت الأشياء (IoT) لتحويل المنزل التقليدي إلى منزل ذكي ومتصل. يتيح النظام التحكم الكامل في جميع أجهزة المنزل من خلال تطبيق موحد على الهاتف الذكي أو عبر الأوامر الصوتية.'
        : 'The Smart Home system is an integrated solution based on IoT technology to transform a traditional home into a smart, connected home. The system allows complete control of all home devices through a unified smartphone app or voice commands.',
      features: language === 'ar' 
        ? ['التحكم بالإضاءة عن بُعد', 'إدارة التكييف والتدفئة', 'نظام أمان متكامل', 'التحكم الصوتي', 'جدولة الأجهزة', 'مراقبة استهلاك الطاقة']
        : ['Remote lighting control', 'AC & heating management', 'Integrated security system', 'Voice control', 'Device scheduling', 'Energy consumption monitoring'],
      technologies: ['Arduino', 'Gas Sensor', 'Motion Sensor', 'Servo Motors', 'Buttons', 'LCD Screen', 'Morse Code Security'],
      tags: ['IoT', 'Automation', 'Smart Living'],
      status: 'completed',
      glowClass: 'glow-blue',
      color: 'text-blue-400',
    },
    {
      id: 2,
      icon: Leaf,
      title: language === 'ar' ? 'البيت المحمي الذكي' : 'Smart Greenhouse',
      subtitle: 'Smart Green Houses',
      description: language === 'ar'
        ? 'تطوير مبتكر لفكرة البيوت المحمية التقليدية. يهدف إلى تعزيز كفاءة الزراعة وتقليل الجهد البشري من خلال دمج التكنولوجيا الحديثة مع تقنيات الزراعة المستدامة. نظام ذكي ومتكامل يعتمد على الأتمتة والطاقة المتجددة.'
        : 'An innovative development of the traditional greenhouse concept. By integrating modern technology with sustainable agricultural techniques, it aims to enhance agricultural efficiency and reduce human effort. A smart, integrated system that relies on automation and renewable energy.',
      fullDescription: language === 'ar'
        ? 'مشروع البيت المحمي الذكي هو تطوير مبتكر للبيوت المحمية التقليدية، يهدف إلى تحقيق الاكتفاء الزراعي من خلال نظام آلي بالكامل يعمل بالطاقة الشمسية. يوفر بيئة مثالية لنمو النباتات مع تقليل الحاجة للتدخل البشري.'
        : 'The Smart Greenhouse project is an innovative development of traditional greenhouses, aiming to achieve agricultural self-sufficiency through a fully automated solar-powered system. It provides an ideal environment for plant growth while minimizing the need for human intervention.',
      features: language === 'ar'
        ? ['ري آلي ذكي', 'مراقبة درجة الحرارة والرطوبة', 'تهوية أوتوماتيكية', 'طاقة شمسية', 'تطبيق مراقبة', 'تنبيهات فورية']
        : ['Smart automatic irrigation', 'Temperature & humidity monitoring', 'Automatic ventilation', 'Solar power', 'Monitoring app', 'Instant alerts'],
      technologies: ['DHT22', 'Solar Panel', 'Solar Charge Controller', 'ESP32', 'Soil Moisture Sensor', 'UV LED', 'Water Pump', 'Motion Sensor'],
      tags: ['Agriculture', 'Sustainability', 'Renewable Energy'],
      status: 'completed',
      glowClass: 'glow-green',
      color: 'text-green-400',
    },
    {
      id: 3,
      icon: Shield,
      title: 'Agri-Shield 4.0',
      subtitle: language === 'ar' ? 'المشروع الحالي' : 'Current Project',
      description: language === 'ar'
        ? 'إنشاء نظام إدارة وحماية ذكي يعتمد كلياً على الطاقة المتجددة. يقوم النظام بمراقبة المناخ الداخلي للمخزن وتأمينه أمنياً، مع ربط كافة البيانات بتطبيق هاتف محمول عبر إنترنت الأشياء. يتميز المشروع بتقسيم المهام بين متحكمين لضمان عدم توقف النظام (Zero-Downtime).'
        : 'Creating a smart management and protection system powered entirely by renewable energy. The system monitors the warehouse\'s internal climate and ensures its security, while linking all data to a mobile application via IoT. Features task division between controllers to guarantee zero-downtime operation.',
      fullDescription: language === 'ar'
        ? 'مشروع Agri-Shield 4.0 هو نظام متقدم لإدارة وحماية المخازن الزراعية. يعمل بالكامل على الطاقة المتجددة ويوفر مراقبة شاملة للمناخ الداخلي مع نظام أمان متكامل. يتميز بتقنية Zero-Downtime التي تضمن استمرارية العمل دون انقطاع.'
        : 'Agri-Shield 4.0 is an advanced system for managing and protecting agricultural warehouses. It runs entirely on renewable energy and provides comprehensive internal climate monitoring with an integrated security system. It features Zero-Downtime technology that ensures continuous operation without interruption.',
      features: language === 'ar'
        ? ['مراقبة المناخ الداخلي', 'نظام أمان متكامل', 'طاقة متجددة 100%', 'تطبيق هاتف محمول', 'Zero-Downtime', 'تقسيم المهام بين متحكمين']
        : ['Internal climate monitoring', 'Integrated security system', '100% renewable energy', 'Mobile application', 'Zero-Downtime', 'Dual controller task division'],
      technologies: ['ESP32', 'Arduino', 'DHT22', 'Buzzer', 'LED Light', 'Gas Sensor', 'Fan'],
      tags: ['IoT', 'Security', 'Zero-Downtime'],
      status: 'in-progress',
      glowClass: 'glow-purple',
      color: 'text-purple-400',
    },
  ];

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 glass border-primary/30">
            <Cpu className="w-3 h-3 mr-1" />
            {language === 'ar' ? 'المشاريع' : 'Projects'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              {language === 'ar' ? 'مشاريعي التقنية' : 'My Technical Projects'}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'مجموعة من المشاريع المبتكرة في مجال إنترنت الأشياء والأتمتة الذكية'
              : 'A collection of innovative projects in IoT and smart automation'}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`group relative overflow-hidden glass hover-shine border-primary/20 hover:border-primary/40 transition-all duration-500 h-full ${project.glowClass}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl glass ${project.color} bg-current/10`}>
                      <project.icon className={`w-6 h-6 ${project.color}`} />
                    </div>
                    <Badge 
                      variant={project.status === 'in-progress' ? 'default' : 'secondary'}
                      className={project.status === 'in-progress' ? 'bg-primary/20 text-primary animate-pulse' : ''}
                    >
                      {project.status === 'in-progress' 
                        ? (language === 'ar' ? 'قيد التنفيذ' : 'In Progress')
                        : (language === 'ar' ? 'مكتمل' : 'Completed')}
                    </Badge>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-sm ${project.color} mb-3`}>{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full glass border border-primary/20 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="flex justify-center mt-auto pt-4">
                    <InteractiveHoverButton
                      text={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      onClick={() => setSelectedProject(project.id)}
                      className="w-32 border-primary/30"
                    />
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">2</div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'مشاريع مكتملة' : 'Completed Projects'}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">1</div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">3</div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl glass border-primary/30 max-h-[90vh] overflow-y-auto">
          {selectedProjectData && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-3 rounded-xl glass ${selectedProjectData.color} bg-current/10`}>
                    <selectedProjectData.icon className={`w-8 h-8 ${selectedProjectData.color}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">
                      {selectedProjectData.title}
                    </DialogTitle>
                    <p className={`text-sm ${selectedProjectData.color}`}>
                      {selectedProjectData.subtitle}
                    </p>
                  </div>
                  <Badge 
                    variant={selectedProjectData.status === 'in-progress' ? 'default' : 'secondary'}
                    className={`${language === 'ar' ? 'mr-auto' : 'ml-auto'} ${selectedProjectData.status === 'in-progress' ? 'bg-primary/20 text-primary' : ''}`}
                  >
                    {selectedProjectData.status === 'in-progress' 
                      ? (language === 'ar' ? 'قيد التنفيذ' : 'In Progress')
                      : (language === 'ar' ? 'مكتمل' : 'Completed')}
                  </Badge>
                </div>
                <DialogDescription className="text-muted-foreground leading-relaxed pt-4">
                  {selectedProjectData.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Features */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    {language === 'ar' ? 'المميزات' : 'Features'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProjectData.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="glass border-primary/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Cpu className="w-5 h-5 text-primary" />
                    {language === 'ar' ? 'التصنيفات' : 'Categories'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-sm px-3 py-1 rounded-full glass border border-primary/20 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Info */}
                <div className="flex items-center gap-2 pt-4 border-t border-primary/20">
                  {selectedProjectData.status === 'in-progress' ? (
                    <>
                      <Clock className="w-5 h-5 text-primary animate-pulse" />
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'هذا المشروع قيد التطوير حالياً' : 'This project is currently under development'}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'تم إنجاز هذا المشروع بنجاح' : 'This project has been completed successfully'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
