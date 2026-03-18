export default async function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
    const { genre } = await params;

    return (
        <main className="max-w-[1500px] mx-auto h-[90vh] p-13">
            <h1 className="text-2xl">les oeuvres de genre {genre}</h1>
            <p className="flex items-center justify-center h-full">Cette partie sera disponible dans une prochaine mise à jour</p>
        </main>
    );
}