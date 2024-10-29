'use client'

import TemplateModel from '@/models/TemplateModel'
import { useEffect, useState } from 'react';
import FormLoveHistory from './_components/form-love-history';
import FormLoveDeclaration from './_components/form-love-declaration';
import FormBirthdayCelebration from './_components/form-birthday-celebration';
import AppStyle from '../../styles/AppGlobal.module.css'
import { useParams } from 'next/navigation';
import { TemplateType } from '../../../../types/templates-types';

export default function FormTemplate() {
    const { templateId } = useParams()
    const [template, setTemplate] = useState<TemplateModel | null>(null)	
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await fetch(`/api/templates/${templateId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch template. Error: ' + response)
                }

                const data: TemplateModel = await response.json()
                setTemplate(data)
            } catch {
                console.error('Failed to fetch template')
            } finally {
                setLoading(false)
            }
        }
        fetchTemplate()
    }, [templateId])

    const renderTemplateForm = () => {
        switch(template?.name) {
            case TemplateType.LOVE_HISTORY:
                return <FormLoveHistory />
            case TemplateType.LOVE_DECLARATION:
                return <FormLoveDeclaration />
            case TemplateType.BIRTHDAY_CELEBRATION:
                return <FormBirthdayCelebration />
        }
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className={AppStyle['page-title']}>Crie sua página de {template?.name}</h1>
            <p className={AppStyle['page-subtitle']}>
                Lembre-se de preencher essas informações com carinho, pois serão exibidas na sua página personalizada
            </p>

            {loading ? (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className={AppStyle.loader}></div>
                </div>
            ) : (
                renderTemplateForm()
            )}
        </div>
    )
}