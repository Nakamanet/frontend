export default function SearchBarPage({ className }: { className?: string }) {
    return (
        <div className={`flex justify-center ${className ? className : ""}`}>
            <input className={`input input-borderd w-full bg-border rounded-full ${className ? className : ""}`} placeholder="Rechercher une oeuvre" />
        </div>
    )
}