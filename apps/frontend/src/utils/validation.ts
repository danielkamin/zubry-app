import { object, string, ref, boolean } from 'yup';

export const registerSchema = object().shape({
  email: string()
    .email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com')
    .required('E-Mail jest wymagany'),
  password: string().required('Hasło jest wymagane'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Hasła muszą się zgadzać'),
  acceptedRegulations: boolean().oneOf([true], 'Musisz zaakceptować regulamin przed rejestracją')
});

export const orderAddressSchema = object().shape({
  firstName: string().required('Imię jest wymagane'),
  lastName: string().required('Nazwisko jest wymagane'),
  phoneNumber: string().min(7).max(12).required('Numer kontaktowy jest wymagany'),
  city: string().min(3).required('Miasto jest wymagane'),
  street: string().min(3).required('Nazwa ulicy jest wymagana'),
  buildingNumber: string().max(20).min(1).required('Numer budynku jest wymagany'),
  apartmentNumber: string().max(20),
  postalCode: string()
    .test('len', 'Podany niepoprawny kod pocztowy.', (val) => val.length === 6)
    .test('format', 'Zły format kodu pocztowego.', (val) => val.indexOf('-') !== -1),
  note: string().max(300)
});
