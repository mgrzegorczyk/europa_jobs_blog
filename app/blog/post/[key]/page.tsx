import { notFound } from 'next/navigation';
import PostDetails, { PostDetailsData } from '@/components/PostDetails';
import Link from "next/link";

interface PostDetailsProps {
    params: {
        key: string;
    };
}

const fetchPost = async (key: string): Promise<PostDetailsData | null> => {
    const res = await fetch(`https://api.europa.jobs/blog/article/${key}`);
    if (!res.ok) {
        return null;
    }

    // TODO remove fetch timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return res.json();
};

export async function generateStaticParams() {
    const res = await fetch('https://api.europa.jobs/blog/');
    const posts = await res.json();

    return posts.items.map((post: { key: string }) => ({
        key: post.key,
    }));
}

const PostByKey = async ({ params }: PostDetailsProps) => {
    const post = await fetchPost(params.key);

    if (!post) {
        notFound();
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/blog">
                <div className="inline-flex items-center bg-gray-500 text-white py-2 px-4 rounded mb-4 hover:bg-gray-600 transition duration-300">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </div>
            </Link>
            <PostDetails params={{ postDetails: post }} />
        </div>
    );
};

export default PostByKey;

export const revalidate = 10; // Revalidate every 10 seconds
