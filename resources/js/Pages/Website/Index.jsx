import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import weddingPhoto from '../../../img/IMG_0397.jpg';
import storyPhoto from '../../../img/IMG_0414.jpg';
import thirdPhoto from '../../../img/IMG_0642.jpg';
import chucks from '../../../img/chucks.png';
import redSmithRanch from '../../../img/redSmith.jpg';
import ipodIcon from '../../../img/ipod_icon.png';

export default function Index() {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const encrypted = urlParams.get('encrypted');

    return (
        <>
            <Head title="Isaac & Savannah" />

            <motion.section
                className="bg-cover h-screen flex flex-col justify-center items-center text-white relative"
                style={{ backgroundImage: `url(${weddingPhoto})`, backgroundPosition: 'center 40%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                <div className="relative z-10 flex flex-col items-center px-4 text-center">
                    <motion.h2
                        className="text-4xl md:text-7xl font-great-vibes mb-4"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Isaac & Savannah
                    </motion.h2>
                    <motion.p
                        className="text-xl md:text-4xl mb-8 font-great-vibes"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        Join us for our wedding celebration
                    </motion.p>
                    <motion.div
                        className="relative cursor-pointer"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        onClick={() => document.getElementById('our-story').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <div className="rounded-full bg-white p-2">
                            <FaArrowDown className="h-8 w-8 text-gray-800" />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                id="our-story"
                className="bg-cover min-h-screen flex flex-col justify-center items-center text-white relative py-12 md:py-24"
                style={{ backgroundImage: `url(${storyPhoto})`, backgroundPosition: 'center 40%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 py-12 px-4 bg-black bg-opacity-60 rounded-lg max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-great-vibes font-bold mb-6">Our Story</h2>
                    <p className="text-base md:text-lg leading-relaxed">
                        Our journey began back in December 2011. We were in high school and met through a mutual friend. Life took us on different paths and we lost touch for years. We were busy living our separate lives, but in December 2020, thanks to COVID-19, serendipity struck. We reconnected and met for coffee, intending to just be friends. However, after just two weeks of spending every day together, our connection grew stronger than ever, and friendship slyly became love.
                        <br /><br />
                        During our time together, we expanded our little family by adopting three perfect cats: Thosa, Sapa, and Omnica. Thosa and Omnica are incredibly special, each bravely navigating life with just three legs. Sapa is just special in his own way. Of course, our family wouldn’t be complete without Isaac’s smart and handsome son, Roman, who already fondly calls Savannah “Step-mom”.
                        <br /><br />
                        After more than three happy years together, Isaac romantically proposed in the snow with a custom-made ring, and Savannah said "Yes!".
                        <br /><br />
                        We are thrilled to invite you to our wedding as we celebrate our love and commitment at the beautiful <strong>RedSmith Ranch on Tuesday, October 15th, 2024.</strong> Surrounded by our cherished family and friends, we look forward to making unforgettable memories on this special day.
                    </p>
                </div>
            </motion.section>

            <motion.section
                className="bg-cover min-h-screen flex flex-col justify-center items-center text-white relative py-12 md:py-24"
                style={{ backgroundImage: `url(${thirdPhoto})`, backgroundPosition: 'center 40%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 py-12 px-4 bg-black bg-opacity-60 rounded-lg max-w-3xl mx-auto text-center mb-5">
                    <h2 className="text-4xl md:text-5xl font-great-vibes font-bold mb-6">Special Requests</h2>
                    <p className="text-base md:text-lg">
                        Please wear wedding-appropriate attire, but we'd love for our guests to wear Converse Chuck Taylor All Star, preferably high tops, in any color you prefer.
                    </p>
                    <div className="flex justify-center">
                        <img src={chucks} alt="Chucks" className="max-w-full h-auto" />
                    </div>
                    <p className="text-base md:text-lg mt-9">
                        Please help us create our wedding playlist! Click on the button below to make your song requests.
                    </p>
                    <div className="flex justify-center mt-2">
                        <Link 
                            href={route("music.index", { encrypted })}
                            className="inline-flex items-center px-4 py-2 mt-6 bg-emerald-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                        >
                            <img src={ipodIcon} alt="Chucks" className='w-20'/>
                        </Link>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="bg-cover min-h-screen flex flex-col justify-center items-center text-white relative py-12 md:py-24"
                style={{ backgroundImage: `url(${redSmithRanch})`, backgroundPosition: 'center 40%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 py-12 px-4 bg-black bg-opacity-60 rounded-lg max-w-3xl mx-auto text-center mb-5">
                    <h2 className="text-4xl md:text-5xl font-great-vibes font-bold mb-6">Join Us at RedSmith Ranch</h2>
                    <p className="text-base md:text-lg mb-6">
                        We are excited to celebrate our special day with you at the beautiful RedSmith Ranch. For your convenience, here are the directions:
                    </p>
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=19292+Atkins+Rd,+Lodi,+CA+95240"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 mb-6"
                    >
                        Directions to RedSmith Ranch
                    </a>
                    <h2 className="text-4xl md:text-5xl font-great-vibes font-bold mb-6">Gifts</h2>
                    <p className="text-base md:text-lg mb-6">
                        Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we would greatly appreciate contributions to our honeymoon fund via Venmo.
                    </p>
                    <a
                        href="https://account.venmo.com/u/IsaacHHB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                    >
                        Donate via Venmo
                    </a>
                </div>
            </motion.section>
            <iframe 
                width="100%" 
                height="600" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=38.159738485524244,%20-121.0900281788738+(RedSmith%20Ranch)&amp;t=k&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="mb-6"
            ></iframe>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>© 2024 Isaac & Savannah. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}