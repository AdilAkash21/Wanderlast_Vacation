'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const unsplashLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    return url.toString();
};

const DestinationCard = ({ destination }) => {
    const {
        image,
        price,
        destinationName,
        duration,
        country,
        description,
    } = destination;

    return (
        <article className="group overflow-hidden rounded-3xl border border-[#dce9e7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden">
                <Image
                    loader={typeof image === 'string' && image.startsWith('https:') ? unsplashLoader : undefined}
                    src={image ?? '/assets/Wanderlast.png'}
                    alt={destinationName}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Price Badge */}
                <div className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-[#08726f] shadow">
                    ${price}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3 p-5">
                
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#173a3d]">
                        {destinationName}
                    </h2>

                    <span className="rounded-full bg-[#e4f7f5] px-3 py-1 text-xs font-bold text-[#08726f]">
                        {duration}
                    </span>
                </div>

                <p className="text-sm font-semibold text-[#5d7375]">
                    {country}
                </p>

                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {description}
                </p>

                {/* Button */}
                <Link
                    href={`/destinations/${destination._id}`}
                >
                    <button className="mt-3 w-full rounded-full bg-[#0f9f9a] py-3 font-bold text-white transition hover:bg-[#08726f]">
                        View trip
                    </button>
                </Link>
            </div>
            </article>
    );
};

export default DestinationCard;
