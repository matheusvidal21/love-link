'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns'
import { CalendarIcon, Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { useDebounce } from 'use-debounce'
import { Loader } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js';
import { TemplateKey } from '@/types/templates-keys'
import { config } from '@/config'

type FormValues = {
  yourName: string
  personName: string
  meetDate: Date
  meetLocation: string
  achievements: { text: string; date: Date }[]
  goals: { text: string }[]
  feelings: string[]
  photos: FileList
  finalMessage: string
}

const feelings = [
  'Paixão', 'Companheirismo', 'Cuidado', 'Admiração', 'Gratidão',
  'Perseverança', 'Intimidade', 'Respeito', 'Empatia', 'Harmonia',
  'Segurança', 'Lealdade', 'Alegria', 'Confiança'
]

export default function FormLoveHistory() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: "achievements"
  })
  const { fields: goalFields, append: appendGoal, remove: removeGoal } = useFieldArray({
    control,
    name: "goals"
  })
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)
  type Suggestion = {
    place_id: string;
    display_name: string;
  };
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoadingQuery, setIsLoadingQuery] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoadingQuery(true)
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}&addressdetails=1&limit=4`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data)
          setIsLoadingQuery(false)
        })
        .catch(error => {
          console.error('Erro ao buscar endereços:', error)
          setIsLoadingQuery(false)
        })
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const onSubmit = async (data: FormValues) => {
    setIsLoadingButton(true)
    console.log(data)
    try {
      const url = new URL(window.location.href)
      const templateId = url.pathname.split('/').pop()
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: templateId,
          formData: data,
        }),
      })

      const { orderId, error } = await response.json()

      if (error) {
        console.error('Error creating order:', error)
        setIsLoadingButton(false)
        return
      }

      await handleBuyNow(TemplateKey.LOVE_HISTORY, orderId)
    } catch (error) {
      console.error('Error creating order:', error)
      setIsLoadingButton(false)
    }
  }

  const handleBuyNow = async (templateKey: string, orderId: string) => {
    const cancelUrl = window.location.href;
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(
          { 
            orderId,
            templateKey,
            cancelUrl
          }),
      });
    
      const { sessionId, error } = await response.json()
    
      if (error) {
        console.error('Error creating checkout session:', error)
        setIsLoadingButton(false)
        return
      }
    
      const stripe = await loadStripe(config.stripe.publishableKey!)
      await stripe?.redirectToCheckout({ sessionId })

    } catch (error) {
      console.error('Error redirecting to checkout:', error)
      setIsLoadingButton(false)
    } finally {
      setIsLoadingButton(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yourName">Seu nome</Label>
                <Input id="yourName" {...register("yourName", { required: "Seu nome é obrigatório" })} />
                {errors.yourName && <p className="text-red-500 text-sm">{errors.yourName.message}</p>}
              </div>
              <div>
                <Label htmlFor="personName">Nome da pessoa</Label>
                <Input id="personName" {...register("personName", { required: "Nome da pessoa é obrigatório" })} placeholder='Insira o nome da pessoa homenageada'/>
                {errors.personName && <p className="text-red-500 text-sm">{errors.personName.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meetDate">Quando se conheceram?</Label>
              <Controller
                control={control}
                name="meetDate"
                rules={{ required: "A data é obrigatória" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.meetDate && <p className="text-red-500 text-sm">{errors.meetDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="meetLocation">Onde se conheceram?</Label>
              <Controller
                control={control}
                name="meetLocation"
                rules={{ required: "O local é obrigatório" }}
                render={({ field }) => (
                  <Combobox value={field.value} onChange={field.onChange}>
                    <div className="relative">
                      <Combobox.Input
                        as={Input}
                        onChange={(event) => {
                          setQuery(event.target.value)
                          field.onChange(event.target.value)
                        }}
                        className="w-full"
                        placeholder="Digite um local"
                      />
                      {isLoadingQuery && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <Loader className="h-5 w-5 animate-spin" />
                        </div>
                      )}
                      {suggestions.length > 0 && (
                        <Combobox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10 shadow-lg">
                          {suggestions.map((suggestion) => (
                            <Combobox.Option
                              key={suggestion.place_id}
                              value={suggestion.display_name}
                              className={({ active }) =>
                                `cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                                  active ? 'bg-red-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {suggestion.display_name}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                )}
              />
              {errors.meetLocation && <p className="text-red-500 text-sm">{errors.meetLocation.message}</p>}
            </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
          </CardHeader>
          <CardContent>
            {achievementFields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-2 mb-4">
                <div className="flex-grow">
                  <Label htmlFor={`achievements.${index}.text`}>Conquista</Label>
                  <Input {...register(`achievements.${index}.text` as const, { required: "Texto da conquista é obrigatório" })} />
                </div>
                <div>
                  <Label htmlFor={`achievements.${index}.date`}>Data</Label>
                  <Input type="date" {...register(`achievements.${index}.date` as const, { required: "Data da conquista é obrigatório" })} />
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeAchievement(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" className="bg-red-600 hover:bg-red-500 text-white" onClick={() => appendAchievement({ text: '', date: new Date() })}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objetivos</CardTitle>
          </CardHeader>
          <CardContent>
            {goalFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-4">
                <Input {...register(`goals.${index}.text` as const, { required: "Objetivos é obrigatório" })} />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeGoal(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" className="bg-red-600 hover:bg-red-500 text-white" onClick={() => appendGoal({ text: '' })}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) => {
                if (selectedFeelings.length < 3 && !selectedFeelings.includes(value)) {
                  setSelectedFeelings([...selectedFeelings, value])
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione sentimentos (max 3)" />
              </SelectTrigger>
              <SelectContent>
                {feelings.map((feeling) => (
                  <SelectItem key={feeling} value={feeling}>
                    {feeling}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedFeelings.map((feeling) => (
                <Button
                  key={feeling}
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedFeelings(selectedFeelings.filter(f => f !== feeling))}
                >
                  {feeling} <Trash2 className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="file"
              accept="image/*"
              multiple
                {...register("photos", {
                required: "Por favor, envie pelo menos uma foto",
                validate: (value) => value.length <= 3 || "Máximo de 3 fotos permitidas"
                })}
            />
            {errors.photos && <p className="text-red-500 text-sm">{errors.photos.message}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mensagem final</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register("finalMessage", { required: "Mensagem final é obrigatório" })}
              rows={5}
            />
            {errors.finalMessage && <p className="text-red-500 text-sm">{errors.finalMessage.message}</p>}
          </CardContent>
        </Card>
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white">
          {isLoadingButton ? (
            <div className="flex justify-center items-center">
              <Loader className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            "Criar página personalizada"
          )}
        </Button>
      </form>
    </div>
  )
}

