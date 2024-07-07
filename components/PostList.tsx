import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    key: string;
    mediaUrl: string;
    addedAt: string;
}

interface PostListProps {
    posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
    if (!posts || posts.length === 0) {
        return <p className="text-center text-gray-500 mt-5">No posts available.</p>;
    }

    return (
        <div className="flex flex-col p-5 space-y-6">
            {posts.map((post) => (
                <Link href={`blog/post/${post.key}`} key={post.id}>
                    <div className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="w-1/3 md:w-1/4">
                            <img
                                src={post.mediaUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-4 w-2/3 md:w-3/4">
                            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-600">{new Date(post.addedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PostList;
