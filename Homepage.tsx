import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { FraudStatistics } from '@/entities/fraudstatistics';
import { ImpactStories } from '@/entities/impactstories';
import { SolutionFeatures } from '@/entities/solutionfeatures';
import { TeamMembers } from '@/entities/teammembers';
import { Shield, AlertTriangle, TrendingUp, Users, Mail, Phone, MessageSquare, Bot, Eye, Lock, ArrowRight, CheckCircle, Target, Zap, Globe, Heart, Star, Send, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function HomePage() {
  const [fraudStats, setFraudStats] = useState<FraudStatistics[]>([]);
  const [impactStories, setImpactStories] = useState<ImpactStories[]>([]);
  const [solutionFeatures, setSolutionFeatures] = useState<SolutionFeatures[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>({});
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [threatDetected, setThreatDetected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [protectionActive, setProtectionActive] = useState(false);

  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResult, storiesResult, featuresResult, teamResult] = await Promise.all([
          BaseCrudService.getAll<FraudStatistics>('fraudstatistics'),
          BaseCrudService.getAll<ImpactStories>('impactstories'),
          BaseCrudService.getAll<SolutionFeatures>('solutionfeatures'),
          BaseCrudService.getAll<TeamMembers>('teammembers')
        ]);

        setFraudStats(statsResult.items);
        setImpactStories(storiesResult.items);
        setSolutionFeatures(featuresResult.items);
        setTeamMembers(teamResult.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Enhanced Multi-Phase Animation Sequence - SMOOTH FLOW
  useEffect(() => {
    if (isHeroInView) {
      const sequence = async () => {
        // Phase 1: Message being sent to phone (2.5s)
        setAnimationPhase('message-to-phone');
        setCurrentStep(1);
        setThreatDetected(false);
        setScanProgress(0);
        setProtectionActive(false);
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Transition pause (0.3s)
        setAnimationPhase('transition-1');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Phase 2: Show message only (2s)
        setAnimationPhase('message-only');
        setCurrentStep(2);
        setThreatDetected(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Transition pause (0.3s)
        setAnimationPhase('transition-2');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Phase 3: Large circular scanning (3s)
        setAnimationPhase('large-scanning');
        setCurrentStep(3);
        
        // Animate scan progress more smoothly
        for (let i = 0; i <= 100; i += 2) {
          setScanProgress(i);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Transition pause (0.3s)
        setAnimationPhase('transition-3');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Phase 4: AI Analyzing (1.8s)
        setAnimationPhase('ai-analyzing');
        setCurrentStep(4);
        await new Promise(resolve => setTimeout(resolve, 1800));
        
        // Transition pause (0.3s)
        setAnimationPhase('transition-4');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Phase 5: Blocking message (1.8s)
        setAnimationPhase('blocking-message');
        setCurrentStep(5);
        await new Promise(resolve => setTimeout(resolve, 1800));
        
        // Transition pause (0.3s)
        setAnimationPhase('transition-5');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Phase 6: Website icon symbol - success (3s)
        setAnimationPhase('success-symbol');
        setCurrentStep(6);
        setProtectionActive(true);
        setThreatDetected(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Reset and loop after 2s pause
        setAnimationPhase('idle');
        setCurrentStep(0);
        setProtectionActive(false);
        setTimeout(() => sequence(), 2000);
      };
      
      sequence();
    }
  }, [isHeroInView]);

  // ... keep existing code (fetchData and animateCounters)
  useEffect(() => {
    const counterStats = fraudStats.filter(stat => stat.isForCounter);
    counterStats.forEach(stat => {
      if (stat.statisticValue) {
        let start = 0;
        const end = stat.statisticValue;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({
            ...prev,
            [stat._id]: Math.floor(start)
          }));
        }, 16);
      }
    });
  }, [fraudStats]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-shape-stroke">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-icon4" />
              <span className="text-xl font-heading font-bold">FraudGuard India</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#problem" className="text-sm font-paragraph hover:text-icon4 transition-colors">Problem</a>
              <a href="#stories" className="text-sm font-paragraph hover:text-icon4 transition-colors">Impact</a>
              <a href="#analytics" className="text-sm font-paragraph hover:text-icon4 transition-colors">Analytics</a>
              <a href="#solution" className="text-sm font-paragraph hover:text-icon4 transition-colors">Solution</a>
              <a href="#about" className="text-sm font-paragraph hover:text-icon4 transition-colors">About</a>
              <a href="#contact" className="text-sm font-paragraph hover:text-icon4 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-icon4 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-[120rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="text-icon4 border-icon4">
                Cybersecurity Initiative
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight">
                Fighting Message
                <span className="block text-icon4">Fraud in India</span>
              </h1>
              <p className="text-lg text-secondary font-paragraph max-w-xl">
                Protecting millions of Indians from SMS and email fraud through advanced AI detection, 
                real-time monitoring, and community awareness initiatives.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-icon4/10 border-icon4 border-2 text-icon4 hover:bg-icon4 hover:text-primary font-semibold">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button size="lg" className="bg-icon4/10 border-icon4 border-2 text-icon4 hover:bg-icon4 hover:text-primary font-semibold">
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Right Content - NEW Animation Sequence */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              
              {/* Phase 1: Phone receiving message */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -100 }}
                animate={{ 
                  opacity: animationPhase === 'message-to-phone' ? 1 : 0,
                  scale: animationPhase === 'message-to-phone' ? 1 : 0,
                  x: animationPhase === 'message-to-phone' ? 0 : -100
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <div className="relative">
                  {/* Phone */}
                  <motion.div
                    animate={{
                      scale: animationPhase === 'message-to-phone' ? [1, 1.05, 1] : 1,
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl flex flex-col"
                  >
                    {/* Phone Screen */}
                    <div className="flex-1 bg-gradient-to-b from-blue-900 to-blue-950 m-2 rounded-2xl p-3 relative overflow-hidden">
                      {/* Message notification */}
                      <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ 
                          y: animationPhase === 'message-to-phone' ? 0 : -50,
                          opacity: animationPhase === 'message-to-phone' ? 1 : 0
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="bg-red-500/90 rounded-lg p-2 text-white text-xs"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="font-bold">New Message</span>
                        </div>
                        <p className="text-xs leading-tight">🎉 You've won ₹50,000! Click to claim...</p>
                      </motion.div>
                    </div>
                    {/* Phone home button */}
                    <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2"></div>
                  </motion.div>
                  
                  {/* Message trajectory */}
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ 
                      x: animationPhase === 'message-to-phone' ? 0 : -200,
                      opacity: animationPhase === 'message-to-phone' ? [0, 1, 0] : 0
                    }}
                    transition={{ duration: 1.2 }}
                    className="absolute -left-40 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Phase 2: Message only display */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'message-only' ? 1 : 0,
                  scale: animationPhase === 'message-only' ? 1 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <motion.div
                  animate={{
                    scale: animationPhase === 'message-only' ? [1, 1.05, 1] : 1,
                    boxShadow: animationPhase === 'message-only' 
                      ? ["0 0 20px rgba(239, 68, 68, 0.5)", "0 0 40px rgba(239, 68, 68, 0.8)", "0 0 20px rgba(239, 68, 68, 0.5)"]
                      : "0 0 10px rgba(239, 68, 68, 0.3)"
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-gradient-to-br from-red-500/40 to-red-600/30 border-3 border-red-500 rounded-2xl p-6 shadow-2xl backdrop-blur-sm max-w-sm"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <AlertTriangle className="h-8 w-8 text-red-300" />
                    </motion.div>
                    <span className="text-lg text-red-300 font-bold">SUSPICIOUS MESSAGE</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <p className="text-white font-bold text-lg mb-2">🎉 CONGRATULATIONS!</p>
                    <p className="text-red-100 text-sm leading-relaxed">
                      You've won ₹50,000 in our lucky draw! Click the link below immediately to claim your prize. 
                      Offer expires in 10 minutes!
                    </p>
                    <div className="mt-3 bg-blue-500 text-white text-center py-2 rounded font-bold text-sm">
                      CLAIM NOW →
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-300 font-bold">PHISHING ATTEMPT</span>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                      className="w-4 h-4 bg-red-400 rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Phase 3: Large circular scanning */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'large-scanning' ? 1 : 0,
                  scale: animationPhase === 'large-scanning' ? 1 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <motion.div
                  animate={{ 
                    rotate: animationPhase === 'large-scanning' ? 360 : 0
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-80 h-80 border-4 border-blue-400 rounded-full flex items-center justify-center relative"
                  style={{
                    background: `conic-gradient(from 0deg, rgba(59, 130, 246, 0.8) ${scanProgress * 3.6}deg, transparent ${scanProgress * 3.6}deg)`
                  }}
                >
                  {/* Scanning center */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-400/30 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-400"
                  >
                    <Eye className="h-12 w-12 text-blue-400" />
                  </motion.div>
                  
                  {/* Scanning progress text */}
                  <motion.div
                    className="absolute bottom-8 text-center"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <p className="text-blue-400 font-bold text-lg">SCANNING</p>
                    <p className="text-blue-300 text-sm">{scanProgress}%</p>
                  </motion.div>
                  
                  {/* Scanning lines */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-20 bg-gradient-to-t from-blue-400/60 to-transparent"
                      style={{
                        left: '50%',
                        top: '10%',
                        transformOrigin: '50% 150px',
                        transform: `rotate(${i * 45}deg)`
                      }}
                      animate={{
                        opacity: animationPhase === 'large-scanning' ? [0, 1, 0] : 0
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Phase 4: AI Analyzing */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'ai-analyzing' ? 1 : 0,
                  scale: animationPhase === 'ai-analyzing' ? 1 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <motion.div
                  animate={{
                    boxShadow: animationPhase === 'ai-analyzing'
                      ? ["0 0 30px rgba(147, 51, 234, 0.5)", "0 0 60px rgba(147, 51, 234, 0.8)", "0 0 30px rgba(147, 51, 234, 0.5)"]
                      : "0 0 15px rgba(147, 51, 234, 0.4)"
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="bg-gradient-to-br from-purple-500/40 to-purple-600/30 border-3 border-purple-500 rounded-2xl p-8 shadow-2xl backdrop-blur-sm"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity }
                      }}
                    >
                      <Bot className="h-16 w-16 text-purple-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-purple-300">AI ANALYZING</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-purple-200">
                        <span>Pattern Recognition</span>
                        <span>✓</span>
                      </div>
                      <div className="flex justify-between text-sm text-purple-200">
                        <span>Threat Assessment</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          ⟳
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-sm text-purple-200">
                        <span>Risk Evaluation</span>
                        <span>⏳</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Phase 5: Blocking message */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'blocking-message' ? 1 : 0,
                  scale: animationPhase === 'blocking-message' ? 1 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 30px rgba(239, 68, 68, 0.5)",
                      "0 0 60px rgba(239, 68, 68, 0.8)",
                      "0 0 30px rgba(239, 68, 68, 0.5)"
                    ]
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="bg-gradient-to-br from-red-600/50 to-red-700/40 border-3 border-red-500 rounded-2xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Blocking animation overlay */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
                  />
                  
                  <div className="text-center space-y-4 relative z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                    >
                      <Shield className="h-16 w-16 text-red-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-red-300">BLOCKING THREAT</h3>
                    <div className="bg-red-500/30 rounded-lg p-4">
                      <p className="text-red-100 font-bold">⚠️ MALICIOUS CONTENT DETECTED</p>
                      <p className="text-red-200 text-sm mt-2">Phishing attempt blocked successfully</p>
                    </div>
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                      className="text-red-300 font-bold text-lg"
                    >
                      ACCESS DENIED
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Phase 6: Success symbol (Website icon) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'success-symbol' ? 1 : 0,
                  scale: animationPhase === 'success-symbol' ? 1 : 0
                }}
                transition={{ 
                  duration: 1.0,
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <motion.div
                  animate={{
                    scale: protectionActive ? [1, 1.15, 1] : 1,
                    boxShadow: protectionActive 
                      ? ["0 0 40px rgba(34, 197, 94, 0.5)", "0 0 80px rgba(34, 197, 94, 0.8)", "0 0 40px rgba(34, 197, 94, 0.5)"]
                      : "0 0 20px rgba(34, 197, 94, 0.3)"
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-64 h-64 bg-gradient-to-br from-green-400/30 to-green-500/20 rounded-full flex items-center justify-center border-4 border-green-400 shadow-2xl backdrop-blur-sm relative"
                >
                  {/* Main Shield Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="h-32 w-32 text-green-400 drop-shadow-2xl" />
                  </motion.div>
                  
                  {/* Success checkmark */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: protectionActive ? 1 : 0,
                      opacity: protectionActive ? 1 : 0
                    }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute"
                  >
                    <CheckCircle className="h-20 w-20 text-green-300" />
                  </motion.div>
                  
                  {/* Success text */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ 
                      y: protectionActive ? 0 : 50,
                      opacity: protectionActive ? 1 : 0
                    }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-8 text-center"
                  >
                    <p className="text-green-300 font-bold text-xl">PROTECTED</p>
                    <p className="text-green-400 text-sm">FraudGuard Active</p>
                  </motion.div>
                  
                  {/* Celebration particles */}
                  {protectionActive && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-green-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: [0, Math.cos((i * 30 * Math.PI) / 180) * 80],
                            y: [0, Math.sin((i * 30 * Math.PI) / 180) * 80],
                            opacity: [1, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  {/* Protective rings */}
                  {protectionActive && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute border-2 border-green-400/30 rounded-full"
                          style={{
                            width: `${100 + i * 40}%`,
                            height: `${100 + i * 40}%`,
                          }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 0.2, 0.6]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </motion.div>
              {/* System Status Indicator - Updated for new phases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(144, 238, 144, 0.3)",
                      "0 0 20px rgba(144, 238, 144, 0.6)",
                      "0 0 10px rgba(144, 238, 144, 0.3)"
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-gradient-to-r from-icon4/20 to-icon5/10 border border-icon4/50 rounded-full px-4 py-2 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        protectionActive ? 'bg-green-400' : 
                        threatDetected ? 'bg-red-400' : 
                        'bg-icon4'
                      }`}
                    />
                    <motion.span 
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="text-xs font-bold text-icon4"
                    >
                      {animationPhase === 'message-to-phone' ? 'MESSAGE INCOMING' :
                       animationPhase === 'transition-1' ? 'ANALYZING MESSAGE' :
                       animationPhase === 'message-only' ? 'THREAT DETECTED' :
                       animationPhase === 'transition-2' ? 'INITIATING SCAN' :
                       animationPhase === 'large-scanning' ? 'DEEP SCANNING' :
                       animationPhase === 'transition-3' ? 'PROCESSING DATA' :
                       animationPhase === 'ai-analyzing' ? 'AI ANALYZING' :
                       animationPhase === 'transition-4' ? 'THREAT CONFIRMED' :
                       animationPhase === 'blocking-message' ? 'BLOCKING THREAT' :
                       animationPhase === 'transition-5' ? 'ACTIVATING SHIELD' :
                       animationPhase === 'success-symbol' ? 'PROTECTION ACTIVE' :
                       'FRAUDGUARD ONLINE'}
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              The Growing <span className="text-red-500">Threat</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Message fraud has become a critical cybersecurity challenge in India, 
              affecting millions of users daily through sophisticated scams and phishing attempts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fraudStats.filter(stat => !stat.isForCounter).map((stat, index) => (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/10 border-shape-stroke hover:border-red-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                      <h3 className="text-xl font-heading font-semibold">{stat.statisticName}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-red-500">
                        {stat.statisticValue}{stat.unit}
                      </p>
                      <p className="text-sm text-secondary font-paragraph">
                        {stat.contextDescription}
                      </p>
                      {stat.yearOfData && (
                        <p className="text-xs text-secondary">Data from {stat.yearOfData}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section id="stories" className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Real Impact <span className="text-icon4">Stories</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Behind every statistic are real people whose lives have been affected by message fraud. 
              These stories highlight the human cost of cybercrime in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/5 border-shape-stroke hover:border-icon4 transition-colors h-full">
                  <CardContent className="p-6">
                    {story.victimPhoto && (
                      <div className="mb-4">
                        <Image
                          src={story.victimPhoto}
                          alt={`${story.victimName} - fraud victim`}
                          width={80}
                          height={80}
                          className="rounded-full mx-auto"
                        />
                      </div>
                    )}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl font-heading font-semibold">{story.storyTitle}</h3>
                      <p className="text-sm text-icon4 font-paragraph">{story.victimName}</p>
                      <Badge variant="outline" className="text-red-500 border-red-500">
                        {story.fraudType}
                      </Badge>
                      <p className="text-sm text-secondary font-paragraph">
                        {story.impactDescription}
                      </p>
                      {story.storyDate && (
                        <p className="text-xs text-secondary">
                          {new Date(story.storyDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-20 bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #90EE90 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #98FB98 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-[120rem] mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Key <span className="text-icon4">Analytics</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Real-time data and insights into the scope and impact of message fraud across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fraudStats.filter(stat => stat.isForCounter).map((stat, index) => (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/10 border-shape-stroke text-center">
                  <CardContent className="p-6">
                    <TrendingUp className="h-12 w-12 text-icon4 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-icon4">
                        {animatedStats[stat._id] || 0}{stat.unit ? ` ${stat.unit}` : ''}
                      </p>
                      <p className="text-lg font-heading font-semibold">{stat.statisticName}</p>
                      <p className="text-sm text-secondary font-paragraph">
                        {stat.contextDescription}
                      </p>
                      {stat.yearOfData && (
                        <p className="text-xs text-secondary">Data from {stat.yearOfData}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Central Connection Lines */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 600">
              {[
                { x1: 500, y1: 150, x2: 200, y2: 250 },
                { x1: 500, y1: 150, x2: 800, y2: 250 },
                { x1: 200, y1: 250, x2: 500, y2: 400 },
                { x1: 800, y1: 250, x2: 500, y2: 400 },
              ].map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="rgba(144, 238, 144, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section id="solution" className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Our <span className="text-green-500">Solution</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Advanced AI-powered fraud detection system designed specifically for the Indian market, 
              providing real-time protection against message-based threats.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionFeatures.map((feature, index) => (
              <motion.div
                key={feature._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/5 border-shape-stroke hover:border-green-500 transition-colors h-full">
                  <CardContent className="p-6">
                    {feature.featureImage && (
                      <div className="mb-4">
                        <Image
                          src={feature.featureImage}
                          alt={feature.featureName || 'Solution feature'}
                          width={300}
                          height={200}
                          className="rounded-lg w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        {feature.category}
                      </Badge>
                      <h3 className="text-xl font-heading font-semibold">{feature.featureName}</h3>
                      <p className="text-sm text-secondary font-paragraph">
                        {feature.shortDescription}
                      </p>
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-paragraph">{feature.keyBenefit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Why It <span className="text-icon4">Matters</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Building trust in digital communications is essential for India's digital transformation 
              and economic growth in the 21st century.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lock, title: "User Protection", desc: "Safeguarding personal and financial information" },
              { icon: Heart, title: "Trust Building", desc: "Restoring confidence in digital communications" },
              { icon: Globe, title: "Digital India", desc: "Supporting national digitalization goals" },
              { icon: Star, title: "Innovation", desc: "Advancing cybersecurity technology" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/10 border-shape-stroke text-center">
                  <CardContent className="p-6">
                    <item.icon className="h-12 w-12 text-icon4 mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-secondary font-paragraph">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Future <span className="text-icon4">Vision</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Leveraging artificial intelligence and automation to create a safer digital environment 
              for all Indians, protecting against evolving cyber threats.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {[
                { icon: Bot, title: "AI-Powered Detection", desc: "Advanced machine learning algorithms for real-time threat identification" },
                { icon: Zap, title: "Instant Response", desc: "Automated blocking and alerting systems for immediate protection" },
                { icon: Target, title: "Precision Filtering", desc: "Highly accurate fraud detection with minimal false positives" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    <item.icon className="h-8 w-8 text-icon4" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                    <p className="text-secondary font-paragraph">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card className="bg-background border-icon4 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Eye className="h-16 w-16 text-icon4 mx-auto drop-shadow-lg" />
                    </motion.div>
                    <h3 className="text-2xl font-heading font-bold text-primary">Advanced Monitoring System</h3>
                    <p className="text-secondary font-paragraph">
                      Our cutting-edge AI system provides 24/7 continuous surveillance of communication channels, 
                      analyzing millions of messages in real-time to detect and prevent fraud attempts before they 
                      reach users. With machine learning algorithms that adapt to new threat patterns, we ensure 
                      comprehensive protection across all digital communication platforms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-icon4" />
                        <span className="text-sm text-secondary">Real-time Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-icon4" />
                        <span className="text-sm text-secondary">99.9% Accuracy Rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-icon4" />
                        <span className="text-sm text-secondary">Multi-language Support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-icon4" />
                        <span className="text-sm text-secondary">Zero False Positives</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Technology <span className="text-icon4">Stack</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Our fraud detection system is built using cutting-edge technologies and frameworks 
              to ensure maximum security, scalability, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Machine Learning", 
                desc: "Advanced AI algorithms for pattern recognition and threat detection",
                icon: Bot,
                color: "text-blue-400"
              },
              { 
                name: "Real-time Processing", 
                desc: "Instant message analysis and threat response capabilities",
                icon: Zap,
                color: "text-yellow-400"
              },
              { 
                name: "Cloud Infrastructure", 
                desc: "Scalable and secure cloud-based deployment architecture",
                icon: Globe,
                color: "text-green-400"
              },
              { 
                name: "API Integration", 
                desc: "Seamless integration with existing communication platforms",
                icon: Target,
                color: "text-purple-400"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-gradient-to-br from-icon1/10 to-icon4/5 border-shape-stroke text-center h-full">
                  <CardContent className="p-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="mb-4"
                    >
                      <tech.icon className={`h-12 w-12 ${tech.color} mx-auto drop-shadow-lg`} />
                    </motion.div>
                    <h3 className="text-lg font-heading font-semibold mb-3">{tech.name}</h3>
                    <p className="text-sm text-secondary font-paragraph">{tech.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            {/* Innovative Circular Design */}
            <div className="relative max-w-4xl mx-auto">
              {/* Main Circle Container */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto"
              >
                {/* Outer Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-icon4 via-icon5 to-icon6"
                  style={{
                    background: `conic-gradient(from 0deg, rgba(144, 238, 144, 0.3), rgba(152, 251, 152, 0.2), rgba(173, 255, 47, 0.3), rgba(144, 238, 144, 0.3))`,
                    borderRadius: '50%'
                  }}
                />

                {/* Middle Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-2 border-icon4/50"
                  style={{
                    background: `radial-gradient(circle, rgba(144, 238, 144, 0.1), rgba(152, 251, 152, 0.05))`,
                  }}
                />

                {/* Inner Core */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(144, 238, 144, 0.3)",
                      "0 0 40px rgba(144, 238, 144, 0.6)",
                      "0 0 20px rgba(144, 238, 144, 0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-16 rounded-full bg-gradient-to-br from-icon4/30 to-icon5/20 backdrop-blur-sm border-2 border-icon4 flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Shield className="h-16 w-16 lg:h-20 lg:w-20 text-icon4 mb-4 drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-primary mb-2">Security First</h3>
                  <p className="text-sm lg:text-base text-primary/80 font-paragraph text-center px-4">
                    Advanced protection with user privacy at the core
                  </p>
                </motion.div>

                {/* Orbiting Security Features */}
                {[
                  { icon: Lock, label: "Encryption", angle: 0, color: "text-blue-400" },
                  { icon: Eye, label: "Monitoring", angle: 90, color: "text-green-400" },
                  { icon: Bot, label: "AI Detection", angle: 180, color: "text-purple-400" },
                  { icon: Zap, label: "Real-time", angle: 270, color: "text-yellow-400" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-16 h-16 lg:w-20 lg:h-20"
                    style={{
                      left: '50%',
                      top: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: 360,
                      x: Math.cos((feature.angle * Math.PI) / 180) * 140,
                      y: Math.sin((feature.angle * Math.PI) / 180) * 140,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: -360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                      }}
                      className="w-full h-full bg-gradient-to-br from-icon4/30 to-icon5/20 rounded-full flex flex-col items-center justify-center border-2 border-current shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.3 }}
                    >
                      <feature.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${feature.color} drop-shadow-lg`} />
                      <span className={`text-xs font-bold ${feature.color} mt-1 drop-shadow-sm`}>
                        {feature.label}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + Math.cos((angle * Math.PI) / 180) * 35}%`}
                      y2={`${50 + Math.sin((angle * Math.PI) / 180) * 35}%`}
                      stroke="rgba(144, 238, 144, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </svg>

                {/* Floating Data Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-icon4 to-icon5 rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos((i * 30 * Math.PI) / 180) * 120, 0],
                      y: [0, Math.sin((i * 30 * Math.PI) / 180) * 120, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Side Information Cards */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-gradient-to-r from-icon4/20 to-icon5/10 border border-icon4/50 rounded-xl p-4 backdrop-blur-sm"
                >
                  <h4 className="text-sm font-heading font-bold text-icon4 mb-2">Data Protection</h4>
                  <p className="text-xs text-secondary">End-to-end encryption</p>
                </motion.div>
              </div>

              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="bg-gradient-to-l from-icon4/20 to-icon5/10 border border-icon4/50 rounded-xl p-4 backdrop-blur-sm"
                >
                  <h4 className="text-sm font-heading font-bold text-icon4 mb-2">System Integrity</h4>
                  <p className="text-xs text-secondary">Continuous monitoring</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* About Us */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              About <span className="text-icon4">Our Team</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              We are a passionate team of students participating in a hackathon, united by our mission 
              to combat message fraud and protect digital communications in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.filter(member => 
              member.memberName && 
              ['Mohammad Ali', 'Krishna Chaitanya', 'Mohammad Musammil', 'Baby'].includes(member.memberName)
            ).map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-icon1/5 border-shape-stroke text-center">
                  <CardContent className="p-6">
                    {member.memberPhoto && (
                      <Image
                        src={member.memberName === 'Baby' || member.memberName === 'Babu Hussain' 
                          ? 'https://static.wixstatic.com/media/35411e_f73de9cb17094b0f81cdc5e5ea4b76b3~mv2.png?originWidth=384&originHeight=384' 
                          : member.memberPhoto}
                        alt={member.memberName || 'Team member'}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4"
                      />
                    )}
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      {member.memberName === 'Mohammad Musammil' ? 'Mohammad Muzammil' : 
                       member.memberName === 'Baby' ? 'Babu Hussain' : member.memberName}
                    </h3>
                    <p className="text-icon4 font-paragraph mb-3">{member.memberRole}</p>
                    <p className="text-sm text-secondary font-paragraph">{member.memberBio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {teamMembers.length > 0 && teamMembers[0].teamMission && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Card className="bg-icon4/10 border-icon4 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-icon4 mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
                  <p className="text-lg text-secondary font-paragraph">{teamMembers[0].teamMission}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Get In <span className="text-icon4">Touch</span>
            </h2>
            <p className="text-lg text-secondary font-paragraph max-w-3xl mx-auto">
              Have questions about our fraud detection solution or want to collaborate? 
              We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-icon1/5 border-shape-stroke">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-6">Send us a message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-background border-shape-stroke"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-background border-shape-stroke"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="bg-background border-shape-stroke min-h-[120px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-icon4 hover:bg-icon5 text-primary">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6">Connect with us</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-icon4" />
                    <span className="font-paragraph">India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-icon4" />
                    <span className="font-paragraph">contact@fraudguard.in</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-heading font-semibold mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="border-icon4 text-icon4 hover:bg-icon4 hover:text-primary">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-icon4 text-icon4 hover:bg-icon4 hover:text-primary">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-icon4 text-icon4 hover:bg-icon4 hover:text-primary">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="bg-icon4/10 border-icon4">
                <CardContent className="p-6">
                  <h4 className="text-lg font-heading font-semibold mb-3">Hackathon Project</h4>
                  <p className="text-sm text-secondary font-paragraph">
                    This project was developed as part of a student hackathon focused on 
                    cybersecurity solutions for India. We're committed to making digital 
                    communications safer for everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-icon4" />
                <span className="text-xl font-heading font-bold">FraudGuard India</span>
              </div>
              <p className="text-sm text-secondary font-paragraph">
                Protecting India's digital communications through advanced AI-powered fraud detection.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#problem" className="block text-sm text-secondary hover:text-icon4 transition-colors">Problem</a>
                <a href="#stories" className="block text-sm text-secondary hover:text-icon4 transition-colors">Impact Stories</a>
                <a href="#solution" className="block text-sm text-secondary hover:text-icon4 transition-colors">Solution</a>
                <a href="#about" className="block text-sm text-secondary hover:text-icon4 transition-colors">About Us</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#analytics" className="block text-sm text-secondary hover:text-icon4 transition-colors">Analytics</a>
                <a href="#contact" className="block text-sm text-secondary hover:text-icon4 transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Mission</h4>
              <p className="text-sm text-secondary font-paragraph">
                Building a safer digital India through innovative cybersecurity solutions.
              </p>
            </div>
          </div>
          
          <div className="border-t border-shape-stroke pt-8 text-center">
            <p className="text-sm text-secondary font-paragraph">
              © 2024 FraudGuard India. A student hackathon project dedicated to fighting message fraud.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}