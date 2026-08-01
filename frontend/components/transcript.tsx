import { Button } from "@/components/ui/button";
import { RotatingBtn } from "./rotatingbtn";

export function Transcript({transcript, dispatch, editable}: {transcript: string, dispatch: (action: Action) => void, editable: boolean}) {
    return (
        <div className=" shadow-lg rounded-xl rounded-t-none pt-0 row-2 bg-(--surface)">
          <div className="bg-(--primary)/10 p-(--space-4) flex items-center justify-between">
              <div className="flex items-center gap-(--space-2)">
                <h4 className="text-(--text-primary)">Transcript</h4>
                {editable && <RotatingBtn>Editable</RotatingBtn>}
              </div>
              {editable && <Button variant="outline" className="bg-(--surface) cursor-pointer" onClick={() => dispatch({ type: "CLEAR_TRANSCRIPT" })}>Clear</Button>}
          </div>
          <div className="p-(--space-4) rounded-b-xl border">
            <textarea contentEditable={editable} name="transcript" id="transcript" onChange={editable ?  (e) => dispatch({ type: "SET_TRANSCRIPT", payload: e.target.value }) : undefined} value={transcript} className="resize-none w-full h-70 bg-(--surface-muted) border rounded-xl p-(--space-4)"></textarea>
          </div>
      </div>
    )
}