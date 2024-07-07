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
        return <p>Post {params.key} is not available.</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            {post.mediaUrl && (
                <img
                    src={post.mediaUrl}
                    alt={post.title}
                    style={{ width: '800px', height: '600px' }}
                />
            )}
            {post.sections.map((section, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: section.content }} />
            ))}
        </div>
    );
}
