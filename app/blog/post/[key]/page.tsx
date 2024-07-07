import Skeleton from "@/components/Skeleton";

interface Section {
    type: string;
    content: string;
    alternativeText?: string | null;
}

interface Post {
    title: string;
    metaDescription: string;
    mediaUrl?: string;
    sections: Section[];
}

interface PostDetailProps {
    params: {
        key: string;
    };
}

const fetchPost = async (key: string): Promise<Post> => {
    const res = await fetch(`https://api.europa.jobs/blog/article/${key}`);
    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    // TODO remove fetch timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return res.json();
};

export default async function PostDetail({ params }: PostDetailProps) {
    const post = await fetchPost(params.key);

    if (!post) {
        return <p className="text-red-500 text-center mt-5">Post {params.key} is not available.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-5">{post.title}</h1>
            {post.mediaUrl && (
                <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-full max-w-4xl h-auto rounded-lg mb-5"
                />
            )}
            {post.sections.map((section, index) => (
                <div
                    key={index}
                    className="prose prose-lg mb-5"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />
            ))}
        </div>
    );
}
