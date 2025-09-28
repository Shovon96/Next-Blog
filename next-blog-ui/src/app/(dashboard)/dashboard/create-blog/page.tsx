import CreateBlogForm from "@/components/modules/Blogs/CreateBlogForm";

const CreateBlog = () => {
  return (
    <div className="w-full mx-auto pb-12">
      <h1 className="text-4xl font-semibold text-gray-700 text-center p-8">Create a Blog</h1>
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
