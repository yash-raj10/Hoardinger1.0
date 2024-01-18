'use client';
import React from 'react'

interface HeadingProp{
    title: string;
    subtitle?: string;
    centre?:boolean;
}

// type Props = {}

const Heading = ({
    title,
    subtitle,
    centre
}: HeadingProp) => {


  return (
    <div className={centre? 'text-center': 'text-start'}>
        <div className='text-2xl font-bold'>
            {title}
        </div>
        <div className='font-light text-neutral-500 mt-2'>
        {subtitle}
        </div>
    </div>
  )
}

export default Heading;