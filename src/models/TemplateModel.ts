import PageModel from './PageModel';

export default interface Template {
    id: string;
    name: string;
    description?: string | null;
    thumbnail?: string | null;
    createdAt: Date;
    updatedAt: Date;
    pages: PageModel[];
}
  