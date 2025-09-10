// components/CustomEditor.tsx
'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Alignment,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontSize,
  HorizontalLine,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css'; // <-- required styles (can move to app/layout.tsx if you prefer)

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  rows?: number;
};

export default function CustomEditor({
  value = '',
  onChange,
  rows = 30,
}: Props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'GPL', // or your license string
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Link,
          List,
          Indent,
          BlockQuote,
          Table,
          TableToolbar,
          Alignment,
          FontSize,
          FontColor,
          FontBackgroundColor,
          HorizontalLine,
          SpecialCharacters,
          RemoveFormat,
        ],
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'undo',
          'redo',
          '|',
          'alignment',
          '|',
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'horizontalLine',
          'specialCharacters',
          '|',
          'removeFormat',
        ],
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        language: 'id',
      }}
      data={value}
      onReady={(editor: ClassicEditor) => {
        (editor.ui.view.editable.element as HTMLElement).style.minHeight =
          `${rows * 20}px`;
      }}
      onFocus={(_, editor: ClassicEditor) => {
        (editor.ui.view.editable.element as HTMLElement).style.minHeight =
          `${rows * 20}px`;
      }}
      onBlur={(_, editor: ClassicEditor) => {
        (editor.ui.view.editable.element as HTMLElement).style.minHeight =
          `${rows * 20}px`;
      }}
      onChange={(_, editor: ClassicEditor) => {
        onChange?.(editor.getData());
      }}
    />
  );
}
