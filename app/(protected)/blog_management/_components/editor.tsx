import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomText } from "@/types";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Image from "next/image";
import React, { RefAttributes, useCallback, useState } from "react";
import { createEditor, Editor as SEditor, Element, Transforms } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact,
} from "slate-react";

const INITIAL_BLOG_CONTENT: Element[] = [
  {
    type: "paragraph",
    children: [{ text: "Start writing your blog post..." }],
  },
];

/**
 * The component that renders a Slate Element.
 *
 * @param attributes The props passed to the element.
 * @param children The children of the element.
 * @param element The element itself.
 */
function SlateElement({ attributes, children, element }: RenderElementProps) {
  // Switch on the element type to render the correct element.
  switch (element.type) {
    /**
     * Render a header element.
     *
     * @remarks
     * Switch on the level of the header to render the correct level of header.
     */
    case "header":
      switch (element.level) {
        case 1:
          return <h1 {...attributes}>{children}</h1>;
        case 2:
          return <h2 {...attributes}>{children}</h2>;
        case 3:
          return <h3 {...attributes}>{children}</h3>;
        case 4:
        default:
          return <h4 {...attributes}>{children}</h4>;
      }

    /**
     * Render a link element.
     */
    case "link":
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );

    /**
     * Render an image element.
     */
    case "image":
      return <Image alt={element.alt} src={element.url} {...attributes} />;

    /**
     * Render a paragraph element.
     */
    default:
      return <p {...attributes}>{children}</p>;
  }
}

/**
 * Render a leaf node.
 *
 * @remarks
 * A leaf node is a node that has no children. It is typically used to render
 * a single character or a short sequence of characters.
 *
 * @param attributes - The attributes of the leaf node.
 * @param children - The children of the leaf node.
 * @param leaf - The leaf node itself.
 */
function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  /**
   * If the leaf node is bold, wrap its children in a `strong` element.
   */
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  /**
   * If the leaf node is italic, wrap its children in an `em` element.
   */
  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  /**
   * If the leaf node is underlined, wrap its children in a `u` element.
   */
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  /**
   * Return the rendered leaf node.
   */
  return <span {...attributes}>{children}</span>;
}

/**
 * Check if a mark is active in the editor.
 *
 * @param editor - The editor to check.
 * @param format - The mark to check.
 * @returns `true` if the mark is active, `false` otherwise.
 */
const isMarkActive = (
  editor: any,
  format: keyof Omit<CustomText, "text">
): boolean => {
  /**
   * Get the marks from the editor.
   */
  const marks = SEditor.marks(editor);

  /**
   * If the marks are present, check if the mark is active.
   */
  return marks ? marks[format] === true : false;
};

/**
 * Toggle a mark in the editor.
 *
 * @param editor - The editor to toggle the mark in.
 * @param format - The mark to toggle.
 */
const toggleMark = (
  editor: any,
  format: keyof Omit<CustomText, "text">
): void => {
  /**
   * Check if the mark is already active in the editor.
   */
  const isActive = isMarkActive(editor, format);

  /**
   * If the mark is active, remove it. Otherwise, add it.
   */
  if (isActive) {
    SEditor.removeMark(editor, format);
  } else {
    SEditor.addMark(editor, format, true);
  }
};

/**
 * A button to toggle a mark in the editor.
 *
 * @param props - The properties of the button.
 * @param props.format - The mark to toggle.
 * @param props.icon - The icon to display in the button.
 * @returns The button element.
 */
function MarkButton({
  format,
  icon: Icon,
}: {
  format: keyof Omit<CustomText, "text">;
  icon:
    | React.ComponentType<React.SVGAttributes<SVGElement>>
    | React.ComponentType<IconProps & RefAttributes<SVGSVGElement>>;
}): JSX.Element {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  /**
   * Handle the click event of the button.
   */
  const handleClick = () => {
    toggleMark(editor, format);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(isActive && "bg-accent")}
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <Icon />
    </Button>
  );
}

/**
 * Toggle the header level of the selected text.
 *
 * @param editor - The Slate editor.
 * @param level - The level of the header.
 */
const toggleHeading = (editor: any, level: number): void => {
  const isActive = isHeadingActive(editor, level);
  if (isActive) {
    // If the header is already active, toggle it off by setting the type to
    // "paragraph".
    Transforms.setNodes(editor, { type: "paragraph" });
  } else {
    // If the header is not active, toggle it on by setting the type to "header"
    // and the level to the specified level.
    Transforms.setNodes(editor, { type: "header", level });
  }
};

/**
 * Check if the current selection is a header of the specified level.
 *
 * @param editor - The Slate editor.
 * @param level - The level of the header.
 * @returns `true` if the selection is a header of the specified level,
 *     `false` otherwise.
 */
const isHeadingActive = (editor: any, level: number) => {
  const { selection } = editor;
  if (!selection) return false;

  // Find the first matching header element in the selection.
  const [match] = Array.from(
    SEditor.nodes(editor, {
      // Match elements that are not the editor itself, are elements, have the
      // type "header", and have the specified level.
      match: (n: any) =>
        !SEditor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === "header" &&
        n.level === level,
    })
  );

  // Return `true` if a match was found, `false` otherwise.
  return !!match;
};

/**
 * A button that toggles the current selection to a header of the specified
 * level.
 *
 * @param level - The level of the header.
 */
function HeadingButton({ level }: { level: number }): JSX.Element {
  const editor = useSlate();
  const isActive = isHeadingActive(editor, level);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(isActive && "bg-accent")}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => toggleHeading(editor, level)}
    >
      H{level}
    </Button>
  );
}

/**
 * A toolbar that provides buttons for formatting Slate editor content.
 *
 * The toolbar provides buttons for formatting text as bold, italic, or
 * underlined, as well as buttons for formatting headings at levels 1-4.
 *
 * @returns A Slate editor toolbar.
 */
function ToolBar() {
  return (
    <div className="mb-4 divide-x flex gap-2 divide-gray-300">
      <div className="space-x-1">
        <MarkButton format="bold" icon={FontBoldIcon} />
        <MarkButton format="italic" icon={FontItalicIcon} />
        <MarkButton format="underline" icon={UnderlineIcon} />
      </div>
      <div className="space-x-1 px-2">
        <HeadingButton level={1} />
        <HeadingButton level={2} />
        <HeadingButton level={3} />
        <HeadingButton level={4} />
      </div>
    </div>
  );
}

/**
 * A Slate editor component.
 *
 * The component takes an optional `initialValue` property, which should be a
 * string representation of the initial Slate document.
 *
 * The component takes an `onValueChange` property, which is a function that will
 * be called whenever the user changes the Slate document. The function will
 * receive the new Slate document as a string argument.
 *
 * The component renders a Slate editor with a toolbar, which provides buttons
 * for formatting text as bold, italic, or underlined, as well as buttons for
 * formatting headings at levels 1-4.
 *
 * The component renders the Slate editor with an editable element as its child.
 * The editable element will render the Slate document as HTML.
 *
 * @param initialValue - The initial value of the Slate document, as a string
 * representation of the document.
 * @param onValueChange - A function that will be called whenever the user
 * changes the Slate document. The function will receive the new Slate document
 * as a string argument.
 */
function Editor({
  initialValue,
  onValueChange,
}: {
  initialValue?: string;
  onValueChange: (value: string) => void;
}) {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  return (
    <Slate
      editor={editor}
      initialValue={
        initialValue?.[0] ? JSON.parse(initialValue) : INITIAL_BLOG_CONTENT
      }
      onChange={(value) => onValueChange(JSON.stringify(value))}
    >
      <ToolBar />
      <Editable
        className="focus:outline-none"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

export default Editor;
