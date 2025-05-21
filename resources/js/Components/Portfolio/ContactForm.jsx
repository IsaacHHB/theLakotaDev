import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Custom Captcha Component with forwardRef
const CustomCaptcha = forwardRef(({ onVerify }, ref) => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(result);
        setUserInput('');
        setIsVerified(false);
    };
    
    const verifyCaptcha = () => {
        if (userInput.toLowerCase() === captchaText.toLowerCase()) {
            setIsVerified(true);
            onVerify(true);
            return true;
        } else {
            setIsVerified(false);
            onVerify(false);
            return false;
        }
    };
    
    const refreshCaptcha = () => {
        setRefreshKey(prev => prev + 1);
        generateCaptcha();
    };
    
    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        generateCaptcha,
        verifyCaptcha,
        refreshCaptcha
    }));
    
    useEffect(() => {
        generateCaptcha();
    }, [refreshKey]);
    
    return (
        <div className="w-full">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Check</label>
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <div className="relative flex-1">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100 relative overflow-hidden">
                            <div key={refreshKey} className="flex justify-center">
                                {captchaText.split('').map((char, index) => (
                                    <span 
                                        key={index} 
                                        className="inline-block text-xl sm:text-2xl font-bold px-1"
                                        style={{
                                            color: `hsl(${Math.random() * 240}, 70%, 50%)`,
                                            transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 6 - 3}px)`,
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                                            fontFamily: index % 2 ? 'serif' : 'monospace'
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/20 to-transparent mix-blend-overlay"></div>
                            
                            {/* Noise pattern overlay */}
                            <div 
                                className="absolute inset-0 opacity-10" 
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                                }}
                            ></div>
                            
                            {/* Distortion lines */}
                            <div className="absolute inset-0 overflow-hidden opacity-20">
                                {[...Array(6)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute bg-indigo-500/30"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            top: `${Math.random() * 100}%`,
                                            transform: `rotate(${Math.random() * 5 - 2.5}deg)`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            type="button"
                            onClick={refreshCaptcha}
                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-indigo-600 rounded-full bg-white/80 hover:bg-white shadow-sm"
                            aria-label="Refresh captcha"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex-1">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Enter the code above"
                            className={`w-full px-4 py-3 rounded-lg border ${
                                userInput ? (isVerified ? 'border-green-300 bg-green-50' : 'border-gray-300') : 'border-gray-300'
                            } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                            aria-label="Captcha verification code"
                        />
                    </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Please enter the characters you see above to verify you're human</p>
            </div>
        </div>
    );
});

// Add display name for better debugging
CustomCaptcha.displayName = 'CustomCaptcha';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState(null);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const captchaRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Clear error when field is being edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        
        // Validate subject
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        
        // Validate captcha
        if (!captchaVerified) {
            newErrors.captcha = 'Please complete the captcha';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setFormStatus({
                type: 'error',
                message: 'Please fix the errors in the form.'
            });
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Form submitted', { ...formData });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            
            // Reset captcha
            setCaptchaVerified(false);
            if (captchaRef.current) {
                captchaRef.current.generateCaptcha();
            }
            
            setFormStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
            // Clear status after 5 seconds
            setTimeout(() => setFormStatus(null), 5000);
        }
    };

    const handleCaptchaVerify = (verified) => {
        setCaptchaVerified(verified);
        if (errors.captcha && verified) {
            setErrors({
                ...errors,
                captcha: ''
            });
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 inline-flex items-center">
                    <span className="bg-gradient-to-r from-cyan-600 to-indigo-700 w-10 h-1 rounded mr-3"></span>
                    Get In Touch
                </h2>
                <p className="text-gray-600 mb-8 pl-12">Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!</p>
                
                <AnimatePresence>
                    {formStatus && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`p-4 mb-6 rounded-lg shadow-sm ${
                                formStatus.type === 'success' 
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' 
                                    : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                {formStatus.type === 'success' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <div>
                                    <p className="font-medium">{formStatus.message}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                            placeholder="What's this about?"
                        />
                        {errors.subject && (
                            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                            placeholder="Tell me about your project, question, or idea..."
                        ></textarea>
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                        )}
                    </div>
                    
                    {/* Custom Captcha with ref properly passed */}
                    <div className="mt-6">
                        <CustomCaptcha onVerify={handleCaptchaVerify} ref={captchaRef} />
                        {errors.captcha && (
                            <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <motion.button
                            type="submit"
                            className={`px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(79, 70, 229, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending Message...
                                </span>
                            ) : "Send Message"}
                        </motion.button>
                    </div>
                </form>
                
                <div className="mt-12 pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-600">Your information is secured with end-to-end encryption</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Or email me directly at <a href="mailto:isaac@thelakotadev.com" className="text-indigo-600 hover:text-indigo-800 font-medium">isaac@thelakotadev.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}