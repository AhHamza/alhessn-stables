import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function HorseForm() {
  const { id } = useParams(); // taken from the url from app.jsx(<Route path='/admin/horses/:id/edit' )
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
    images: "",
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImages = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("images", f));
      const res = await api.post("/horses/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newUrls = res.data.urls.join(", ");
      setForm((prev) => ({
        ...prev,
        images: prev.images ? prev.images + ", " + newUrls : newUrls,
      }));
    } catch {
      setError("Image upload failed.");
    }
    setUploading(false);
  };
  useEffect(() => {
    if (!isEditing) return;
    api
      .get(`/horses/${id}`)
      .then((res) => {
        const h = res.data;
        setForm({
          name: h.name,
          age: h.age,
          breed: h.breed,
          description: h.description,
          images: h.images?.join(", ") || "",
        });
      })
      .catch(() => setError("Failed to load horse."))
      .finally(() => setLoading(false));
  }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.breed || !form.age) {
      setError("Name, breed and age are required."); //the component's return() will be called here since setError() is a state and each time a state changes the component rerenders
      return;
    }
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
      };
      if (isEditing) {
        await api.patch(`/horses/${id}`, payload);
      } else {
        await api.post("/horses", payload);
      }
      navigate("/admin/horses");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (loading)
    return <div className="pt-40 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs tracking-[0.4em] text-gold uppercase mb-1">
          Admin Panel
        </p>
        <h1 className="font-serif text-4xl text-cream">
          {isEditing ? "Edit Horse" : "Add New Horse"}
        </h1>
      </div>

      <div className="bg-dark-card border border-dark-border p-8 flex flex-col gap-5">
        <input
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Horse Name *"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <input
          name="breed"
          value={form.breed}
          onChange={handle}
          placeholder="Breed *"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handle}
          placeholder="Age *"
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handle}
          placeholder="Description"
          rows={4}
          className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none"
        />
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-gray-500">
            Photos
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={uploadImages}
            className="w-full bg-dark border border-dark-border text-cream px-4 py-3 text-sm"
          />
          {uploading && <p className="text-gold text-xs">Uploading...</p>}
          {form.images && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.split(",").map((url, i) => (
                <img
                  key={i}
                  src={url.trim()}
                  alt=""
                  className="w-20 h-16 object-cover border border-dark-border"
                />
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-4 mt-2">
          <button
            onClick={submit}
            className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors"
          >
            {isEditing ? "Save Changes" : "Add Horse"}
          </button>
          <button
            onClick={() => navigate("/admin/horses")}
            className="border border-dark-border text-gray-400 px-8 py-3 tracking-widest uppercase text-sm hover:border-gold hover:text-gold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
