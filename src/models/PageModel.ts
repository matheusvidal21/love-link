import UserModel from './UserModel';
import TemplateModel from './TemplateModel';

export default interface Page {
    id: string;
    userId: string;
    templateId: string;
    customizationData: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserModel;
    template: TemplateModel;
  }