import { Link } from "react-router-dom";
import { useLendingContext } from "../../store/LendingStore";
import { BookOpen, Calendar, Clock, Plus } from "lucide-react";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";

export default function LendingsList() {
  const { lendings } = useLendingContext();

  const isOverdue = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes emprunts</h1>
          <p className="text-gray-600">Gérez vos livres empruntés et leurs dates de retour</p>
        </div>
        <Link to="/lend">
          <Button variant="accent" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel emprunt
          </Button>
        </Link>
      </div>

      {/* Lendings list */}
      {lendings && lendings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lendings.map((lending) => {
            const daysRemaining = getDaysRemaining(lending.endDate);
            const overdue = isOverdue(lending.endDate);
            
            return (
              <Link
                key={lending._id}
                to={`/lendings/${lending._id}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Book info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-950 transition-colors line-clamp-2">
                        {lending.bookId?.title || 'Titre non disponible'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{lending.bookId?.author || 'Auteur inconnu'}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Emprunté le {new Date(lending.startDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>À rendre le {new Date(lending.endDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      overdue 
                        ? 'bg-red-100 text-red-700' 
                        : daysRemaining <= 3 
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {overdue 
                        ? `En retard de ${Math.abs(daysRemaining)} jour${Math.abs(daysRemaining) > 1 ? 's' : ''}`
                        : daysRemaining === 0
                          ? 'À rendre aujourd\'hui'
                          : `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`
                      }
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      overdue ? 'bg-red-400' : daysRemaining <= 3 ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Aucun emprunt en cours"
          description="Vous n'avez actuellement aucun livre emprunté. Parcourez le catalogue pour découvrir de nouveaux livres."
          action={
            <Link to="/books">
              <Button variant="primary" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Parcourir le catalogue
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
