import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById } from "../../api/books";
import { BookOpen, User, Calendar, ArrowLeft, Plus } from "lucide-react";
import Button from "../../components/Button";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Livre non trouvé</h2>
        <p className="text-gray-600 mb-6">Ce livre n'existe pas ou a été supprimé.</p>
        <Link to="/books">
          <Button variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link to="/books" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Retour au catalogue
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book cover placeholder */}
          <div className="md:w-1/3">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-blue-400" />
            </div>
          </div>

          {/* Book details */}
          <div className="md:w-2/3 p-8">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {book.title}
                </h1>

                <div className="flex items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{book.author}</span>
                  </div>
                  {book.publishedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(book.publishedDate).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Availability status */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium text-green-700">Disponible</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="accent" 
                  size="lg"
                  className="gap-2 flex-1"
                  onClick={() => navigate('/lend', { state: { bookId: id } })}
                >
                  <Plus className="w-5 h-5" />
                  Emprunter ce livre
                </Button>
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(-1)}
                >
                  Retour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
