import React from 'react';
import { BiCopyright } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { BiLogoFirebase } from 'react-icons/bi';
import { TbBrandTailwind } from 'react-icons/tb';

const Footer = () => {
    const size = 25;

    return (
        <div className='w-full text-sm p-2 rounded-sm text-center mt-1 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-900 duration-100'>
            <span>
                <a href="https://github.com/Erik-Varga" target="_blank" rel="noreferrer">
                    <span className='flex items-center justify-center'>
                        &copy; {(new Date().getFullYear())} Erik Varga | Web Developer
                        &nbsp;<BsGithub />
                    </span>
                </a>
                <a href="https://github.com/Erik-Varga/react-expense-tracker-app" target="_blank" rel="noreferrer" className='text-xs'>
                Source Code |&nbsp;
                </a>
            </span>
            <span className='text-xs text-slate-400'>Developed using:  <strong>React &#x2022; Firebase &#x2022; Tailwind CSS</strong></span>
            <span className='flex justify-center gap-2 text-slate-400'>
                <FaReact size={size} />
                <BiLogoFirebase size={size} />
                <TbBrandTailwind size={size} />
            </span>
        </div>
    )
}

export default Footer