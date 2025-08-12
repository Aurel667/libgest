import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getLendingById, returnLending } from "../../api/lending";
import { BookOpen, User, Calendar, Clock, ArrowLeft, RotateCcw } from "lucide-react";
import Button from "../../components/Button";

export default function LendingDetails() {
  const { id } = useParams();
  const [lending, setLending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLending = async () => {
      setLoading(true);
      try {
        const data = await getLendingById(id);
        setLending(data);
      } catch (error) {
        console.error("Error fetching lending:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLending();
  }, [id]);

  const handleReturn = async () => {
    setReturning(true);
    try {
      await returnLending(id);
      navigate('/lendings');
    } catch (error) {
      console.error("Error returning book:", error);
    } finally {
      setReturning(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950" />
      </div>
    );
  }

  if (!lending) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Emprunt non trouvé</h2>
        <p className="text-gray-600 mb-6">Cet emprunt n'existe pas ou a été supprimé.</p>
        <Link to="/lendings">
          <Button variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour aux emprunts
          </Button>
        </Link>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(lending.endDate);
  const overdue = isOverdue(lending.endDate);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link to="/lendings" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Retour aux emprunts
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Détails de l'emprunt</h1>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
            overdue 
              ? 'bg-red-100 text-red-700' 
              : daysRemaining <= 3 
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
          }`}>
            <Clock className="w-4 h-4" />
            {overdue 
              ? `En retard de ${Math.abs(daysRemaining)} jour${Math.abs(daysRemaining) > 1 ? 's' : ''}`
              : daysRemaining === 0
                ? 'À rendre aujourd\'hui'
                : `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`
            }
          </div>
        </div>

        <div className="p-8">
          {/* Book info */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {lending.bookId?.title || 'Titre non disponible'}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <User className="w-4 h-4" />
                <span>{lending.bookId?.author || 'Auteur inconnu'}</span>
              </div>
              {lending.bookId?.description && (
                <p className="text-gray-700 text-sm">
                  {lending.bookId.description}
                </p>
              )}
            </div>
          </div>

          {/* Lending details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Date d'emprunt</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(lending.startDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Date de retour</span>
              </div>
              <p className={`text-lg font-semibold ${overdue ? 'text-red-600' : 'text-gray-900'}`}>
                {new Date(lending.endDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="accent" 
              size="lg"
              className="gap-2 flex-1"
              onClick={handleReturn}
              isLoading={returning}
            >
              <RotateCcw className="w-5 h-5" />
              Rendre le livre
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
  );
}
