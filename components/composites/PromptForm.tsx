'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, Input, Select } from '@/components/primitives'

import { ContentType, type ITextGeneratorInput } from '@/services'

const options = [
  { value: ContentType.Poem, label: 'Poem' },
  { value: ContentType.Monologue, label: 'Monologue' },
]

interface Props {
  onSubmit: SubmitHandler<ITextGeneratorInput>
}

const PromptForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITextGeneratorInput>({
    defaultValues: { topic: '', contentType: '' as ContentType },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-64 w-full flex flex-col gap-2"
    >
      <Input
        {...register('topic', { required: true, maxLength: 32 })}
        type="text"
        placeholder="Write topic..."
      />
      <Controller
        control={control}
        name="contentType"
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            onChange={(value) => onChange(value)}
            value={value}
            options={options}
            placeholder="Select format..."
          />
        )}
      />
      <Button type="submit">Compose</Button>
    </form>
  )
}

export default PromptForm
