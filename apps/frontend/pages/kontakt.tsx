import { MessageOutlined } from '@ant-design/icons';

// import { clubHqGoogleMapsIFrameSrc } from '@/utils/constants';
// import GoogleMaps from '@/components/simple/GoogleMaps';
import Layout from '@/components/layout/Main/index';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/page/Kontakt/ContactInfo';
import MainPageService from 'common/services/main.service';
import { TStrapiContactData } from '@/types/strapi.types';
const Contact = ({ contactData }: { contactData: TStrapiContactData }) => {
  return (
    <>
      <section className="">
        <div className="grid grid-flow-row md:grid-cols-2 gap-6 justify-items-center">
          <div className="flex justify-center">
            <ContactInfo
              address={contactData.Address}
              phoneNumber={contactData.Phone_Number}
              openingHours={contactData.Opening_Hours}
              regon={contactData.REGON}
              nip={contactData.NIP}
              krs={contactData.KRS}
              bankAccountNumber={contactData.Bank_Account_Number}
            />
          </div>
          <div className="flex justify-center w-full xl:w-4/6 lg:3/5">
            <div className="shadow-xl rounded-xl w-full border bg-white">
              <div className="p-10 grid grid-flow-row gap-6">
                <p className="flex items-center font-semibold text-gray-800">
                  Wyślij do nas wiadomość
                  <MessageOutlined className="mx-1 " />
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <GoogleMaps src={clubHqGoogleMapsIFrameSrc} textInfo={'Tutaj znajduje się siedziba naszego klubu:'} /> */}
    </>
  );
};
export async function getStaticProps() {
  const { result } = await MainPageService.getContactAndLocationData();
  return {
    props: {
      contactData: result
        ? result.data.attributes
        : {
            Phone_Number: 'Brak danych',
            Address: 'Brak danych',
            Opening_Hours: 'Brak danych'
          }
    },
    revalidate: 60
  };
}

export default Contact;

Contact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
