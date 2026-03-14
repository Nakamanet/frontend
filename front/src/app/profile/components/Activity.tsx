import PostCards from "../../components/PostCards";
import { User } from "../../types/auth";

export default function Activity({ user }: { user: User }) {

    // A modifier quand les routes seront intégrées
    const posts = [
        {
            id: 1,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Bonjour, comment ça va ?",
            created_at: "2026-03-10T12:00:00.000000Z",
            updated_at: "2026-03-10T12:00:00.000000Z",
        },
        {
            id: 2,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Aujourd'hui j'ai fini la nouvelle saison de #SNK et c'etait vraiment lourd !",
            created_at: "2026-03-06T12:00:00.000000Z",
            updated_at: "2026-03-06T12:00:00.000000Z",
        },
        {
            id: 3,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Mais qu'es ce qui lui arrive a Erenn ? Il a pété son crane ou quoi ?",
            created_at: "2026-03-01T12:00:00.000000Z",
            updated_at: "2026-03-01T12:00:00.000000Z",
        },
        {
            id: 4,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Woaw le Gear 5 c'est quoi cette dinguerie ?!",
            created_at: "2026-02-25T12:00:00.000000Z",
            updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
            id: 5,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Je viens de commencer la nouvelle saison de #OnePiece et c'est vraiment une bombe !",
            created_at: "2026-02-18T12:00:00.000000Z",
            updated_at: "2026-02-18T12:00:00.000000Z",
        },
    ];

    return (
        <div className="flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]">
            <h3 className="text-2xl font-bold">Mes posts</h3>
            {posts.map((post) => (
                <PostCards key={post.id} post={post} />
            ))}
        </div>
    );
}
