import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

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
