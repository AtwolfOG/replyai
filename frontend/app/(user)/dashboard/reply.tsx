import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/copytoclipboard";

export function Reply({reply}: {reply: string}) {
    return (
        
            <div>
                <div className="flex items-center justify-between p-(--space-4) border-b">
                    <h4 className="text-(--text-primary)">Reply</h4>
                    <Button variant="outline" onClick={() => copyToClipboard(reply)}>Copy</Button>
                </div>
                <div className="p-(--space-4)">
                    <p className="whitespace-pre-wrap text-pretty">{reply}</p>
                </div>
            </div>
    )
}