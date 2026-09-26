export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-text/60 mt-1">
          Bienvenue dans l'espace d'administration de NakamaNet.
        </p>
      </div>
      
      {/* We can add general metrics here later like active users, pending reports, etc */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-accent/50 border border-border/50 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-text/70 text-sm font-medium mb-2">Statut du Système</h3>
          <p className="text-2xl font-bold text-green-500 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            Opérationnel
          </p>
        </div>
        
        <div className="bg-accent/50 border border-border/50 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-text/70 text-sm font-medium mb-2">Sécurité</h3>
          <p className="text-2xl font-bold">Niveau Nominal</p>
        </div>

        <div className="bg-accent/50 border border-border/50 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-text/70 text-sm font-medium mb-2">Action Requise</h3>
          <p className="text-2xl font-bold">Aucune</p>
        </div>
      </div>
    </div>
  )
}
