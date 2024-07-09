import React from 'react';

export interface JobOffer {
    id: number;
    slug: string;
    title: string;
    videoUrl?: string | null;
    employer: {
        id: number;
        name: string;
        logoUrl?: string;
    };
    location: {
        country: string;
        countryName: string;
        location: string;
        cityName?: string | null;
        cityId?: number | null;
    };
    salary?: {
        amount?: number | null;
        amountMin?: number;
        amountMax?: number;
        frequency: string;
        type: string;
        currency: string;
    } | null;
}

interface JobOfferCardProps {
    offer: JobOffer;
}

const JobOfferCard = ({ offer }: JobOfferCardProps) => {
    return (
        <a href={`/offers/${offer.slug}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
            <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12">
                    <svg className="w-6 h-6 text-gray-500 absolute top-2 left-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7h-1V4a4 4 0 00-8 0v3H6a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2zM8 7V4a2 2 0 114 0v3H8z" />
                    </svg>
                </div>
                <div className="text-left">
                    <h3 className="text-sm font-semibold mb-1">{offer.title}</h3>
                    <p className="text-xs text-gray-500 mb-1">{offer.employer.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{offer.location.countryName}</p>
                    {offer.salary && (
                        <p className="text-xs text-gray-700">{offer.salary.amountMin} - {offer.salary.amountMax} {offer.salary.currency} {offer.salary.frequency}</p>
                    )}
                </div>
            </div>
        </a>
    );
};

export default JobOfferCard;
