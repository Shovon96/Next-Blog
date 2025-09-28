import BlogCard from "@/components/modules/Blogs/BlogCard";
import { IPost } from "@/types";

export const generateMetadata = async () => {
    return {
        title: "All Blogs",
        description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui."
    }
}

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
    cache: "no-store"
  });
  const { data: posts } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto my-8">
        {
          posts.slice(0, 3)?.map((post: IPost) => (
            <BlogCard key={post?.id} post={post} />
          ))
        }
      </div>
    </div>
  );
};

export default AllBlogsPage;
