import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";
import { IPost } from "@/types";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
    next: { revalidate: 60 },
  });
  const { data: posts } = await res.json();

  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto my-8">
        {
          posts.slice(0, 3)?.map((post: IPost) => (
            <BlogCard key={post?.id} post={post} />
          ))
        }
      </div>
    </div>
  );
}
