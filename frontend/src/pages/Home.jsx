import React from 'react'
import { useMemo, useState } from "react";
import { UploadCard } from "../components/UploadCard";
import { CaptionCard } from "../components/CaptionCard";
import { useNavigate } from 'react-router-dom';


const styles = [
  { value: "casual", label: "Casual 😎" },
  { value: "professional", label: "Professional 💼" },
  { value: "funny", label: "Funny 😂" },
  { value: "poetic", label: "Poetic ✨" },
];

function Home() {
  const [imageFile, setImageFile] = useState(null);
  // imageUrl can come from backend after upload, but we don't render it directly here
  const [style, setStyle] = useState(styles[0].value);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const preview = useMemo(() => {
    if (!imageFile) return "";
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  function onPickImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setCaption("");
  }

  function removeImage() {
    setImageFile(null);
    setCaption("");
  }

  async function handleGenerate() {
    setError("");
    setCaption("");
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("image", imageFile);
      // style currently not used by backend, but we include for future
      form.append("style", style);

      const res = await fetch("https://ai-captionar.onrender.com/api/posts", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (res.status === 401) {
        navigate('/login');
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to generate caption");
      }
      const data = await res.json();
      setCaption(data?.post?.caption || "");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-4 grid lg:grid-cols-2 gap-6">
      <UploadCard
        preview={preview}
        onPickImage={onPickImage}
        removeImage={removeImage}
        style={style}
        setStyle={setStyle}
        styles={styles}
      />
      <CaptionCard
        isLoading={isLoading}
        imageFile={imageFile}
        handleGenerate={handleGenerate}
        caption={caption}
        error={error}
      />
    </main>
  );
}


export default Home;
