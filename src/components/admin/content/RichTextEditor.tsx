import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const content = document.querySelector("[contenteditable=true]")?.innerHTML;
    if (content) onChange(content);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex items-center gap-1 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => handleCommand("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkInput(!showLinkInput)}
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyLeft")}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyCenter")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyRight")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      {showLinkInput && (
        <div className="p-2 bg-gray-50 border-b flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            className="flex-1 px-2 py-1 text-sm border rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand("createLink", e.currentTarget.value);
                setShowLinkInput(false);
              }
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLinkInput(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      <div
        className="p-4 min-h-[200px] prose max-w-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}
