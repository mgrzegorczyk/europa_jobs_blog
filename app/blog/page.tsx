import PostList, {PostListItem} from "@/components/PostList";

export interface PostListData {
    categoryName: string,
    countryEnum: string,
    isNews: boolean,
    isGeneralWorkingAbroadInformations: boolean,
    items: PostListItem[],
    itemsCount: number,
    currentPage:number,
    totalPages:number,
}

const fetchPosts = async (pageNumber: number): Promise<PostListData> => {
    const res = await fetch(`https://api.europa.jobs/blog?Type=candidate&pageNumber=${pageNumber}`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    // TODO remove fetch timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return res.json();
};


export default async function BlogPage(){
    const data = await fetchPosts(1);

    return (
        <PostList posts={
            data.items
        }/>
    );
}