import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { IPost } from "@/types";


export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
    const {data: blogs} = await res.json()
    return blogs?.slice(0, 2)?.map((blog: IPost) => ({
        blogId: String(blog?.id)
    }))
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ blogId: string }> }) {

    const { blogId } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/${blogId}`);
    const blog = await res.json()

    return (
        <div>
            <BlogDetailsCard key={blog?.id} blog={blog} />
        </div>
    )
}
