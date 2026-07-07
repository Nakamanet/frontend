import { Forum } from "../types/forum";
import Link from "next/link";
import { MessageSquare, Eye, ThumbsUp } from "lucide-react";

export default function ForumCards({ topic }: { topic: Forum}) {
    return (
        <Link href={`/forum/${topic.id}`} key={topic.id}>
            <div className="flex flex-col border border-border bg-accent rounded-[15px] gap-4 p-4 hover:bg-white/2 transition cursor-pointer">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-bold text-white">{topic.user?.username || 'Anonyme'}</span>
                <span className="text-xs text-border">
                • {new Date(topic.created_at).toLocaleDateString('fr-FR')}
                </span>
            </div>

            <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
            <p className="text-[14px] text-border line-clamp-2">{topic.content}</p>

            <div className="flex flex-col gap-3 mt-2">
                <div>
                <span className="text-[10px] font-bold px-3 py-1 bg-alerts text-white rounded-full uppercase tracking-wide">
                    {topic.category}
                </span>
                </div>
                <div className="flex items-center gap-6 text-border text-sm font-medium">
                <span className="flex items-center gap-1.5 hover:text-alerts transition-colors">
                    <MessageSquare size={16} /> {topic.replies_count}
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                    <Eye size={16} />{topic.views_count ?? 0}
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                    <ThumbsUp size={16} />{topic.votes_count ?? 0}
                </span>
                </div>
            </div>
            </div>
        </Link>
    )
}