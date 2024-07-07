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

const PostList = ({posts}: PostListProps) => {

    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <div>
            {posts.map(post => (
                <Link href={`blog/post/${post.key}`} key={post.id}>
                    <div>
                        <h2>{post.title}</h2>
                        <img src={post.mediaUrl} alt={post.title}/>
                        <p>{new Date(post.addedAt).toLocaleDateString()}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PostList;
