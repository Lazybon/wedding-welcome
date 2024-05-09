import * as RadioGroup from '@radix-ui/react-radio-group'
import { useForm, Controller } from 'react-hook-form'
import queryString from 'query-string'
import { send } from 'emailjs-com'

const FormRow = ({ control, question, name, values }) => {
  return (
    <div className="flex flex-col pl-2 mb-2 last:mb-0">
      <h2 className="mb-1 text-[18px] font-bold">{question}</h2>

      <Controller
        control={control}
        name={name}
        rules={{ minLength: 2 }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup.Root
            className="flex flex-col gap-y-1 pl-2"
            onValueChange={onChange}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {values.map((item, idx) => (
              <div key={idx} className="flex cursor-pointer">
                <RadioGroup.Item
                  name={`radio-${name}`}
                  className="radio checked:bg-black-500"
                  value={item}
                  checked={value === item}
                />
                <label className="label-text ml-2" htmlFor={`radio-${name}`}>
                  {item}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
        )}
      />
    </div>
  )
}

const Form = ({ inputs, openNoti, guestName }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      transfer: undefined,
      food: undefined,
      alcohol: undefined,
      infant: undefined,
    },
  })
  const log = watch()

  const { id } = queryString.parse(window.location.search)
  const disabledButton = log.transfer && log.food && log.alcohol && log.infant

  const onSubmit = (data) => {
    const toSend = {
      from_name: guestName,
      to_name: 'Alexey',
      message: `Имя: ${id},
                Транспорт: ${data.transfer},
                Еда: ${data.food},
                Алкоголь: ${data.alcohol},
                Ребенок: ${data.infant}`,
      reply_to: '',
    }
    send('service_kgupzdh', 'template_uii74zm', toSend, 'sMC48ee0B7lFTIHgO')
      .then((response) => {
        openNoti({ open: true, type: 'success', message: 'Отправлено! =)' })
        window.localStorage.setItem('user-form', 'ok')
        setTimeout(
          () => openNoti({ open: false, type: 'info', message: '' }),
          2000
        )
      })
      .catch((err) => {
        console.log('FAILED...', err)
      })
  }

  return (
    <form className="flex flex-col bg-[#ffffff] max-w-[550px] w-full p-2 rounded-[5px] ">
      <h1 className="text-[25px] text-center font-bold mb-2">
        Несколько вопросов, о вас, для нас =)
      </h1>
      {inputs.map((item, idx) => (
        <FormRow {...item} key={idx} control={control} />
      ))}
      <button
        className="btn mt-4 w-full bg-[#333333] text-white"
        disabled={!disabledButton}
        onClick={handleSubmit(onSubmit)}
      >
        <span className="icon-[fa-solid--check]" />
        Отправить
      </button>
    </form>
  )
}

export default Form
