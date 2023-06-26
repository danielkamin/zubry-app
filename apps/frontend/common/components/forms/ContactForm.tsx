import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';

import { useAlertContext } from 'common/store/alert.context';
import FormInput from '@/components/forms/Fields/FormInput';
import Button from '@/components/simple/Button';
import MainPageService from 'common/services/main.service';

const ContactForm = () => {
  const alertContext = useAlertContext();
  const { register, handleSubmit } = useForm();
  const sendContactForm = async (data) => {
    setPending(true);
    const { status } = await MainPageService.postContactFormData(data.fullName, data.emailAddress, data.message);
    if (status)
      alertContext.openAlert(
        'info',
        'Dziękujemy za przesłanie wiadomości. Postaramy się jak najszybciej odpowiedzieć.'
      );
    else alertContext.openAlert('warning', 'Coś poszło nie tak przy wysyłaniu wiadomości. Spróbuj ponownie później.');
    setPending(false);
  };

  const [pending, setPending] = useState(false);
  return (
    <form onSubmit={handleSubmit(sendContactForm)} className="grid grid-flow-row gap-6">
      <FormInput
        id="fullName"
        name="fullName"
        type="text"
        label="Imię i Nazwisko"
        placeholder={'Pełne imię i nazwisko...'}
        register={register}
      />
      <FormInput
        placeholder={'Twój adres e-mail...'}
        id="emailAddress"
        name="emailAddress"
        type="text"
        label="E-mail"
        register={register}
      />
      <textarea
        {...register('message')}
        placeholder="wpisz swoją wiadomość..."
        rows={5}
        className="border border-gray-400 rounded-xl px-3 py-2 placeholder-opacity-50 placeholder-gray-500 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
      />
      {pending ? <LoadingOutlined /> : <Button type="submit">Wyślij wiadomość</Button>}
    </form>
  );
};

export default ContactForm;
