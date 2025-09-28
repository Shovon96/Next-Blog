"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export const create = async (data: FormData) => {
    const blogInfo = Object.fromEntries(data.entries());
    const modifiedData = {
        ...blogInfo,
        authorId: 1,
        tags: blogInfo.tags.toString().split(",").map((tag: string) => tag.trim()),
        isFeatured: Boolean(blogInfo.isFeatured)
    }
    console.log(modifiedData)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(modifiedData)
    })
    const result = await res.json()
    if (result?.id) {
        revalidatePath("/blogs"),
            revalidateTag("BLOGS"),
            redirect("/blogs")
    }
    return result
}