import { Link } from "react-router-dom";
import { useBookContext } from "../../store/BookStore";
import { useMemo, useState } from "react";
import { Search, BookOpen, User, Plus } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import EmptyState from "../../components/EmptyState";

export default function BooksList() {
  const { books } = useBookContext();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return books;
    return (books||[]).filter(b =>
      b.title?.toLowerCase().includes(s) ||
      b.author?.toLowerCase().includes(s) ||
      b.description?.toLowerCase().includes(s)
    );
  }, [books, q]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue des livres</h1>
          <p className="text-gray-600">Découvrez notre collection de livres disponibles</p>
        </div>
        <Link to="/lend">
          <Button variant="accent" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel emprunt
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher par titre, auteur..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Results count */}
      {q && (
        <div className="text-sm text-gray-600">
          {filtered?.length || 0} résultat{(filtered?.length || 0) !== 1 ? 's' : ''} pour "{q}"
        </div>
      )}

      {/* Books grid */}
      {filtered && filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-blue-300" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-950 transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <User className="w-4 h-4" />
                  <span>{book.author}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {book.publishedDate ? new Date(book.publishedDate).getFullYear() : ''}
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full" title="Disponible" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title={q ? "Aucun livre trouvé" : "Aucun livre disponible"}
          description={q ? `Aucun résultat pour "${q}". Essayez d'autres mots-clés.` : "Il n'y a actuellement aucun livre dans le catalogue."}
        />
      )}
    </div>
  );
}
