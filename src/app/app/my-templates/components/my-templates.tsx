import { FileText } from 'lucide-react'
import AppStyle from '../../styles/AppGlobal.module.css'

export default function MyTemplates() {
    return (
        <div>
            <div className='flex items-center space-x-2 mb-6'>
                <FileText className="h-8 w-8 text-red-500" />
                <h1 className={AppStyle['page-title']}>Meus Templates</h1>
            </div>
            <p className={AppStyle['page-subtitle']}>
                Aqui você pode visualizar todos os templates que você criou.
            </p>
            
        </div>
    )
}