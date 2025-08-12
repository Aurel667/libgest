import { useLendingContext } from "../../store/LendingStore";
import { BookOpen, User, Calendar, Clock, Trash2, AlertCircle } from "lucide-react";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";

export default function AdminLendings() {
  const { lendings, delete: remove } = useLendingContext();

  const handleDelete = async (lendingId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet emprunt ?")) {
      try {
        await remove(lendingId);
      } catch (error) {
        console.error("Error deleting lending:", error);
      }
    }
  };

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

  const getStatusInfo = (endDate) => {
    const daysRemaining = getDaysRemaining(endDate);
    const overdue = isOverdue(endDate);
    
    if (overdue) {
      return {
        text: `En retard de ${Math.abs(daysRemaining)} jour${Math.abs(daysRemaining) > 1 ? 's' : ''}`,
        color: 'bg-red-100 text-red-700',
        dot: 'bg-red-400'
      };
    } else if (daysRemaining <= 3) {
      return {
        text: daysRemaining === 0 ? 'À rendre aujourd\'hui' : `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`,
        color: 'bg-yellow-100 text-yellow-700',
        dot: 'bg-yellow-400'
      };
    } else {
      return {
        text: `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`,
        color: 'bg-green-100 text-green-700',
        dot: 'bg-green-400'
      };
    }
  };

  const overdueCount = lendings?.filter(l => isOverdue(l.endDate)).length || 0;
  const soonDueCount = lendings?.filter(l => {
    const days = getDaysRemaining(l.endDate);
    return days <= 3 && days >= 0;
  }).length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des emprunts</h1>
          <p className="text-gray-600">Surveillez et gérez tous les emprunts en cours</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-950 text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold">
            {lendings?.length || 0} emprunt{(lendings?.length || 0) !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Stats */}
      {lendings && lendings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Emprunts actifs</p>
                <p className="text-2xl font-bold text-gray-900">{lendings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">À rendre bientôt</p>
                <p className="text-2xl font-bold text-gray-900">{soonDueCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lendings list */}
      {lendings && lendings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lendings.map((lending) => {
            const status = getStatusInfo(lending.endDate);
            
            return (
              <div key={lending._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  {/* Book info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {lending.bookId?.title || 'Titre non disponible'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{lending.bookId?.author || 'Auteur inconnu'}</p>
                    </div>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <User className="w-4 h-4" />
                    <span>ID Utilisateur: {lending.userId}</span>
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
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                      {status.text}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                  </div>

                  {/* Actions */}
                  <Button
                    variant="danger"
                    size="sm"
                    className="gap-2 w-full"
                    onClick={() => handleDelete(lending._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer l'emprunt
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Aucun emprunt en cours"
          description="Il n'y a actuellement aucun emprunt à gérer."
        />
      )}
    </div>
  );
}
