import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookContext } from "../../store/BookStore";
import { createLending } from "../../api/lending";
import { BookOpen, Calendar, ArrowLeft, Plus } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function LendingForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { books } = useBookContext();
  const [bookId, setBookId] = useState(state?.bookId || "");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set default end date to 2 weeks from now
  useEffect(() => {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    setEndDate(twoWeeksFromNow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!bookId && books?.length) {
      setBookId(books[0]._id);
    }
  }, [books, bookId]);

  const selectedBook = books?.find(b => b._id === bookId);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await createLending({ bookId, endDate });
      navigate("/lendings");
    } catch (error) {
      setError("Erreur lors de la création de l'emprunt. Veuillez réessayer.");
      console.error("Error creating lending:", error);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 3 months max

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nouvel emprunt</h1>
              <p className="text-gray-600">Choisissez un livre et définissez la durée d'emprunt</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="p-8 space-y-6">
          {/* Book selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Livre à emprunter
            </label>
            <select 
              value={bookId} 
              onChange={(e) => setBookId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
              required
            >
              {books?.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} — {book.author}
                </option>
              ))}
            </select>
          </div>

          {/* Selected book preview */}
          {selectedBook && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{selectedBook.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedBook.author}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{selectedBook.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* End date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Date de retour prévue
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                min={minDate}
                max={maxDate}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                required 
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Durée maximale : 3 mois
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              variant="accent" 
              size="lg"
              className="gap-2 flex-1"
              isLoading={loading}
              disabled={!bookId || !endDate}
            >
              <Plus className="w-5 h-5" />
              {loading ? "Création en cours..." : "Confirmer l'emprunt"}
            </Button>
            <Button 
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
