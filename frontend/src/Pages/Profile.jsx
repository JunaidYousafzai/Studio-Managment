"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProfile, editProfile } from "../api/profile";
import { useAuth } from "../context/AuthContextProvider";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { cn } from "../../lib/utils";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 0 8px rgba(139,92,246,0.7)" },
  tap: { scale: 0.95 },
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [originalData, setOriginalData] = useState({ username: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setFormData(res.data.profile);
        setOriginalData(res.data.profile);
        setError("");
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await editProfile(formData);
      setOriginalData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-white">Loading profile...</div>;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container md:border-1 hover:border-pink-600 mt-5 shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-black"
    >
      <h2 className="text-xl font-bold text-neutral-200 text-center">Profile</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300 text-center">
        View and edit your account
      </p>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <form className="my-8" onSubmit={handleUpdate}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="your_username"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="abc@example.com"
            type="email"
          />
        </LabelInputContainer>

        <div className="flex justify-between items-center">
          {!isEditing ? (
            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsEditing(true)}
              className="group/btn w-full rounded-md bg-gradient-to-br to-neutral-600 from-zinc-900 px-6 py-2 text-white shadow"
            >
              Edit Profile
              <BottomGradient />
            </motion.button>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <motion.button
                type="submit"
                disabled={updating}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group/btn rounded-md bg-gradient-to-br to-green-600 from-zinc-900 px-6 py-2 text-white shadow"
              >
                {updating ? "Saving..." : "Save Changes"}
                <BottomGradient />
              </motion.button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md bg-zinc-700 text-white px-6 py-2 hover:bg-zinc-600 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />
        <button
          onClick={logout}
          type="button"
          className="text-red-500 hover:underline text-center w-full"
        >
          Sign Out
        </button>
      </form>
    </motion.div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-indigo-100 via-purple-400 to-pink-600 opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-indigo-100 via-purple-400 to-pink-600 opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);
