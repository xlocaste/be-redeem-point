import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className='flex gap-1 items-center p-2'>
            <div className='h-8 w-8'>
                <img src="/assets/image/logo.png" alt="" className='mx-auto h-full'/>
            </div>
            <span>Web Crafters</span>
        </div>
    );
}
