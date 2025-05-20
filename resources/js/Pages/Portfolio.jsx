import { Link, Head } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Services from '@/Components/Portfolio/Services';
import ContactForm from '@/Components/Portfolio/ContactForm';


export default function Portfolio() {
    const [activeTab, setActiveTab] = useState('services');
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sectionsRef = useRef({});
    const menuRef = useRef(null);
    
    useEffect(() => {
        // Disable body scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        // Close menu when escape key is pressed
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && 
                !event.target.closest('button[aria-label="Toggle menu"]')) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            // Check which section is currently in view
            const scrollPosition = window.scrollY + 100;
            
            Object.entries(sectionsRef.current).forEach(([id, offsetTop]) => {
                const section = document.getElementById(id);
                if (section && 
                    scrollPosition >= offsetTop && 
                    scrollPosition < offsetTop + section.offsetHeight) {
                    setActiveTab(id);
                }
            });
        };
        
        // Initialize section positions
        const sections = ['services', 'about', 'experience', 'skills', 'projects', 'contact'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                sectionsRef.current[id] = section.offsetTop;
            }
        });
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Reset section positions on window resize
    useEffect(() => {
        const handleResize = () => {
            const sections = ['services', 'about', 'experience', 'skills', 'projects', 'contact'];
            sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    sectionsRef.current[id] = section.offsetTop;
                }
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            // Adjust offset based on screen size
            const offset = window.innerWidth < 768 ? 70 : 80;
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveTab(id);
            setIsMenuOpen(false);
        }
    };

    const TypedText = ({ text, delay = 2, speed = 50 }) => {
        const [displayText, setDisplayText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);
        
        useEffect(() => {
            if (currentIndex < text.length) {
                const timer = setTimeout(() => {
                    setDisplayText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, speed);
                
                return () => clearTimeout(timer);
            }
        }, [currentIndex, text, speed]);
        
        useEffect(() => {
            const initialDelay = setTimeout(() => {
                setDisplayText('');
                setCurrentIndex(0);
            }, delay * 1000);
            
            return () => clearTimeout(initialDelay);
        }, [delay]);
        
        return <span>{displayText}<span className="animate-pulse">|</span></span>;
    };

    const skills = [
        {
            name: 'HTML',
            category: 'frontend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
        },
        {
            name: 'CSS',
            category: 'frontend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
        },
        {
            name: 'PHP',
            category: 'backend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'
        },
        {
            name: 'JavaScript',
            category: 'frontend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' // Official logo is a PNG
        },
        {
            name: 'React',
            category: 'frontend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
        },
        {
            name: 'React Native',
            category: 'mobile',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' // Shares the React logo
        },
        {
            name: 'Node',
            category: 'backend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
        },
        {
            name: 'MongoDB',
            category: 'database',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg'
        },
        {
            name: 'MySQL',
            category: 'database',
            icon: 'https://upload.wikimedia.org/wikipedia/de/d/dd/MySQL_logo.svg'
        },
        {
            name: 'Redis',
            category: 'database',
            icon: 'https://www.svgrepo.com/show/303460/redis-logo.svg'
        },
        {
            name: 'PostMan',
            category: 'tools',
            icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg'
        },
        {
            name: 'Linux',
            category: 'tools',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg' // Tux, the Linux mascot
        },
        {
            name: 'Apache',
            category: 'tools',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Apache_Software_Foundation_Logo_%282016%29.svg' // ASF Logo, general for Apache projects
        },
        {
            name: 'AWS',
            category: 'cloud',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
        },
        {
            name: 'Laravel',
            category: 'backend',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg'
        },
    ];

    const experiences = [
        {
            "title": "Senior Full-Stack Developer & DevOps Engineer",
            "company": "Interstate Advanced Materials",
            "period": "February 2023 — Present",
            "responsibilities": [
                "Architect, build, and run LAMP-stack applications (Laravel 11 + React) on self-managed AWS EC2 infrastructure—owning provisioning, CI/CD, monitoring, and cost-optimization.",
                "Designed and trained a Python credit-assessment ML model using Dun & Bradstreet data, automating credit-limit decisions and slashing manual review time by 80 %.",
                "Built a real-time credit-check rules engine that pre-qualifies applicants during onboarding, improving approval speed and data accuracy.",
                "Integrated DocuSign eSignature API for customer credit applications, reducing onboarding turnaround from days to minutes.",
                "Created “Argos,” a secure, OAuth2-protected REST API (Laravel, React) that lets B2B partners place sales orders and query live inventory.",
                "Developed “FOCUS” CRM—React/Laravel app synced with SYSPRO and other ERPs—and implemented real-time workflows and notifications via Laravel Reverb to boost sales-rep efficiency.",
                "Introduced Redis queues, background workers, and caching layers to improve response times and system resilience under high load.",
                "Provide tier-3 support, perform code reviews, and mentor junior developers on PHP, JavaScript, and cloud best practices."
            ]
        },
        {
            title: 'Full Stack Developer (Contractor)',
            company: '100devs (Agency)',
            period: 'October 2020 — February 2023',
            responsibilities: [
                'Developed and delivered client-focused, full-stack web applications using the MERN (MongoDB, Express.js, React, Node.js) stack, translating diverse business requirements into responsive and scalable solutions.',
                'Collaborated closely with agency clients from initial consultation and requirements gathering through to development and deployment, ensuring solutions effectively met their needs and objectives.',
                'Worked within an agile (Scrum) team to build modern web applications, consistently adhering to development best practices, conducting code reviews, and ensuring high-quality, maintainable code.'
            ]
        },
        {
            title: 'Full Stack Developer (Freelance)',
            company: 'The Lakota Dev | Sacramento, CA',
            period: 'January 2019 — Present',
            responsibilities: [
                'Engineered and delivered custom full-stack web applications and static websites for a diverse portfolio of small and medium-sized businesses, tailoring solutions to specific client needs.',
                'Provided expert consultation on technical architecture, technology stack selection, and development best practices, empowering clients to build scalable and maintainable digital solutions.',
                'Successfully developed, launched, and maintained Native Dads Network website, a non-profit dedicated to supporting Native families, enhancing their digital outreach and operational capabilities.',
                'Currently spearheading the development of "Native Stories," a passion-driven full-stack web application (Laravel, MySQL) enabling users to create profiles, upload, geotag, and manage tribal stories, fostering cultural preservation and community engagement.'
            ]
        }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const hoverScale = {
        scale: 1.03,
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
        }
    };

    return (
        <>
            <Head title="Portfolio | Isaac Hollow Horn Bear" />
            <div className="min-h-screen bg-gray-50">

                {/* Hero Section with background image */}
                <div className="relative text-white">
                    {/* Background image with overlay */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                        style={{ 
                            backgroundImage: 'url("images/big_bg_night_sky.jpg")',
                            // backgroundImage: 'url("images/badlands.jpg")',
                            // backgroundImage: 'url("images/blackhills.jpg")',
                            // backgroundImage: 'url("images/devilstower.jpg")',
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">Isaac Hollow Horn Bear</h1>
                                <div className="text-xl md:text-2xl mb-2 font-medium">
                                    <TypedText text="Full Stack Developer" delay={0.5} speed={80} />
                                </div>
                                <p className="text-lg mb-6 max-w-lg">Crafting modern web applications & digital solutions for businesses that make an impact</p>
                                <div className="flex flex-wrap gap-4">
                                    <motion.a 
                                        href="#contact" 
                                        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('contact');
                                        }}
                                    >
                                        Hire Me
                                    </motion.a>
                                    <motion.a 
                                        href="#projects" 
                                        className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('projects');
                                        }}
                                    >
                                        View Portfolio
                                    </motion.a>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="mt-8 md:mt-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/30 shadow-lg overflow-hidden flex items-center justify-center hover:border-white transition-all duration-300">
                                    <img src="images/headshot.jpg" alt="Isaac HHB" className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>


                {/* Improved Floating Navbar */}
                <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className={`w-[7%] font-bold text-lg transition-colors ${scrolled ? 'text-indigo-700' : 'text-gray-700'}`}>
                            <img src="images/ArrowThing.png" alt="" />
                        </div>
                        
                        {/* Mobile menu button - improved with better clickable area */}
                        <div className="md:hidden z-50">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-3 rounded-md relative z-50 ${isMenuOpen ? 'text-indigo-700' : (scrolled ? 'text-gray-700' : 'text-gray-800')}`}
                                aria-expanded={isMenuOpen}
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-6 relative flex items-center justify-center">
                                    <span 
                                        className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                                            isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                                        }`}
                                    ></span>
                                    <span 
                                        className={`block absolute h-0.5 w-6 bg-current transition-opacity duration-300 ease-in-out ${
                                            isMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    ></span>
                                    <span 
                                        className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                                            isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                                        }`}
                                    ></span>
                                </div>
                            </button>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex">
                            {['services', 'about', 'experience', 'skills', 'projects', 'contact'].map(tab => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 font-medium capitalize whitespace-nowrap transition-all hover:text-indigo-600 ${
                                        activeTab === tab 
                                            ? scrolled 
                                                ? 'text-indigo-700 border-b-2 border-indigo-700' 
                                                : 'text-indigo-600 border-b-2 border-indigo-600'
                                            : scrolled
                                                ? 'text-gray-700'
                                                : 'text-gray-600'
                                    }`}
                                    onClick={() => scrollToSection(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                        
                        <div className="hidden md:block">
                            <motion.a 
                                href="#contact" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('contact');
                                }}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
                                    scrolled 
                                        ? 'bg-indigo-700 text-white hover:bg-indigo-800' 
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </div>
                    </div>
                </div>
                
                {/* Improved Mobile menu with overlay and better animation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            ></motion.div>
                            
                            {/* Menu */}
                            <motion.div 
                                ref={menuRef}
                                className="md:hidden bg-white shadow-xl fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 overflow-y-auto"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            >
                                <div className="px-6 py-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="font-bold text-xl text-indigo-700">Menu</div>
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-2 text-gray-500 hover:text-indigo-700 transition-colors focus:outline-none"
                                            aria-label="Close menu"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        {['services', 'about', 'experience', 'skills', 'projects', 'contact'].map(tab => (
                                            <button
                                                key={tab}
                                                className={`block w-full text-left px-4 py-4 font-medium capitalize whitespace-nowrap transition-all rounded-lg ${
                                                    activeTab === tab 
                                                        ? 'bg-indigo-50 text-indigo-700' 
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                                onClick={() => scrollToSection(tab)}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Contact button in mobile menu */}
                                    <div className="mt-8 py-6 border-t border-gray-100">
                                        <motion.a 
                                            href="#contact" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection('contact');
                                            }}
                                            className="block w-full py-3 px-4 bg-indigo-600 text-white text-center font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Contact Me
                                        </motion.a>
                                    </div>
                                    
                                    {/* Social links in mobile menu */}
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <a href="https://github.com/IsaacHHB" className="text-gray-500 hover:text-indigo-600 transition-colors">
                                            <span className="sr-only">GitHub</span>
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/isaachhb" className="text-gray-500 hover:text-indigo-600 transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a href="mailto:isaac@thelakotadev.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                                            <span className="sr-only">Email</span>
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content with Sections */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Services Section */}
                    <section id="services" className="mb-20 scroll-mt-24">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100">
                            <Services />
                        </div>
                    </section>
                    
                    {/* About Section */}
                    <section id="about" className="mb-20 scroll-mt-24">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100">
                            <div className="space-y-6">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold mb-6 text-gray-800 inline-flex items-center">
                                        <span className="bg-gradient-to-r from-cyan-600 to-indigo-700 w-10 h-1 rounded mr-3"></span>
                                        About Me
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-gray-700 leading-relaxed">My name is Isaac Hollow Horn Bear. I am Sicangu Lakota, originally from South Dakota, currently living in Sacramento, CA. I enjoy the challenge of adapting to the ever changing field of technology and finding unique and simple solutions. I am a self motivated and creative problem solver who takes pride in following through to ensure things get done. I love learning new skills and adding them to my tool bag.</p>
                                            <p className="text-gray-700 leading-relaxed">Outside of coding, I enjoy meeting up with my friends at my favorite coffee shop, indulging in my slight caffeine addiction. On a Saturday you can usually find me in a video game with my ten-year-old son who, already being way better than I am, carries us to victory. I am also actively involved in Lakota Ceremony. I have found a much deeper sense of self through my Lakota heritage and culture, and I sincerely believe it's what has led to where I am today.</p>
                                        </div>
                                        <div>
                                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-gray-100">
                                                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Professional Summary</h3>
                                                <p className="text-gray-700 leading-relaxed mb-4">I enjoy the challenge of adapting to the ever-changing technology field and finding unique and simple solutions. Proven track record of creating and implementing successful front and back-end web applications and looking to bring my tech skills to a company.</p>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Problem Solver</span>
                                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Self-Motivated</span>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Continuous Learner</span>
                                                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Collaborative</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Experience Section */}
                    <section id="experience" className="mb-24 scroll-mt-24">
                        <motion.div 
                            className="bg-gradient-to-b from-white to-indigo-50/50 p-6 sm:p-8 rounded-xl shadow-md border border-indigo-100 overflow-hidden"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 inline-flex items-center">
                                <motion.span 
                                    className="bg-gradient-to-r from-indigo-500 to-indigo-700 w-12 h-1.5 rounded mr-3"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                ></motion.span>
                                Work Experience
                            </h2>
                            
                            <div className="relative">
                                {/* Animated vertical timeline line with gradient */}
                                <motion.div 
                                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-300 hidden sm:block"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                ></motion.div>
                                
                                <div className="space-y-16">
                                    {experiences.map((exp, index) => (
                                        <motion.div 
                                            key={index} 
                                            className="relative pl-0 sm:pl-10"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.7, delay: index * 0.2 }}
                                        >
                                            {/* Timeline marker - animated on scroll */}
                                            <motion.div 
                                                className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white hidden sm:flex items-center justify-center border-2 border-indigo-500 shadow-md z-10"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.5 + index * 0.2, type: "spring" }}
                                            >
                                                <motion.div 
                                                    className="w-2.5 h-2.5 rounded-full bg-indigo-600"
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.7 + index * 0.2 }}
                                                ></motion.div>
                                            </motion.div>
                                            
                                            {/* Experience card with interactive hover effects */}
                                            <motion.div 
                                                className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all hover:border-indigo-300 relative overflow-hidden group"
                                                whileHover={{ y: -8 }}
                                            >
                                                {/* Background gradient on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-100/0 group-hover:from-indigo-50 group-hover:to-indigo-100/30 transition-colors duration-500 ease-out"></div>
                                                
                                                {/* Content */}
                                                <div className="relative z-10">
                                                    {/* Date badge - mobile */}
                                                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4 sm:hidden">
                                                        {exp.period}
                                                    </div>
                                                    
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-indigo-800 group-hover:text-indigo-600 transition-colors">{exp.title}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <p className="text-lg font-medium text-indigo-600">{exp.company}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Date badge - desktop with animation */}
                                                        <motion.div 
                                                            className="hidden sm:block px-4 py-1.5 rounded-full bg-indigo-100/70 text-indigo-700 text-sm font-medium whitespace-nowrap mt-2 sm:mt-0 group-hover:bg-indigo-200 transition-colors"
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            {exp.period}
                                                        </motion.div>
                                                    </div>
                                                    
                                                    <div className="mt-4">
                                                        <ul className="space-y-3">
                                                            {exp.responsibilities.map((resp, idx) => (
                                                                <motion.li 
                                                                    key={idx} 
                                                                    className="flex items-start gap-3"
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    whileInView={{ opacity: 1, x: 0 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 0.3, delay: 0.1 * idx }}
                                                                >
                                                                    <span className="text-indigo-500 mt-1.5 flex-shrink-0 group-hover:text-indigo-600 transition-colors">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="text-gray-700 group-hover:text-gray-800 transition-colors">{resp}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    
                                                    {/* Skills/technologies used - interactive tags */}
                                                    {index === 0 && (
                                                        <motion.div 
                                                            className="mt-6 pt-4 border-t border-gray-100"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.5 }}
                                                        >
                                                            <div className="flex flex-wrap gap-2">
                                                                {['PHP', 'Laravel', 'MySQL', 'JavaScript', 'React'].map((tech, idx) => (
                                                                    <motion.span 
                                                                        key={tech}
                                                                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium transition-all"
                                                                        whileHover={{ 
                                                                            scale: 1.08, 
                                                                            backgroundColor: "#c7d2fe", 
                                                                            boxShadow: "0 2px 5px rgba(79, 70, 229, 0.2)" 
                                                                        }}
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: 0.6 + (idx * 0.1) }}
                                                                    >
                                                                        {tech}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </section>
                    
                    {/* Skills Section */}
                    <section id="skills" className="mb-20 scroll-mt-24">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 inline-flex items-center">
                                <span className="bg-gradient-to-r from-cyan-600 to-indigo-700 w-10 h-1 rounded mr-3"></span>
                                Technical Skills
                            </h2>
                            
                            <div className="mb-12">
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800">What I Can Do For Your Business</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                                    >
                                        <div className="text-indigo-600 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-indigo-600 mb-2">Frontend Development</h4>
                                        <p className="text-gray-600">Create responsive, interactive user interfaces with modern frameworks that provide excellent user experiences across all devices.</p>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                                    >
                                        <div className="text-indigo-600 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-indigo-600 mb-2">Backend Development</h4>
                                        <p className="text-gray-600">Build robust server-side applications with secure APIs, database integration, and business logic implementation.</p>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                                    >
                                        <div className="text-indigo-600 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-indigo-600 mb-2">Database Management</h4>
                                        <p className="text-gray-600">Design efficient database structures and implement optimized queries for both SQL and NoSQL databases.</p>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                                    >
                                        <div className="text-indigo-600 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-indigo-600 mb-2">DevOps & Deployment</h4>
                                        <p className="text-gray-600">Configure servers, set up deployment pipelines, and ensure your applications run reliably in production environments.</p>
                                    </motion.div>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Technology Stack</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {skills.map((skill, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center hover:border-indigo-300 hover:shadow-md transition-all"
                                        whileHover={{ y: -5, scale: 1.03 }}
                                    >
                                        <img 
                                            src={skill.icon} 
                                            alt={`${skill.name} logo`} 
                                            className="w-12 h-12 mr-3 object-contain" 
                                        />
                                        {skill.name}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* Projects Section */}
                    <section id="projects" className="mb-20 scroll-mt-24">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 inline-flex items-center">
                                <span className="bg-gradient-to-r from-cyan-600 to-indigo-700 w-10 h-1 rounded mr-3"></span>
                                Featured Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div 
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="h-56 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a href="#" className="px-4 py-2 bg-white/90 rounded-lg text-indigo-700 font-medium backdrop-blur-sm">View Project</a>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* <span className="text-white text-2xl font-bold">Native Stories</span> */}
                                            <img src="images/Native-StoryBooks.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Native Stories</h3>
                                        <p className="text-gray-600 mb-4">Fullstack Web App where users can create profiles and upload their tribe's stories in a certain area using geotags. Built with Node.js and MongoDB.</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">PHP</span>
                                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">Laravel</span>
                                            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium">MySQL</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span href="#" className="text-gray-600 font-medium flex items-center">
                                                Coming Soon!
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> */}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="h-56 bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a href="#" className="px-4 py-2 bg-white/90 rounded-lg text-cyan-700 font-medium backdrop-blur-sm">View Project</a>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* <span className="text-white text-2xl font-bold">Native Dads Network</span> */}
                                            <img src="images/ndnSite.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Native Dads Network</h3>
                                        <p className="text-gray-600 mb-4">Website for a non-profit organization geared to helping Native families with resources, community events, and educational materials.</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">CSS</span>
                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">HTML</span>
                                            <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium">Javascript</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <a href="https://nativedadsnetwork.org/" target='_blank' className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center">
                                                View Website
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Contact Section */}
                    <section id="contact" className="scroll-mt-24">
                        <ContactForm />
                    </section>
                </div>

                {/* Improved Footer */}
                <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white mt-16 relative overflow-hidden">
                    {/* Animated particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 md:w-2 md:h-2 bg-white/20 rounded-full"
                                style={{ 
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    y: [0, -100],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-xl font-bold mb-4 text-cyan-400">Isaac Hollow Horn Bear</h3>
                                <p className="text-gray-300 mb-4">Full Stack Developer specializing in modern web applications and digital solutions.</p>
                                <div className="flex gap-4">
                                    {[
                                        { name: "GitHub", href: "https://github.com/IsaacHHB", icon: <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /> },
                                        { name: "LinkedIn", href: "https://www.linkedin.com/in/isaachhb", icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
                                        { name: "Email", href: "mailto:isaac@thelakotadev.com", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> }
                                    ].map((social, index) => (
                                        <motion.a 
                                            key={social.name}
                                            href={social.href} 
                                            className="text-gray-400 hover:text-white transition-colors"
                                            whileHover={{ y: -5 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <span className="sr-only">{social.name}</span>
                                            <svg className="h-6 w-6" fill={social.name === "Email" ? "none" : "currentColor"} stroke={social.name === "Email" ? "currentColor" : "none"} viewBox="0 0 24 24">
                                                {social.icon}
                                            </svg>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
                                <ul className="space-y-2">
                                    {['Services', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                                        <motion.li 
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (index * 0.1) }}
                                        >
                                            <motion.a 
                                                href={`#${item.toLowerCase()}`} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection(item.toLowerCase());
                                                }}
                                                className="text-gray-300 hover:text-white transition-colors flex items-center group"
                                                whileHover={{ x: 5 }}
                                            >
                                                <motion.svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-4 w-4 mr-2 text-indigo-400 group-hover:text-cyan-400 transition-colors" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: index }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </motion.svg>
                                                {item}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact Me</h3>
                                <p className="text-gray-300 mb-2">Sacramento, CA</p>
                                <p className="text-gray-300 mb-4">
                                    <a href="mailto:isaac@thelakotadev.com" className="hover:text-white transition-colors">
                                        isaac@thelakotadev.com
                                    </a>
                                </p>
                                <motion.a 
                                    href="#contact" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('contact');
                                    }}
                                    className="inline-block mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-lg relative overflow-hidden group"
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Send Me a Message</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                </motion.a>
                            </motion.div>
                        </div>
                        
                        <motion.div 
                            className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-gray-400 text-sm">© 2019 - {new Date().getFullYear()} theLakotaDev. All rights reserved.</p>
                        </motion.div>
                    </div>
                </footer>
                
                {/* Improved scroll to top button with smoother animation */}
                <AnimatePresence>
                    {scrolled && (
                        <motion.button
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50"
                            aria-label="Scroll to top"
                            whileHover={{ 
                                scale: 1.1,
                                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}