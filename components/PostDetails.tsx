export interface PostDetailsData {
    title: string;
    metaDescription: string;
    mediaUrl?: string;
    sections: PostDetailsSection[];
}

export interface PostDetailsSection {
    type: string;
    content: string;
    alternativeText?: string | null;
}

interface PostDetailsProps {
    params: {
        postDetails: PostDetailsData
    };
}

export default function PostDetails({ params }: PostDetailsProps){
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-5">{params.postDetails.title}</h1>
            {params.postDetails.mediaUrl && (
                <img
                    src={params.postDetails.mediaUrl}
                    alt={params.postDetails.title}
                    className="w-full max-w-4xl h-auto rounded-lg mb-5"
                />
            )}
            {params.postDetails.sections.map((section, index) => (
                <div
                    key={index}
                    className="prose prose-lg mb-5"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />
            ))}
        </div>
    )
}