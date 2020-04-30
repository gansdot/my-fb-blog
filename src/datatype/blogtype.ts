export interface Blog {
  id?: string;
  blogTitle: string;
  blogCategory: string;
  slug?: string;
  postedOn: Date;
  author: string;
  imgUrl: string;
  blogText: string;
}

export interface BlogProps {
  title: string;
  value: any;
  required: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BlogEditorProps {
  onEditorChange: (value: string) => void;
}

export interface BlogEditorState {
  editorHtml: string;
  //quill: any;
}

export type PostProps = {
  id: string;
  blog?: Blog[];
};

type errStatus = "primary" | "success" | "danger" | "warning";
type progStatus = "info" | "success" | "danger" | "warning";

export type Status = {
  style: errStatus;
  message: string;
  status: string;
  variant?: progStatus;
};
