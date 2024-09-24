import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/setup";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage
import { UserContext } from "./UserContext";
import { useContext } from "react";

const PostAd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [category,setCategory]=useState('');
    const [message, setMessage] = useState('');
    const [loading,setLoading]=useState(false);

    const {user} = useContext(UserContext);

    const productCollection = collection(db, "products");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !image || !category) {
            setMessage("Please fill all fields");
            return;
        }

        if(!user){
            setMessage("You must be logged in to post an ad.")
            return;
        }

        setLoading(true);

        try {
            console.log("Image to upload:", image);

            const storage = getStorage();
            const imageRef = ref(storage, `ads/${image.name}`);

            // Upload image to Firebase Storage
            console.log("Uploading image...");
            const uploadResult = await uploadBytes(imageRef, image);
            console.log("Image uploaded successfully:", uploadResult);

            // Get the image URL from Firebase Storage
            const imageUrl = await getDownloadURL(uploadResult.ref);
            console.log("Image URL retrieved:", imageUrl);

            // Add the product details, including the user's UID, to Firestore
            const docRef = await addDoc(productCollection, {
                title,
                description,
                price,
                imageUrl,
                category,
                userId: user.uid, // Include user's UID
                createdAt: new Date(),
            });

            console.log("Document added with ID:", docRef.id);
            setMessage('Ad posted successfully!');
            setLoading(false);

            // Clear the form after successful submission
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);

        } catch (err) {
            console.error("Error adding document:", err);
            setMessage('Error posting the ad');
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Post Your Ad</h1>
            {message && <p>{message}</p>}
            {loading && <p>Uploading and saving the ad...</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        className="border p-2 w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Post Ad
                </button>
            </form>
        </div>
    );
}

export default PostAd;
