import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "antd";
import supabase from "@/Services/supabase";
import { useClient } from "@/Context";

interface WaitlistFormData {
    name: string;
    email: string;
}

function WaitlistModal({ showModal }) {
    const { setIsModalOpen } = useClient();
    // Close modal when user clicks outside or on close icon
    const closeModal = () => setIsModalOpen(false);
    const [loading, setLoading] = useState(false);


    const addToWaitlist = async (data: WaitlistFormData) => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from("waitlist")
                .insert([{ name: data.name, email: data.email }])
                .select();

            if (error) {
                setLoading(false);
                toast.error("Error adding to waitlist");
                console.error("Error adding to waitlist:", error);
            } else {
                setLoading(false);
                console.log("Successfully added to waitlist:", data);
            }
        } catch (error) {
            setLoading(false);
            console.error("An unexpected error occurred:", error);
        }
    };

    // Hook form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        if (data.name && data.email) {
            await addToWaitlist(data);
            reset();
            closeModal();
            showSuccessToast();
        } else {
            console.error("Form submission error: Name or email missing");
        }
    };

    const showSuccessToast = () => {
        toast.success("Successfully added to waitlist!", {
            duration: 5000,
            position: "top-center",

            iconTheme: {
                primary: "#341A41",
                secondary: "#fff",
            },
        });
    };

    if (!showModal) return null; // Don't render if showModal is false

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded shadow-lg w-full mx-4 sm:w-1/2 max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Icon */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 text-3xl"
                >
                    &times;
                </button>

                {/* Modal Content */}
                <h2 className="text-2xl font-bold mb-4 text-purple-500">
                    Join Our Waitlist
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">
                            Name
                        </label>
                        <input
                            className="w-full p-2 border rounded mt-1 text-black"
                            type="text"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-600">{errors?.name?.message as string}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">
                            Email
                        </label>
                        <input
                            className="w-full p-2 border rounded mt-1 text-black"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: /^\S+@\S+$/i,
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600">{errors?.email?.message as string}</p>
                        )}
                    </div>
                    <button className="btn" disabled={loading}>
                        {loading ? "loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WaitlistModal;