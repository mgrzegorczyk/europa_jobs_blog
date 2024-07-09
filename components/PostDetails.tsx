import React from 'react';
import JobOfferCard, { JobOffer } from './JobOfferCard';
import RecommendedPostCard, { RecommendedPost } from './RecommendedPostCard';

export interface PostDetailsData {
    title: string;
    metaDescription: string;
    mediaUrl?: string;
    lastEditedAt?: string | null;
    sections: PostDetailsSection[];
    recommended: RecommendedPost[];
    offers: JobOffer[];
}

export interface PostDetailsSection {
    type: string;
    content: string;
    alternativeText?: string | null;
}

interface PostDetailsProps {
    params: {
        postDetails: PostDetailsData
    };
}

export default function PostDetails({ params }: PostDetailsProps) {
    const { postDetails } = params;

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-5">{postDetails.title}</h1>
            {postDetails.mediaUrl && (
                <img
                    src={postDetails.mediaUrl}
                    alt={postDetails.title}
                    className="w-full h-auto rounded-lg mb-5"
                />
            )}
            {postDetails.lastEditedAt && (
                <p className="text-gray-500 mb-5">Last edited at: {new Date(postDetails.lastEditedAt).toLocaleDateString()}</p>
            )}
            {postDetails.sections.map((section, index) => (
                <div
                    key={index}
                    className="prose prose-lg mb-5"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />
            ))}

            {postDetails.recommended.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Recommended Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {postDetails.recommended.map((recPost) => (
                            <RecommendedPostCard key={recPost.id} post={recPost} />
                        ))}
                    </div>
                </div>
            )}

            {postDetails.offers.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Job Offers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {postDetails.offers.map((offer) => (
                            <JobOfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
