import React from 'react';
import Image from "next/image";

export interface RecommendedPost {
    id: number;
    title: string;
    key: string;
    mediaUrl: string;
    addedAt: string;
}

interface RecommendedPostCardProps {
    post: RecommendedPost;
}

const RecommendedPostCard = ({ post } : RecommendedPostCardProps) => {
    return (
        <a href={`/posts/${post.key}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image src={post.mediaUrl}
                   alt={post.title}
                   className="w-full h-32 object-cover"
                   layout="responsive"
                   width={16}
                   height={9}
            />
            <div className="p-2">
                <h3 className="text-sm font-semibold">{post.title}</h3>
                <p className="text-xs text-gray-500">{new Date(post.addedAt).toLocaleDateString()}</p>
            </div>
        </a>
    );
};

export default RecommendedPostCard;
