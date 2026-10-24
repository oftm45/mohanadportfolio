import agriShieldPrototype from '@/assets/agri-shield-prototype.webp';

import siloModel from '@/assets/models/agri-shield-silo.glb.asset.json';
import robotModel from '@/assets/models/team-sudan-robot.glb.asset.json';

// Built by scripts/models/build-models.ts
const SILO_MODEL_URL = siloModel.url;
const ROBOT_MODEL_URL = robotModel.url;

export type ProjectSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  /** Short text for the card on the home page. */
  desc: string;
  tags: string[];
  link?: { label: string; url: string };
  /** Page title and description used for search results and link previews. */
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  status: string;
  team?: string;
  intro: string;
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  /** Interactive 3D model (.glb) shown on the project page. */
  model?: {
    url: string;
    title: string;
    caption: string;
    downloadName: string;
    motion?: 'fan' | 'lift' | 'none';
    camera?: [number, number, number];
    target?: [number, number, number];
  };
  sections: ProjectSection[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'agri-shield',
    title: 'Agri-Shield 4.0',
    subtitle: 'Smart, solar-powered grain silo',
    desc: 'An ESP32 IoT system that turns traditional grain silos into smart, off-grid units. It watches temperature, humidity and fermentation gases, switches on ventilation automatically, sounds an alarm and floodlight on intrusion, and gives farmers remote monitoring — all running on solar power to cut post-harvest losses.',
    tags: ['ESP32', 'IoT', 'Solar Energy', 'DHT22', 'MQ-135', 'PIR', 'Food Security'],
    link: { label: 'Live Demo', url: 'https://agri-shield4.lovable.app/' },
    metaTitle: 'Agri-Shield 4.0: Solar ESP32 IoT Smart Grain Silo | Mohanad Abubaker',
    metaDescription:
      'Agri-Shield 4.0 is a solar-powered ESP32 IoT system that protects grain silos: it monitors temperature, humidity and gases, ventilates automatically and alerts farmers to intruders.',
    keywords: 'esp32 iot project, smart silo, grain storage, post-harvest loss, solar iot, food security',
    status: 'Working prototype with a live demo',
    intro:
      'Post-harvest loss is one of the biggest threats to food security: millions of tonnes of grain are lost every year to poor storage and weak monitoring. Agri-Shield 4.0 is a "smart guard" that turns a traditional silo into a connected, self-protecting unit. It reads the climate and gases inside, ventilates on its own, protects the store against theft and lets farmers watch everything remotely — running entirely on solar power.',
    image: {
      src: agriShieldPrototype,
      alt: 'Agri-Shield 4.0 prototype: model silo, solar panel, charge controller, relays, breadboard and ESP32 wired together',
      caption: 'The working prototype: solar panel, charge controller, model silo with fan, relays, sensors and the ESP32.',
      width: 858,
      height: 1085,
    },
    model: {
      url: SILO_MODEL_URL,
      title: 'Agri-Shield 4.0 prototype',
      caption:
        '3D model of the Agri-Shield 4.0 prototype as built: model silo, fan unit, solar panel, charge controller, relays, breadboards with the ESP32, buzzer box and PIR sensor.',
      downloadName: 'agri-shield-silo.glb',
      motion: 'fan',
      camera: [2.6, 3.4, 3.8],
      target: [0, 0.25, 0],
    },
    sections: [
      {
        heading: 'What it does',
        bullets: [
          'Watches temperature and humidity to stop grain from spoiling or self-heating.',
          'Detects fermentation gases (such as CO₂) and early smoke before they become a fire.',
          'Switches on ventilation automatically as soon as safe levels are crossed.',
          'Sounds an alarm and turns on a floodlight when someone breaks in.',
          'Runs fully off-grid on solar power, so it works on remote farms.',
          'Sends readings and alerts to the farmer’s phone.',
        ],
      },
      {
        heading: 'Sensors and controls',
        paragraphs: ['An ESP32-WROOM board is the connected "brain" that links every part together.'],
        bullets: [
          'DHT22 — temperature and humidity inside the silo.',
          'MQ-135 — fermentation gases and early smoke.',
          'PIR motion sensor — security radar for intruders.',
          'LDR light sensor — tells day from night to save power on lighting.',
          'Relay module — lets the 3.3 V ESP32 safely switch the 12 V fan and floodlight.',
          '12 V fan, 12 V emergency light and buzzer — ventilation, deterrence and a local alarm.',
          'Solar panel and charge controller — power the system and protect the battery.',
        ],
      },
      {
        heading: 'Wiring',
        table: {
          head: ['Part', 'ESP32 pin', 'Job'],
          rows: [
            ['DHT22', 'GPIO 4', 'Temperature and humidity (digital)'],
            ['PIR sensor', 'GPIO 13', 'Motion detection (input)'],
            ['MQ-135 gas sensor', 'GPIO 34', 'Gas level (analog)'],
            ['LDR', 'GPIO 35', 'Light level (analog)'],
            ['Fan relay', 'GPIO 12', 'Ventilation fan (output)'],
            ['Light relay', 'GPIO 14', 'Floodlight (output)'],
            ['Buzzer', 'GPIO 27', 'Alarm (output)'],
          ],
        },
      },
      {
        heading: 'Farmer dashboard',
        paragraphs: ['The demo version uses the Blynk IoT app, which gives the farmer:'],
        bullets: [
          'Live gauges for temperature, humidity and air quality.',
          'Buttons to run the fan and the light by hand.',
          'Phone notifications the moment motion or an environmental risk is detected.',
        ],
      },
      {
        heading: 'Compared with a traditional silo',
        table: {
          head: ['', 'Traditional silo', 'Agri-Shield 4.0'],
          rows: [
            ['Monitoring', 'Manual and occasional', 'Automatic, 24/7 over IoT'],
            ['Response to danger', 'Slow — damage is found after it happens', 'Instant — fan and alarm start on their own'],
            ['Energy', 'Grid or diesel, costly', 'Free solar power'],
            ['Security', 'Mechanical locks and guards', 'Motion radar with phone alerts'],
          ],
        },
      },
      {
        heading: 'What comes next',
        bullets: [
          'AI and machine learning that predict mould or rot from past readings before it starts.',
          'Smart cameras that record intruders and upload photos to the cloud.',
          'Load cells to measure how much grain is stored, plus direct grain-moisture sensors.',
          'A touch screen on the silo for local control.',
          'A dedicated app and server (instead of Blynk) to manage thousands of silos and many users.',
        ],
      },
    ],
  },
  {
    slug: 'afaq',
    title: 'AFAQ',
    subtitle: 'AI learning platform for the UAE & Arab curriculum',
    desc: 'An AI education system built around the UAE and Arab school curriculum: a knowledge base of textbook content, a student assistant that explains lessons and spots weak points, a smart quiz generator, automatic lesson and exam scheduling, reminders, and dashboards for teachers and parents.',
    tags: ['Claude AI', 'Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Adaptive Learning'],
    metaTitle: 'AFAQ: AI Learning Platform for the UAE Curriculum | Mohanad Abubaker',
    metaDescription:
      'AFAQ is an AI education platform built around the UAE and Arab school curriculum, with a student assistant, smart quiz generator, adaptive learning paths and dashboards for teachers and parents.',
    keywords: 'ai education, uae curriculum, adaptive learning, ai tutor, quiz generator, edtech',
    status: 'Platform design and planning',
    intro:
      'AFAQ is an AI learning system designed around the UAE and Arab school curriculum. It brings six parts together: a knowledge base of every textbook and exercise, a student assistant that explains lessons and finds weak points, a smart test generator, automatic scheduling, reminders, and dashboards for teachers and parents.',
    sections: [
      {
        heading: 'The six parts of AFAQ',
        bullets: [
          'Knowledge base — all textbook content and exercises, explained in the style of the official curriculum.',
          'Student assistant — students ask questions, get simple explanations and an instant diagnosis of their weak points.',
          'Smart test generator — quizzes and exams at different difficulty levels for each student and subject.',
          'Smart scheduling — lessons and exams arranged automatically around weather, region and school events.',
          'Follow-up — instant alerts and reminders for important dates.',
          'Dashboards — for teachers, plus an app for parents, with analytics that track progress.',
        ],
      },
      {
        heading: 'How students learn',
        bullets: [
          'Arabic, English and other languages, covering every curriculum book.',
          'Adaptive learning paths that speed up strong students and give more support where it is needed.',
          'Teacher-style explanations from the AI, available any time.',
          'Spaced repetition, based on memory research, so lessons stick long-term.',
        ],
      },
      {
        heading: 'Tests and feedback',
        bullets: [
          'AI-generated exams and quizzes with consistent difficulty; teachers can adjust the level for their class.',
          'Automatic grading with instant feedback on common mistakes and topics to review.',
          'Weak-spot detection that predicts which topics a student may struggle with next.',
        ],
      },
      {
        heading: 'For teachers and parents',
        bullets: [
          'Live progress charts for every student.',
          'Class dashboards that show who needs help now and who is ready for a challenge.',
          'Instant notifications to parents for new results or a drop in performance.',
          'Predictive analytics that flag risk early so teachers can step in.',
        ],
      },
      {
        heading: 'Technology',
        table: {
          head: ['Layer', 'Tools'],
          rows: [
            ['AI engine', 'Claude (Anthropic) for understanding the curriculum and explaining it simply'],
            ['Server', 'Python with FastAPI, REST and GraphQL'],
            ['Data', 'PostgreSQL, with Redis for speed'],
            ['Web and mobile', 'React and TypeScript; React Native app'],
            ['Live updates', 'WebSockets'],
            ['Hosting', 'Cloud (AWS or Azure) with Docker, Kubernetes, load balancing and a CDN'],
          ],
        },
      },
      {
        heading: 'Security and rollout',
        paragraphs: [
          'The platform is planned with encryption for sensitive data, compliance with GDPR and UAE data laws, regular penetration testing and round-the-clock backups. The first phase is planned to take about 4–6 months, starting with schools in the UAE and then expanding across the Middle East and North Africa.',
        ],
      },
    ],
  },
  {
    slug: 'nova-city',
    title: 'NOVA City',
    subtitle: 'Hybrid energy, water & food hub',
    desc: 'A sustainable satellite-city concept, with Mohammed Taha, inspired by UAE projects such as Masdar and Hatta and adapted for Sudan. It combines solar, wind, pumped-hydro and geothermal power with green hydrogen, renewable desalination, smart greenhouses and silos, all managed by an AI platform for 24/7 clean supply.',
    tags: ['Renewable Energy', 'Green Hydrogen', 'Desalination', 'AI Optimization', 'Sustainability'],
    metaTitle: 'NOVA City: Hybrid Renewable Energy, Water & Food City Concept | Mohanad Abubaker',
    metaDescription:
      'NOVA City is a sustainable city concept for Sudan, inspired by UAE projects like Masdar and Hatta, combining solar, wind, hydro, geothermal and green hydrogen with desalination, smart farming and AI.',
    keywords: 'hybrid renewable energy, green hydrogen, sustainable city, sudan, uae, water energy food nexus',
    status: 'Research concept',
    team: 'Mohammed Taha and Mohanad Abubaker',
    intro:
      'The world is moving fast toward renewable energy, but solar and wind are not always available, which makes steady supply hard for big cities. NOVA City is our answer: a "hybrid terminal city" that produces electricity, drinking water and food from many clean sources, stores energy at several levels and is run by AI. It takes lessons from the UAE and applies them to Sudan.',
    sections: [
      {
        heading: 'The idea',
        paragraphs: [
          'NOVA City sits in a desert or mountain area near a major city. It works as one Energy–Water–Food hub, following the Water–Energy–Food Nexus idea, so it suits both the technologically advanced UAE and resource-rich Sudan.',
        ],
        bullets: [
          'Electricity from solar, wind, hydro, geothermal and waste heat.',
          'Drinking water from desalination powered by renewables.',
          'Green hydrogen for storage, industry and future fuel.',
          'Smart greenhouses and intelligent grain and fodder silos for food security.',
          'One AI platform for monitoring, forecasting and optimisation.',
        ],
      },
      {
        heading: 'Energy sources',
        bullets: [
          'Solar — large, high-efficiency PV fields, inspired by Masdar in Abu Dhabi.',
          'Wind — onshore or near-coast wind farms that fill the gaps in solar output.',
          'Hydro and pumped storage — for peak demand, as at the Hatta plant.',
          'Geothermal and waste-heat recovery — to raise efficiency.',
          'Green hydrogen — for long-term storage, industry and transport.',
        ],
      },
      {
        heading: 'Storage and AI',
        table: {
          head: ['Storage', 'Covers'],
          rows: [
            ['Batteries', 'Short changes in supply'],
            ['Pumped hydro', 'Longer periods'],
            ['Green hydrogen', 'Long-term storage'],
          ],
        },
        bullets: [
          'AI forecasts energy production and demand.',
          'It runs storage units and hydrogen electrolysers at their best.',
          'It manages demand response and dynamic pricing.',
        ],
      },
      {
        heading: 'Water, waste, cooling and transport',
        bullets: [
          'Renewable-powered desalination for drinking water.',
          'Waste-to-energy plants for a circular economy.',
          'Sustainable district cooling.',
          'Electric-vehicle charging for low-carbon transport.',
        ],
      },
      {
        heading: 'Smart farming',
        bullets: [
          'Hydroponic and aeroponic greenhouses running on clean power.',
          'AI-managed silos that cut waste and energy use.',
        ],
      },
      {
        heading: 'Real-world inspiration',
        bullets: [
          'Masdar Solar + Storage, Abu Dhabi',
          'Hatta Pumped Storage Plant (DEWA)',
          'The Red Sea Project, Saudi Arabia',
          'Sharjah Waste-to-Energy Plant',
          'Sharjah sustainable and urban farming initiatives',
        ],
      },
      {
        heading: 'Next steps',
        bullets: [
          'Build a detailed numerical model from real resource and demand data.',
          'Use multi-objective optimisation to size every component.',
          'Assess environmental, economic and social impact, including new jobs.',
          'Encourage student projects in sustainability.',
        ],
      },
    ],
  },
  {
    slug: 'team-sudan-robot',
    title: 'Team Sudan Robot',
    subtitle: 'FIRST Global Challenge competition robot',
    desc: 'The robot behind Team Sudan at the FIRST Global Challenge, where the team won the Gold Medal for the Rajaâ Cherkaoui El Moursli Award for Courageous Achievement. Explore the team’s real CAD design as an interactive 3D model right in your browser.',
    tags: ['Robotics', 'FIRST Global', 'Team Sudan', '3D Model', 'CAD', 'Teamwork'],
    metaTitle: 'Team Sudan Robot: FIRST Global Challenge in 3D | Mohanad Abubaker',
    metaDescription:
      'An interactive 3D model of Team Sudan’s FIRST Global Challenge robot, from the team’s own CAD design. Team Sudan won the Gold Medal for the Rajaâ Cherkaoui El Moursli Award for Courageous Achievement.',
    keywords: 'first global challenge, team sudan, robotics competition, competition robot, 3d robot model, robot cad',
    status: 'Competed at the FIRST Global Challenge',
    team: 'Team Sudan',
    intro:
      'Mohanad represented Sudan at the FIRST Global Challenge, an international robotics competition where national teams design, build and drive their own robots. Team Sudan won the Gold Medal for the Rajaâ Cherkaoui El Moursli Award for Courageous Achievement.',
    model: {
      url: ROBOT_MODEL_URL,
      title: 'Team Sudan competition robot',
      caption:
        'The team’s full robot assembly from its SOLIDWORKS design: drivetrain, roller intake, top shooter wheels and frame.',
      downloadName: 'team-sudan-robot.glb',
      motion: 'none',
    },
    sections: [
      {
        heading: 'The competition',
        paragraphs: [
          'The FIRST Global Challenge brings together teams from countries around the world. Each team builds a robot to complete the season’s game, then plays matches in alliances with other nations — so teamwork and cooperation count as much as engineering.',
        ],
      },
      {
        heading: 'The award',
        paragraphs: [
          'Team Sudan received the Gold Medal for the Rajaâ Cherkaoui El Moursli Award for Courageous Achievement, which honours a team that keeps going and performs with courage in the face of challenges.',
        ],
      },
      {
        heading: 'About this 3D model',
        bullets: [
          'Drag to turn the robot, and scroll or pinch to zoom in on the details.',
          'It comes from the team’s own SOLIDWORKS assembly of the robot — more than 800 parts.',
          'The detail was lightened so it loads quickly on phones while keeping the robot’s real shape.',
          'You can download the .glb file and open it in any 3D viewer.',
        ],
      },
    ],
  },
];

export const getProject = (slug: string | undefined) => PROJECTS.find((p) => p.slug === slug);
