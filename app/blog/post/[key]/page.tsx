import PostDetails, {PostDetailsData} from "@/components/PostDetails";
import {composeScalar} from "yaml/dist/compose/compose-scalar";

interface PostDetailsProps {
    params: {
        key: string;
    };
}

const fetchPost = async (key: string): Promise<PostDetailsData> => {
    const res = await fetch(`https://api.europa.jobs/blog/article/${key}`);
    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    // TODO remove fetch timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return res.json();
};

export default async function PostByKey({ params }: PostDetailsProps) {
    const post = await fetchPost(params.key);

    if (!post) {
        return <p className="text-red-500 text-center mt-5">Post {params.key} is not available.</p>;
    }

    return (
        <PostDetails params={
            {postDetails: post}
        }/>
    );
}
