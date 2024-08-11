import { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';

interface News {
  id: string;
  title: string;
  summary: string;
  image: string;
  paragraphs: string[];
  comments: any[];
}

const NewsManagement: React.FC = () => {
  const { user } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [formData, setFormData] = useState({ title: '', summary: '', image: '', paragraphs: [''] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const fetchNews = async () => {
        const querySnapshot = await getDocs(collection(db, 'news'));
        const newsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as News[];
        setNews(newsList);
      };

      fetchNews();
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImageAndGetUrl = async (file: File) => {
    const fileRef = ref(storage, `images/${file.name}`);
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);
    return imageUrl;
  };

  const handleSubmit = async () => {
    if (user) {
      let imageUrl = formData.image;
      if (file) {
        imageUrl = await uploadImageAndGetUrl(file);
      }

      const newFormData = { ...formData, image: imageUrl };

      if (selectedNewsId) {
        const newsRef = doc(db, 'news', selectedNewsId);
        await updateDoc(newsRef, newFormData);
        setNews((prevNews) =>
          prevNews.map((n) =>
            n.id === selectedNewsId ? { ...n, ...newFormData } : n
          )
        );
        setSelectedNewsId(null);
      } else {
        const docRef = await addDoc(collection(db, 'news'), newFormData);
        setNews([...news, { id: docRef.id, ...newFormData, comments: [] }]);
      }

      setFormData({ title: '', summary: '', image: '', paragraphs: [''] });
      setFile(null);
    }
  };

  const editNews = (id: string) => {
    setSelectedNewsId(id);
    const selectedNews = news.find((n) => n.id === id);
    if (selectedNews) {
      setFormData({ title: selectedNews.title, summary: selectedNews.summary, image: selectedNews.image, paragraphs: selectedNews.paragraphs });
    }
  };

  const deleteNews = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, 'news', id));
      setNews(news.filter((n) => n.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const viewComments = (id: string) => {
    console.log('View comments for news with ID:', id);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    setFormData({ ...formData, paragraphs: [...formData.paragraphs, ''] });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = formData.paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const filteredNews = news.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.paragraphs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return <div>Please log in to manage news.</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-gray-300 text-center font-bold mb-6">NEWS MANAGEMENT</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-gray-700 bg-gray-200">Title</th>
                <th className="p-2 text-gray-700 bg-gray-200">Summary</th>
                <th className="p-2 text-gray-700 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((n) => (
                <tr key={n.id}>
                  <td className="p-2 text-gray-300 border">{n.title}</td>
                  <td className="p-2 text-gray-300 border">{n.summary}</td>
                  <td className="p-2 text-gray-300 border flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => editNews(n.id)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNews(n.id)}
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => viewComments(n.id)}
                      className="bg-gray-500 text-white font-bold py-1 px-2 rounded hover:bg-gray-700"
                    >
                      View Comments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-gray-900 mt-5 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-gray-300 text-center font-bold mb-6"> MANAGE NEWS </h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="News title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="News summary"
            rows={2}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formData.image && <img src={formData.image} alt="News" className="mt-2 max-w-full h-auto" />}
        </div>
        <div className="mt-4">
          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center mb-2 space-y-2 sm:space-y-0 sm:space-x-2">
              <textarea
                placeholder={`Paragraph ${index + 1}`}
                rows={4}
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
              ></textarea>
              <button
                onClick={() => removeParagraph(index)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addParagraph}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-green-700"
          >
            Add Paragraph
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
        >
          {selectedNewsId !== null ? 'Update News' : 'Add News'}
        </button>
      </div>
    </div>
  );
};

export default NewsManagement;
