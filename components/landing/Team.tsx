'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: 'Carl Plata',
    title: 'Software Engineer',
    avatar: './avatars/Carl-Plata.png',
    linkedin: 'https://www.linkedin.com/in/carlmplata/',
    github: 'https://github.com/carlmatsumotoplata',
  },
  {
    name: 'Jackie Wang',
    title: 'Software Engineer',
    avatar: './avatars/Jackie-Wang.png',
    linkedin: 'http://www.linkedin.com/in/jiaqi-jackie-wang',
    github: 'https://github.com/jiaqiwang1105',
  },
  {
    name: 'Menachem Malachowski',
    title: 'Software Engineer',
    avatar: './avatars/Menachem-Malachowski.png',
    linkedin: 'https://www.linkedin.com/in/menachemmalachowski/',
    github: 'https://github.com/mendoul',
  },
  {
    name: 'Jie Feng',
    title: 'Software Engineer',
    avatar: '/avatars/Jie-Feng.png',
    linkedin: 'https://www.linkedin.com/in/jie-feng-347b59123/',
    github: 'https://github.com/fengjie8791/',
  },
];

const TeamSection = () => {
  return (
    <section id='team' className='bg-gray-50 py-16 px-6 md:px-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>Meet the Team</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center'>
        {teamMembers.map((member, index) => (
          <div key={index} className='text-center'>
            {/* Avatar */}
            <img
              src={member.avatar}
              alt={member.name}
              className='w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md'
            />

            {/* Name & Title */}
            <h3 className='text-xl font-semibold'>{member.name}</h3>
            <p className='text-gray-600 mb-4'>{member.title}</p>

            {/* Social Links */}
            <div className='flex justify-center space-x-4'>
              <a
                href={member.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:text-blue-800 text-xl'
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href={member.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-800 hover:text-black text-xl'
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
