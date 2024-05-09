import * as RadioGroup from '@radix-ui/react-radio-group'
import { useForm, Controller } from 'react-hook-form'
import queryString from 'query-string'
import { send } from 'emailjs-com'

const FormRow = ({ control, question, name, values }) => {
  return (
    <div className="bg-[#ffffff] flex flex-col my-1 last:mb-0 border-2 pb-1">
      <h2 className="mb-1.5 text-[18px] font-bold pl-2">{question}</h2>
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
            {values.map(
              (item, idx) =>
                console.log(item) || (
                  <div key={idx} className="flex cursor-pointer mb-0.5 items-center">
                    <RadioGroup.Item
                      name={`radio-${name}`}
                      className="radio checked:bg-black-500"
                      value={item}
                      checked={value === item}
                    />
                    <label
                      className="label-text ml-1"
                      htmlFor={`radio-${name}`}
                    >
                      {item}
                    </label>
                  </div>
                )
            )}
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
  const { id } = queryString.parse(window.location.search)
  const log = watch()
  const disabledButton = log.transfer && log.food && log.alcohol && log.infant

  const onSubmit = (data) => {
    const toSend = {
      from_name: guestName,
      to_name: 'Alexey',
      message: `Гость: ${id},
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
    <form className="flex flex-col  max-w-[550px] w-full p-2 rounded-[5px]">
      {/* <h1 className="text-[25px] text-center font-bold mb-2">
         Несколько вопросов, о вас, для нас =) 
      </h1> */}
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
