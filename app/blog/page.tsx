'use client'

import { useState, useEffect } from 'react';
import PostList, { PostListItem } from "@/components/PostList";
import Paginator from "@/components/Paginator";
import Spinner from "@/components/Spinner";

export interface PostListData {
    categoryName: string,
    countryEnum: string,
    isNews: boolean,
    isGeneralWorkingAbroadInformations: boolean,
    items: PostListItem[],
    itemsCount: number,
    currentPage: number,
    totalPages: number,
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

export default function BlogPage() {
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [inputPage, setInputPage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchAndSetPosts = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await fetchPosts(pageNumber);
            setPosts(data.items);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSetPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    const handlePageSubmit = () => {
        const page = parseInt(inputPage, 10);
        if (!isNaN(page) && page > 0 && page <= totalPages) {
            handlePageChange(page);
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner size={'lg'}/>
            ) : (
                <PostList posts={posts} />
            )}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                loading={loading}
                inputPage={inputPage}
                onInputChange={handleInputChange}
                onPageSubmit={handlePageSubmit}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
