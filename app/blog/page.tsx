'use client';

import { useState, useEffect } from 'react';
import PostList, { PostListItem } from "@/components/PostList";
import Paginator from "@/components/Paginator";
import Spinner from "@/components/Spinner";
import ContextSwitch from "@/components/ContextSwitch";
import Search from "@/components/Search";

export interface PostListData {
    categoryName: string;
    countryEnum: string;
    isNews: boolean;
    isGeneralWorkingAbroadInformations: boolean;
    items: PostListItem[];
    itemsCount: number;
    currentPage: number;
    totalPages: number;
}

const fetchPosts = async (pageNumber: number, type: 'candidate' | 'recruiter', searchPhrase: string): Promise<PostListData> => {
    const res = await fetch(`https://api.europa.jobs/blog?Type=${type}&pageNumber=${pageNumber}&searchPhrase=${searchPhrase}`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

export default function BlogPage() {
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [inputPage, setInputPage] = useState<string>("1");
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<'candidate' | 'recruiter'>('candidate');
    const [searchPhrase, setSearchPhrase] = useState<string>("");

    const fetchAndSetPosts = async (pageNumber: number, type: 'candidate' | 'recruiter', searchPhrase: string) => {
        setLoading(true);
        try {
            const data = await fetchPosts(pageNumber, type, searchPhrase);
            setPosts(data.items);
            setCurrentPage(data.currentPage > 0 ? data.currentPage : 1);
            setTotalPages(data.totalPages > 0 ? data.totalPages : 1);
            setInputPage(String(data.currentPage > 0 ? data.currentPage : 1));
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchAndSetPosts(currentPage, type, searchPhrase);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, type, searchPhrase]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            setInputPage(String(page));
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

    const handleTypeChange = () => {
        setType(type === 'candidate' ? 'recruiter' : 'candidate');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(e.target.value);
    };

    const clearSearch = () => {
        setSearchPhrase("");
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center items-center my-4 space-y-4 md:space-y-0 md:space-x-4">
                <Search loading={loading}
                        value={searchPhrase}
                        onChange={handleSearchChange}
                        onClear={clearSearch} />
                <ContextSwitch type={type}
                               onChange={handleTypeChange}
                               loading={loading} />
            </div>
            {loading ? (
                <Spinner size={'lg'} />
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
