import { useBookContext } from "../../store/BookStore";
import { useState } from "react";
import { BookOpen, Plus, Edit, Trash2, User, Calendar } from "lucide-react";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";

export default function AdminBooks() {
  const { books, create, update, delete: remove } = useBookContext();
  const [form, setForm] = useState({ 
    title: "", 
    author: "", 
    description: "", 
    publishedDate: "" 
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await update(editingId, form);
        setEditingId(null);
      } else {
        await create(form);
      }
      setForm({ title: "", author: "", description: "", publishedDate: "" });
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : ""
    });
    setEditingId(book._id);
  };

  const cancelEdit = () => {
    setForm({ title: "", author: "", description: "", publishedDate: "" });
    setEditingId(null);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      try {
        await remove(bookId);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const isFormValid = form.title && form.author && form.description && form.publishedDate;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des livres</h1>
          <p className="text-gray-600">Ajoutez, modifiez ou supprimez des livres du catalogue</p>
        </div>
        <div className="bg-blue-950 text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold">
          {books?.length || 0} livre{(books?.length || 0) !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Add/Edit form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Modifier le livre" : "Ajouter un nouveau livre"}
            </h2>
            <p className="text-gray-600">
              {editingId ? "Modifiez les informations du livre" : "Remplissez les informations du livre"}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du livre
              </label>
              <input
                placeholder="Entrez le titre"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auteur
              </label>
              <input
                placeholder="Nom de l'auteur"
                value={form.author}
                onChange={(e) => updateForm("author", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de publication
            </label>
            <input
              type="date"
              value={form.publishedDate}
              onChange={(e) => updateForm("publishedDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Description du livre"
              rows={4}
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 resize-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant="accent"
              className="gap-2"
              isLoading={loading}
              disabled={!isFormValid}
            >
              <Plus className="w-4 h-4" />
              {loading ? "Sauvegarde..." : editingId ? "Sauvegarder" : "Ajouter le livre"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="secondary"
                onClick={cancelEdit}
              >
                Annuler
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Books list */}
      {books && books.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Book header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <User className="w-4 h-4" />
                      <span>{book.author}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {book.description}
                </p>

                {/* Publication date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {book.publishedDate 
                      ? new Date(book.publishedDate).toLocaleDateString('fr-FR')
                      : 'Date inconnue'
                    }
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 flex-1"
                    onClick={() => startEdit(book)}
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDelete(book._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Aucun livre dans le catalogue"
          description="Commencez par ajouter votre premier livre pour enrichir le catalogue."
        />
      )}
    </div>
  );
}
