import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Services(){

    const serviceSkills = {
        webDevelopment: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'SEO'],
        fullStack: ['React', 'Laravel', 'Node', 'PHP', 'API Development', 'LAMP Stack'],
        devOps: ['AWS', 'Linux', 'Apache', 'Deployment', 'CI/CD', 'Server Management'],
        database: ['MySQL', 'MongoDB', 'Redis', 'Database Design', 'Query Optimization'],
        api: ['REST APIs', 'GraphQL', 'Authentication', 'Third-party Integrations', 'Webhooks'],
        consulting: ['Architecture Planning', 'Code Review', 'Technical Documentation', 'Best Practices', 'Performance Optimization']
    };

    return(
        <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 inline-flex items-center">
                <span className="bg-gradient-to-r from-cyan-600 to-indigo-700 w-10 h-1 rounded mr-3"></span>
                Services
            </h2>
            <p className="text-lg text-gray-700">As a full stack developer, I offer comprehensive development solutions to bring your digital vision to life. My services include:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-cyan-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Web Development</h3>
                    <p className="text-gray-600">Custom, responsive websites and web applications built with modern technologies like React, Laravel, and PHP. SEO-friendly and optimized for performance.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/95 to-indigo-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.webDevelopment.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16l-4-4 4-4"></path><path d="M4 8l4 4-4 4"></path><path d="M16 4l-8 16"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Full Stack Applications</h3>
                    <p className="text-gray-600">End-to-end solutions with robust backends (Laravel, Node.js) and interactive frontends (React), including database design and API development.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/95 to-purple-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.fullStack.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">DevOps & Deployment</h3>
                    <p className="text-gray-600">Server configuration, deployment pipelines, and maintenance using AWS, Linux, and Apache to ensure your applications run smoothly.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/95 to-violet-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.devOps.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Database Solutions</h3>
                    <p className="text-gray-600">Design and implementation of database systems using MySQL, MongoDB, and Redis, ensuring efficient data management for your applications.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/95 to-teal-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.database.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">API Development & Integration</h3>
                    <p className="text-gray-600">Custom API development and third-party service integrations to connect your systems, automate workflows, and enable seamless data exchange between applications.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/95 to-orange-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.api.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Technical Consulting</h3>
                    <p className="text-gray-600">Expert advice on technology stack selection, architecture planning, and implementation strategies for your digital projects.</p>
                    
                    {/* Skills Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-sky-700/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <h4 className="text-xl font-bold text-white mb-4">Skills Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {serviceSkills.consulting.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 bg-indigo-50 p-8 rounded-xl border border-indigo-100">
            <h3 className="text-2xl font-semibold mb-10 text-gray-800">My Process</h3>
                <div className="relative py-8">
                    {/* Main timeline line */}
                    <div className="absolute top-28 left-0 right-0 h-2 bg-indigo-100 hidden lg:block" />
                    
                    {/* Animated progress line */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 4, 
                            ease: "linear" 
                        }}
                        className="absolute top-28 left-0 right-0 h-2 bg-indigo-500 origin-left hidden lg:block z-10"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="relative">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    {/* Circle background */}
                                    <motion.div 
                                        className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                    
                                    {/* Number 1 */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                        animate={{
                                            opacity: [1, 0],
                                            transition: { duration: 0.3, delay: 0.7 }
                                        }}
                                    >

                                    </motion.div>
                                    
                                    {/* Checkmark */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1.3, 1],
                                            opacity: [0, 1, 1],
                                            transition: { duration: 0.5, delay: 2.2 }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={3} 
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 2.2 }}
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h4 className="font-bold text-lg text-gray-800">1) Let's Talk</h4>
                                    <p className="text-gray-600 mt-2">A free, no-pressure consultation where we'll define the vision and requirements for your project.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    {/* Circle background */}
                                    <motion.div 
                                        className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 1 }}
                                    />
                                    
                                    {/* Number 2 */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1.3 }}
                                        animate={{
                                            opacity: [1, 0],
                                            transition: { duration: 0.3, delay: 1.5 }
                                        }}
                                    >

                                    </motion.div>
                                    
                                    {/* Checkmark */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1.3, 1],
                                            opacity: [0, 1, 1],
                                            transition: { duration: 0.5, delay: 3 }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={3} 
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 3 }}
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h4 className="font-bold text-lg text-gray-800">2) Proposal</h4>
                                    <p className="text-gray-600 mt-2">A detailed proposal outlining visual aspects, technical specifications, timeline, and project milestones.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    {/* Circle background */}
                                    <motion.div 
                                        className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 1.8 }}
                                    />
                                    
                                    {/* Number 3 */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 2.1 }}
                                        animate={{
                                            opacity: [1, 0],
                                            transition: { duration: 0.3, delay: 2.3 }
                                        }}
                                    >
                    
                                    </motion.div>
                                    
                                    {/* Checkmark */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1.3, 1],
                                            opacity: [0, 1, 1],
                                            transition: { duration: 0.5, delay: 3.8 }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={3} 
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 3.8 }}
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h4 className="font-bold text-lg text-gray-800">3) Building</h4>
                                    <p className="text-gray-600 mt-2">Open communication and frequent updates while I bring your project to life using agile development methodologies.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    {/* Circle background */}
                                    <motion.div 
                                        className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 2.6 }}
                                    />
                                    
                                    {/* Number 4 */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 2.9 }}
                                        animate={{
                                            opacity: [1, 0],
                                            transition: { duration: 0.3, delay: 3.1 }
                                        }}
                                    >
                                        
                                    </motion.div>
                                    
                                    {/* Checkmark */}
                                    <motion.div 
                                        className="absolute inset-0 flex items-center justify-center text-white"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1.3, 1],
                                            opacity: [0, 1, 1],
                                            transition: { duration: 0.5, delay: 4.6 }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={3} 
                                                d="M5 13l4 4L19 7"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 4.6 }}
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h4 className="font-bold text-lg text-gray-800"> 4) Completion</h4>
                                    <p className="text-gray-600 mt-2">Project delivery with thorough documentation and ongoing support to address any issues that may arise.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 flex justify-center">
                <motion.a 
                    href="#contact" 
                    className="inline-block px-8 py-4 rounded-xl bg-indigo-600 text-white font-medium shadow-lg"
                    whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#4f46e5"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    Get a Free Consultation
                </motion.a>
            </div>
        </div>
    );
}