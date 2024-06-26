import Countdown from 'react-countdown'
import { useState } from 'react'
import queryString from 'query-string'
import Form from './Form.jsx'
import Hands from './hands.png'
import SecondHands from './hands2.png'

function convertDaysToWeeksAndDays(totalDays) {
  let weeks = Math.floor(totalDays / 7)
  let remainingDays = totalDays % 7

  return { weeks, days: remainingDays }
}

function App() {
  const [notice, setNotice] = useState({
    open: false,
    type: undefined,
    message: '',
  })

  const { id, gen } = queryString.parse(window.location.search)

  return (
    <>
      <div className="flex flex-col">
        <section className="container flex flex-col items-center pt-[20px] mx-auto bg-main animate-fade-in-down">
          <img src={Hands} alt="hands" className="h-[450px] min-w-[350px]" />
          <div className="flex flex-col items-center mt-3">
            <span className="text-[33px] font-primary tracking-[10px]">
              Алексей
            </span>
            <span className="text-[33px] font-primary">&</span>
            <span className="text-[33px] font-primary tracking-[10px]">
              Кристина
            </span>
            <span className="text-[20px] font-primary tracking-[4px] mt-2">
              10 августа 2024
            </span>
          </div>
          <Countdown
            date={new Date('August 10, 2024 16:00:00')}
            renderer={({ days: totalDays, hours, minutes, seconds }) => {
              const { days, weeks } = convertDaysToWeeksAndDays(totalDays)
              return (
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col items-center font-primary text-[15px]">
                    <span className="countdown text-4xl font-primary">
                      <span style={{ '--value': weeks }} />
                    </span>
                    недель
                  </div>
                  <div className="flex flex-col items-center font-primary text-[15px]">
                    <span className="countdown text-4xl font-primary">
                      <span style={{ '--value': days }} />
                    </span>
                    дней
                  </div>
                  <div className="flex flex-col items-center font-primary text-[15px]">
                    <span className="countdown text-4xl font-primary">
                      <span style={{ '--value': hours }} />
                    </span>
                    часов
                  </div>
                  <div className="flex flex-col items-center font-primary text-[15px]">
                    <span className="countdown text-4xl font-primary">
                      <span style={{ '--value': minutes }} />
                    </span>
                    минут
                  </div>
                  <div className="flex flex-col items-center font-primary text-[15px]">
                    <span className="countdown text-4xl font-primary">
                      <span style={{ '--value': seconds }} />
                    </span>
                    секунд
                  </div>
                </div>
              )
            }}
          />
        </section>
        <section
          className={`flex flex-col items-center mt-5 py-6 w-full bg-[#EFEFEF] bg-[url('content.png')]`}
        >
          <div className="flex flex-col items-center bg-[#ffffff] max-w-[550px] p-3">
            <div className="text-[25px] font-primary text-center mb-3">
              Дорогой
              <br />
              Гость!
            </div>
            <div className="text-[20px] font-primary text-center">
              Мы рады сообщить Вам, что <b>10.08.2024</b> состоится самое
              главное торжество в нашей жизни - день нашей свадьбы! <br />
              Приглашаем Вас разделить с нами радость этого незабываемого дня.
            </div>
            <div className="animate-[show_1s_ease-in-out] my-1">
              <img src={SecondHands} alt="photo" className="h-[400px]" />
            </div>
            <div className="text-[33px] font-primary text-center my-1">
              Ждем вас! <br /> Ваши, Алексей и Кристина.
            </div>
            <div className="text-[20px] font-primary font-medium text-center">
              Будем благодарны, если при выборе нарядов на наше торжество вы
              придержитесь следующей палитры
            </div>
            <div className="flex flex-row gap-x-1 mt-2">
              <span className="w-[36px] h-[36px] bg-[#d6dde3] rounded-[50%]" />
              <span className="w-[36px] h-[36px] bg-[#f0eaee] rounded-[50%]" />
              <span className="w-[36px] h-[36px] bg-[#e4d8dd] rounded-[50%]" />
              <span className="w-[36px] h-[36px] bg-[#cfc0c5] rounded-[50%]" />
              <span className="w-[36px] h-[36px] bg-[#b8999f] rounded-[50%]" />
            </div>
          </div>
        </section>
        {!window.localStorage.getItem('user-form') && (
          <section className="flex flex-col items-center pb-6 w-full bg-[#EFEFEF] ">
            <Form
              guestName={id}
              openNoti={setNotice}
              inputs={[
                {
                  name: 'transfer',
                  question: 'Потребуется ли вам трансфер?',
                  values: [
                    'Нет',
                    'Только до торжества',
                    'Только после торжества',
                    'До и после торжества',
                  ],
                },
                {
                  name: 'food',
                  question: 'Есть ли у вас особые предпочтения по еде?',
                  values: ['Нет', 'Не ем мясо', 'Не ем рыбу', 'Вегетарианец'],
                },
                {
                  name: 'alcohol',
                  question: 'Какой алкоголь вы предпочитаете?',
                  values: [
                    'Красное вино',
                    'Белое вино',
                    'Шампанское',
                    'Виски/коньяк',
                    'Водка',
                    'Не буду пить алкоголь',
                  ],
                },
                {
                  name: 'infant',
                  question: 'Будет ли с вами на празднике ребенок?',
                  values: ['Да', 'Нет'],
                },
              ]}
            />
          </section>
        )}
        <section className="flex flex-col items-center pb-6 w-full bg-[#EFEFEF]">
          <div className="flex flex-col w-[600px] mobile:w-[375px] mb-4">
            <div className="text-[33px] font-primary text-center mb-3">
              Свадебное расписание
            </div>
            <div className="text-[20px] font-primary text-center mb-2">
              Приглашаем вас разделить вместе с нами радость создания новой
              семьи.
            </div>
            <p className="text-center">10.08.2024</p>
            <div className="flex justify-around items-center mt-1">
              <div className="flex-1 pl-6 text-[20px] font-primary text-left mobile:pl-2">
                15:30
              </div>
              <div className="flex-1 text-[20px] font-primary text-left">
                Фуршет
              </div>
            </div>
            <div className="flex items-center justify-around mobile:mt-1">
              <div className="flex-1 pl-6 text-[20px] font-primary text-left mb-1 mobile:pl-2">
                 16:15
              </div>
              <div className="flex-1 text-[20px] font-primary text-left">
                Торжественная роспись
              </div>
            </div>
            <div className="flex items-center justify-around mobile:mt-1">
              <div className="flex-1 pl-6 text-[20px] font-primary text-left mb-1 mobile:pl-2">
                17:00
              </div>
              <div className="flex-1 text-[20px] font-primary text-left">
                Банкет
              </div>
            </div>
          </div>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A14d1bd91007de4ab650b462aed7192d02f193ea34a35275eaad02ce8cdaab1ac&amp;source=constructor"
            className=" w-full h-[600px] mobile:h-[400px] mobile:w-[400px]"
          ></iframe>
        </section>
      </div>
      <div className="toast toast-end">
        {notice.open && (
          <div className="alert alert-success">
            <span>{notice.message}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default App
