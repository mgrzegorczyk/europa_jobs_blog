import PostList from "@/components/PostList";

const fetchPosts = async (pageNumber: number) => {
    const res = await fetch(`https://api.europa.jobs/blog?Type=candidate&pageNumber=${pageNumber}`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    // TODO remove fetch timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return res.json();
};


export default async function Blog(){
    const data = await fetchPosts(1);

    return (
        <PostList posts={data.items}></PostList>
    );
}