// src/components/post_form/Post_Form.jsx
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"; // your components index
import service from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Post_Form = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((s) => s.auth.userData);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        // keep slug as post.slug if editing otherwise empty — we'll create one if empty
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // slug generator
  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value.toString().toLowerCase().trim().replace(/\s+/g, "-");
  }, []);

  // auto-generate slug when title changes (only for UX)
  useEffect(() => {
    const sub = watch((v, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(v.title));
      }
    });
    return () => sub.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      // Ensure slug exists (Appwrite collection requires slug attribute)
      if (!data.slug || data.slug.trim() === "") {
        data.slug = slugTransform(data.title || Date.now().toString());
      }

      // Upload file if provided
      let fileId = post?.featuredimage || null;
      if (data.image && data.image[0]) {
        // pass user id for owner perms
        const uploaded = await service.uploadfile(data.image[0], userData?.$id);
        if (uploaded) fileId = uploaded.$id;
      }

      // If editing (post exists), update
      if (post) {
        const updated = await service.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredimage: fileId,
          slug: data.slug,
          userid: userData?.$id,
        });
        if (updated) navigate(`/post/${updated.$id}`);
        return;
      }

      // Create new post
      const created = await service.createPost({
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredimage: fileId,
        userid: userData?.$id,
      });

      if (created) navigate(`/post/${created.$id}`);
    } catch (err) {
      console.error("Submit Error:", err);
      // you can set state to show UI error if desired
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input label="Title" {...register("title", { required: true })} />
        <Input label="Slug" {...register("slug", { required: true })} />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          type="file"
          label="Image"
          accept="image/*"
          {...register("image")}
        />
        {post?.featuredimage && (
          <img
            src={service.getFilePreview(post.featuredimage)}
            alt="featured"
            className="rounded mb-4 w-full object-cover max-h-48"
          />
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          {...register("status")}
        />
        <Button className="w-full mt-4">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default Post_Form;
