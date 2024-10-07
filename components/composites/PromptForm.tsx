import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, Input, Select } from '@/components/primitives'

import { ContentType } from '@/services'

const options = [
  { value: ContentType.Poem, label: 'Poem' },
  { value: ContentType.Monologue, label: 'Monologue' },
]

interface Inputs {
  topic: string
  format: ContentType
}

interface Props {
  onSubmit: SubmitHandler<Inputs>
}

const PromptForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-96 flex flex-col gap-1"
    >
      <Input
        {...register('topic', { required: true, maxLength: 32 })}
        type="text"
        placeholder="Write topic..."
      />
      <Controller
        control={control}
        name="format"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
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
